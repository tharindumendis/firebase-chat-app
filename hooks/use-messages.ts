'use client';

import { useState, useEffect, useRef } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/libs/firebase/config';
import { auth } from '@/libs/firebase/config';
import { CHATROOM_ID, MESSAGE_PAGE_SIZE } from '@/constants';
import type { Message } from '@/types';
import { onMessagesChange, sendMessage as sendMessageHelper } from '@/libs/firebase/messages';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const unsubscribe = onMessagesChange(CHATROOM_ID, (newMessages) => {
      setMessages(newMessages);
      setLoading(false);
    }, (err) => {
      console.error('Messages subscription error:', err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (text: string) => {
    await sendMessageHelper(text, CHATROOM_ID);
  };

  return { messages, loading, error, sendMessage };
}
