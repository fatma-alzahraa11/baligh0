import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'article' | 'book';
  author: string;
  url: string;
  thumbnail_url: string;
  duration: string;
  category: string;
  tags: string[];
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}
