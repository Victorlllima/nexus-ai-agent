'use client';

import React, { useState, useEffect } from 'react';
import {
  Bot,
  Settings,
  Database,
  Zap,
  MessageSquare,
  Save,
  Play,
  Info,
  ChevronRight,
  Sparkles,
  Shield,
  History,
  Coins,
  Loader2,
  Send
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Premium Studio Design (Standalone)
export default function StudioPage() {
  const [activeTab, setActiveTab] = useState('brain');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Agent State
  const [agentId, setAgentId] = useState<string | null>(null);
  const [agentName, setAgentName] = useState('Nexus AI Agent');
  const [model, setModel] = useState('gpt-4o-mini');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);

  // Agent Settings
  const [settings, setSettings] = useState({
    human_handoff: true,
    handoff_phone: '',
    use_emojis: true,
    signature_enabled: false,
    scope_restriction: true,
    evolution_endpoint: '',
    evolution_apikey: '',
    evolution_instance_id: ''
  });

  const tabs = [
    { id: 'brain', label: 'Cérebro', icon: Bot, desc: 'Identidade e voz' },
    { id: 'knowledge', label: 'Treinamento', icon: Database, desc: 'Base de Conhecimento' },
    { id: 'settings', label: 'Engrenagens', icon: Settings, desc: 'Configurações' },
    { id: 'evolution', label: 'Evolution', icon: Zap, desc: 'Conexão WhatsApp' },
    { id: 'history', label: 'Interações', icon: History, desc: 'Logs de chat' },
    { id: 'billing', label: 'Créditos', icon: Coins, desc: 'Consumo de tokens' },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Logic for upserting into agents/agent_settings
    // Since this is a new Supabase, we need to apply migrations later
    setTimeout(() => {
      setIsSaving(false);
      alert('Configurações salvas localmente (Aguardando Supabase)');
    }, 1000);
  };

  return (
    <div className="studio-container">
      <style jsx global>{`
                :root {
                    --bg-dark: #020617;
                    --bg-card: #0f172a;
                    --accent-purple: #9333ea;
                    --accent-cyan: #06b6d4;
                    --text-main: #f1f5f9;
                    --text-muted: #94a3b8;
                    --border-main: #1e293b;
                }

                body {
                    margin: 0;
                    padding: 0;
                    background-color: var(--bg-dark);
                    color: var(--text-main);
                    font-family: 'Inter', -apple-system, sans-serif;
                }

                .studio-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    overflow: hidden;
                }

                header {
                    background: rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(147, 51, 234, 0.2);
                    padding: 1rem 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .logo-section {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .logo-icon {
                    width: 48px;
                    height: 48px;
                    background: var(--bg-card);
                    border: 1px solid rgba(147, 51, 234, 0.4);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }

                .logo-icon::after {
                    content: '';
                    position: absolute;
                    inset: -4px;
                    background: var(--accent-purple);
                    border-radius: 14px;
                    filter: blur(10px);
                    opacity: 0.2;
                }

                .main-layout {
                    flex: 1;
                    display: flex;
                    overflow: hidden;
                }

                aside {
                    width: 260px;
                    background: rgba(15, 23, 42, 0.4);
                    border-right: 1px solid var(--border-main);
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .tab-button {
                    background: transparent;
                    border: 1px solid transparent;
                    color: var(--text-muted);
                    padding: 0.75rem 1rem;
                    border-radius: 12px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    transition: all 0.3s ease;
                    text-align: left;
                }

                .tab-button:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: var(--text-main);
                }

                .tab-button.active {
                    background: rgba(147, 51, 234, 0.1);
                    border-color: rgba(147, 51, 234, 0.3);
                    color: #c084fc;
                }

                main {
                    flex: 1;
                    padding: 2rem;
                    overflow-y: auto;
                    background: radial-gradient(circle at top, rgba(147, 51, 234, 0.05), transparent);
                }

                .card {
                    background: rgba(15, 23, 42, 0.5);
                    border: 1px solid var(--border-main);
                    border-radius: 20px;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .input-group {
                    margin-bottom: 1.5rem;
                }

                label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--text-muted);
                    margin-bottom: 0.5rem;
                }

                input, select, textarea {
                    width: 100%;
                    background: #020617;
                    border: 1px solid var(--border-main);
                    border-radius: 12px;
                    padding: 0.75rem 1rem;
                    color: white;
                    outline: none;
                    transition: all 0.3s;
                    box-sizing: border-box;
                }

                input:focus, textarea:focus {
                    border-color: var(--accent-purple);
                    box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.2);
                }

                .save-btn {
                    background: var(--accent-purple);
                    color: white;
                    border: none;
                    padding: 0.6rem 1.5rem;
                    border-radius: 10px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
                }

                .save-btn:hover {
                    background: #a855f7;
                    transform: translateY(-1px);
                }

                .toggle-btn {
                    width: 50px;
                    height: 24px;
                    background: #1e293b;
                    border-radius: 20px;
                    position: relative;
                    cursor: pointer;
                    transition: 0.3s;
                }

                .toggle-btn.active {
                    background: var(--accent-purple);
                }

                .toggle-circle {
                    width: 18px;
                    height: 18px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    transition: 0.3s;
                }

                .toggle-btn.active .toggle-circle {
                    left: 29px;
                }

                .flex-between {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            `}</style>

      <header>
        <div className="logo-section">
          <div className="logo-icon">
            <Bot size={24} color="#a855f7" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Nexus AI Studio</h1>
            <span style={{ fontSize: '0.65rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
              ADM EXCLUSIVO
            </span>
          </div>
        </div>
        <button className="save-btn" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Gravar Comportamento
        </button>
      </header>

      <div className="main-layout">
        <aside>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{tab.label}</div>
                <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>{tab.desc}</div>
              </div>
            </button>
          ))}
        </aside>

        <main>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {tabs.find(t => t.id === activeTab)?.label} <Sparkles size={24} color="#a855f7" style={{ verticalAlign: 'middle' }} />
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Configure o núcleo cognitivo do seu agente Nexus.</p>

            {activeTab === 'brain' && (
              <div className="animate-in">
                <div className="card">
                  <div className="input-group">
                    <label>Nome da Entidade</label>
                    <input value={agentName} onChange={e => setAgentName(e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>Modelo de Inteligência</label>
                    <select value={model} onChange={e => setModel(e.target.value)}>
                      <option value="gpt-4o">GPT-4o (Premium)</option>
                      <option value="gpt-4o-mini">GPT-4o-Mini</option>
                      <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                    </select>
                  </div>
                </div>

                <div className="card">
                  <label>Instruções de Sistema (Behavioral Prompt)</label>
                  <textarea
                    rows={10}
                    value={systemPrompt}
                    onChange={e => setSystemPrompt(e.target.value)}
                    placeholder="Ex: Você é o Max, um corretor extrovertido..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="card">
                <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                  <div>
                    <h4 style={{ margin: 0 }}>Expressividade (Emojis)</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Permite que a IA use emojis nas respostas.</p>
                  </div>
                  <div
                    className={`toggle-btn ${settings.use_emojis ? 'active' : ''}`}
                    onClick={() => setSettings(p => ({ ...p, use_emojis: !p.use_emojis }))}
                  >
                    <div className="toggle-circle"></div>
                  </div>
                </div>

                <div className="flex-between">
                  <div>
                    <h4 style={{ margin: 0 }}>Human Handoff</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Detecta quando um humano deve assumir.</p>
                  </div>
                  <div
                    className={`toggle-btn ${settings.human_handoff ? 'active' : ''}`}
                    onClick={() => setSettings(p => ({ ...p, human_handoff: !p.human_handoff }))}
                  >
                    <div className="toggle-circle"></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'evolution' && (
              <div className="card">
                <div className="input-group">
                  <label>Evolution Endpoint</label>
                  <input value={settings.evolution_endpoint} onChange={e => setSettings(p => ({ ...p, evolution_endpoint: e.target.value }))} placeholder="https://..." />
                </div>
                <div className="input-group">
                  <label>Instância ID</label>
                  <input value={settings.evolution_instance_id} onChange={e => setSettings(p => ({ ...p, evolution_instance_id: e.target.value }))} />
                </div>
              </div>
            )}

            {(activeTab === 'history' || activeTab === 'billing' || activeTab === 'knowledge') && (
              <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <Zap size={48} color="#a855f7" className="animate-pulse" />
                <h3>Módulo em Sincronização</h3>
                <p style={{ color: 'var(--text-muted)' }}>Esta funcionalidade está sendo migrada para o novo ecossistema Nexus.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
