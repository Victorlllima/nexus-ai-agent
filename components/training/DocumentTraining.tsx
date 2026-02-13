'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileUpload } from '@/components/ui/FileUpload';
import { FileText, Loader2, CheckCircle2 } from 'lucide-react';

interface ProcessedDocument {
  filename: string;
  size: number;
  chunks: number;
  pages?: number;
  status: 'processing' | 'completed' | 'error';
}

export const DocumentTraining: React.FC = () => {
  const [document, setDocument] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedDocs, setProcessedDocs] = useState<ProcessedDocument[]>([]);

  const handleProcess = async () => {
    if (!document) {
      alert('Selecione um documento primeiro!');
      return;
    }

    setIsProcessing(true);

    // Simular processamento
    const newDoc: ProcessedDocument = {
      filename: document.name,
      size: document.size,
      chunks: 0,
      status: 'processing'
    };

    setProcessedDocs(prev => [newDoc, ...prev]);

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Calcular chunks (5000 tokens ~= 20KB)
    const estimatedChunks = Math.ceil(document.size / 20000);

    setProcessedDocs(prev => prev.map(doc =>
      doc.filename === document.name
        ? { ...doc, chunks: estimatedChunks, pages: 15, status: 'completed' as const }
        : doc
    ));

    setIsProcessing(false);
    setDocument(null);
    alert('✅ Documento processado e salvo com sucesso!');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Card>
        <div style={{ padding: '1.5rem' }}>
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <FileText size={20} className="text-accent-gold" />
            Upload de Documentos
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FileUpload
              accept=".pdf,.docx,.txt"
              maxSize={100}
              onFileSelect={setDocument}
              currentFile={document}
              onClear={() => setDocument(null)}
            />

            <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <h4 className="text-sm font-bold text-text-secondary mb-2">Formatos Suportados</h4>
              <ul className="text-xs text-text-muted space-y-1">
                <li>• <span className="text-red-400 font-semibold">PDF</span> - Documentos escaneados ou digitais</li>
                <li>• <span className="text-blue-400 font-semibold">DOCX</span> - Microsoft Word</li>
                <li>• <span className="text-green-400 font-semibold">TXT</span> - Arquivos de texto simples</li>
              </ul>
              <p className="text-xs text-text-muted mt-3">
                <span className="text-accent-purple font-semibold">Chunking inteligente:</span> Documentos grandes são automaticamente divididos em chunks de ~5000 tokens para melhor performance.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {processedDocs.length > 0 && (
        <Card>
          <div style={{ padding: '1.5rem' }}>
            <h4 className="text-sm font-bold text-text-secondary mb-4">Documentos Processados</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {processedDocs.map((doc, index) => (
                <div
                  key={index}
                  className="bg-bg-tertiary border border-border-subtle rounded-lg p-4 flex items-start justify-between"
                >
                  <div className="flex items-start gap-3 flex-1">
                    {doc.status === 'completed' ? (
                      <CheckCircle2 size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Loader2 size={20} className="text-accent-purple animate-spin mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.filename}</p>
                      <div className="flex gap-4 mt-1">
                        <span className="text-xs text-text-muted">
                          Tamanho: <span className="text-text-secondary">{formatFileSize(doc.size)}</span>
                        </span>
                        {doc.status === 'completed' && (
                          <>
                            <span className="text-xs text-text-muted">
                              Chunks: <span className="text-accent-purple font-semibold">{doc.chunks}</span>
                            </span>
                            {doc.pages && (
                              <span className="text-xs text-text-muted">
                                Páginas: <span className="text-text-secondary">{doc.pages}</span>
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    doc.status === 'completed'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-accent-purple/10 text-accent-purple'
                  }`}>
                    {doc.status === 'completed' ? 'Completo' : 'Processando...'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="primary"
          icon={isProcessing ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
          loading={isProcessing}
          onClick={handleProcess}
          disabled={!document}
        >
          {isProcessing ? 'Processando...' : 'Processar Documento'}
        </Button>
      </div>
    </div>
  );
};
