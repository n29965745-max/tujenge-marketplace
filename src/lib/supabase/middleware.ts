import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Returns true only if Supabase env vars look real (not placeholder).
 * Lets the middleware gracefully no-op during preview/demo deploys.
 */
function hasRealSupabaseConfig(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  if (url.includes('placeholder')) return false;
  if (key.startsWith('placeholder')) return false;
  if (!url.startsWith('https://')) return false;
  // Supabase project URLs look like https://<ref>.supabase.co
  if (!/\.supabase\.co$/.test(url) && !/\.supabase\.in$/.test(url)) return false;
  return true;
}

export async function updateSession(request: NextRequest) {
  // If Supabase isn't configured (preview/demo deploy), let the request through
  // without touching auth. Server actions that actually need Supabase will still
  // throw — but the marketing pages render fine.
  if (!hasRealSupabaseConfig()) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Wrap getUser() so a transient Supabase outage doesn't 500 the whole site.
  // Public pages still render; auth-aware pages can do their own try/catch.
  let user = null;
  try {
    const result = await supabase.auth.getUser();
    user = result.data.user;
  } catch {
    // Supabase unreachable — treat as anonymous; protected pages handle redirects.
    return response;
  }

  const protectedPaths = ['/dashboard', '/account', '/projects/new'];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}
