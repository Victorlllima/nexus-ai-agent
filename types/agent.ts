export interface Agent {
  id: string;
  name: string;
  model: string;
  system_prompt: string;
  temperature: number;
  settings: AgentSettings;
  created_at: string;
  updated_at: string;
}

export interface AgentSettings {
  // Funcionalidades Avançadas
  human_handoff: boolean;
  handoff_phone?: string;
  handoff_email?: string;
  use_emojis: boolean;
  signature_enabled: boolean;
  agent_signature?: string;
  scope_restriction: boolean;
  allowed_topics?: string[];
  split_responses: boolean;
  max_response_length?: number;
  allow_reminders: boolean;

  // Timezone e Timing
  timezone: string;
  response_delay: number; // em segundos
  message_buffer_enabled: boolean;

  // Limites
  max_interactions_per_session?: number;

  // Regras
  inactivity_rules: InactivityRule[];
  transfer_rules: TransferRule[];

  // Evolution API (WhatsApp)
  evolution_endpoint?: string;
  evolution_apikey?: string;
  evolution_instance_id?: string;
}

export interface InactivityRule {
  id: string;
  timeout_minutes: number;
  action: 'finalize' | 'send_message' | 'transfer';
  message?: string;
}

export interface TransferRule {
  id: string;
  condition: string;
  action: 'transfer_to_human' | 'transfer_to_queue';
  target?: string;
}

export interface ContextMultiplier {
  level: 1 | 2 | 3 | 4 | 5;
  history_messages: number;
  behavior_tokens: number;
  base_credits: number;
  multiplier: number;
  total_per_interaction: number;
}
