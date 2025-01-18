/*
  # Add Forms and Video Relations

  1. New Tables
    - forms
      - id (uuid, primary key)
      - title (text)
      - type (text) - Para distinguir entre diferentes tipos de formularios
      - schema (jsonb) - Estructura del formulario
      - created_at (timestamp)
    
    - video_forms
      - id (uuid, primary key)
      - video_id (uuid, foreign key)
      - form_id (uuid, foreign key)
      - required (boolean)
      - order (integer)
      
    - form_responses
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - form_id (uuid, foreign key)
      - video_id (uuid, foreign key)
      - answers (jsonb)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Forms table
CREATE TABLE IF NOT EXISTS forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  schema jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read forms"
  ON forms
  FOR SELECT
  TO authenticated
  USING (true);

-- Video Forms relation table
CREATE TABLE IF NOT EXISTS video_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  form_id uuid REFERENCES forms(id) ON DELETE CASCADE,
  required boolean DEFAULT true,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(video_id, form_id)
);

ALTER TABLE video_forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read video forms"
  ON video_forms
  FOR SELECT
  TO authenticated
  USING (true);

-- Form Responses table
CREATE TABLE IF NOT EXISTS form_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  form_id uuid REFERENCES forms(id) ON DELETE CASCADE,
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  answers jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own form responses"
  ON form_responses
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own form responses"
  ON form_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());