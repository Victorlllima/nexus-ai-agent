'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { ElevenLabsIcon } from '@/components/icons/BrandIcons';
import { Volume2, Play, CheckCircle2 } from 'lucide-react';

export const ElevenLabsConfig: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [voiceId, setVoiceId] = useState('');
  const [modelId, setModelId] = useState('eleven_monolingual_v1');
  const [useTts, setUseTts] = useState(false);
  const [testText, setTestText] = useState('Olá! Este é um teste de voz do Nexus AI.');

  const voices = [
    { value: 'voice-1', label: 'Rachel (Feminina - Calma)' },
    { value: 'voice-2', label: 'Domi (Feminina - Energética)' },
    { value: 'voice-3', label: 'Bella (Feminina - Suave)' },
    { value: 'voice-4', label: 'Antoni (Masculina - Profissional)' },
    { value: 'voice-5', label: 'Elli (Masculina - Amigável)' },
    { value: 'voice-6', label: 'Josh (Masculina - Forte)' },
  ];

  const models = [
    { value: 'eleven_monolingual_v1', label: 'Monolingual v1 (Inglês)' },
    { value: 'eleven_multilingual_v2', label: 'Multilingual v2 (PT-BR)' },
    { value: 'eleven_turbo_v2', label: 'Turbo v2 (Rápido)' },
  ];

  const handleTestVoice = () => {
    alert('🔊 Reproduzindo preview da voz...\n\n(Em produção, reproduziria o áudio gerado pela ElevenLabs)');
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <ElevenLabsIcon size={24} />
            ElevenLabs Text-to-Speech
          </h3>

          <div className="space-y-4">
            <div className="bg-accent-purple/10 border border-accent-purple/30 rounded-lg p-4">
              <h4 className="text-sm font-bold text-accent-purple-hover mb-2">Como obter a API Key?</h4>
              <ol className="text-xs text-text-muted space-y-1 list-decimal list-inside">
                <li>Acesse <a href="https://elevenlabs.io" target="_blank" className="text-accent-purple hover:underline">elevenlabs.io</a></li>
                <li>Crie uma conta ou faça login</li>
                <li>Vá em Profile → API Keys</li>
                <li>Copie sua API Key</li>
              </ol>
            </div>

            <Input
              label="API Key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="••••••••••••••••"
              helperText="Chave de acesso da ElevenLabs"
            />

            <Select
              label="Voz do Agente"
              options={voices}
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
              helperText="Escolha a voz que melhor representa seu agente"
            />

            <Select
              label="Modelo de TTS"
              options={models}
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              helperText="Multilingual v2 suporta Português Brasileiro"
            />

            <Toggle
              checked={useTts}
              onChange={setUseTts}
              label="Usar TTS nas Respostas"
              description="Quando ativo, o agente enviará áudios em vez de apenas texto"
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h4 className="text-sm font-bold text-text-secondary mb-4">Testar Voz</h4>

          <div className="space-y-4">
            <Input
              label="Texto de Teste"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              placeholder="Digite um texto para testar a voz..."
            />

            <Button
              variant="secondary"
              icon={<Play size={18} />}
              onClick={handleTestVoice}
              disabled={!apiKey || !voiceId}
            >
              Reproduzir Preview
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          variant="primary"
          icon={<CheckCircle2 size={18} />}
        >
          Salvar Configuração
        </Button>
      </div>
    </div>
  );
};
