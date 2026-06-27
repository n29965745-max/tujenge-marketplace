import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/health
 * Liveness + DB connectivity check for Vercel + monitoring tools.
 */
export async function GET() {
  const started = Date.now();
  const checks: Record<string, 'ok' | 'error'> = {
    server: 'ok',
    supabase: 'error',
  };

  try {
    const supabase = await createClient();
    // Lightweight query — does not require auth.
    const { error } = await supabase.from('profiles').select('id', { count: 'exact', head: true });
    if (!error) {
      checks.supabase = 'ok';
    }
  } catch {
    checks.supabase = 'error';
  }

  const ok = Object.values(checks).every((c) => c === 'ok');

  return NextResponse.json(
    {
      status: ok ? 'healthy' : 'degraded',
      checks,
      latency_ms: Date.now() - started,
      timestamp: new Date().toISOString(),
      service: 'tujenge-web',
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    },
    { status: ok ? 200 : 503 }
  );
}
