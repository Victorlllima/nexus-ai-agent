-- Migration 011: Temporarily disable RLS on workspaces for seeding
-- ATENÇÃO: Apenas para desenvolvimento! Remover em produção.

-- Criar policy permissiva temporária
DROP POLICY IF EXISTS "temp_allow_all_workspaces" ON workspaces;
CREATE POLICY "temp_allow_all_workspaces"
  ON workspaces FOR ALL
  USING (true)
  WITH CHECK (true);

COMMENT ON POLICY "temp_allow_all_workspaces" ON workspaces IS 'TEMPORARY: Allow all operations for development. REMOVE IN PRODUCTION!';
