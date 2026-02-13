'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FileUpload } from '@/components/ui/FileUpload';
import { Save, Image as ImageIcon } from 'lucide-react';

export const TextTraining: React.FC = () => {
  const [instruction, setInstruction] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!instruction.trim()) {
      alert('Digite uma instrução primeiro!');
      return;
    }

    setIsSaving(true);
    // TODO: Implementar upload para Supabase Storage + save no training_data
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('✅ Treinamento de texto salvo com sucesso!');
    setInstruction('');
    setImage(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Card>
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ImageIcon size={20} className="text-accent-purple" />
            Instrução com Imagem (Opcional)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Instrução Afirmativa
              </label>
              <textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="Ex: Sempre que o usuário pedir informações sobre o convênio médico, mostre a imagem do guia de convênios..."
                rows={6}
                className="input-premium w-full"
                style={{ resize: 'vertical' }}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Escreva instruções claras e específicas sobre quando e como o agente deve usar essa informação.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-text-secondary mb-2">
                Imagem Associada (Max 10MB)
              </label>
              <FileUpload
                accept="image/*"
                maxSize={10}
                onFileSelect={setImage}
                currentFile={image}
                onClear={() => setImage(null)}
              />
            </div>
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="primary"
          icon={<Save size={18} />}
          loading={isSaving}
          onClick={handleSave}
          disabled={!instruction.trim()}
        >
          Salvar Treinamento
        </Button>
      </div>
    </div>
  );
};
