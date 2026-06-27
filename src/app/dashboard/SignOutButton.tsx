'use client';

import { useTransition } from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from '../auth/actions';

export default function SignOutButton() {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      onClick={() => start(() => signOut())}
      disabled={pending}
      className="btn btn-outline btn-sm"
    >
      <LogOut className="w-3.5 h-3.5" />
      {pending ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
