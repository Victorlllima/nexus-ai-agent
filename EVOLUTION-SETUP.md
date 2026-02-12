# 🚀 Guia de Configuração - Evolution API

## 📋 URLs Importantes

- **Aplicação:** https://nexus-ai-agent-one.vercel.app/
- **Webhook Evolution:** https://nexus-ai-agent-one.vercel.app/api/webhooks/evolution
- **Health Check:** https://nexus-ai-agent-one.vercel.app/api/webhooks/evolution (GET)

---

## 1️⃣ Configurar no Dashboard Nexus

1. Acesse: https://nexus-ai-agent-one.vercel.app/
2. Vá na aba **"Canais"** → **"WhatsApp Web (Evolution API)"**
3. Preencha os dados:
   - **Endpoint Evolution:** URL da sua API Evolution (ex: `https://sua-evolution.com`)
   - **Instance ID:** ID da instância criada na Evolution
   - **API Key:** Chave de API da Evolution
4. Clique em **"Conectar"**

---

## 2️⃣ Configurar Webhook na Evolution API

No painel da Evolution API, configure o webhook:

### Via Painel Web:
1. Acesse sua instância
2. Vá em **"Settings"** ou **"Webhooks"**
3. Configure:
   - **Webhook URL:** `https://nexus-ai-agent-one.vercel.app/api/webhooks/evolution`
   - **Events:** Marque `messages.upsert`

### Via API (cURL):
```bash
curl -X POST 'https://SUA-EVOLUTION-API/webhook/set/INSTANCE_ID' \
  -H 'Content-Type: application/json' \
  -H 'apikey: SUA_API_KEY' \
  -d '{
    "url": "https://nexus-ai-agent-one.vercel.app/api/webhooks/evolution",
    "webhook_by_events": false,
    "webhook_base64": false,
    "events": [
      "MESSAGES_UPSERT"
    ]
  }'
```

---

## 3️⃣ Testar a Integração

### Teste 1: Health Check do Webhook
Abra no navegador:
```
https://nexus-ai-agent-one.vercel.app/api/webhooks/evolution
```

Deve retornar:
```json
{
  "status": "ok",
  "webhook": "Evolution API Webhook",
  "timestamp": "2025-02-12T..."
}
```

### Teste 2: Enviar Mensagem no WhatsApp
1. Use o WhatsApp Web conectado à Evolution
2. Envie uma mensagem de qualquer número para o número conectado
3. O bot deve responder com: `Echo: sua mensagem`

### Teste 3: Verificar Logs na Vercel
1. Acesse o projeto na Vercel
2. Vá em **"Deployments"** → Último deploy → **"Functions"**
3. Clique em `/api/webhooks/evolution`
4. Veja os logs em tempo real

---

## 🐛 Troubleshooting

### Webhook não recebe mensagens
- ✅ Verifique se a URL está correta na Evolution
- ✅ Confirme que o evento `MESSAGES_UPSERT` está ativo
- ✅ Teste o health check (GET) primeiro
- ✅ Veja os logs da Evolution para erros de conexão

### Bot não responde
- ✅ Veja os logs na Vercel (funções serverless)
- ✅ Confirme que o `instanceId` na configuração está correto
- ✅ Teste se a API Key está válida

### Erro "Channel not configured"
- ✅ Configure o canal no dashboard primeiro
- ✅ Verifique se está marcado como `is_active: true`
- ✅ Confirme que salvou no Supabase

---

## 📊 Verificar no Supabase

Para ver as interações salvas:

```sql
-- Ver configuração do canal
SELECT * FROM channels WHERE type = 'whatsapp_web';

-- Ver interações recebidas
SELECT * FROM interactions ORDER BY created_at DESC LIMIT 10;
```

---

## 🎯 Próximos Passos

Após confirmar que o echo funciona:

1. **Integrar com Mastra** - Processar mensagens com o agente IA
2. **Adicionar context** - Usar histórico de conversas
3. **Implementar tools** - Ações do agente (agendar, buscar info, etc)
4. **Personalizar respostas** - Usar system prompt configurado

---

**Criado por:** Atlas (S.H.A.R.K. Method)
**Data:** 2025-02-12
