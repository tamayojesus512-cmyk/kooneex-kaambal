import { createClient } from '@supabase/supabase-js'

// Estas credenciales te las da Supabase en la pantalla de inicio de tu proyecto
const supabaseUrl = 'https://ankalhdpcorlsdbtfubv.supabase.co'
const supabaseAnonKey = 'sb_publishable_meDxcX2-juQYY4GY6UmEYA_IYyuLL6U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
