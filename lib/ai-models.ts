export interface AIModel {
  id: string;
  name: string;
  provider: 'OpenAI' | 'Anthropic';
  tier: 'premium' | 'standard';
  context_window: number;
  description: string;
}

export const AI_MODELS: Record<string, AIModel[]> = {
  openai: [
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      provider: 'OpenAI',
      tier: 'premium',
      context_window: 128000,
      description: 'Modelo mais avançado e multimodal da OpenAI'
    },
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4o Mini',
      provider: 'OpenAI',
      tier: 'standard',
      context_window: 128000,
      description: 'Versão otimizada e econômica do GPT-4o'
    },
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      tier: 'premium',
      context_window: 128000,
      description: 'GPT-4 com janela de contexto expandida'
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'OpenAI',
      tier: 'premium',
      context_window: 8192,
      description: 'Modelo premium para tarefas complexas'
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      tier: 'standard',
      context_window: 16385,
      description: 'Rápido e econômico para conversas gerais'
    }
  ],
  anthropic: [
    {
      id: 'claude-3-5-sonnet-20241022',
      name: 'Claude 3.5 Sonnet',
      provider: 'Anthropic',
      tier: 'premium',
      context_window: 200000,
      description: 'Modelo mais inteligente da Anthropic'
    },
    {
      id: 'claude-3-opus-20240229',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      tier: 'premium',
      context_window: 200000,
      description: 'Máxima capacidade para tarefas complexas'
    },
    {
      id: 'claude-3-sonnet-20240229',
      name: 'Claude 3 Sonnet',
      provider: 'Anthropic',
      tier: 'standard',
      context_window: 200000,
      description: 'Equilíbrio entre performance e custo'
    },
    {
      id: 'claude-3-haiku-20240307',
      name: 'Claude 3 Haiku',
      provider: 'Anthropic',
      tier: 'standard',
      context_window: 200000,
      description: 'Respostas rápidas e econômicas'
    }
  ]
};

export const getAllModels = (): AIModel[] => {
  return [...AI_MODELS.openai, ...AI_MODELS.anthropic];
};

export const getModelById = (id: string): AIModel | undefined => {
  return getAllModels().find(model => model.id === id);
};

export const getModelsByProvider = (provider: 'OpenAI' | 'Anthropic'): AIModel[] => {
  return getAllModels().filter(model => model.provider === provider);
};

export const getModelsByTier = (tier: 'premium' | 'standard'): AIModel[] => {
  return getAllModels().filter(model => model.tier === tier);
};
