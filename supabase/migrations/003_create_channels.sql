-- Create channels table
CREATE TABLE IF NOT EXISTS channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('telegram', 'whatsapp_meta', 'whatsapp_web', 'instagram', 'webchat')),
  config JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_channels_agent_id ON channels(agent_id);
CREATE INDEX idx_channels_type ON channels(type);
CREATE INDEX idx_channels_is_active ON channels(is_active);

-- Add unique constraint for one channel per type per agent
CREATE UNIQUE INDEX idx_unique_channel_per_agent ON channels(agent_id, type);
