import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("Missing Supabase environment variables");
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export type Kit = {
  id: string;
  project_name: string;
  answers: Record<string, string>;
  sections: Record<string, string>;
  is_premium: boolean;
  created_at: string;
};
