'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { InstagramIcon } from '@/components/icons/BrandIcons';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

export const InstagramConfig: React.FC = () => {
  const [pageId, setPageId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <InstagramIcon size={24} />
            Configuração Instagram DM
          </h3>

          <div className="space-y-4">
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
              <h4 className="text-sm font-bold text-pink-400 mb-2">Requisitos</h4>
              <ul className="text-xs text-text-muted space-y-1 list-disc list-inside">
                <li>Conta Instagram Business ou Creator</li>
                <li>Página do Facebook conectada ao Instagram</li>
                <li>Access Token do Meta Business Suite</li>
              </ul>
              <a
                href="https://developers.facebook.com/apps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 mt-3"
              >
                <ExternalLink size={14} />
                Acessar Meta for Developers
              </a>
            </div>

            <Input
              label="Instagram Page ID"
              value={pageId}
              onChange={(e) => setPageId(e.target.value)}
              placeholder="123456789012345"
              helperText="ID da página do Instagram conectada ao Facebook"
            />

            <Input
              label="Page Access Token"
              type="password"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="••••••••••••••••"
              helperText="Token de acesso da página (Meta Business)"
            />

            <Input
              label="Webhook URL"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://seu-dominio.com/api/instagram/webhook"
              helperText="URL para receber notificações de mensagens"
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          variant="primary"
          icon={<CheckCircle2 size={18} />}
        >
          Conectar Instagram
        </Button>
      </div>
    </div>
  );
};
