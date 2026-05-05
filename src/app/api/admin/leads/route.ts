import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-session'
import { createSupabaseAdminClient, hasSupabaseServiceRole } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value

  if (!isValidAdminSession(token)) {
    return NextResponse.json({ message: 'Sessão expirada.' }, { status: 401 })
  }

  try {
    const supabase = createSupabaseAdminClient()

    const [candidatosResult, empresasResult] = await Promise.all([
      supabase.from('leads_candidato').select('*').limit(1000),
      supabase.from('leads_empresa').select('*').limit(1000),
    ])

    if (candidatosResult.error || empresasResult.error) {
      return NextResponse.json(
        {
          message: 'Não foi possível carregar os dados.',
          candidatosError: candidatosResult.error?.message,
          empresasError: empresasResult.error?.message,
          serviceRole: hasSupabaseServiceRole(),
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      candidatos: candidatosResult.data ?? [],
      empresas: empresasResult.data ?? [],
      serviceRole: hasSupabaseServiceRole(),
    })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Erro inesperado.' },
      { status: 500 }
    )
  }
}
