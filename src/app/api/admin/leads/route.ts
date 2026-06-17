import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-session'
import { createSupabaseAdminClient, hasSupabaseServiceRole } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

type LeadType = 'candidato' | 'empresa' | 'interesse'
type LeadAction = 'archive' | 'restore' | 'update_notes'

const getLeadTable = (type: LeadType) =>
  type === 'candidato' ? 'leads_candidato' : type === 'empresa' ? 'leads_empresa' : 'leads_interesse'

const requireAdmin = (request: NextRequest) => {
  const token = request.cookies.get(ADMIN_COOKIE)?.value

  if (!isValidAdminSession(token)) {
    return NextResponse.json({ message: 'Sessão expirada.' }, { status: 401 })
  }

  return null
}

const parseLeadPayload = async (request: NextRequest) => {
  const body = await request.json().catch(() => ({}))
  const type = String(body.type || '') as LeadType
  const id = String(body.id || '').trim()

  if (type !== 'candidato' && type !== 'empresa' && type !== 'interesse') {
    return { error: NextResponse.json({ message: 'Tipo inválido.' }, { status: 400 }) }
  }

  if (!id) {
    return { error: NextResponse.json({ message: 'ID não informado.' }, { status: 400 }) }
  }

  return { type, id, body }
}

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  try {
    const supabase = createSupabaseAdminClient()

    const [candidatosResult, empresasResult, interessesResult] = await Promise.all([
      supabase.from('leads_candidato').select('*').order('created_at', { ascending: false }).limit(1000),
      supabase.from('leads_empresa').select('*').order('created_at', { ascending: false }).limit(1000),
      supabase.from('leads_interesse').select('*').order('created_at', { ascending: false }).limit(1000),
    ])

    if (candidatosResult.error || empresasResult.error || interessesResult.error) {
      return NextResponse.json(
        {
          message: 'Não foi possível carregar os dados.',
          candidatosError: candidatosResult.error?.message,
          empresasError: empresasResult.error?.message,
          interessesError: interessesResult.error?.message,
          serviceRole: hasSupabaseServiceRole(),
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      candidatos: candidatosResult.data ?? [],
      empresas: empresasResult.data ?? [],
      interesses: interessesResult.data ?? [],
      serviceRole: hasSupabaseServiceRole(),
    })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Erro inesperado.' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const payload = await parseLeadPayload(request)
  if (payload.error) return payload.error

  const action = String(payload.body.action || '') as LeadAction

  if (action !== 'archive' && action !== 'restore' && action !== 'update_notes') {
    return NextResponse.json({ message: 'Ação inválida.' }, { status: 400 })
  }

  try {
    const supabase = createSupabaseAdminClient()
    const table = getLeadTable(payload.type)
    const updates =
      action === 'archive'
        ? { status: 'arquivado', archived_at: new Date().toISOString() }
        : action === 'restore'
          ? { status: 'novo', archived_at: null }
          : { admin_notes: String(payload.body.notes ?? '').trim() || null }

    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', payload.id)
      .select('*')
      .single()

    if (error) {
      return NextResponse.json(
        { message: error.message, serviceRole: hasSupabaseServiceRole() },
        { status: 500 }
      )
    }

    return NextResponse.json({ lead: data, serviceRole: hasSupabaseServiceRole() })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Erro inesperado.' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const payload = await parseLeadPayload(request)
  if (payload.error) return payload.error

  try {
    const supabase = createSupabaseAdminClient()
    const table = getLeadTable(payload.type)
    let cvPath = ''

    if (payload.type === 'candidato') {
      const { data } = await supabase
        .from('leads_candidato')
        .select('cv_url')
        .eq('id', payload.id)
        .maybeSingle()

      cvPath = String(data?.cv_url || '').trim()
    }

    const { error } = await supabase.from(table).delete().eq('id', payload.id)

    if (error) {
      return NextResponse.json(
        { message: error.message, serviceRole: hasSupabaseServiceRole() },
        { status: 500 }
      )
    }

    if (payload.type === 'candidato' && cvPath && !/^https?:\/\//i.test(cvPath)) {
      await supabase.storage.from('curriculos').remove([cvPath.replace(/^\/+/, '')]).catch(() => null)
    }

    return NextResponse.json({ ok: true, serviceRole: hasSupabaseServiceRole() })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Erro inesperado.' },
      { status: 500 }
    )
  }
}
