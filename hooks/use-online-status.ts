'use client';

import { useEffect, useState } from 'react';
import { doc, setDoc, onSnapshot, onDisconnect } from 'firebase/firestore';
import { db } from '@/libs/firebase/config';
import { auth } from '@/libs/firebase/config';
import { CHATROOM_ID } from '@/constants';
import { onPresenceChange, setUserOnline, setUserOffline } from '@/libs/firebase/presence';

export function useOnlineStatus() {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !auth.currentUser) return;

    // Set user as online
    setUserOnline(CHATROOM_ID);
    setIsOnline(true);

    // Subscribe to presence changes
    const unsubscribe = onPresenceChange(CHATROOM_ID, (online) => {
      setOnlineUsers(online);
    });

    // Set up onDisconnect handler
    const userStatusRef = doc(
      db,
      'chatrooms',
      CHATROOM_ID,
      'presence',
      auth.currentUser.uid
    );

    onDisconnect(userStatusRef).set({
      uid: auth.currentUser.uid,
      state: 'offline',
      lastSeen: new Date(),
    });

    return () => {
      unsubscribe();
      setUserOffline(CHATROOM_ID);
    };
  }, []);

  return { onlineUsers, isOnline };
}
