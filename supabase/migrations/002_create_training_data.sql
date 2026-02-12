-- Create training_data table
CREATE TABLE IF NOT EXISTS training_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('text', 'url', 'youtube', 'document')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_training_agent_id ON training_data(agent_id);
CREATE INDEX idx_training_type ON training_data(type);
CREATE INDEX idx_training_created_at ON training_data(created_at DESC);

-- Add full-text search index for content
CREATE INDEX idx_training_content_search ON training_data USING gin(to_tsvector('portuguese', content));
