import crypto from 'node:crypto'

export const ADMIN_COOKIE = 'porto_talent_admin'
export const ADMIN_SESSION_SECONDS = 60 * 60 * 10

const getSecret = () =>
  process.env.ADMIN_SESSION_SECRET ||
  process.env.ADMIN_PASSWORD ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'porto-talent-admin-session'

export const getAdminPassword = () => process.env.ADMIN_PASSWORD

const sign = (payload: string) =>
  crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')

const constantTimeEqual = (a: string, b: string) => {
  const hashA = crypto.createHash('sha256').update(a).digest()
  const hashB = crypto.createHash('sha256').update(b).digest()
  return crypto.timingSafeEqual(hashA, hashB)
}

export const isValidAdminPassword = (password: string) => {
  const expected = getAdminPassword()
  if (!expected) return false
  return constantTimeEqual(password, expected)
}

export const createAdminSessionToken = () => {
  const issuedAt = Math.floor(Date.now() / 1000)
  const payload = `admin:${issuedAt}`
  return `${issuedAt}.${sign(payload)}`
}

export const isValidAdminSession = (token?: string | null) => {
  if (!token) return false

  const [issuedAtRaw, signature] = token.split('.')
  const issuedAt = Number(issuedAtRaw)

  if (!issuedAt || !signature) return false

  const now = Math.floor(Date.now() / 1000)
  if (issuedAt > now || now - issuedAt > ADMIN_SESSION_SECONDS) return false

  const expected = sign(`admin:${issuedAt}`)
  return constantTimeEqual(signature, expected)
}
