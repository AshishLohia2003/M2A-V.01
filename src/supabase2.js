import { createClient } from '@supabase/supabase-js'

const supabaseUrl2 = process.env.REACT_APP_SUPABASE_AUTH_URL;
const supabasekey2 = process.env.REACT_APP_SUPABASE_AUTH_ANON_KEY;
const supabase2 = createClient(supabaseUrl2, supabasekey2);

export default supabase2;