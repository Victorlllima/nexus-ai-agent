import { createClient } from '@supabase/supabase-js';
import type { Agent } from '@/types/agent';
import type { TrainingData } from '@/types/training';
import type { Channel } from '@/types/channel';
import type { Integration, Interaction } from '@/types/integration';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for Agents
export const agentsService = {
  async getAll(): Promise<Agent[]> {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Agent | null> {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(agent: Partial<Agent>): Promise<Agent> {
    const { data, error } = await supabase
      .from('agents')
      .insert(agent)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Agent>): Promise<Agent> {
    const { data, error } = await supabase
      .from('agents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Helper functions for Training Data
export const trainingService = {
  async getByAgentId(agentId: string): Promise<TrainingData[]> {
    const { data, error } = await supabase
      .from('training_data')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(trainingData: Partial<TrainingData>): Promise<TrainingData> {
    const { data, error } = await supabase
      .from('training_data')
      .insert(trainingData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('training_data')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Helper functions for Channels
export const channelsService = {
  async getByAgentId(agentId: string): Promise<Channel[]> {
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .eq('agent_id', agentId);

    if (error) throw error;
    return data || [];
  },

  async create(channel: Partial<Channel>): Promise<Channel> {
    const { data, error } = await supabase
      .from('channels')
      .insert(channel)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Channel>): Promise<Channel> {
    const { data, error } = await supabase
      .from('channels')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('channels')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Helper functions for Interactions
export const interactionsService = {
  async getByAgentId(agentId: string, limit = 50): Promise<Interaction[]> {
    const { data, error } = await supabase
      .from('interactions')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async create(interaction: Partial<Interaction>): Promise<Interaction> {
    const { data, error } = await supabase
      .from('interactions')
      .insert(interaction)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getStats(agentId: string): Promise<{
    total: number;
    totalCredits: number;
  }> {
    const { data, error } = await supabase
      .from('interactions')
      .select('credits_used')
      .eq('agent_id', agentId);

    if (error) throw error;

    const total = data?.length || 0;
    const totalCredits = data?.reduce((sum, i) => sum + i.credits_used, 0) || 0;

    return { total, totalCredits };
  }
};

// Helper functions for Integrations
export const integrationsService = {
  async getByAgentId(agentId: string): Promise<Integration[]> {
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .eq('agent_id', agentId);

    if (error) throw error;
    return data || [];
  },

  async create(integration: Partial<Integration>): Promise<Integration> {
    const { data, error } = await supabase
      .from('integrations')
      .insert(integration)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Integration>): Promise<Integration> {
    const { data, error } = await supabase
      .from('integrations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('integrations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
