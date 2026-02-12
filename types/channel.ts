export type ChannelType = 'telegram' | 'whatsapp_meta' | 'whatsapp_web' | 'instagram' | 'webchat';

export interface Channel {
  id: string;
  agent_id: string;
  type: ChannelType;
  config: ChannelConfig;
  is_active: boolean;
  created_at: string;
}

export interface ChannelConfig {
  // Configurações Gerais
  typing_indicator: boolean;
  auto_read: boolean;
  audio_processing: 'ignore' | 'transcribe' | 'reply_unavailable';
  activation_trigger: 'first_message' | 'keyword' | 'always';
  activation_keywords?: string[];
  end_conversation: 'inactivity' | 'keyword' | 'manual';
  end_keywords?: string[];

  // Mensagens em Grupo
  group_messages: boolean;
  private_reply: boolean;

  // Gerenciamento de Chamadas (WhatsApp)
  call_handling?: 'reject' | 'ignore' | 'custom_message';
  call_rejection_message?: string;

  // Assumir via Celular
  mobile_takeover: boolean;

  // Mensagens Não Descriptografadas
  unencrypted_fallback?: string;

  // Credenciais específicas por canal
  credentials: ChannelCredentials;
}

export type ChannelCredentials =
  | TelegramCredentials
  | WhatsAppMetaCredentials
  | WhatsAppWebCredentials
  | InstagramCredentials
  | WebChatCredentials;

export interface TelegramCredentials {
  bot_token: string;
  webhook_url?: string;
  custom_commands?: Record<string, string>;
}

export interface WhatsAppMetaCredentials {
  phone_number_id: string;
  access_token: string;
  webhook_verification_token: string;
}

export interface WhatsAppWebCredentials {
  evolution_endpoint: string;
  instance_id: string;
  api_key: string;
  qr_code?: string;
  status?: 'disconnected' | 'connecting' | 'connected';
}

export interface InstagramCredentials {
  page_access_token: string;
  page_id: string;
  webhook_url?: string;
}

export interface WebChatCredentials {
  widget_color?: string;
  widget_position?: 'bottom-right' | 'bottom-left';
  welcome_message?: string;
  embed_code?: string;
}
