'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Youtube, Loader2, AlertCircle } from 'lucide-react';

export const YoutubeTraining: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');

  const handleTranscribe = async () => {
    if (!videoUrl.trim() || !videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
      setError('Digite uma URL válida do YouTube');
      return;
    }

    setError('');
    setIsTranscribing(true);
    setTranscription('Extraindo áudio do vídeo...\n\nValidando duração (máx 1 hora)...');

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simular validação de duração
    const mockDuration = 45 * 60; // 45 minutos
    if (mockDuration > 3600) {
      setError('❌ Vídeo muito longo! O limite é de 1 hora (3600 segundos).');
      setIsTranscribing(false);
      return;
    }

    setTranscription(`Duração: ${Math.floor(mockDuration / 60)} minutos ✅\n\nEnviando para OpenAI Whisper API...\n\nTranscrevendo áudio...`);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setTranscription(`✅ Transcrição Completa!

📹 Título: Como Usar IA em Vendas
⏱️ Duração: 45 minutos
📝 Palavras: ~6.500

--- Início da Transcrição ---

Olá pessoal, hoje vamos falar sobre como utilizar inteligência artificial para impulsionar suas vendas. A IA pode automatizar processos, qualificar leads e muito mais...

(Transcrição completa seria exibida aqui)

--- Fim da Transcrição ---

O conteúdo foi salvo na base de conhecimento do agente.`);

    setIsTranscribing(false);
    alert('✅ Vídeo transcrito e salvo com sucesso!');
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <Youtube size={20} className="text-red-500" />
            Transcrição de Vídeo (YouTube)
          </h3>

          <div className="space-y-4">
            <Input
              label="URL do Vídeo"
              type="url"
              value={videoUrl}
              onChange={(e) => {
                setVideoUrl(e.target.value);
                setError('');
              }}
              placeholder="https://youtube.com/watch?v=..."
              helperText="Cole a URL completa do vídeo do YouTube"
              error={error}
            />

            {error && (
              <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div className="bg-bg-tertiary border border-border-subtle rounded-lg p-4">
              <h4 className="text-sm font-bold text-text-secondary mb-2">⚠️ Limitações</h4>
              <ul className="text-xs text-text-muted space-y-1">
                <li>• Duração máxima: <span className="text-accent-purple font-semibold">1 hora (3600 segundos)</span></li>
                <li>• Apenas vídeos públicos do YouTube</li>
                <li>• Idioma: Português e Inglês</li>
                <li>• Processamento pode levar alguns minutos</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {transcription && (
        <Card>
          <div className="p-6">
            <h4 className="text-sm font-bold text-text-secondary mb-2">Transcrição</h4>
            <pre className="bg-bg-primary border border-border-subtle rounded-lg p-4 text-xs text-text-primary whitespace-pre-wrap max-h-96 overflow-y-auto">
              {transcription}
            </pre>
          </div>
        </Card>
      )}

      <div className="flex justify-end">
        <Button
          variant="primary"
          icon={isTranscribing ? <Loader2 size={18} className="animate-spin" /> : <Youtube size={18} />}
          loading={isTranscribing}
          onClick={handleTranscribe}
          disabled={!videoUrl.trim()}
        >
          {isTranscribing ? 'Transcrevendo...' : 'Transcrever Vídeo'}
        </Button>
      </div>
    </div>
  );
};
