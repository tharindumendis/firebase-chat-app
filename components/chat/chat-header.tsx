'use client';

import { MessageSquare, Users } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { SignOutButton } from '@/components/auth/sign-out-button';

interface ChatHeaderProps {
  user: {
    displayName?: string | null;
    photoURL?: string | null;
  };
  onlineUsers: string[];
}

export function ChatHeader({ user, onlineUsers }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Firebase Chat</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{onlineUsers.length} online</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {onlineUsers.slice(0, 5).map((uid) => (
            <Avatar key={uid} size="sm" className="ring-2 ring-white" />
          ))}
          {onlineUsers.length > 5 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
              +{onlineUsers.length - 5}
            </div>
          )}
        </div>
        <SignOutButton user={user} />
      </div>
    </header>
  );
}
