# 🗺️ Nexus AI Agent - Roadmap de Desenvolvimento

**Última atualização:** 2026-02-12
**Status atual:** Multi-tenant funcional com créditos ilimitados para admin

---

## ✅ FASE 0: Fundação (CONCLUÍDO)

### Database & Multi-Tenancy
- [x] Estrutura multi-tenant com `workspaces`
- [x] Row Level Security (RLS) para isolamento
- [x] Migrations aplicadas (001-012)
- [x] Sistema de créditos com admin ilimitado
- [x] 3 workspaces de teste criados

### Backend
- [x] API de workspaces (GET, POST, PATCH, DELETE)
- [x] Biblioteca de créditos (`lib/credits.ts`)
- [x] Webhook Evolution API integrado
- [x] Verificação e desconto de créditos

### Frontend
- [x] WorkspaceSwitcher component
- [x] Display de créditos (∞ para admin, número para cliente)
- [x] Badges de plano (Free/Pro/Enterprise)
- [x] Integração no header

### WhatsApp
- [x] Evolution API conectada
- [x] Webhook funcional
- [x] Echo bot respondendo mensagens
- [x] Payload parsing correto

---

## 🔄 FASE 1: Integração Mastra + IA (PRÓXIMO)

**Objetivo:** Substituir Echo por respostas inteligentes com Mastra

**Prioridade:** 🔴 ALTA
**Estimativa:** 3 dias
**Status:** 📋 Planejado

### Tarefas:

#### 1.1. Integrar Mastra no Webhook
- [ ] Criar instância Mastra no webhook
- [ ] Passar mensagem do usuário para o agente
- [ ] Obter resposta do agente
- [ ] Substituir `Echo: ${text}` por resposta do agente
- [ ] Testar com conversas reais

**Arquivo:** `app/api/webhooks/evolution/route.ts`

```typescript
// Exemplo:
import { getAgent } from '@/mastra/agents';

const agent = await getAgent(channel.agent_id);
const responseText = await agent.generate(messageText);
```

#### 1.2. Calcular Créditos Reais por Modelo
- [ ] Detectar modelo usado pelo agente
- [ ] Usar `calculateCredits(model, contextLevel)`
- [ ] Atualizar desconto baseado no modelo real
- [ ] Logar tokens consumidos

**Arquivo:** `lib/credits.ts` (já existe, só integrar)

#### 1.3. Implementar Context Multiplier
- [ ] Adicionar campo `context_level` no agente (1-5)
- [ ] Buscar histórico de mensagens do usuário
- [ ] Passar contexto para o Mastra
- [ ] Multiplicar créditos: `baseCost * context_level`

**Arquivos:**
- `supabase/migrations/013_add_context_level.sql`
- `app/api/webhooks/evolution/route.ts`

---

## 💳 FASE 2: Sistema de Billing Completo

**Objetivo:** Permitir clientes comprarem créditos

**Prioridade:** 🟡 MÉDIA
**Estimativa:** 5 dias
**Status:** 📋 Planejado

### Tarefas:

#### 2.1. API de Créditos
- [ ] `POST /api/credits/purchase` - Comprar créditos
- [ ] `GET /api/credits/history` - Histórico de transações
- [ ] `POST /api/credits/add` - Admin adicionar créditos manualmente
- [ ] Validação de planos (Free max 1000, Pro max 10000, etc)

#### 2.2. Integração Stripe
- [ ] Configurar Stripe account
- [ ] Criar produtos: 100 créditos ($5), 1000 créditos ($40), etc
- [ ] Webhook Stripe para confirmar pagamento
- [ ] Auto-adicionar créditos após pagamento
- [ ] Enviar email de confirmação

**Dependências:**
- `npm install stripe @stripe/stripe-js`

#### 2.3. Dashboard de Billing
- [ ] Componente `TabBilling.tsx` com:
  - Saldo atual
  - Histórico de consumo (gráfico)
  - Histórico de recargas
  - Botão "Comprar Créditos"
- [ ] Modal de compra com pacotes
- [ ] Preview do custo por interação

#### 2.4. Alertas de Crédito Baixo
- [ ] Email quando < 10% dos créditos
- [ ] Banner no dashboard quando < 5%
- [ ] Webhook notifica admin quando cliente zerou

---

## 🔐 FASE 3: Autenticação Real

**Objetivo:** Substituir `admin@nexus.ai` por login real

**Prioridade:** 🔴 ALTA
**Estimativa:** 3 dias
**Status:** 📋 Planejado

### Tarefas:

#### 3.1. Supabase Auth
- [ ] Configurar Supabase Auth (Email/Password)
- [ ] Tela de login (`/login`)
- [ ] Tela de registro (`/register`)
- [ ] Recuperação de senha
- [ ] Middleware de autenticação

#### 3.2. Atualizar APIs
- [ ] Substituir `admin@nexus.ai` por `auth.user.email`
- [ ] Proteger rotas com autenticação
- [ ] RLS usar `auth.uid()` ao invés de email

**Arquivos a modificar:**
- `app/api/workspaces/route.ts`
- `app/api/agents/route.ts`
- `supabase/migrations/014_auth_integration.sql`

#### 3.3. Onboarding
- [ ] Criar workspace padrão no primeiro login
- [ ] Tour guiado (opcional)
- [ ] Email de boas-vindas

---

## 🤖 FASE 4: Sistema de Agentes Completo

**Objetivo:** CRUD completo de agentes com todas features

**Prioridade:** 🟡 MÉDIA
**Estimativa:** 4 dias
**Status:** 📋 Planejado

### Tarefas:

#### 4.1. API de Agentes
- [ ] `GET /api/agents` - Listar (filtrado por workspace_id)
- [ ] `POST /api/agents` - Criar
- [ ] `PATCH /api/agents/:id` - Atualizar
- [ ] `DELETE /api/agents/:id` - Deletar
- [ ] Validar limites por plano (Free=1, Pro=5, Enterprise=∞)

#### 4.2. Frontend de Agentes
- [ ] Componente `TabBrain.tsx` refatorado
- [ ] Lista de agentes do workspace
- [ ] Modal "Criar Novo Agente"
- [ ] Editor de system prompt
- [ ] Seletor de modelo (todos OpenAI + Anthropic)
- [ ] Slider de temperatura (0-1)
- [ ] Toggle "Ativo/Inativo"

#### 4.3. Limites por Plano
```typescript
const LIMITS = {
  free: { agents: 1, channels: 1, credits: 100 },
  pro: { agents: 5, channels: 10, credits: 1000 },
  enterprise: { agents: Infinity, channels: Infinity, credits: 10000 }
};
```
- [ ] Validar ao criar agente
- [ ] Mostrar "Upgrade para Pro" se atingir limite

---

## 🎓 FASE 5: Sistema de Treinamento Multimodal

**Objetivo:** Implementar as 4 formas de treinamento do plano original

**Prioridade:** 🟢 BAIXA
**Estimativa:** 8 dias
**Status:** 📋 Planejado

### Tarefas:

#### 5.1. Treinamento por Texto + Imagem
- [ ] Componente `TextTraining.tsx`
- [ ] Editor rico de texto
- [ ] Upload de imagem (max 10MB)
- [ ] Preview de imagem
- [ ] Salvar em `training_data` + Supabase Storage

#### 5.2. Treinamento por URL (Website)
- [ ] Componente `UrlTraining.tsx`
- [ ] Input de URL
- [ ] Toggle "Navegar subpáginas"
- [ ] Select intervalo atualização (Nunca/Diário/Semanal/Mensal)
- [ ] Scraping com `cheerio`
- [ ] Cron job para atualização periódica

**Dependências:**
- `npm install cheerio axios`

#### 5.3. Treinamento por YouTube
- [ ] Componente `YoutubeTraining.tsx`
- [ ] Input URL YouTube
- [ ] Validação: max 1 hora
- [ ] Extração áudio com `ytdl-core`
- [ ] Transcrição com Whisper API
- [ ] Salvar transcrição em `training_data`

**Dependências:**
- `npm install ytdl-core`

#### 5.4. Treinamento por Documentos
- [ ] Componente `DocumentTraining.tsx`
- [ ] Drag & drop (PDF, DOCX, TXT)
- [ ] Limite: 100MB
- [ ] Chunking inteligente (5000 tokens/chunk)
- [ ] Indexação por página/seção
- [ ] Preview do conteúdo extraído

**Dependências:**
- `npm install pdf-parse mammoth`

---

## 📱 FASE 6: Canais de Comunicação

**Objetivo:** Adicionar todos os canais restantes

**Prioridade:** 🟡 MÉDIA
**Estimativa:** 6 dias
**Status:** 📋 Planejado

### Tarefas:

#### 6.1. Telegram
- [ ] Componente `TelegramConfig.tsx`
- [ ] Bot Token input
- [ ] Webhook setup
- [ ] Comandos customizados
- [ ] Webhook handler `/api/webhooks/telegram`

#### 6.2. WhatsApp Meta (Business API)
- [ ] Componente existente já criado
- [ ] Phone Number ID
- [ ] Access Token
- [ ] Webhook handler `/api/webhooks/whatsapp-meta`

#### 6.3. Instagram DM
- [ ] Componente `InstagramConfig.tsx`
- [ ] Page Access Token
- [ ] Page ID
- [ ] Webhook handler `/api/webhooks/instagram`

#### 6.4. Web Chat (Embed)
- [ ] Componente `WebChatConfig.tsx`
- [ ] Widget customization (cores, logo, posição)
- [ ] Código embed para copiar
- [ ] Preview do chat
- [ ] API endpoint `/api/chat` (REST ou WebSocket)

---

## 🔌 FASE 7: Integrações Externas

**Objetivo:** Eleven Labs + Google Calendar

**Prioridade:** 🟢 BAIXA
**Estimativa:** 4 dias
**Status:** 📋 Planejado

### Tarefas:

#### 7.1. Eleven Labs (TTS)
- [ ] Componente `TabIntegrations.tsx`
- [ ] API Key input
- [ ] Voice selector
- [ ] Preview de voz
- [ ] Toggle "Usar TTS nas respostas"
- [ ] Enviar áudio ao invés de texto

**Dependências:**
- `npm install elevenlabs`

#### 7.2. Google Calendar
- [ ] OAuth 2.0 flow
- [ ] Seleção de calendário
- [ ] Permissões (ler/escrever eventos)
- [ ] Agente pode:
  - Agendar reuniões
  - Consultar disponibilidade
  - Enviar notificações

**Dependências:**
- `npm install @google-cloud/calendar`

---

## ⚙️ FASE 8: Configurações Avançadas

**Objetivo:** Implementar todas as 15+ features de Settings

**Prioridade:** 🟡 MÉDIA
**Estimativa:** 5 dias
**Status:** 📋 Planejado

### Features a Implementar:

#### 8.1. Comportamento do Agente
- [ ] Toggle: Transferir para humano
- [ ] Toggle: Usar emojis
- [ ] Toggle: Assinar nome
- [ ] Toggle: Restringir temas (+ textarea)
- [ ] Toggle: Dividir resposta longa (+ input max chars)
- [ ] Toggle: Registrar lembretes

#### 8.2. Configurações de Sistema
- [ ] Select: Timezone
- [ ] Slider: Tempo de resposta (0-30s)
- [ ] Input: Limite de interações por usuário
- [ ] Builder: Ações de inatividade (If-Then)
- [ ] Builder: Regras de transferência

#### 8.3. Multiplicador de Contexto
- [ ] Slider: Nível 1-5
- [ ] Preview de custo por interação
- [ ] Explicação de cada nível:
  - Nível 1: 20 msgs, 3k tokens, 1x crédito
  - Nível 2: 40 msgs, 6k tokens, 2x créditos
  - Nível 3: 60 msgs, 9k tokens, 3x créditos
  - Nível 4: 80 msgs, 12k tokens, 4x créditos
  - Nível 5: 100 msgs, 15k tokens, 5x créditos

---

## 📊 FASE 9: Analytics & Monitoring

**Objetivo:** Dashboard completo de métricas

**Prioridade:** 🟢 BAIXA
**Estimativa:** 5 dias
**Status:** 📋 Planejado

### Tarefas:

#### 9.1. Dashboard de Workspace
- [ ] Total de interações (hoje/semana/mês)
- [ ] Créditos consumidos (gráfico temporal)
- [ ] Canais mais usados
- [ ] Agentes mais ativos
- [ ] Taxa de resposta
- [ ] Tempo médio de resposta

#### 9.2. Dashboard de Agente
- [ ] Performance por agente
- [ ] Tópicos mais discutidos
- [ ] Sentimento das conversas
- [ ] Taxa de satisfação (se implementar feedback)

#### 9.3. Logs e Debugging
- [ ] Histórico completo de interações
- [ ] Filtros (data, canal, agente)
- [ ] Busca por texto
- [ ] Exportar CSV/JSON
- [ ] Visualizar contexto completo da conversa

---

## 🚀 FASE 10: Deploy & Produção

**Objetivo:** Preparar para lançamento

**Prioridade:** 🔴 ALTA (quando todas features prontas)
**Estimativa:** 3 dias
**Status:** 📋 Planejado

### Tarefas:

#### 10.1. Otimização
- [ ] Adicionar caching (Redis)
- [ ] Otimizar queries Supabase
- [ ] Comprimir assets
- [ ] Lazy loading de componentes
- [ ] Image optimization

#### 10.2. Segurança
- [ ] Sanitizar inputs
- [ ] Rate limiting (100 req/min)
- [ ] CORS configurado
- [ ] Secrets em variáveis de ambiente
- [ ] Scan de vulnerabilidades

#### 10.3. Monitoramento
- [ ] Integrar Sentry (error tracking)
- [ ] Logs estruturados (Winston)
- [ ] Uptime monitoring
- [ ] Alertas (Slack/Email)

#### 10.4. Documentação
- [ ] README completo
- [ ] API docs (Swagger/OpenAPI)
- [ ] Guia de deployment
- [ ] Troubleshooting guide

#### 10.5. Remover Temporários
- [ ] Migration 011 (temp RLS disable) → DELETAR
- [ ] Email fixo `admin@nexus.ai` → Substituir por auth real
- [ ] Seed scripts → Mover para `/scripts`

---

## 🎁 FASE 11: Features Extras (Nice to Have)

**Objetivo:** Features que agregam muito valor

**Prioridade:** 🟢 BAIXA
**Estimativa:** Variável
**Status:** 📋 Ideias

### Possíveis Features:

#### 11.1. White Label
- [ ] Customizar logo
- [ ] Customizar cores
- [ ] Domínio customizado
- [ ] Remover "Powered by Nexus AI"

#### 11.2. API Pública
- [ ] API REST para desenvolvedores
- [ ] SDK JavaScript
- [ ] SDK Python
- [ ] Webhooks customizados

#### 11.3. Marketplace de Agentes
- [ ] Template de agentes pré-configurados
- [ ] Agente de vendas
- [ ] Agente de suporte
- [ ] Agente de agendamento
- [ ] Usuários podem comprar/vender templates

#### 11.4. Multi-idioma
- [ ] i18n (Português, Inglês, Espanhol)
- [ ] Detecção automática de idioma
- [ ] Agente responde no idioma do usuário

#### 11.5. Voz (Speech-to-Text)
- [ ] Receber áudio no WhatsApp
- [ ] Transcrever com Whisper
- [ ] Processar como texto
- [ ] Responder com TTS (Eleven Labs)

---

## 📅 Timeline Estimada

### Curto Prazo (1-2 semanas)
1. ✅ Fundação Multi-Tenant (CONCLUÍDO)
2. 🔄 Integração Mastra + IA (3 dias)
3. 🔐 Autenticação Real (3 dias)
4. 🤖 Sistema de Agentes (4 dias)

### Médio Prazo (1 mês)
5. 💳 Sistema de Billing (5 dias)
6. 📱 Canais de Comunicação (6 dias)
7. ⚙️ Configurações Avançadas (5 dias)

### Longo Prazo (2-3 meses)
8. 🎓 Treinamento Multimodal (8 dias)
9. 🔌 Integrações Externas (4 dias)
10. 📊 Analytics & Monitoring (5 dias)
11. 🚀 Deploy & Produção (3 dias)

---

## 🎯 Métricas de Sucesso

### MVP (Minimum Viable Product)
- [ ] Autenticação funcionando
- [ ] Criar workspace e agente
- [ ] Conectar WhatsApp
- [ ] Respostas inteligentes com IA
- [ ] Sistema de créditos funcionando
- [ ] Comprar créditos (Stripe)

### V1.0 (Primeiro Launch)
- [ ] Todos os canais funcionando
- [ ] Sistema de treinamento básico (texto)
- [ ] Billing completo
- [ ] Analytics básico
- [ ] Deploy em produção

### V2.0 (Growth)
- [ ] Treinamento multimodal completo
- [ ] Integrações externas
- [ ] Configurações avançadas
- [ ] API pública
- [ ] 100+ clientes ativos

---

## 💡 Decisões Pendentes (Red precisa definir)

1. **Pricing definitivo:**
   - Free: 100 créditos? Renovação mensal?
   - Pro: $29/mês ou $39/mês?
   - Enterprise: Negociação customizada?

2. **Prioridade de canais:**
   - WhatsApp (✅ Feito)
   - Telegram ou Instagram primeiro?

3. **Modelo de negócio:**
   - SaaS B2B (vender para empresas)
   - White Label (vender cópias customizadas)
   - Marketplace (comissão em templates)

4. **Marca:**
   - Nome final: "Nexus AI Agent" ou mudar?
   - Logo profissional: contratar designer?
   - Landing page: quando criar?

---

## 📝 Notas Técnicas

### Stack Atual
- **Frontend:** Next.js 16.1.6, React, TypeScript
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **IA:** Mastra + OpenAI + Anthropic
- **Deploy:** Vercel
- **Payments:** Stripe (a implementar)

### Repositório
- **GitHub:** https://github.com/Victorlllima/nexus-ai-agent
- **Branch principal:** master
- **Vercel:** https://nexus-ai-agent-one.vercel.app

### Comandos Úteis
```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Migrations
npx supabase db push

# Seed
node seed-workspaces.js

# Deploy
git push origin master  # Auto-deploy na Vercel
```

---

**Criado por:** Shiva (Arquiteto S.H.A.R.K.)
**Para:** Red (Engenheiro de Telecomunicações)
**Versão:** 1.0
**Última atualização:** 2026-02-12
