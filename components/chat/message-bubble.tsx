'use client';

import { format } from 'date-fns';
import { Message } from '@/types';
import { auth } from '@/libs/firebase/config';
import { Avatar } from '@/components/ui/avatar';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOwnMessage = message.senderId === auth.currentUser?.uid;

  const getFormattedTime = () => {
    if (!message.createdAt) return 'Sending...';
    try {
      const date = message.createdAt.toDate();
      return format(date, 'HH:mm');
    } catch {
      return 'Sending...';
    }
  };

  return (
    <div className={`flex gap-3 mb-4 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isOwnMessage && (
        <Avatar
          src={message.senderPhoto}
          alt={message.senderName}
          size="sm"
        />
      )}

      <div className={`max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        {!isOwnMessage && (
          <span className="text-sm text-gray-500 mb-1 block">
            {message.senderName}
          </span>
        )}

        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwnMessage
              ? 'bg-blue-500 text-white rounded-br-md'
              : 'bg-gray-100 text-gray-900 rounded-bl-md'
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        </div>

        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
          <span>{getFormattedTime()}</span>
        </div>
      </div>
    </div>
  );
}
