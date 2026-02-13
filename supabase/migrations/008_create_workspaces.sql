-- Migration 008: Create Workspaces (Multi-Tenant Foundation)
-- Permite gerenciar múltiplos clientes no mesmo banco

-- 1. Criar tabela de workspaces (espaços de trabalho/clientes)
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  credits_balance INTEGER DEFAULT 100,
  settings JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Adicionar workspace_id nas tabelas existentes
ALTER TABLE agents ADD COLUMN workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE;
ALTER TABLE channels ADD COLUMN workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE;
ALTER TABLE training_data ADD COLUMN workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE;
ALTER TABLE interactions ADD COLUMN workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE;
ALTER TABLE integrations ADD COLUMN workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE;

-- 3. Criar índices para performance
CREATE INDEX idx_agents_workspace ON agents(workspace_id);
CREATE INDEX idx_channels_workspace ON channels(workspace_id);
CREATE INDEX idx_training_data_workspace ON training_data(workspace_id);
CREATE INDEX idx_interactions_workspace ON interactions(workspace_id);
CREATE INDEX idx_integrations_workspace ON integrations(workspace_id);

-- 4. Criar workspace padrão para dados existentes
INSERT INTO workspaces (name, owner_email, plan, credits_balance)
VALUES ('Workspace Padrão', 'admin@nexus.ai', 'enterprise', 10000)
ON CONFLICT DO NOTHING;

-- 5. Associar dados existentes ao workspace padrão
UPDATE agents SET workspace_id = (SELECT id FROM workspaces LIMIT 1) WHERE workspace_id IS NULL;
UPDATE channels SET workspace_id = (SELECT id FROM workspaces LIMIT 1) WHERE workspace_id IS NULL;
UPDATE training_data SET workspace_id = (SELECT id FROM workspaces LIMIT 1) WHERE workspace_id IS NULL;
UPDATE interactions SET workspace_id = (SELECT id FROM workspaces LIMIT 1) WHERE workspace_id IS NULL;
UPDATE integrations SET workspace_id = (SELECT id FROM workspaces LIMIT 1) WHERE workspace_id IS NULL;

-- 6. Tornar workspace_id obrigatório (após migrar dados)
ALTER TABLE agents ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE channels ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE training_data ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE interactions ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE integrations ALTER COLUMN workspace_id SET NOT NULL;

-- 7. Criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_workspace_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER workspace_updated_at
  BEFORE UPDATE ON workspaces
  FOR EACH ROW
  EXECUTE FUNCTION update_workspace_updated_at();

-- 8. Comentários para documentação
COMMENT ON TABLE workspaces IS 'Espaços de trabalho para multi-tenancy. Cada cliente tem seu workspace.';
COMMENT ON COLUMN workspaces.plan IS 'Plano de assinatura: free (1 agente, 100 créditos), pro (5 agentes, 1000 créditos), enterprise (ilimitado)';
COMMENT ON COLUMN workspaces.credits_balance IS 'Saldo de créditos disponíveis para uso de IA';
