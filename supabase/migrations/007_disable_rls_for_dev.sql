-- Disable RLS for development (enable public access)
-- IMPORTANT: In production, you should create proper RLS policies instead

-- Agents table
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for agents" ON agents FOR ALL USING (true) WITH CHECK (true);

-- Training data table
ALTER TABLE training_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for training_data" ON training_data FOR ALL USING (true) WITH CHECK (true);

-- Channels table
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for channels" ON channels FOR ALL USING (true) WITH CHECK (true);

-- Interactions table
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for interactions" ON interactions FOR ALL USING (true) WITH CHECK (true);

-- Integrations table
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for integrations" ON integrations FOR ALL USING (true) WITH CHECK (true);
