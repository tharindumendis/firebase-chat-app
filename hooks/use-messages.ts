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

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const messagesRef = collection(db, 'chatrooms', CHATROOM_ID, 'messages');
    const q = query(
      messagesRef,
      orderBy('createdAt', 'asc'),
      limit(MESSAGE_PAGE_SIZE)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
        setMessages(newMessages);
        setLoading(false);
      },
      (err) => {
        console.error('Messages subscription error:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const sendMessage = async (text: string) => {
    if (!auth.currentUser || !text.trim()) return;

    const messagesRef = collection(db, 'chatrooms', CHATROOM_ID, 'messages');

    await addDoc(messagesRef, {
      text: text.trim(),
      senderId: auth.currentUser.uid,
      senderName: auth.currentUser.displayName,
      senderPhoto: auth.currentUser.photoURL || '',
      chatroomId: CHATROOM_ID,
      createdAt: serverTimestamp(),
      readBy: [auth.currentUser.uid],
      reactions: {},
      isEdited: false,
    });
  };

  return { messages, loading, error, sendMessage };
}
