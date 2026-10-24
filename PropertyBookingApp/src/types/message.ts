export type MessageFilterTab = 'all' | 'unread' | 'archived';

export interface MessageParticipant {
  id: string;
  name: string;
  role: string;
  avatar: any;
  isOnline: boolean;
  phone?: string;
}

export interface MessagePropertyPreview {
  id: string;
  title: string;
  location: string;
  price: string;
  image: any;
}

export interface ChatMessage {
  id: string;
  sender: 'contact' | 'user';
  text: string;
  timestamp: string;
}

export interface MessageThread {
  id: string;
  contact: MessageParticipant;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isArchived: boolean;
  property: MessagePropertyPreview;
  messages: ChatMessage[];
}
