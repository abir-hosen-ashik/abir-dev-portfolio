import { createClient } from "@supabase/supabase-js";

// Public client (safe for browser if insert policy allows anon)
export const supabase = createClient(
  "https://tlapmuaszjrzkzccrxkg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYXBtdWFzempyemt6Y2NyeGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MzQzNDgsImV4cCI6MjA3MDUxMDM0OH0.sYI4_iAZ9DP4ZUl6Wrmp7QrnMi57LnaxP3UlQNU9PNM"
);
