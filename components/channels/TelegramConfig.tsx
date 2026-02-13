'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { TelegramIcon } from '@/components/icons/BrandIcons';
import { CheckCircle2, Send } from 'lucide-react';

export const TelegramConfig: React.FC = () => {
  const [botToken, setBotToken] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [commands, setCommands] = useState({
    start: 'Olá! Sou o assistente virtual. Como posso ajudar?',
    help: 'Comandos disponíveis: /start, /help',
  });
  const [groupMessages, setGroupMessages] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Card>
        <div style={{ padding: '1.5rem' }}>
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <TelegramIcon size={24} />
            Configuração Telegram Bot
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-sm font-bold text-blue-400 mb-2">Como criar um bot no Telegram?</h4>
              <ol className="text-xs text-text-muted space-y-1 list-decimal list-inside">
                <li>Abra o Telegram e procure por <code className="bg-bg-primary px-1 rounded">@BotFather</code></li>
                <li>Envie o comando <code className="bg-bg-primary px-1 rounded">/newbot</code></li>
                <li>Escolha um nome e username para seu bot</li>
                <li>Copie o <strong>Bot Token</strong> fornecido</li>
              </ol>
            </div>

            <Input
              label="Bot Token"
              type="password"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
              helperText="Token fornecido pelo @BotFather"
            />

            <Input
              label="Webhook URL (Opcional)"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://seu-dominio.com/api/telegram/webhook"
              helperText="Deixe vazio para usar polling"
            />

            <Toggle
              checked={groupMessages}
              onChange={setGroupMessages}
              label="Aceitar Mensagens de Grupos"
              description="Permite que o bot responda em grupos e canais do Telegram"
            />
          </div>
        </div>
      </Card>

      <Card>
        <div style={{ padding: '1.5rem' }}>
          <h4 className="text-sm font-bold text-text-secondary mb-4">Comandos Customizados</h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
              label="Comando /start"
              value={commands.start}
              onChange={(e) => setCommands({...commands, start: e.target.value})}
              placeholder="Mensagem de boas-vindas"
            />

            <Input
              label="Comando /help"
              value={commands.help}
              onChange={(e) => setCommands({...commands, help: e.target.value})}
              placeholder="Mensagem de ajuda"
            />
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="primary"
          icon={<CheckCircle2 size={18} />}
        >
          Ativar Bot Telegram
        </Button>
      </div>
    </div>
  );
};
