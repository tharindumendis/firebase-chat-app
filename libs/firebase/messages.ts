import { collection, query, orderBy, onSnapshot, limit, addDoc, updateDoc, doc, serverTimestamp, where } from 'firebase/firestore';
import { db } from './config';
import { auth } from './config';
import { CHATROOM_ID, MESSAGE_PAGE_SIZE } from '@/constants';
import type { Message } from '@/types';

/**
 * Get messages for a specific chatroom
 */
export function getMessages(chatroomId: string = CHATROOM_ID) {
  const messagesRef = collection(db, 'chatrooms', chatroomId, 'messages');
  const q = query(messagesRef, orderBy('createdAt', 'asc'), limit(MESSAGE_PAGE_SIZE));
  return messagesRef;
}

/**
 * Subscribe to messages in real-time
 */
export function onMessagesChange(
  chatroomId: string = CHATROOM_ID,
  callback: (messages: Message[]) => void,
  errorCallback?: (error: Error) => void
) {
  const messagesRef = collection(db, 'chatrooms', chatroomId, 'messages');
  const q = query(messagesRef, orderBy('createdAt', 'asc'), limit(MESSAGE_PAGE_SIZE));

  return onSnapshot(
    q,
    (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      callback(messages);
    },
    (err) => {
      console.error('Messages subscription error:', err);
      if (errorCallback) {
        errorCallback(err);
      }
    }
  );
}

/**
 * Send a new message
 */
export async function sendMessage(
  text: string,
  chatroomId: string = CHATROOM_ID
): Promise<void> {
  if (!auth.currentUser || !text.trim()) return;

  const messagesRef = collection(db, 'chatrooms', chatroomId, 'messages');

  await addDoc(messagesRef, {
    text: text.trim(),
    senderId: auth.currentUser.uid,
    senderName: auth.currentUser.displayName,
    senderPhoto: auth.currentUser.photoURL || '',
    chatroomId: chatroomId,
    createdAt: serverTimestamp(),
    readBy: [auth.currentUser.uid],
    reactions: {},
    isEdited: false,
  });
}

/**
 * Update a message
 */
export async function updateMessage(
  messageId: string,
  text: string,
  chatroomId: string = CHATROOM_ID
): Promise<void> {
  if (!auth.currentUser) return;

  const messageRef = doc(db, 'chatrooms', chatroomId, 'messages', messageId);
  await updateDoc(messageRef, {
    text: text.trim(),
    isEdited: true,
    editedAt: serverTimestamp(),
  });
}

/**
 * Delete a message
 */
export async function deleteMessage(
  messageId: string,
  chatroomId: string = CHATROOM_ID
): Promise<void> {
  if (!auth.currentUser) return;

  const messageRef = doc(db, 'chatrooms', chatroomId, 'messages', messageId);
  await updateDoc(messageRef, {
    text: '[Message deleted]',
    isDeleted: true,
    deletedAt: serverTimestamp(),
  });
}

/**
 * Mark messages as read
 */
export async function markMessagesAsRead(
  messageIds: string[],
  chatroomId: string = CHATROOM_ID
): Promise<void> {
  if (!auth.currentUser) return;

  const batch = Promise.all(
    messageIds.map((messageId) => {
      const messageRef = doc(db, 'chatrooms', chatroomId, 'messages', messageId);
      return updateDoc(messageRef, {
        readBy: where('readBy', 'array-contains', auth.currentUser.uid)
          ? []
          : [auth.currentUser.uid],
      });
    })
  );

  await batch;
}
