'use client';

import { useEffect, useState } from 'react';
import { doc, setDoc, onSnapshot, onDisconnect } from 'firebase/firestore';
import { db } from '@/libs/firebase/config';
import { auth } from '@/libs/firebase/config';
import { CHATROOM_ID } from '@/constants';

export function useOnlineStatus() {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !auth.currentUser) return;

    const userStatusRef = doc(
      db,
      'chatrooms',
      CHATROOM_ID,
      'presence',
      auth.currentUser.uid
    );

    const setOnline = async () => {
      await setDoc(userStatusRef, {
        uid: auth.currentUser!.uid,
        displayName: auth.currentUser!.displayName,
        photoURL: auth.currentUser!.photoURL,
        onlineAt: new Date(),
        state: 'online',
      });

      onDisconnect(userStatusRef).set({
        uid: auth.currentUser!.uid,
        state: 'offline',
        lastSeen: new Date(),
      });
    };

    setOnline();
    setIsOnline(true);

    const presenceRef = collection(db, 'chatrooms', CHATROOM_ID, 'presence');
    const unsubscribe = onSnapshot(presenceRef, (snapshot) => {
      const online = snapshot.docs
        .filter((d) => d.data().state === 'online')
        .map((d) => d.id);
      setOnlineUsers(online);
    });

    return () => {
      unsubscribe();
      setDoc(userStatusRef, { state: 'offline', lastSeen: new Date() });
    };
  }, []);

  return { onlineUsers, isOnline };
}
