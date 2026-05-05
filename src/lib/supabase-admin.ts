import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const hasSupabaseServiceRole = () => Boolean(supabaseServiceRoleKey)

export const createSupabaseAdminClient = () => {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Supabase service role environment is not configured.')
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
