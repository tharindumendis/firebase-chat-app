'use client';

import { MessageList } from './message-list';
import { MessageInput } from './message-input';
import { ChatHeader } from './chat-header';
import { useMessages } from '@/hooks/use-messages';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { useAuth } from '@/hooks/use-auth';
import type { User } from '@/types';

interface ChatContainerProps {
  user: User;
}

export function ChatContainer({ user }: ChatContainerProps) {
  const { messages, loading, sendMessage } = useMessages();
  const { onlineUsers } = useOnlineStatus();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader
        user={{
          displayName: user.displayName,
          photoURL: user.photoURL,
        }}
        onlineUsers={onlineUsers}
      />

      <MessageList messages={messages} loading={loading} />

      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
}
