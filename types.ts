
export type Theme = 'light' | 'dark';

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
