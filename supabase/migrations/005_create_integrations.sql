-- Create integrations table
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('elevenlabs', 'google_calendar')),
  credentials JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_integrations_agent_id ON integrations(agent_id);
CREATE INDEX idx_integrations_type ON integrations(type);
CREATE INDEX idx_integrations_is_active ON integrations(is_active);

-- Add unique constraint for one integration type per agent
CREATE UNIQUE INDEX idx_unique_integration_per_agent ON integrations(agent_id, type);
