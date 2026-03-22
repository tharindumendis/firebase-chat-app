import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  lastSeen: Timestamp;
  isOnline: boolean;
}

export interface Chatroom {
  id: string;
  name: string;
  description: string;
  createdAt: Timestamp;
  createdBy: string;
  members: string[];
  lastMessage: string;
  lastMessageTime: Timestamp;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderPhoto: string;
  chatroomId: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  isEdited: boolean;
  reactions: Record<string, string[]>;
  readBy: string[];
  replyTo?: string | null;
}

export interface Presence {
  uid: string;
  displayName: string;
  photoURL: string;
  onlineAt: Timestamp;
  state: 'online' | 'offline';
  lastSeen?: Timestamp;
}
