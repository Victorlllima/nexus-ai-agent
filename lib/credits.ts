/**
 * Sistema de Créditos - Nexus AI Agent
 *
 * Gerencia cobrança de créditos por uso de IA.
 * Workspaces marcados como is_admin têm créditos ILIMITADOS.
 */

import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase credentials not configured');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

interface WorkspaceCredits {
  id: string;
  credits_balance: number;
  is_admin: boolean;
  plan: string;
}

/**
 * Verifica se workspace tem créditos suficientes
 * Admins SEMPRE retornam true (créditos ilimitados)
 */
export async function hasCredits(workspaceId: string, required: number = 1): Promise<boolean> {
  const supabase = getSupabaseClient();

  const { data: workspace, error } = await supabase
    .from('workspaces')
    .select('credits_balance, is_admin')
    .eq('id', workspaceId)
    .single();

  if (error || !workspace) {
    throw new Error('Workspace não encontrado');
  }

  // Admin = créditos ilimitados
  if (workspace.is_admin) {
    return true;
  }

  // Cliente normal = verifica saldo
  return workspace.credits_balance >= required;
}

/**
 * Desconta créditos do workspace
 * Admins NÃO são descontados (créditos ilimitados)
 *
 * @param workspaceId - ID do workspace
 * @param amount - Quantidade de créditos a descontar
 * @returns Novo saldo de créditos (ou null se admin)
 */
export async function deductCredits(
  workspaceId: string,
  amount: number
): Promise<number | null> {
  const supabase = getSupabaseClient();

  // Buscar workspace
  const { data: workspace, error: fetchError } = await supabase
    .from('workspaces')
    .select('credits_balance, is_admin, plan')
    .eq('id', workspaceId)
    .single();

  if (fetchError || !workspace) {
    throw new Error('Workspace não encontrado');
  }

  // Admin = NÃO desconta (retorna null para indicar ilimitado)
  if (workspace.is_admin) {
    console.log(`💎 Admin workspace - créditos ilimitados (não descontado: ${amount})`);
    return null;
  }

  // Verificar saldo
  if (workspace.credits_balance < amount) {
    throw new Error(`Créditos insuficientes. Saldo: ${workspace.credits_balance}, Necessário: ${amount}`);
  }

  // Descontar créditos
  const newBalance = workspace.credits_balance - amount;
  const { error: updateError } = await supabase
    .from('workspaces')
    .update({ credits_balance: newBalance })
    .eq('id', workspaceId);

  if (updateError) {
    throw new Error('Erro ao descontar créditos');
  }

  console.log(`💰 Créditos descontados: ${amount} (saldo anterior: ${workspace.credits_balance}, novo: ${newBalance})`);
  return newBalance;
}

/**
 * Calcula custo baseado no modelo de IA e multiplicador de contexto
 */
export function calculateCredits(
  model: string,
  contextLevel: number = 1
): number {
  // Custo base por modelo
  const modelCosts: Record<string, number> = {
    'gpt-4o': 5,
    'gpt-4o-mini': 1,
    'gpt-4-turbo': 4,
    'gpt-4': 4,
    'gpt-3.5-turbo': 1,
    'claude-3-5-sonnet-20241022': 4,
    'claude-3-opus-20240229': 5,
    'claude-3-sonnet-20240229': 3,
    'claude-3-haiku-20240307': 1,
  };

  const baseCost = modelCosts[model] || 1;

  // Multiplicador de contexto (1x, 2x, 3x, 4x, 5x)
  return baseCost * contextLevel;
}

/**
 * Registra uso de créditos em interactions
 */
export async function recordInteraction(
  workspaceId: string,
  agentId: string,
  channelId: string | null,
  userMessage: string,
  agentResponse: string,
  creditsUsed: number
): Promise<void> {
  const supabase = getSupabaseClient();

  await supabase.from('interactions').insert({
    workspace_id: workspaceId,
    agent_id: agentId,
    channel_id: channelId,
    user_message: userMessage,
    agent_response: agentResponse,
    credits_used: creditsUsed
  });
}

/**
 * Obter estatísticas de uso de créditos
 */
export async function getCreditStats(workspaceId: string) {
  const supabase = getSupabaseClient();

  // Total gasto este mês
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data: interactions } = await supabase
    .from('interactions')
    .select('credits_used')
    .eq('workspace_id', workspaceId)
    .gte('created_at', startOfMonth.toISOString());

  const totalUsed = interactions?.reduce((sum, i) => sum + (i.credits_used || 0), 0) || 0;

  // Saldo atual
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('credits_balance, is_admin')
    .eq('id', workspaceId)
    .single();

  return {
    balance: workspace?.is_admin ? Infinity : (workspace?.credits_balance || 0),
    usedThisMonth: totalUsed,
    isAdmin: workspace?.is_admin || false
  };
}
