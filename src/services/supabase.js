import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://nbgpnfeldsexioierxgq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZ3BuZmVsZHNleGlvaWVyeGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MTA1NjksImV4cCI6MjA1ODk4NjU2OX0.IfQg9lZECF8q3yj2hPwl1Eh_su8juWfKICifFx3VsGw";

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
