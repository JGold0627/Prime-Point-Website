const SUPABASE_URL = "https://ihxdqydbsqoxzgwwdajp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_aZr9MzG6XWxbMi0sZmN8Bg_IfVKXrQt";

window.ppSupabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);