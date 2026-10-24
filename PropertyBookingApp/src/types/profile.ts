export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: any;
  savedCount: number;
  visitsCount: number;
  messagesCount: number;
  enquiriesCount: number;
}

export interface ProfileMenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: 'user' | 'heart' | 'calendar' | 'message' | 'bell' | 'shield' | 'settings' | 'logout';
  targetTab?: 'Saved' | 'Visits' | 'Messages' | 'Discover';
  isDestructive?: boolean;
}
