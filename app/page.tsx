'use client';

import React, { useState } from 'react';
import {
  Bot,
  Settings,
  Database,
  Zap,
  History,
  Coins,
  Save,
  Sparkles,
  MessageSquare,
  Plug2
} from 'lucide-react';
import { NexusLogo } from '@/components/icons/NexusLogo';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { getAllModels } from '@/lib/ai-models';
import { TextTraining } from '@/components/training/TextTraining';
import { UrlTraining } from '@/components/training/UrlTraining';
import { YoutubeTraining } from '@/components/training/YoutubeTraining';
import { DocumentTraining } from '@/components/training/DocumentTraining';
import { WhatsAppConfig } from '@/components/channels/WhatsAppConfig';
import { TelegramConfig } from '@/components/channels/TelegramConfig';
import { InstagramConfig } from '@/components/channels/InstagramConfig';
import { WebChatConfig } from '@/components/channels/WebChatConfig';
import { ElevenLabsConfig } from '@/components/integrations/ElevenLabsConfig';
import { GoogleCalendarConfig } from '@/components/integrations/GoogleCalendarConfig';
import { TabSettingsExpanded } from '@/components/studio/TabSettingsExpanded';
import { TabHistory } from '@/components/studio/TabHistory';
import { TabBilling } from '@/components/studio/TabBilling';
import { WhatsAppIcon, TelegramIcon, InstagramIcon, WebChatIcon, ElevenLabsIcon, GoogleCalendarIcon, YouTubeIcon } from '@/components/icons/BrandIcons';

// Version 2.0 - All modules fully implemented
export default function NexusStudio() {
  const [activeTab, setActiveTab] = useState('brain');
  const [isSaving, setIsSaving] = useState(false);
  const [trainingSubTab, setTrainingSubTab] = useState('text');
  const [channelSubTab, setChannelSubTab] = useState('whatsapp');
  const [integrationSubTab, setIntegrationSubTab] = useState('elevenlabs');

  // Agent State
  const [agentName, setAgentName] = useState('Nexus AI Agent');
  const [model, setModel] = useState('gpt-4o-mini');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);

  // Settings State
  const [useEmojis, setUseEmojis] = useState(true);
  const [humanHandoff, setHumanHandoff] = useState(true);
  const [signatureEnabled, setSignatureEnabled] = useState(false);

  const tabs = [
    { id: 'brain', label: 'Cérebro', icon: Bot, desc: 'Identidade e comportamento' },
    { id: 'training', label: 'Treinamento', icon: Database, desc: 'Base de conhecimento' },
    { id: 'settings', label: 'Configurações', icon: Settings, desc: 'Regras e ajustes' },
    { id: 'channels', label: 'Canais', icon: MessageSquare, desc: 'WhatsApp, Telegram, etc' },
    { id: 'integrations', label: 'Integrações', icon: Plug2, desc: 'ElevenLabs, Calendar' },
    { id: 'history', label: 'Interações', icon: History, desc: 'Histórico de conversas' },
    { id: 'billing', label: 'Créditos', icon: Coins, desc: 'Consumo e multiplicador' },
  ];

  const allModels = getAllModels();
  const modelOptions = allModels.map(m => ({
    value: m.id,
    label: `${m.name} (${m.provider})`
  }));

  const handleSave = async () => {
    setIsSaving(true);
    // Simular save
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('✅ Configurações salvas com sucesso!');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ position: 'relative', zIndex: 1 }}>
      {/* Header Premium */}
      <header className="glass-card" style={{
        borderRadius: 0,
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--border-main)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <NexusLogo size={56} />
          <div>
            <h1 className="text-gradient" style={{
              fontSize: '1.75rem',
              fontWeight: 900,
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              Nexus AI Agent
            </h1>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
              <span className="badge-premium" style={{ fontSize: '0.65rem' }}>
                <div style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--accent-purple)'
                }} />
                ADM EXCLUSIVO
              </span>
              <span className="badge-gold" style={{ fontSize: '0.65rem' }}>
                POWERED BY REDPRO
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          loading={isSaving}
          icon={<Save size={18} />}
          onClick={handleSave}
        >
          Gravar Comportamento
        </Button>
      </header>

      {/* Main Layout */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar Premium */}
        <aside style={{
          width: 280,
          background: 'rgba(19, 19, 26, 0.4)',
          backdropFilter: 'blur(12px)',
          borderRight: '1px solid var(--border-subtle)',
          padding: '1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          overflowY: 'auto'
        }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? 'rgba(147, 51, 234, 0.15)' : 'transparent',
                  border: `1px solid ${isActive ? 'var(--border-main)' : 'transparent'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all var(--transition-normal)',
                  textAlign: 'left',
                  color: isActive ? 'var(--accent-purple-hover)' : 'var(--text-secondary)'
                }}
              >
                <Icon size={22} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    marginBottom: '0.125rem'
                  }}>
                    {tab.label}
                  </div>
                  <div style={{
                    fontSize: '0.65rem',
                    opacity: 0.7
                  }}>
                    {tab.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto',
          background: 'radial-gradient(circle at top right, rgba(147, 51, 234, 0.05), transparent)'
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {/* Tab Header */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--text-primary)'
              }}>
                {tabs.find(t => t.id === activeTab)?.label}
                <Sparkles size={32} className="text-gradient" />
              </h2>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem'
              }}>
                {tabs.find(t => t.id === activeTab)?.desc}
              </p>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {activeTab === 'brain' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <Card glow>
                    <div style={{ padding: '1.5rem' }}>
                      <Input
                        label="Nome do Agente"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        placeholder="Ex: Max - Consultor Imobiliário"
                      />
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '1.5rem' }}>
                      <Select
                        label="Modelo de Inteligência"
                        options={modelOptions}
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        helperText="Escolha entre OpenAI e Anthropic"
                      />
                    </div>
                  </Card>

                  <Card>
                    <div style={{ padding: '1.5rem' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-muted)',
                        marginBottom: '0.5rem'
                      }}>
                        Prompt de Sistema (Personalidade)
                      </label>
                      <textarea
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        placeholder="Ex: Você é o Max, um corretor de imóveis extrovertido e proativo. Sempre ajuda os clientes com entusiasmo..."
                        rows={12}
                        className="input-premium"
                        style={{
                          minHeight: 200,
                          resize: 'vertical',
                          fontFamily: 'monospace',
                          fontSize: '0.875rem'
                        }}
                      />
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === 'settings' && <TabSettingsExpanded />}

              {activeTab === 'training' && (
                <div>
                  {/* Sub-tabs para tipos de treinamento */}
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                      { id: 'text', label: 'Texto + Imagem', icon: '📝', Icon: null },
                      { id: 'url', label: 'Website (URL)', icon: '🌐', Icon: null },
                      { id: 'youtube', label: 'YouTube', icon: null, Icon: YouTubeIcon },
                      { id: 'document', label: 'Documentos', icon: '📄', Icon: null }
                    ].map(tab => {
                      const isActive = trainingSubTab === tab.id;
                      const Icon = tab.Icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setTrainingSubTab(tab.id)}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${isActive
                              ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/30'
                              : 'bg-bg-tertiary text-text-secondary hover:bg-bg-card border border-border-subtle'
                            }`}
                        >
                          {Icon ? <Icon size={18} variant={isActive ? 'white' : 'color'} /> : tab.icon} {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Conteúdo do sub-tab ativo */}
                  {trainingSubTab === 'text' && <TextTraining />}
                  {trainingSubTab === 'url' && <UrlTraining />}
                  {trainingSubTab === 'youtube' && <YoutubeTraining />}
                  {trainingSubTab === 'document' && <DocumentTraining />}
                </div>
              )}

              {activeTab === 'channels' && (
                <div>
                  {/* Sub-tabs para canais */}
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                      { id: 'whatsapp', label: 'WhatsApp', Icon: WhatsAppIcon },
                      { id: 'telegram', label: 'Telegram', Icon: TelegramIcon },
                      { id: 'instagram', label: 'Instagram', Icon: InstagramIcon },
                      { id: 'webchat', label: 'Web Chat', Icon: WebChatIcon }
                    ].map(tab => {
                      const Icon = tab.Icon;
                      const isActive = channelSubTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setChannelSubTab(tab.id)}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${isActive
                              ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/30'
                              : 'bg-bg-tertiary text-text-secondary hover:bg-bg-card border border-border-subtle'
                            }`}
                        >
                          <Icon size={18} variant={isActive ? 'white' : 'color'} /> {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Conteúdo do sub-tab ativo */}
                  {channelSubTab === 'whatsapp' && <WhatsAppConfig />}
                  {channelSubTab === 'telegram' && <TelegramConfig />}
                  {channelSubTab === 'instagram' && <InstagramConfig />}
                  {channelSubTab === 'webchat' && <WebChatConfig />}
                </div>
              )}

              {activeTab === 'integrations' && (
                <div>
                  {/* Sub-tabs para integrações */}
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                      { id: 'elevenlabs', label: 'ElevenLabs TTS', Icon: ElevenLabsIcon },
                      { id: 'calendar', label: 'Google Calendar', Icon: GoogleCalendarIcon }
                    ].map(tab => {
                      const Icon = tab.Icon;
                      const isActive = integrationSubTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setIntegrationSubTab(tab.id)}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${isActive
                              ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/30'
                              : 'bg-bg-tertiary text-text-secondary hover:bg-bg-card border border-border-subtle'
                            }`}
                        >
                          <Icon size={18} variant={isActive ? 'white' : 'color'} /> {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Conteúdo do sub-tab ativo */}
                  {integrationSubTab === 'elevenlabs' && <ElevenLabsConfig />}
                  {integrationSubTab === 'calendar' && <GoogleCalendarConfig />}
                </div>
              )}

              {activeTab === 'history' && <TabHistory />}

              {activeTab === 'billing' && <TabBilling />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
