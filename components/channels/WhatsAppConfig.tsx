'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Toggle';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { QrCode, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';

export const WhatsAppConfig: React.FC = () => {
  const [mode, setMode] = useState<'meta' | 'web'>('web');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [config, setConfig] = useState({
    typing_indicator: true,
    auto_read: true,
    audio_processing: 'transcribe' as 'ignore' | 'transcribe' | 'reply_unavailable',
    activation_trigger: 'first_message' as 'first_message' | 'keyword' | 'always',
    group_messages: false,
    call_handling: 'reject' as 'reject' | 'ignore' | 'custom_message',
    call_rejection_message: 'Desculpe, mas este canal não aceita chamadas telefônicas, apenas comunicações por meio de texto.',
    mobile_takeover: true,
    unencrypted_fallback: 'oi'
  });

  // Evolution API (WhatsApp Web)
  const [evolutionEndpoint, setEvolutionEndpoint] = useState('');
  const [instanceName, setInstanceName] = useState('');
  const [apiKey, setApiKey] = useState('');

  // Meta API (WhatsApp Business)
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  // Carregar dados salvos ao montar o componente
  useEffect(() => {
    loadSavedConfig();
  }, [mode]);

  const loadSavedConfig = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/channels/whatsapp?mode=${mode}`);
      const result = await response.json();

      if (result.success && result.data) {
        const savedConfig = result.data.config;

        if (savedConfig.mode === 'web') {
          setEvolutionEndpoint(savedConfig.evolutionEndpoint || '');
          setInstanceName(savedConfig.instanceId || '');
          setApiKey(savedConfig.apiKey || '');
        } else {
          setPhoneNumberId(savedConfig.phoneNumberId || '');
          setAccessToken(savedConfig.accessToken || '');
        }

        // Atualiza configurações gerais se existirem
        if (savedConfig.typing_indicator !== undefined) {
          setConfig(prev => ({
            ...prev,
            ...savedConfig
          }));
        }
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      setConnectionStatus('checking');
      setStatusMessage('Testando conexão com Evolution API...');

      // Testa conexão com Evolution API
      const testResponse = await fetch(`${evolutionEndpoint}/instance/fetchInstances`, {
        method: 'GET',
        headers: {
          'apikey': apiKey
        }
      });

      if (!testResponse.ok) {
        throw new Error('Falha ao conectar com Evolution API. Verifique endpoint e API key.');
      }

      const instances = await testResponse.json();
      const instance = instances.find((inst: any) => inst.instance.instanceName === instanceName);

      if (!instance) {
        throw new Error(`Instância "${instanceName}" não encontrada. Verifique o nome da instância.`);
      }

      setConnectionStatus('success');
      setStatusMessage(`✅ Conectado à instância "${instanceName}" com sucesso!`);
    } catch (error: any) {
      setConnectionStatus('error');
      setStatusMessage(`❌ ${error.message}`);
    }
  };

  const handleConnect = async () => {
    try {
      setIsSaving(true);
      setConnectionStatus('checking');
      setStatusMessage('Salvando configuração...');

      // Validação básica
      if (mode === 'web') {
        if (!evolutionEndpoint || !instanceName || !apiKey) {
          setConnectionStatus('error');
          setStatusMessage('❌ Preencha todos os campos obrigatórios');
          return;
        }
      }

      // Salva no banco de dados
      const response = await fetch('/api/channels/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode,
          evolutionEndpoint,
          instanceId: instanceName,
          apiKey,
          phoneNumberId,
          accessToken,
          config
        }),
      });

      const result = await response.json();

      if (result.success) {
        setConnectionStatus('success');
        if (mode === 'web') {
          setStatusMessage('✅ Evolution API conectada! Webhook configurado e pronto para receber mensagens.');
        } else {
          setStatusMessage('✅ WhatsApp Business configurado! Seu agente está pronto para receber mensagens.');
        }
      } else {
        setConnectionStatus('error');
        setStatusMessage(`❌ Erro: ${result.error}`);
      }
    } catch (error: any) {
      console.error('Erro ao conectar:', error);
      setConnectionStatus('error');
      setStatusMessage(`❌ Erro ao salvar: ${error.message || 'Erro desconhecido'}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Seletor de Modo */}
      <Card>
        <div style={{ padding: '1.5rem' }}>
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <WhatsAppIcon size={20} />
            Configuração WhatsApp
          </h3>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setMode('web')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                mode === 'web'
                  ? 'text-white shadow-lg'
                  : 'bg-bg-tertiary text-text-secondary border border-border-subtle'
              }`}
              style={mode === 'web' ? { backgroundColor: '#25D366' } : {}}
            >
              WhatsApp Web (Evolution API)
            </button>
            <button
              onClick={() => setMode('meta')}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                mode === 'meta'
                  ? 'text-white shadow-lg'
                  : 'bg-bg-tertiary text-text-secondary border border-border-subtle'
              }`}
              style={mode === 'meta' ? { backgroundColor: '#25D366' } : {}}
            >
              WhatsApp Business (Meta API)
            </button>
          </div>

          {mode === 'web' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Webhook URL para cadastrar na Evolution */}
              <div className="glass-card p-4 border-2 border-accent-cyan">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-cyan/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-accent-cyan mb-1">Webhook URL</h4>
                    <p className="text-xs text-text-secondary mb-2">
                      Configure esta URL no painel da Evolution API para receber mensagens:
                    </p>
                    <div className="bg-bg-primary rounded-lg p-3 border border-border-main">
                      <code className="text-xs text-accent-cyan break-all">
                        {typeof window !== 'undefined' ? `${window.location.origin}/api/webhooks/evolution` : '/api/webhooks/evolution'}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <Input
                label="Evolution API Endpoint"
                value={evolutionEndpoint}
                onChange={(e) => setEvolutionEndpoint(e.target.value)}
                placeholder="https://evo.redpro.com.br"
                helperText="URL do seu servidor Evolution API (sem barra no final)"
              />
              <Input
                label="Nome da Instância"
                value={instanceName}
                onChange={(e) => setInstanceName(e.target.value)}
                placeholder="Nexus"
                helperText="Nome da instância configurada na Evolution API (não é o ID/Token)"
              />
              <Input
                label="API Key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="••••••••••••••••"
                helperText="API Key global da Evolution API"
              />

              {/* Status de Conexão */}
              {connectionStatus !== 'idle' && (
                <div className={`glass-card p-4 border-2 ${
                  connectionStatus === 'success' ? 'border-green-500' :
                  connectionStatus === 'error' ? 'border-red-500' :
                  'border-accent-cyan'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      connectionStatus === 'success' ? 'bg-green-500/20' :
                      connectionStatus === 'error' ? 'bg-red-500/20' :
                      'bg-accent-cyan/20'
                    }`}>
                      {connectionStatus === 'checking' && (
                        <div className="w-5 h-5 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
                      )}
                      {connectionStatus === 'success' && (
                        <CheckCircle2 size={20} className="text-green-500" />
                      )}
                      {connectionStatus === 'error' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${
                        connectionStatus === 'success' ? 'text-green-500' :
                        connectionStatus === 'error' ? 'text-red-500' :
                        'text-accent-cyan'
                      }`}>
                        {statusMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input
                label="Phone Number ID"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                placeholder="123456789012345"
                helperText="ID do número no WhatsApp Business Manager"
              />
              <Input
                label="Access Token"
                type="password"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="••••••••••••••••"
                helperText="Token de acesso permanente do Meta Business"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Configurações do Canal */}
      <Card>
        <div style={{ padding: '1.5rem' }}>
          <h4 className="text-sm font-bold text-text-secondary mb-4">Comportamento do Canal</h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Toggle
              checked={config.typing_indicator}
              onChange={(val) => setConfig({...config, typing_indicator: val})}
              label="Indicador de Digitação"
              description='Mostra "digitando..." no WhatsApp enquanto o agente processa'
            />

            <Toggle
              checked={config.auto_read}
              onChange={(val) => setConfig({...config, auto_read: val})}
              label="Leitura Automática"
              description="Marca mensagens como lidas automaticamente"
            />

            <Toggle
              checked={config.group_messages}
              onChange={(val) => setConfig({...config, group_messages: val})}
              label="Mensagens de Grupos"
              description="Aceitar e responder mensagens em grupos do WhatsApp"
            />

            <Toggle
              checked={config.mobile_takeover}
              onChange={(val) => setConfig({...config, mobile_takeover: val})}
              label="Assumir via Celular"
              description="Permite humanos assumirem conversas pelo app móvel"
            />

            <div className="pt-2">
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Processamento de Áudio
              </label>
              <Select
                options={[
                  { value: 'transcribe', label: 'Transcrever e Responder' },
                  { value: 'reply_unavailable', label: 'Avisar que não aceita áudio' },
                  { value: 'ignore', label: 'Ignorar mensagens de áudio' }
                ]}
                value={config.audio_processing}
                onChange={(e) => setConfig({...config, audio_processing: e.target.value as any})}
              />
            </div>

            <div className="pt-2">
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Gerenciamento de Chamadas
              </label>
              <Select
                options={[
                  { value: 'reject', label: 'Rejeitar automaticamente' },
                  { value: 'ignore', label: 'Ignorar chamadas' },
                  { value: 'custom_message', label: 'Rejeitar com mensagem' }
                ]}
                value={config.call_handling}
                onChange={(e) => setConfig({...config, call_handling: e.target.value as any})}
              />
            </div>

            {config.call_handling === 'custom_message' && (
              <Input
                label="Mensagem de Resposta"
                value={config.call_rejection_message}
                onChange={(e) => setConfig({...config, call_rejection_message: e.target.value})}
                helperText="Mensagem enviada quando uma chamada for rejeitada"
              />
            )}

            <Input
              label="Texto Substituto (Mensagens Não Descriptografadas)"
              value={config.unencrypted_fallback}
              onChange={(e) => setConfig({...config, unencrypted_fallback: e.target.value})}
              placeholder="oi"
              helperText='O que considerar quando aparecer "aguardando mensagem" por erro de criptografia'
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        {mode === 'web' && (
          <Button
            variant="secondary"
            onClick={testConnection}
            disabled={!evolutionEndpoint || !instanceName || !apiKey || connectionStatus === 'checking'}
          >
            {connectionStatus === 'checking' ? 'Testando...' : 'Testar Conexão'}
          </Button>
        )}
        <Button
          variant="primary"
          icon={<CheckCircle2 size={18} />}
          onClick={handleConnect}
          loading={isSaving}
          disabled={connectionStatus === 'checking'}
        >
          {isSaving ? 'Salvando...' : 'Conectar WhatsApp'}
        </Button>
      </div>
    </div>
  );
};
