import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-session'
import { createSupabaseAdminClient } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value

  if (!isValidAdminSession(token)) {
    return NextResponse.json({ message: 'Sessão expirada.' }, { status: 401 })
  }

  const rawPath = request.nextUrl.searchParams.get('path')?.trim()

  if (!rawPath) {
    return NextResponse.json({ message: 'Currículo não informado.' }, { status: 400 })
  }

  if (/^https?:\/\//i.test(rawPath)) {
    return NextResponse.json({ url: rawPath })
  }

  const path = rawPath.replace(/^\/+/, '')
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase.storage.from('curriculos').createSignedUrl(path, 60 * 30)

  if (error || !data?.signedUrl) {
    return NextResponse.json(
      { message: error?.message || 'Não foi possível abrir o currículo.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ url: data.signedUrl })
}
