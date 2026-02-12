'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { WebChatIcon } from '@/components/icons/BrandIcons';
import { Copy, Eye } from 'lucide-react';

export const WebChatConfig: React.FC = () => {
  const [config, setConfig] = useState({
    widget_color: '#9333ea',
    widget_position: 'bottom-right' as 'bottom-right' | 'bottom-left',
    welcome_message: 'Olá! Como posso ajudar você hoje?',
    placeholder: 'Digite sua mensagem...',
  });

  const embedCode = `<!-- Nexus AI Chat Widget -->
<script>
  (function(w,d,s,o,f,js,fjs){
    w['NexusChat']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
    js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
    js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
  }(window, document, 'script', 'nexus', 'https://cdn.nexus-ai.com/widget.js'));
  nexus('init', {
    agentId: 'YOUR_AGENT_ID',
    color: '${config.widget_color}',
    position: '${config.widget_position}',
    welcomeMessage: '${config.welcome_message}'
  });
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    alert('✅ Código copiado para a área de transferência!');
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <WebChatIcon size={24} />
            Web Chat Widget
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-text-secondary mb-2">
                  Cor do Widget
                </label>
                <input
                  type="color"
                  value={config.widget_color}
                  onChange={(e) => setConfig({...config, widget_color: e.target.value})}
                  className="w-full h-10 rounded-lg cursor-pointer bg-bg-tertiary border border-border-main"
                />
              </div>

              <Select
                label="Posição"
                options={[
                  { value: 'bottom-right', label: 'Inferior Direito' },
                  { value: 'bottom-left', label: 'Inferior Esquerdo' }
                ]}
                value={config.widget_position}
                onChange={(e) => setConfig({...config, widget_position: e.target.value as any})}
              />
            </div>

            <Input
              label="Mensagem de Boas-vindas"
              value={config.welcome_message}
              onChange={(e) => setConfig({...config, welcome_message: e.target.value})}
              placeholder="Olá! Como posso ajudar?"
            />

            <Input
              label="Placeholder do Input"
              value={config.placeholder}
              onChange={(e) => setConfig({...config, placeholder: e.target.value})}
              placeholder="Digite sua mensagem..."
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h4 className="text-sm font-bold text-text-secondary mb-4">Código de Integração</h4>

          <pre className="bg-bg-primary border border-border-subtle rounded-lg p-4 text-xs text-text-primary overflow-x-auto">
            {embedCode}
          </pre>

          <div className="flex gap-3 mt-4">
            <Button
              variant="secondary"
              icon={<Eye size={18} />}
            >
              Visualizar Preview
            </Button>
            <Button
              variant="primary"
              icon={<Copy size={18} />}
              onClick={handleCopyCode}
            >
              Copiar Código
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
