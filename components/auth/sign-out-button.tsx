'use client';

import { useState } from 'react';
import { signOut } from '@/libs/firebase/auth';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

export function SignOutButton({ user }: { user: { displayName?: string | null; photoURL?: string | null } }) {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar src={user.photoURL} alt={user.displayName || 'User'} size="sm" />
      <Button onClick={handleSignOut} disabled={loading} variant="ghost" size="sm">
        {loading ? 'Signing out...' : 'Sign out'}
      </Button>
    </div>
  );
}
