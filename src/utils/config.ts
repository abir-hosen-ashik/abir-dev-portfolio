import { createClient } from "@supabase/supabase-js";

// The portfolio's content lives in the pf_ tables of the Bangla Tools
// Supabase project, which is also where it is edited.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/** Whose portfolio this site shows (the owner's IAM user id). */
export const PORTFOLIO_USER_ID =
  import.meta.env.VITE_PORTFOLIO_USER_ID || "88b3efb5-8c58-486e-a3f7-751cc4b23e60";
