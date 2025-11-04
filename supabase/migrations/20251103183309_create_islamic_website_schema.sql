/*
  # Islamic Website Database Schema

  ## Overview
  This migration creates the complete database schema for an Islamic educational website
  with content management for questions, library resources (videos, audios, articles, books),
  and contact form submissions.

  ## New Tables

  ### 1. `questions`
  Stores frequently asked questions about Islam
  - `id` (uuid, primary key) - Unique identifier
  - `question` (text) - The question text
  - `answer` (text) - The answer text
  - `category` (text) - Category/topic of the question
  - `tags` (text array) - Searchable tags
  - `view_count` (integer) - Number of times viewed
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `library_items`
  Stores all library content (videos, audios, articles, books)
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Title of the content
  - `description` (text) - Description
  - `type` (text) - Type: 'video', 'audio', 'article', 'book'
  - `author` (text) - Author/speaker name
  - `url` (text) - URL or file path
  - `thumbnail_url` (text) - Thumbnail image URL
  - `duration` (text) - Duration for videos/audios
  - `category` (text) - Content category
  - `tags` (text array) - Searchable tags
  - `view_count` (integer) - Number of times viewed
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `contact_submissions`
  Stores contact form submissions
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Sender's name
  - `email` (text) - Sender's email
  - `subject` (text) - Message subject
  - `message` (text) - Message content
  - `status` (text) - Status: 'new', 'read', 'responded'
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for questions and library_items
  - Contact submissions are write-only for public users
*/

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS library_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('video', 'audio', 'article', 'book')),
  author text NOT NULL,
  url text NOT NULL,
  thumbnail_url text DEFAULT '',
  duration text DEFAULT '',
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read questions"
  ON questions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read library items"
  ON library_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_tags ON questions USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_library_items_type ON library_items(type);
CREATE INDEX IF NOT EXISTS idx_library_items_category ON library_items(category);
CREATE INDEX IF NOT EXISTS idx_library_items_tags ON library_items USING gin(tags);