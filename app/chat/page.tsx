'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatContainer } from '@/components/chat/chat-container';
import { useAuth } from '@/hooks/use-auth';
import { createUserDocument } from '@/libs/firebase/firestore';
import type { User } from '@/types';

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      createUserDocument(user as unknown as User).catch(console.error);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <ChatContainer user={user as unknown as User} />;
}
