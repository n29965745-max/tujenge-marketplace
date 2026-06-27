'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type AuthState =
  | { ok: true }
  | { ok: false; error: string };

export async function signInWithPassword(
  _prev: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const redirectTo = String(formData.get('redirectTo') || '/dashboard');

  if (!email || !password) {
    return { ok: false, error: 'Email and password are required.' };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect(redirectTo);
}

export async function signUpWithPassword(
  _prev: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const fullName = String(formData.get('fullName') || '').trim();
  const countryCode = String(formData.get('countryCode') || 'KE');

  if (!email || !password || !fullName) {
    return { ok: false, error: 'All fields are required.' };
  }
  if (password.length < 8) {
    return { ok: false, error: 'Password must be at least 8 characters.' };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        country_code: countryCode,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/dashboard`,
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return {
    ok: true,
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}
