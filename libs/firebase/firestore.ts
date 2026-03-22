import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import type { User } from '@/types';

export async function createUserDocument(user: User): Promise<void> {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastSeen: serverTimestamp(),
      isOnline: true,
    });
  } else {
    await updateDoc(userRef, {
      lastSeen: serverTimestamp(),
      isOnline: true,
    });
  }
}

export function subscribeToUser(
  uid: string,
  callback: (user: User | null) => void
) {
  const userRef = doc(db, 'users', uid);
  return onSnapshot(userRef, (snap) => {
    if (snap.exists()) {
      callback({ uid: snap.id, ...snap.data() } as User);
    } else {
      callback(null);
    }
  });
}
