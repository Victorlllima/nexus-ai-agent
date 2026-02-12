-- Add owner_id to agents table to link agents to specific users (Auth)
ALTER TABLE agents 
ADD COLUMN owner_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();

-- Create index for faster lookups by owner
CREATE INDEX idx_agents_owner_id ON agents(owner_id);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- Create Policy for Agents
-- Users can view their own agents
CREATE POLICY "Users can view their own agents" 
ON agents FOR SELECT 
USING (auth.uid() = owner_id);

-- Users can insert their own agents
CREATE POLICY "Users can insert their own agents" 
ON agents FOR INSERT 
WITH CHECK (auth.uid() = owner_id);

-- Users can update their own agents
CREATE POLICY "Users can update their own agents" 
ON agents FOR UPDATE 
USING (auth.uid() = owner_id);

-- Users can delete their own agents
CREATE POLICY "Users can delete their own agents" 
ON agents FOR DELETE 
USING (auth.uid() = owner_id);

-- Create Policy for Training Data (Child table)
CREATE POLICY "Users can view training data of their agents" 
ON training_data FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM agents 
    WHERE agents.id = training_data.agent_id 
    AND agents.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can insert training data for their agents" 
ON training_data FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM agents 
    WHERE agents.id = training_data.agent_id 
    AND agents.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can update training data of their agents" 
ON training_data FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM agents 
    WHERE agents.id = training_data.agent_id 
    AND agents.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can delete training data of their agents" 
ON training_data FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM agents 
    WHERE agents.id = training_data.agent_id 
    AND agents.owner_id = auth.uid()
  )
);

-- Note: Repeat allow policies for other tables (channels, interactions, integrations) similarly
-- For brevity in this file, we assume standard pattern: check parent agent ownership.

-- Channels
CREATE POLICY "Users can manage channels of their agents"
ON channels FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM agents 
    WHERE agents.id = channels.agent_id 
    AND agents.owner_id = auth.uid()
  )
);

-- Interactions
CREATE POLICY "Users can view interactions of their agents"
ON interactions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM agents 
    WHERE agents.id = interactions.agent_id 
    AND agents.owner_id = auth.uid()
  )
);

-- Integrations
CREATE POLICY "Users can manage integrations of their agents"
ON integrations FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM agents 
    WHERE agents.id = integrations.agent_id 
    AND agents.owner_id = auth.uid()
  )
);
