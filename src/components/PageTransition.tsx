'use client';

import type { ReactNode } from 'react';

/**
 * PageTransition — wraps page content with a soft fade-up entrance.
 * Sits at the root of each page so navigation feels premium.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
