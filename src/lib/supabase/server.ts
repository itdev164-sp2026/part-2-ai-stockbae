import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabaseEnv } from "./config";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

function createSupabaseServerClient(cookieStore: CookieStore) {
  const { supabaseUrl, supabaseKey } = getSupabaseEnv();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components can read cookies but cannot always persist them.
        }
      },
    },
  });
}

export async function createSupabaseServerComponentClient() {
  const cookieStore = await cookies();

  return createSupabaseServerClient(cookieStore);
}

export async function createSupabaseServerActionClient() {
  const cookieStore = await cookies();

  return createSupabaseServerClient(cookieStore);
}