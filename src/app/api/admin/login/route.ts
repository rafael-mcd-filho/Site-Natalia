import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_SECONDS,
  createAdminSessionToken,
  getAdminPassword,
  isValidAdminPassword,
} from '@/lib/admin-session'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const { password } = await request.json().catch(() => ({ password: '' }))

  if (!getAdminPassword()) {
    return NextResponse.json(
      { message: 'Configure ADMIN_PASSWORD no .env.local.' },
      { status: 500 }
    )
  }

  if (!isValidAdminPassword(String(password || ''))) {
    return NextResponse.json({ message: 'Senha inválida.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_SECONDS,
  })

  return response
}
