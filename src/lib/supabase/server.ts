import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Returns true only if Supabase env vars look real (not placeholder).
 */
function hasRealSupabaseConfig(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  if (url.includes('placeholder')) return false;
  if (key.startsWith('placeholder')) return false;
  return true;
}

export async function createClient() {
  // Fallback stub client when Supabase isn't configured.
  // Returning a chainable "no-op" client keeps server actions from throwing
  // during demo / preview deploys before real credentials are wired up.
  if (!hasRealSupabaseConfig()) {
    const noop: any = () => Promise.resolve({ data: { user: null }, error: null });
    const result: any = {
      auth: {
        getUser: noop,
        signInWithPassword: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured.' } }),
        signUp: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured.' } }),
        signOut: () => Promise.resolve({ error: null }),
        exchangeCodeForSession: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: noop }), single: noop }),
        insert: () => ({ error: { message: 'Supabase not configured.' } }),
        update: () => ({ eq: () => ({ error: null }) }),
      }),
    };
    return result;
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}
