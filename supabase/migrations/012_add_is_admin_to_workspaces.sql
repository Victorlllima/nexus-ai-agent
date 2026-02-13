-- Migration 012: Add is_admin flag for unlimited credits
-- Workspaces marcados como admin têm créditos ilimitados

-- 1. Adicionar coluna is_admin
ALTER TABLE workspaces ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;

-- 2. Marcar workspace do Red como admin
UPDATE workspaces
SET is_admin = TRUE
WHERE owner_email = 'admin@nexus.ai'
  AND name LIKE '%Red%';

-- 3. Criar view para facilitar verificação de admin
CREATE OR REPLACE VIEW workspace_with_admin_check AS
SELECT
  w.*,
  CASE
    WHEN w.is_admin THEN 'UNLIMITED'::TEXT
    ELSE w.credits_balance::TEXT
  END as credits_display,
  CASE
    WHEN w.is_admin THEN TRUE
    ELSE w.credits_balance > 0
  END as has_credits
FROM workspaces w;

-- 4. Comentários
COMMENT ON COLUMN workspaces.is_admin IS 'Se TRUE, workspace tem créditos ilimitados (admin/desenvolvimento)';
COMMENT ON VIEW workspace_with_admin_check IS 'View que mostra créditos como "UNLIMITED" para admins';
