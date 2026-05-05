import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const hasSupabaseServiceRole = () => Boolean(supabaseServiceRoleKey)

export const createSupabaseAdminClient = () => {
  const key = supabaseServiceRoleKey || supabaseAnonKey

  if (!supabaseUrl || !key) {
    throw new Error('Supabase admin environment is not configured.')
  }

  return createClient(supabaseUrl, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
