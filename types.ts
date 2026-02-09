
export type Theme = 'light' | 'dark';
export type Mood = 'classic' | 'midnight' | 'neon' | 'vintage' | 'ethereal';

export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  type: 'date' | 'travel' | 'home' | 'success';
}

export interface GuestMessage {
  id: string;
  author: string;
  avatar: string;
  content: string;
  isFeatured?: boolean;
}
