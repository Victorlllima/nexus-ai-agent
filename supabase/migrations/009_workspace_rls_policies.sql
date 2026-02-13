-- Migration 009: Row Level Security Policies para Multi-Tenant
-- Garante isolamento total entre workspaces

-- 1. Habilitar RLS nas tabelas (se ainda não estiver)
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;

-- 2. Policies para WORKSPACES
-- Usuário vê apenas workspaces onde é owner
DROP POLICY IF EXISTS "Users see their own workspaces" ON workspaces;
CREATE POLICY "Users see their own workspaces"
  ON workspaces FOR SELECT
  USING (owner_email = current_setting('app.current_user_email', true));

-- Usuário pode criar workspaces
DROP POLICY IF EXISTS "Users can create workspaces" ON workspaces;
CREATE POLICY "Users can create workspaces"
  ON workspaces FOR INSERT
  WITH CHECK (owner_email = current_setting('app.current_user_email', true));

-- Usuário pode atualizar apenas seus workspaces
DROP POLICY IF EXISTS "Users can update their workspaces" ON workspaces;
CREATE POLICY "Users can update their workspaces"
  ON workspaces FOR UPDATE
  USING (owner_email = current_setting('app.current_user_email', true))
  WITH CHECK (owner_email = current_setting('app.current_user_email', true));

-- Usuário pode deletar apenas seus workspaces
DROP POLICY IF EXISTS "Users can delete their workspaces" ON workspaces;
CREATE POLICY "Users can delete their workspaces"
  ON workspaces FOR DELETE
  USING (owner_email = current_setting('app.current_user_email', true));

-- 3. Policies para AGENTS
-- Substitui policies antigas por isolamento de workspace
DROP POLICY IF EXISTS "Enable all access for agents" ON agents;
DROP POLICY IF EXISTS "workspace_isolation_agents" ON agents;

CREATE POLICY "workspace_isolation_agents"
  ON agents FOR ALL
  USING (
    workspace_id IN (
      SELECT id FROM workspaces
      WHERE owner_email = current_setting('app.current_user_email', true)
    )
  )
  WITH CHECK (
    workspace_id IN (
      SELECT id FROM workspaces
      WHERE owner_email = current_setting('app.current_user_email', true)
    )
  );

-- 4. Policies para CHANNELS
DROP POLICY IF EXISTS "Enable all access for channels" ON channels;
DROP POLICY IF EXISTS "workspace_isolation_channels" ON channels;

CREATE POLICY "workspace_isolation_channels"
  ON channels FOR ALL
  USING (
    workspace_id IN (
      SELECT id FROM workspaces
      WHERE owner_email = current_setting('app.current_user_email', true)
    )
  )
  WITH CHECK (
    workspace_id IN (
      SELECT id FROM workspaces
      WHERE owner_email = current_setting('app.current_user_email', true)
    )
  );

-- 5. Policies para TRAINING_DATA
DROP POLICY IF EXISTS "Enable all access for training_data" ON training_data;
DROP POLICY IF EXISTS "workspace_isolation_training_data" ON training_data;

CREATE POLICY "workspace_isolation_training_data"
  ON training_data FOR ALL
  USING (
    workspace_id IN (
      SELECT id FROM workspaces
      WHERE owner_email = current_setting('app.current_user_email', true)
    )
  )
  WITH CHECK (
    workspace_id IN (
      SELECT id FROM workspaces
      WHERE owner_email = current_setting('app.current_user_email', true)
    )
  );

-- 6. Policies para INTERACTIONS
DROP POLICY IF EXISTS "Enable all access for interactions" ON interactions;
DROP POLICY IF EXISTS "workspace_isolation_interactions" ON interactions;

CREATE POLICY "workspace_isolation_interactions"
  ON interactions FOR ALL
  USING (
    workspace_id IN (
      SELECT id FROM workspaces
      WHERE owner_email = current_setting('app.current_user_email', true)
    )
  )
  WITH CHECK (
    workspace_id IN (
      SELECT id FROM workspaces
      WHERE owner_email = current_setting('app.current_user_email', true)
    )
  );

-- 7. Policies para INTEGRATIONS
DROP POLICY IF EXISTS "Enable all access for integrations" ON integrations;
DROP POLICY IF EXISTS "workspace_isolation_integrations" ON integrations;

CREATE POLICY "workspace_isolation_integrations"
  ON integrations FOR ALL
  USING (
    workspace_id IN (
      SELECT id FROM workspaces
      WHERE owner_email = current_setting('app.current_user_email', true)
    )
  )
  WITH CHECK (
    workspace_id IN (
      SELECT id FROM workspaces
      WHERE owner_email = current_setting('app.current_user_email', true)
    )
  );

-- 8. Criar view para estatísticas de workspace
CREATE OR REPLACE VIEW workspace_stats AS
SELECT
  w.id as workspace_id,
  w.name,
  w.plan,
  w.credits_balance,
  COUNT(DISTINCT a.id) as total_agents,
  COUNT(DISTINCT c.id) as total_channels,
  COUNT(DISTINCT i.id) as total_interactions,
  COALESCE(SUM(i.credits_used), 0) as total_credits_used
FROM workspaces w
LEFT JOIN agents a ON a.workspace_id = w.id
LEFT JOIN channels c ON c.workspace_id = w.id
LEFT JOIN interactions i ON i.workspace_id = w.id
GROUP BY w.id, w.name, w.plan, w.credits_balance;

COMMENT ON VIEW workspace_stats IS 'Estatísticas agregadas por workspace para analytics';
