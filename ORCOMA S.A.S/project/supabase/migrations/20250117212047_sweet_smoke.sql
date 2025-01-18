/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - role (text)
      - created_at (timestamp)
    - videos
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - url (text)
      - created_at (timestamp)
    - evaluations
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - video_id (uuid, foreign key)
      - answers (jsonb)
      - score (integer)
      - created_at (timestamp)
    - risk_assessments
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - form_data (jsonb)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read videos"
  ON videos
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify videos"
  ON videos
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  ));

-- Evaluations table
CREATE TABLE IF NOT EXISTS evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  video_id uuid REFERENCES videos(id),
  answers jsonb NOT NULL,
  score integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own evaluations"
  ON evaluations
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own evaluations"
  ON evaluations
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Risk assessments table
CREATE TABLE IF NOT EXISTS risk_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  form_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own risk assessments"
  ON risk_assessments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own risk assessments"
  ON risk_assessments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());