'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { History, Search, Download, Filter } from 'lucide-react';

interface Interaction {
  id: string;
  timestamp: Date;
  channel: string;
  user_message: string;
  agent_response: string;
  credits_used: number;
  duration_ms: number;
}

export const TabHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  // Mock data - Em produção, viria do Supabase
  const interactions: Interaction[] = [
    {
      id: '1',
      timestamp: new Date('2024-02-12T14:30:00'),
      channel: 'whatsapp',
      user_message: 'Olá, preciso de ajuda com o convênio médico',
      agent_response: 'Olá! Claro, vou te ajudar com informações sobre o convênio. Temos cobertura nacional com mais de 5.000 prestadores credenciados...',
      credits_used: 3,
      duration_ms: 2500
    },
    {
      id: '2',
      timestamp: new Date('2024-02-12T13:15:00'),
      channel: 'telegram',
      user_message: 'Qual o horário de funcionamento?',
      agent_response: 'Nosso horário de atendimento é de segunda a sexta, das 8h às 18h. Aos sábados funcionamos das 8h às 12h.',
      credits_used: 1,
      duration_ms: 1800
    },
    {
      id: '3',
      timestamp: new Date('2024-02-11T16:45:00'),
      channel: 'webchat',
      user_message: 'Gostaria de agendar uma visita',
      agent_response: 'Perfeito! Vou te ajudar a agendar. Qual data e horário seria melhor para você?',
      credits_used: 2,
      duration_ms: 2100
    },
    {
      id: '4',
      timestamp: new Date('2024-02-11T10:20:00'),
      channel: 'instagram',
      user_message: 'Vocês trabalham com imóveis comerciais?',
      agent_response: 'Sim! Trabalhamos com imóveis residenciais e comerciais. Temos um portfólio diversificado de salas, lojas e galpões.',
      credits_used: 1,
      duration_ms: 1900
    }
  ];

  const channels = [
    { value: 'all', label: 'Todos os Canais' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'webchat', label: 'Web Chat' }
  ];

  const dateRanges = [
    { value: '24hours', label: 'Últimas 24 horas' },
    { value: '7days', label: 'Últimos 7 dias' },
    { value: '30days', label: 'Últimos 30 dias' },
    { value: '90days', label: 'Últimos 90 dias' }
  ];

  const filteredInteractions = interactions.filter(interaction => {
    const matchesSearch = interaction.user_message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         interaction.agent_response.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel = channelFilter === 'all' || interaction.channel === channelFilter;
    return matchesSearch && matchesChannel;
  });

  const totalCredits = filteredInteractions.reduce((sum, i) => sum + i.credits_used, 0);
  const avgDuration = filteredInteractions.reduce((sum, i) => sum + i.duration_ms, 0) / filteredInteractions.length;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getChannelColor = (channel: string) => {
    const colors: Record<string, string> = {
      whatsapp: 'text-green-400',
      telegram: 'text-blue-400',
      instagram: 'text-pink-400',
      webchat: 'text-accent-cyan'
    };
    return colors[channel] || 'text-text-muted';
  };

  const handleExport = () => {
    alert('📊 Exportação de dados iniciada!\n\nOs dados serão baixados em formato CSV com todas as interações filtradas.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Filtros */}
      <Card>
        <div style={{ padding: '1.5rem' }}>
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <History size={20} className="text-accent-purple" />
            Histórico de Interações
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar em mensagens..."
                className="w-full pl-10 pr-4 py-2.5 bg-bg-tertiary border border-border-main rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple transition-colors"
              />
            </div>

            <Select
              label=""
              options={channels}
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
            />

            <Select
              label=""
              options={dateRanges}
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-subtle">
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-text-muted">Total de Interações:</span>
                <span className="ml-2 font-bold text-accent-purple">{filteredInteractions.length}</span>
              </div>
              <div>
                <span className="text-text-muted">Créditos Consumidos:</span>
                <span className="ml-2 font-bold text-accent-cyan">{totalCredits}</span>
              </div>
              <div>
                <span className="text-text-muted">Tempo Médio:</span>
                <span className="ml-2 font-bold text-accent-gold">{(avgDuration / 1000).toFixed(1)}s</span>
              </div>
            </div>

            <Button
              variant="secondary"
              icon={<Download size={18} />}
              onClick={handleExport}
            >
              Exportar CSV
            </Button>
          </div>
        </div>
      </Card>

      {/* Lista de Interações */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filteredInteractions.length === 0 ? (
          <Card>
            <div className="p-12 text-center">
              <Filter size={48} className="mx-auto mb-4 text-text-muted opacity-50" />
              <p className="text-text-muted">Nenhuma interação encontrada com os filtros aplicados</p>
            </div>
          </Card>
        ) : (
          filteredInteractions.map((interaction) => (
            <Card key={interaction.id}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold uppercase tracking-wide ${getChannelColor(interaction.channel)}`}>
                      {interaction.channel}
                    </span>
                    <span className="text-xs text-text-muted">
                      {formatDate(interaction.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-text-muted">
                      {(interaction.duration_ms / 1000).toFixed(1)}s
                    </span>
                    <span className="px-2 py-1 bg-accent-purple/20 text-accent-purple rounded-md font-semibold">
                      {interaction.credits_used} crédito{interaction.credits_used > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="bg-bg-tertiary border-l-4 border-accent-cyan rounded-lg p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-1">
                      Mensagem do Usuário
                    </p>
                    <p className="text-sm text-text-primary">
                      {interaction.user_message}
                    </p>
                  </div>

                  <div className="bg-bg-tertiary border-l-4 border-accent-purple rounded-lg p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-1">
                      Resposta do Agente
                    </p>
                    <p className="text-sm text-text-primary">
                      {interaction.agent_response}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
