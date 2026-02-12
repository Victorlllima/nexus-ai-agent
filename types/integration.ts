export type IntegrationType = 'elevenlabs' | 'google_calendar';

export interface Integration {
  id: string;
  agent_id: string;
  type: IntegrationType;
  credentials: IntegrationCredentials;
  is_active: boolean;
  created_at: string;
}

export type IntegrationCredentials =
  | ElevenLabsCredentials
  | GoogleCalendarCredentials;

export interface ElevenLabsCredentials {
  api_key: string;
  voice_id: string;
  model_id?: string;
  use_tts_in_responses: boolean;
}

export interface GoogleCalendarCredentials {
  client_id: string;
  client_secret: string;
  refresh_token: string;
  calendar_id: string;
}

export interface Interaction {
  id: string;
  agent_id: string;
  channel_id?: string;
  user_message: string;
  agent_response: string;
  credits_used: number;
  created_at: string;
}
