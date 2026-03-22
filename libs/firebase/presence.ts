import { collection, query, onSnapshot, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { auth } from './config';
import { CHATROOM_ID } from '@/constants';

/**
 * Get presence collection reference for a chatroom
 */
export function getPresenceCollection(chatroomId: string = CHATROOM_ID) {
  return collection(db, 'chatrooms', chatroomId, 'presence');
}

/**
 * Subscribe to presence changes in real-time
 */
export function onPresenceChange(
  chatroomId: string = CHATROOM_ID,
  callback: (onlineUsers: string[]) => void
) {
  const presenceRef = collection(db, 'chatrooms', chatroomId, 'presence');
  const q = query(presenceRef);

  return onSnapshot(q, (snapshot) => {
    const onlineUsers = snapshot.docs
      .filter((d) => d.data().state === 'online')
      .map((d) => d.id);
    callback(onlineUsers);
  });
}

/**
 * Set user as online
 */
export async function setUserOnline(
  chatroomId: string = CHATROOM_ID
): Promise<void> {
  if (!auth.currentUser) return;

  const userStatusRef = doc(
    db,
    'chatrooms',
    chatroomId,
    'presence',
    auth.currentUser.uid
  );

  await setDoc(userStatusRef, {
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL,
    onlineAt: new Date(),
    state: 'online',
  });
}

/**
 * Set user as offline
 */
export async function setUserOffline(
  chatroomId: string = CHATROOM_ID
): Promise<void> {
  if (!auth.currentUser) return;

  const userStatusRef = doc(
    db,
    'chatrooms',
    chatroomId,
    'presence',
    auth.currentUser.uid
  );

  await updateDoc(userStatusRef, {
    state: 'offline',
    lastSeen: serverTimestamp(),
  });
}

/**
 * Set user as offline when disconnected
 */
export function setupOnDisconnect(
  chatroomId: string = CHATROOM_ID
) {
  if (!auth.currentUser) return null;

  const userStatusRef = doc(
    db,
    'chatrooms',
    chatroomId,
    'presence',
    auth.currentUser.uid
  );

  // Note: This would typically be used with Firebase's onDisconnect
  // which requires a different import pattern
  return userStatusRef;
}

/**
 * Get current user's presence status
 */
export async function getCurrentUserPresence(
  chatroomId: string = CHATROOM_ID
) {
  if (!auth.currentUser) return null;

  const userStatusRef = doc(
    db,
    'chatrooms',
    chatroomId,
    'presence',
    auth.currentUser.uid
  );

  // This would typically be used with getDoc for a one-time read
  // For real-time updates, use onPresenceChange instead
  return userStatusRef;
}
