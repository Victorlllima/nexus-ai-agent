-- Create interactions table
CREATE TABLE IF NOT EXISTS interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES channels(id) ON DELETE SET NULL,
  user_message TEXT NOT NULL,
  agent_response TEXT NOT NULL,
  credits_used INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_interactions_agent_id ON interactions(agent_id);
CREATE INDEX idx_interactions_channel_id ON interactions(channel_id);
CREATE INDEX idx_interactions_created_at ON interactions(created_at DESC);

-- Add composite index for agent analytics
CREATE INDEX idx_interactions_agent_date ON interactions(agent_id, created_at DESC);
