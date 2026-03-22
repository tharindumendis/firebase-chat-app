'use client';

import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { clsx } from 'clsx';

interface MessageInputProps {
  onSendMessage: (text: string) => Promise<void>;
  disabled?: boolean;
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending || disabled) return;

    setIsSending(true);
    try {
      await onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-t bg-white"
    >
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={disabled || isSending}
        className={clsx(
          'flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'placeholder:text-gray-400 min-h-[44px] max-h-[120px]',
          (disabled || isSending) && 'opacity-50 cursor-not-allowed'
        )}
        rows={1}
      />
      <button
        type="submit"
        disabled={!message.trim() || isSending || disabled}
        className={clsx(
          'px-4 py-2 bg-blue-500 text-white rounded-xl font-medium',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'hover:bg-blue-600 transition-colors',
          'flex items-center justify-center',
          'self-end'
        )}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}
