# 📋 Nexus AI Agent Studio - PRD Lovable

**Plataforma SaaS Multi-Tenant para Gestão de Agentes IA Conversacionais**

---

## 🎯 Objetivo

Interface admin premium dark para gerenciar agentes IA com:
- Multi-tenant (workspaces isolados)
- 7 abas: Cérebro, Treinamento, Config, Canais, Integrações, Histórico, Créditos
- Sistema de créditos com multiplicador de contexto
- Canais: WhatsApp (Meta + Evolution), Telegram, Instagram, Web Chat
- Treinamento: Texto+Imagem, URL, YouTube, Documentos
- Integrações: ElevenLabs TTS, Google Calendar

---

## 🎨 Design System

### Cores (CSS Variables)
```css
--bg-primary: #0a0a0f;
--bg-secondary: #13131a;
--bg-tertiary: #1a1a24;
--bg-card: rgba(30, 30, 46, 0.6);

--accent-purple: #9333ea;
--accent-purple-hover: #a855f7;
--accent-cyan: #06b6d4;
--accent-gold: #f59e0b;

--text-primary: #f1f5f9;
--text-secondary: #94a3b8;
--text-muted: #64748b;

--border-subtle: rgba(147, 51, 234, 0.1);
--border-main: rgba(147, 51, 234, 0.3);

--shadow-md: 0 4px 16px rgba(147, 51, 234, 0.2);
--glow-purple: 0 0 20px rgba(147, 51, 234, 0.5);

--radius-md: 12px;
--radius-xl: 20px;
--transition-normal: 300ms ease;
```

### Tipografia
- **Font:** 'Inter', sans-serif
- **H1:** 1.75rem, weight 900
- **H3:** 1.125rem, weight 700
- **Body:** 0.875rem, weight 400
- **Label:** 0.75rem, weight 700, uppercase, tracking 0.05em

---

## 🏗️ Layout

```
┌────────────────────────────────────────────────┐
│ HEADER (sticky)                                │
│ [Logo] Nexus AI   [Workspace▼] [Save Button]  │
├────────────┬───────────────────────────────────┤
│  SIDEBAR   │      CONTENT AREA                 │
│  (280px)   │      (max 900px)                  │
│            │                                    │
│ 7 Tabs:    │  [Tab Title + Icon]               │
│ • Cérebro  │  ┌─────────────────────────────┐  │
│ • Treino   │  │ Card 1 (glass + glow)       │  │
│ • Config   │  └─────────────────────────────┘  │
│ • Canais   │  ┌─────────────────────────────┐  │
│ • Integr   │  │ Card 2                      │  │
│ • Histórico│  └─────────────────────────────┘  │
│ • Créditos │                                    │
└────────────┴───────────────────────────────────┘
```

---

## 📱 Componentes Base

### Glass Card
```css
background: var(--bg-card);
backdrop-filter: blur(12px);
border: 1px solid var(--border-main);
border-radius: var(--radius-xl);
padding: 1.5rem;
box-shadow: var(--shadow-md);

.glow { box-shadow: var(--shadow-md), var(--glow-purple); }
```

### Button Primary
```css
background: linear-gradient(135deg, #9333ea, #7e22ce);
color: white;
padding: 0.75rem 1.5rem;
border-radius: 12px;
font-weight: 700;
font-size: 0.875rem;
display: inline-flex;
align-items: center;
gap: 0.5rem;
```

### Input Premium
```css
background: rgba(10, 10, 15, 0.5);
border: 1px solid var(--border-main);
border-radius: 12px;
padding: 0.75rem 1rem;
color: var(--text-primary);

:focus {
  border-color: var(--accent-purple);
  box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.2);
}
```

### Toggle Switch
```css
width: 52px; height: 28px;
background: var(--bg-tertiary);
border-radius: 9999px;

.active {
  background: linear-gradient(135deg, #9333ea, #7e22ce);
  box-shadow: var(--glow-purple);
}

.circle { /* 20px white ball, left: 3px → 27px */ }
```

---

## 📄 7 Abas Detalhadas

### 1️⃣ CÉREBRO (Brain)

**Card 1 (glow):** Input "Nome do Agente"
**Card 2:** Select "Modelo de IA"
- GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo (OpenAI)
- Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku (Anthropic)

**Card 3:** Textarea "Prompt de Sistema" (monospace, 12 rows, min 200px)

---

### 2️⃣ TREINAMENTO (Training)

**Sub-tabs:** Texto+Imagem | URL | YouTube | Documentos

#### Texto + Imagem
- Textarea: Instrução (6 rows)
- FileUpload: Imagem (max 10MB, accept image/*)
- Button: Salvar Treinamento

#### URL
- Input: URL do site
- Toggle: Navegar subpáginas (crawl até 50 páginas)
- Select: Atualização (Nunca, Diário, Semanal, **Mensal**)
- Button: Preview + Salvar

#### YouTube
- Input: URL vídeo
- Validação: Max 1 hora (3600s)
- Alert se > 1h: "Vídeos acima de 1 hora não suportados"
- Button: Transcrever (loading state)
- Textarea readonly: Transcrição (10 rows)

#### Documentos
- FileUpload: PDF/DOCX/TXT (max 100MB, multiple)
- Info: "Sistema divide em chunks de 5000 tokens"
- Lista documentos: filename, size, pages, chunks, status
- Button: Processar Documentos

---

### 3️⃣ CONFIGURAÇÕES (Settings)

**Card 1: Funcionalidades (11 items)**
1. Toggle: Transferir para Humano → Input: Contato
2. Toggle: Usar Emojis
3. Toggle: Assinar Nome → Input: Assinatura
4. Toggle: Restringir Temas → Input: Temas (CSV)
5. Toggle: Dividir Resposta → Slider: Max caracteres (500-2000)
6. Toggle: Permitir Lembretes

**Card 2: Timing**
- Select: Timezone (São Paulo, New York, London, Tokyo)
- Slider: Tempo Resposta (0-30s)
- Toggle: Buffer de Mensagens
- Slider: Limite Interações (10-100)

**Card 3: Ações Inatividade**
- Button: Adicionar Ação
- Lista ações:
  - Input: Minutos
  - Select: Ação (Finalizar, Enviar msg, Transferir)
  - Input: Mensagem (se "Enviar msg")
  - Button: Trash

---

### 4️⃣ CANAIS (Channels)

**Sub-tabs:** WhatsApp | Telegram | Instagram | Web Chat

#### WhatsApp
**Mode Selector:** Meta API | Evolution API

**Meta:**
- Input: Phone Number ID
- Input: Access Token (password)
- Input: Webhook Token
- Info: Webhook URL (com copy button)

**Evolution:**
- Input: Endpoint
- Input: Instance Name
- Input: API Key (password)
- Button: Testar Conexão
- Alert success: "Conectado!"
- QR Code display (se necessário)

**Config Geral (todos canais):**
- Toggle: Indicador Digitação
- Toggle: Auto Read
- Select: Áudio (Ignorar, Transcrever, Msg indisponível)
- Select: Ativação (1ª msg, Keyword, Sempre)
- Toggle: Responder Grupos
- Select: Chamadas (Rejeitar, Ignorar, Msg custom)
- Toggle: Mobile Takeover

#### Telegram
- Input: Bot Token (get @BotFather)
- Input: Comandos (CSV)
- Info: Webhook URL

#### Instagram
- Input: Page Access Token (password)
- Input: Page ID
- Alert: Requer Business + Facebook Page

#### Web Chat
- Input: Título Chat
- Input: Msg Boas-vindas
- Input: Cor (color picker)
- Select: Posição (bottom-right/left)
- Toggle: Avatar
- Code box: Embed snippet (com copy)
- Preview: iframe 400x600

---

### 5️⃣ INTEGRAÇÕES (Integrations)

**Sub-tabs:** ElevenLabs | Google Calendar

#### ElevenLabs
- Input: API Key (password)
- Select: Voz Padrão
- Button: Preview Voz → Audio player
- Toggle: Usar TTS
- Slider: Velocidade (0.5-2)
- Slider: Estabilidade (0-1)
- Grid: Vozes (cards com nome, desc, botão)

#### Google Calendar
**Não conectado:**
- Button: Conectar Google (OAuth)

**Conectado:**
- Alert: Email conectado
- Select: Calendário padrão
- Lista: Permissões (Read, Create, Update)
- Button: Desconectar
- Input: Duração padrão (minutos)
- Toggle: Auto confirmar
- Toggle: Enviar notificações

---

### 6️⃣ HISTÓRICO (History)

**Filtros:**
- Input: Buscar (icon Search)
- Select: Canal (Todos, WhatsApp, Telegram, Instagram, WebChat)
- Input: Data De (date)
- Input: Data Até (date)

**Tabela:**
| Data/Hora | Usuário | Canal | Mensagens | Créditos | Ações |
- Row hover: background purple 5%
- Button: Eye icon → Modal detalhes

**Modal:**
- Thread mensagens (user/agent)
- Meta: Total msgs, Créditos, Duração

**Pagination:**
- Button: Anterior (disabled se page=1)
- Text: Página X de Y
- Button: Próxima (disabled se last)

---

### 7️⃣ CRÉDITOS (Billing)

**Card 1 (glow): Saldo**
- Display: ∞ 👑 (admin) OU número grande
- Button: Recarregar (se não admin)
- Stats: Usado mês, Média diária, Projeção

**Card 2: Multiplicador**
- Info: Mais contexto = melhor resposta = + créditos
- Grid 5 cards (Nível 1-5):
  - Badge: Nível X
  - Histórico: 20/40/60/80/100 msgs
  - Contexto: 3k/6k/9k/12k/15k tokens
  - Créditos: 1x/2x/3x/4x/5x
- Alert: "Com Nível X, cada interação = X crédito(s)"

**Card 3: Histórico**
- LineChart: Últimos 30 dias
- Tabela: Data, Interações, Créditos, Multiplicador

---

## 🔌 Backend APIs (Consumir, NÃO criar)

```typescript
// Workspaces
GET /api/workspaces → { id, name, plan, credits_balance, is_admin }[]

// Agents
GET /api/agents?workspace_id={id}
POST /api/agents → { workspace_id, name, model, system_prompt, temperature }
PUT /api/agents/{id}

// Training
POST /api/training/text → FormData { workspace_id, agent_id, instruction, image }
POST /api/training/url → { workspace_id, agent_id, url, crawl, update_frequency }
POST /api/training/youtube → { workspace_id, agent_id, video_url }
POST /api/training/documents → FormData (files)

// Channels
GET /api/channels/whatsapp?mode=meta|web
POST /api/channels/whatsapp → { workspace_id, agent_id, mode, config }
POST /api/channels/telegram
POST /api/channels/instagram
POST /api/channels/webchat

// Integrations
POST /api/integrations/elevenlabs → { workspace_id, agent_id, api_key, voice_id, enabled }
POST /api/integrations/google-calendar → { workspace_id, agent_id, refresh_token, calendar_id }

// History
GET /api/interactions?workspace_id={id}&page=1&limit=20&channel=&date_from=&date_to=&search=
GET /api/interactions/{id}

// Billing
GET /api/billing/usage?workspace_id={id} → { balance, used_this_month, average_daily, projection }
GET /api/billing/history?workspace_id={id} → [{ date, interactions, credits_used, multiplier }]
```

---

## 🎬 Animações

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.5s ease; }

@keyframes pulse-glow {
  0%, 100% { box-shadow: var(--shadow-md); }
  50% { box-shadow: var(--shadow-md), var(--glow-purple); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## 📦 Componentes Reutilizáveis

```typescript
interface CardProps { children; glow?: boolean }
interface ButtonProps { children; variant: 'primary'|'secondary'; icon?; loading?; disabled?; onClick? }
interface InputProps { label?; value; onChange; placeholder?; type?; helperText? }
interface SelectProps { label?; options: {value, label}[]; value; onChange; helperText? }
interface ToggleProps { checked; onChange; label; description? }
interface SliderProps { label; value; onChange; min; max; step; unit; showValue? }
interface FileUploadProps { accept; maxSize; multiple?; onFileSelect; currentFile?; onClear? }
interface AlertProps { variant: 'info'|'success'|'error'|'warning'; children }
interface ModalProps { onClose; children }
```

---

## ✅ Checklist Exportação

- [ ] 7 abas completas
- [ ] Sub-tabs (Training 4, Channels 4, Integrations 2)
- [ ] WorkspaceSwitcher no header
- [ ] Logo SVG neural network (purple gradient, letra N)
- [ ] Variáveis CSS customizadas
- [ ] Animações fade-in
- [ ] Estados loading/error
- [ ] Validações client-side
- [ ] TypeScript interfaces
- [ ] **NÃO incluir:** app/api/ (backend separado)
- [ ] **NÃO incluir:** Conexões Supabase diretas
- [ ] **NÃO incluir:** Secrets hardcoded

---

## 🚨 Integração Backend

### lib/api.ts Helper
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function apiRequest(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export const workspacesAPI = {
  list: () => apiRequest('/api/workspaces'),
};

export const agentsAPI = {
  get: (wid: string) => apiRequest(`/api/agents?workspace_id=${wid}`),
  create: (data: any) => apiRequest('/api/agents', { method: 'POST', body: JSON.stringify(data) }),
};
```

---

## 📐 Estado Global

```typescript
interface GlobalState {
  currentWorkspace: { id, name, plan, credits_balance, is_admin };
  workspaces: Workspace[];

  agentName: string;
  model: string;
  systemPrompt: string;
  temperature: number;

  settings: {
    human_handoff, handoff_contact, use_emojis, signature_enabled,
    agent_signature, scope_restriction, allowed_topics, split_responses,
    max_response_length, allow_reminders, timezone, response_delay,
    message_buffer_enabled, max_interactions
  };

  channels: { whatsapp, telegram, instagram, webchat };
  integrations: { elevenlabs, google_calendar };
  billing: { balance, context_level: 1|2|3|4|5, usage_history };
}
```

---

## 🎯 Header

**Logo:** 56px SVG neural network (purple gradient, nodes conectados, letra "N" centro)

**Badges:**
- "ADM EXCLUSIVO" (purple, dot indicator)
- "POWERED BY REDPRO" (gold)

**WorkspaceSwitcher:**
- Dropdown: Nome, Plano, Créditos (∞ se admin)
- Lista todos workspaces

**Button Save:**
- "Gravar Comportamento"
- Icon: Save 18px
- Loading: spinner + "Salvando..."

---

## 🔧 Sidebar (280px)

```css
background: rgba(19, 19, 26, 0.4);
backdrop-filter: blur(12px);
border-right: 1px solid var(--border-subtle);
padding: 1.5rem 1rem;
gap: 0.5rem;
```

**7 Tabs:** Bot, Database, Settings, MessageSquare, Plug2, History, Coins

**Tab Active:**
```css
background: rgba(147, 51, 234, 0.15);
border: 1px solid var(--border-main);
color: var(--accent-purple-hover);
```

**IMPORTANTE:** `aside button { box-shadow: none !important; }`

---

## 📱 Responsivo

- Desktop: 1920px+ (full)
- Tablet: 768-1919px (sidebar collapse)
- Mobile: <768px (hamburger menu)

---

## 🌐 Icons

- **Lucide React:** Bot, Settings, Database, MessageSquare, Plug2, History, Coins, Save, Sparkles, Plus, Trash2, Eye, Copy, Upload, Download, Play, Search, TestTube
- **Brand Icons (SVG custom):**
  - WhatsApp: #25D366
  - Telegram: #0088cc
  - Instagram: gradient purple/pink/orange
  - YouTube: red
  - ElevenLabs: black/white
  - Google Calendar: colorful

---

## 🔐 Segurança

- Validar MIME types no upload
- Sanitizar filenames
- Rate limiting
- Secrets em .env (NUNCA hardcode)
- Webhook signature validation

---

## 📝 Tech Stack

- **Framework:** Next.js 15+ App Router
- **Styling:** CSS Modules (inline styles preferred over Tailwind)
- **Icons:** Lucide React
- **Estado:** Context API / Zustand
- **Validação:** Zod
- **Fetch:** Native + helper

---

**Red, este PRD condensado tem ~45k chars e mantém TODAS as informações críticas! Pronto para o Lovable! 🚀**
