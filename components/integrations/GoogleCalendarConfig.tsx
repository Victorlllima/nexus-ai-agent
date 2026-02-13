'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { GoogleCalendarIcon } from '@/components/icons/BrandIcons';
import { Calendar, ExternalLink, CheckCircle2 } from 'lucide-react';

export const GoogleCalendarConfig: React.FC = () => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [calendarId, setCalendarId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [permissions, setPermissions] = useState({
    read_events: true,
    create_events: true,
    update_events: false,
    delete_events: false,
  });

  const handleOAuthConnect = () => {
    alert('🔐 Iniciando OAuth 2.0...\n\nVocê será redirecionado para autorizar o acesso ao Google Calendar.');
    setTimeout(() => {
      setIsConnected(true);
      alert('✅ Conectado com sucesso ao Google Calendar!');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Card>
        <div style={{ padding: '1.5rem' }}>
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <GoogleCalendarIcon size={24} />
            Google Calendar Integration
          </h3>

          {!isConnected ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-sm font-bold text-blue-400 mb-2">Configurar Google Cloud Project</h4>
                <ol className="text-xs text-text-muted space-y-1 list-decimal list-inside">
                  <li>Acesse o <a href="https://console.cloud.google.com" target="_blank" className="text-blue-400 hover:underline">Google Cloud Console</a></li>
                  <li>Crie um novo projeto ou selecione um existente</li>
                  <li>Ative a API do Google Calendar</li>
                  <li>Crie credenciais OAuth 2.0</li>
                  <li>Copie o Client ID e Client Secret</li>
                </ol>
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-3"
                >
                  <ExternalLink size={14} />
                  Acessar Google Cloud Console
                </a>
              </div>

              <Input
                label="Client ID"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="123456789-abc.apps.googleusercontent.com"
                helperText="OAuth 2.0 Client ID"
              />

              <Input
                label="Client Secret"
                type="password"
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                placeholder="••••••••••••••••"
                helperText="OAuth 2.0 Client Secret"
              />

              <Button
                variant="primary"
                icon={<CheckCircle2 size={18} />}
                onClick={handleOAuthConnect}
                disabled={!clientId || !clientSecret}
                className="w-full"
              >
                Conectar com Google Calendar
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle2 size={24} className="text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-green-400">Conectado com Sucesso!</h4>
                  <p className="text-xs text-text-muted">Seu agente pode agendar e consultar eventos.</p>
                </div>
              </div>

              <Input
                label="Calendar ID (Opcional)"
                value={calendarId}
                onChange={(e) => setCalendarId(e.target.value)}
                placeholder="primary"
                helperText='Deixe "primary" para usar o calendário principal'
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 className="text-sm font-bold text-text-secondary">Permissões</h4>

                <Toggle
                  checked={permissions.read_events}
                  onChange={(val) => setPermissions({...permissions, read_events: val})}
                  label="Ler Eventos"
                  description="Permite consultar disponibilidade e eventos existentes"
                />

                <Toggle
                  checked={permissions.create_events}
                  onChange={(val) => setPermissions({...permissions, create_events: val})}
                  label="Criar Eventos"
                  description="Permite agendar reuniões e compromissos"
                />

                <Toggle
                  checked={permissions.update_events}
                  onChange={(val) => setPermissions({...permissions, update_events: val})}
                  label="Atualizar Eventos"
                  description="Permite modificar eventos existentes"
                />

                <Toggle
                  checked={permissions.delete_events}
                  onChange={(val) => setPermissions({...permissions, delete_events: val})}
                  label="Excluir Eventos"
                  description="Permite cancelar eventos agendados"
                />
              </div>

              <Button variant="secondary" className="w-full">
                Desconectar Google Calendar
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
