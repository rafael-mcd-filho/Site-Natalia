import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-session'
import { createMetadata } from '@/lib/seo'
import AdminDashboard from './AdminDashboard'

export const metadata: Metadata = createMetadata({
  title: 'Painel Admin | Porto Talent',
  path: '/admin',
  noIndex: true,
})

export default async function AdminPage() {
  const cookieStore = await cookies()
  const initialAuthenticated = isValidAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)

  return <AdminDashboard initialAuthenticated={initialAuthenticated} />
}
