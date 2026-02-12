'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';

interface InactivityAction {
  id: string;
  timeoutMinutes: number;
  action: 'finalize' | 'send_message' | 'transfer';
  message?: string;
}

export const TabSettingsExpanded: React.FC = () => {
  const [settings, setSettings] = useState({
    // Funcionalidades básicas
    human_handoff: true,
    handoff_contact: '',
    use_emojis: true,
    signature_enabled: false,
    agent_signature: '',
    scope_restriction: true,
    allowed_topics: '',
    split_responses: false,
    max_response_length: 1000,
    allow_reminders: true,

    // Timing e buffers
    timezone: 'America/Sao_Paulo',
    response_delay: 2,
    message_buffer_enabled: true,

    // Limites
    max_interactions: 50,
  });

  const [inactivityActions, setInactivityActions] = useState<InactivityAction[]>([
    { id: '1', timeoutMinutes: 10, action: 'finalize', message: '' }
  ]);

  const [transferRules, setTransferRules] = useState([
    { id: '1', condition: 'cliente pedir atendimento humano', action: 'transfer' }
  ]);

  const timezones = [
    { value: 'America/Sao_Paulo', label: 'São Paulo (GMT-3)' },
    { value: 'America/New_York', label: 'New York (GMT-5)' },
    { value: 'Europe/London', label: 'London (GMT+0)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' },
  ];

  const addInactivityAction = () => {
    setInactivityActions([...inactivityActions, {
      id: Date.now().toString(),
      timeoutMinutes: 5,
      action: 'send_message',
      message: 'Ainda está aí?'
    }]);
  };

  const removeInactivityAction = (id: string) => {
    setInactivityActions(inactivityActions.filter(a => a.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Funcionalidades Principais */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Funcionalidades Principais</h3>

          <div className="space-y-4">
            <Toggle
              checked={settings.human_handoff}
              onChange={(val) => setSettings({...settings, human_handoff: val})}
              label="Transferir para Humano"
              description="Habilite para que o agente possa transferir o atendimento para aba 'em espera' de equipe humana"
            />

            {settings.human_handoff && (
              <Input
                label="Contato para Transferência"
                value={settings.handoff_contact}
                onChange={(e) => setSettings({...settings, handoff_contact: e.target.value})}
                placeholder="email@empresa.com ou +5511999999999"
                helperText="Email ou telefone da equipe humana"
              />
            )}

            <div className="h-px bg-border-subtle" />

            <Toggle
              checked={settings.use_emojis}
              onChange={(val) => setSettings({...settings, use_emojis: val})}
              label="Usar Emojis nas Respostas"
              description="Define se o agente pode utilizar emojis em suas respostas"
            />

            <div className="h-px bg-border-subtle" />

            <Toggle
              checked={settings.signature_enabled}
              onChange={(val) => setSettings({...settings, signature_enabled: val})}
              label="Assinar Nome do Agente nas Respostas"
              description="Ative esta opção para que o agente de IA adicione automaticamente sua assinatura em cada resposta"
            />

            {settings.signature_enabled && (
              <Input
                label="Assinatura Personalizada"
                value={settings.agent_signature}
                onChange={(e) => setSettings({...settings, agent_signature: e.target.value})}
                placeholder="Ex: Atenciosamente, Max - Consultor Virtual"
              />
            )}

            <div className="h-px bg-border-subtle" />

            <Toggle
              checked={settings.scope_restriction}
              onChange={(val) => setSettings({...settings, scope_restriction: val})}
              label="Restringir Temas Permitidos"
              description="Marque essa opção para que o agente não fale sobre outros assuntos"
            />

            {settings.scope_restriction && (
              <Input
                label="Temas Permitidos (separados por vírgula)"
                value={settings.allowed_topics}
                onChange={(e) => setSettings({...settings, allowed_topics: e.target.value})}
                placeholder="vendas, imóveis, agendamento, suporte"
              />
            )}

            <div className="h-px bg-border-subtle" />

            <Toggle
              checked={settings.split_responses}
              onChange={(val) => setSettings({...settings, split_responses: val})}
              label="Dividir Resposta em Partes"
              description="Em caso da mensagem ficar grande, o agente pode separar em várias mensagens"
            />

            {settings.split_responses && (
              <Slider
                label="Tamanho Máximo por Mensagem"
                value={settings.max_response_length}
                onChange={(val) => setSettings({...settings, max_response_length: val})}
                min={500}
                max={2000}
                step={100}
                unit=" caracteres"
              />
            )}

            <div className="h-px bg-border-subtle" />

            <Toggle
              checked={settings.allow_reminders}
              onChange={(val) => setSettings({...settings, allow_reminders: val})}
              label="Permitir Registrar Lembretes"
              description="Habilite essa opção para que o agente tenha a capacidade de registrar lembretes ao usuário"
            />
          </div>
        </div>
      </Card>

      {/* Timing e Configurações Avançadas */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Timing e Limites</h3>

          <div className="space-y-4">
            <Select
              label="Timezone do Agente"
              options={timezones}
              value={settings.timezone}
              onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              helperText="Escolha o timezone que agente usará para datas, por exemplo agendar reuniões"
            />

            <Slider
              label="Tempo de Resposta"
              value={settings.response_delay}
              onChange={(val) => setSettings({...settings, response_delay: val})}
              min={0}
              max={30}
              step={1}
              unit=" segundos"
              showValue
            />
            <p className="text-xs text-text-muted -mt-2">
              Defina um intervalo para o agente esperar e dar uma resposta (buffer para múltiplas mensagens)
            </p>

            <Toggle
              checked={settings.message_buffer_enabled}
              onChange={(val) => setSettings({...settings, message_buffer_enabled: val})}
              label="Buffer de Mensagens"
              description="Aguarda o tempo definido acima para acumular mensagens e responder tudo de uma vez"
            />

            <Slider
              label="Limite de Interações por Atendimento"
              value={settings.max_interactions}
              onChange={(val) => setSettings({...settings, max_interactions: val})}
              min={10}
              max={100}
              step={10}
              unit=" interações"
              showValue
            />
            <p className="text-xs text-text-muted -mt-2">
              Defina a quantidade de interações que o agente pode aceitar por atendimento
            </p>
          </div>
        </div>
      </Card>

      {/* Ações de Inatividade */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-primary">Ações de Inatividade</h3>
            <Button
              variant="secondary"
              icon={<Plus size={16} />}
              onClick={addInactivityAction}
            >
              Adicionar Ação
            </Button>
          </div>

          <p className="text-sm text-text-muted mb-4">
            Configure ações que o agente deve executar quando o cliente parar de responder
          </p>

          <div className="space-y-3">
            {inactivityActions.map((action) => (
              <div key={action.id} className="bg-bg-tertiary border border-border-subtle rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-sm font-semibold text-text-primary">
                    Se não responder em {action.timeoutMinutes} minutos
                  </h4>
                  <button
                    onClick={() => removeInactivityAction(action.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Minutos"
                    type="number"
                    value={action.timeoutMinutes}
                    onChange={(e) => {
                      const updated = inactivityActions.map(a =>
                        a.id === action.id ? {...a, timeoutMinutes: parseInt(e.target.value)} : a
                      );
                      setInactivityActions(updated);
                    }}
                    min={1}
                  />

                  <Select
                    label="Ação"
                    options={[
                      { value: 'finalize', label: 'Finalizar atendimento' },
                      { value: 'send_message', label: 'Enviar mensagem' },
                      { value: 'transfer', label: 'Transferir para humano' }
                    ]}
                    value={action.action}
                    onChange={(e) => {
                      const updated = inactivityActions.map(a =>
                        a.id === action.id ? {...a, action: e.target.value as any} : a
                      );
                      setInactivityActions(updated);
                    }}
                  />
                </div>

                {action.action === 'send_message' && (
                  <Input
                    label="Mensagem"
                    value={action.message || ''}
                    onChange={(e) => {
                      const updated = inactivityActions.map(a =>
                        a.id === action.id ? {...a, message: e.target.value} : a
                      );
                      setInactivityActions(updated);
                    }}
                    placeholder="Ex: Ainda está aí? Posso ajudar em mais alguma coisa?"
                    className="mt-3"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Regras de Transferência */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Regras de Transferência</h3>

          <p className="text-sm text-text-muted mb-4">
            Configure instruções para o agente fazer transferência do atendimento
          </p>

          <div className="space-y-3">
            <div className="bg-bg-tertiary border border-border-subtle rounded-lg p-4">
              <Input
                label="Condição para Transferência"
                value="cliente pedir atendimento humano"
                placeholder="Ex: quando o cliente pedir para falar com um humano"
              />
              <p className="text-xs text-text-muted mt-2">
                O agente identificará automaticamente quando essa condição for atendida
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
