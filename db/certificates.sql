-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id TEXT UNIQUE NOT NULL,
  content_hash TEXT NOT NULL,
  trust_score INTEGER NOT NULL,
  risk_level TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  metrics JSONB DEFAULT '{}'::jsonb,
  layers JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for verification page)
CREATE POLICY "Allow public read access to certificates"
ON certificates FOR SELECT
TO public
USING (true);

-- Allow authenticated users (or service role) to insert
-- Since API is server-side, we'll use service role key mostly, which bypasses RLS.
-- But standard policy for redundancy:
CREATE POLICY "Allow authenticated insert"
ON certificates FOR INSERT
TO authenticated
WITH CHECK (true);
