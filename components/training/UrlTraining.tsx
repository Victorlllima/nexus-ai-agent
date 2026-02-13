'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { Globe, Loader2 } from 'lucide-react';

export const UrlTraining: React.FC = () => {
  const [url, setUrl] = useState('');
  const [crawl, setCrawl] = useState(false);
  const [updateFrequency, setUpdateFrequency] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState('');

  const frequencyOptions = [
    { value: 'never', label: 'Nunca (scraping único)' },
    { value: 'daily', label: 'Diariamente' },
    { value: 'weekly', label: 'Semanalmente' },
    { value: 'monthly', label: 'Mensalmente (Padrão)' }
  ];

  const handleProcess = async () => {
    if (!url.trim() || !url.startsWith('http')) {
      alert('Digite uma URL válida (deve começar com http:// ou https://)');
      return;
    }

    setIsProcessing(true);
    setPreview('Processando website...\n\nAguarde enquanto extraímos o conteúdo...');

    // TODO: Implementar scraping real com cheerio/axios
    await new Promise(resolve => setTimeout(resolve, 2000));

    setPreview(`✅ Website processado com sucesso!

📄 Páginas extraídas: ${crawl ? '15 páginas' : '1 página'}
📝 Conteúdo total: ~5.000 palavras
🔄 Atualização: ${frequencyOptions.find(f => f.value === updateFrequency)?.label}

Conteúdo será salvo na base de conhecimento do agente.`);

    setIsProcessing(false);
    alert('✅ Treinamento por URL salvo com sucesso!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Card>
        <div style={{ padding: '1.5rem' }}>
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <Globe size={20} className="text-accent-cyan" />
            Scraping de Website
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
              label="URL do Website"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemplo.com/documentacao"
              helperText="Cole a URL completa do website que deseja treinar"
            />

            <Toggle
              checked={crawl}
              onChange={setCrawl}
              label="Navegar em Subpáginas (Crawl)"
              description="Extrai conteúdo de links internos encontrados na página principal (máx 50 páginas)"
            />

            <Select
              label="Intervalo de Atualização"
              options={frequencyOptions}
              value={updateFrequency}
              onChange={(e) => setUpdateFrequency(e.target.value)}
              helperText="Com que frequência o conteúdo deve ser atualizado automaticamente"
            />
          </div>
        </div>
      </Card>

      {preview && (
        <Card>
          <div style={{ padding: '1.5rem' }}>
            <h4 className="text-sm font-bold text-text-secondary mb-2">Preview do Conteúdo</h4>
            <pre className="bg-bg-primary border border-border-subtle rounded-lg p-4 text-xs text-text-primary whitespace-pre-wrap">
              {preview}
            </pre>
          </div>
        </Card>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="primary"
          icon={isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Globe size={18} />}
          loading={isProcessing}
          onClick={handleProcess}
          disabled={!url.trim()}
        >
          {isProcessing ? 'Processando...' : 'Processar Website'}
        </Button>
      </div>
    </div>
  );
};
