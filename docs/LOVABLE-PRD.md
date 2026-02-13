# 📋 PRD - Nexus AI Agent Studio UI (Lovable)

**Produto:** Nexus AI Agent - Plataforma SaaS Multi-Tenant de Gestão de Agentes IA
**Versão:** 2.0
**Data:** 2025-02-13
**Autor:** Red (Engenheiro de Telecomunicações)
**Propósito:** Construção da UI completa no Lovable para integração posterior com backend Next.js/Supabase

---

## 🎯 Objetivo

Criar interface administrativa premium dark profissional para gerenciar agentes de IA conversacionais, com:
- Multi-tenant (workspaces isolados)
- 7 abas principais de configuração
- Sistema de créditos e billing
- Integração com canais (WhatsApp, Telegram, Instagram, Web Chat)
- Treinamento multimodal (texto, URL, YouTube, documentos)
- Integrações externas (ElevenLabs TTS, Google Calendar)

---

## 🎨 Design System

### Paleta de Cores (Dark Premium Theme)

```css
/* Backgrounds - Dark Layers */
--bg-primary: #0a0a0f;
--bg-secondary: #13131a;
--bg-tertiary: #1a1a24;
--bg-card: rgba(30, 30, 46, 0.6);
--bg-card-hover: rgba(30, 30, 46, 0.8);

/* Accents - Purple & Cyan */
--accent-purple: #9333ea;
--accent-purple-hover: #a855f7;
--accent-purple-dark: #7e22ce;
--accent-cyan: #06b6d4;
--accent-cyan-hover: #22d3ee;
--accent-gold: #f59e0b;

/* Text Hierarchy */
--text-primary: #f1f5f9;
--text-secondary: #94a3b8;
--text-muted: #64748b;
--text-dim: #475569;

/* Borders with Transparency */
--border-subtle: rgba(147, 51, 234, 0.1);
--border-main: rgba(147, 51, 234, 0.3);
--border-strong: rgba(147, 51, 234, 0.5);
--border-gold: rgba(245, 158, 11, 0.4);

/* Shadows with Glow */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 16px rgba(147, 51, 234, 0.2);
--shadow-lg: 0 8px 32px rgba(147, 51, 234, 0.3);
--shadow-xl: 0 12px 48px rgba(147, 51, 234, 0.4);

/* Glow Effects */
--glow-purple: 0 0 20px rgba(147, 51, 234, 0.5);
--glow-cyan: 0 0 20px rgba(6, 182, 212, 0.5);
--glow-gold: 0 0 20px rgba(245, 158, 11, 0.5);

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

/* Border Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;

/* Transitions */
--transition-fast: 150ms ease;
--transition-normal: 300ms ease;
--transition-slow: 500ms ease;
```

### Tipografia

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Headings */
H1: 1.75rem (28px), weight 900, letter-spacing -0.02em
H2: 1.5rem (24px), weight 800
H3: 1.125rem (18px), weight 700
H4: 0.875rem (14px), weight 600

/* Labels */
Label: 0.75rem (12px), weight 700, uppercase, letter-spacing 0.05em, color var(--text-muted)

/* Body */
Body: 0.875rem (14px), weight 400
Small: 0.75rem (12px), weight 400
```

### Componentes Base

#### 1. Glass Card
```css
background: var(--bg-card);
backdrop-filter: blur(12px);
border: 1px solid var(--border-main);
border-radius: var(--radius-xl);
box-shadow: var(--shadow-md);
padding: 1.5rem;
transition: all var(--transition-normal);

:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-strong);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.glow {
  box-shadow: var(--shadow-md), var(--glow-purple);
}
```

#### 2. Premium Button
```css
background: linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-purple-dark) 100%);
color: white;
border: none;
padding: 0.75rem 1.5rem;
border-radius: var(--radius-md);
font-weight: 700;
font-size: 0.875rem;
cursor: pointer;
display: inline-flex;
align-items: center;
gap: 0.5rem;
box-shadow: var(--shadow-md);
transition: all var(--transition-normal);

:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg), var(--glow-purple);
  background: linear-gradient(135deg, var(--accent-purple-hover) 0%, var(--accent-purple) 100%);
}

:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Secondary variant */
.secondary {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-main);
  color: var(--text-primary);
}
```

#### 3. Premium Input
```css
width: 100%;
background: rgba(10, 10, 15, 0.5);
border: 1px solid var(--border-main);
border-radius: var(--radius-md);
padding: 0.75rem 1rem;
color: var(--text-primary);
font-size: 0.875rem;
outline: none;
transition: all var(--transition-normal);

::placeholder {
  color: var(--text-muted);
}

:focus {
  border-color: var(--accent-purple);
  box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.2);
  background: rgba(10, 10, 15, 0.8);
}

:hover:not(:focus) {
  border-color: var(--border-strong);
}
```

#### 4. Toggle Switch Premium
```css
/* Container */
width: 52px;
height: 28px;
background: var(--bg-tertiary);
border-radius: var(--radius-full);
cursor: pointer;
transition: all var(--transition-normal);
border: 1px solid var(--border-subtle);
position: relative;

.active {
  background: linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-purple-dark) 100%);
  border-color: var(--accent-purple);
  box-shadow: var(--glow-purple);
}

/* Circle */
.circle {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: all var(--transition-normal);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.active .circle {
  left: 27px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}
```

#### 5. Badge Premium
```css
display: inline-flex;
align-items: center;
gap: 0.375rem;
padding: 0.25rem 0.75rem;
background: rgba(147, 51, 234, 0.15);
border: 1px solid var(--border-main);
border-radius: var(--radius-full);
color: var(--accent-purple-hover);
font-size: 0.75rem;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.05em;

/* Variants */
.gold {
  background: rgba(245, 158, 11, 0.15);
  border-color: var(--border-gold);
  color: var(--accent-gold);
}

.cyan {
  background: rgba(6, 182, 212, 0.15);
  border-color: rgba(6, 182, 212, 0.3);
  color: var(--accent-cyan-hover);
}
```

---

## 🏗️ Estrutura da Interface

### Layout Principal

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (sticky top)                                         │
│ [Logo] Nexus AI Agent                [Workspace ▼] [Save]  │
│ Badge: ADM EXCLUSIVO | POWERED BY REDPRO                    │
├──────────────┬──────────────────────────────────────────────┤
│   SIDEBAR    │           CONTENT AREA                       │
│   (280px)    │           (flex-1)                           │
│              │                                               │
│ ⚙ Cérebro   │  ┌────────────────────────────────────────┐  │
│ 📚 Treino    │  │  TAB HEADER                            │  │
│ ⚙ Config     │  │  [Title] + [Icon]                      │  │
│ 💬 Canais    │  └────────────────────────────────────────┘  │
│ 🔌 Integr    │                                               │
│ 📊 Histórico │  ┌────────────────────────────────────────┐  │
│ 💰 Créditos  │  │  CARD 1 (glass-card glow)              │  │
│              │  │  [Content]                             │  │
│              │  └────────────────────────────────────────┘  │
│              │                                               │
│              │  ┌────────────────────────────────────────┐  │
│              │  │  CARD 2 (glass-card)                   │  │
│              │  │  [Content]                             │  │
│              │  └────────────────────────────────────────┘  │
└──────────────┴──────────────────────────────────────────────┘
```

---

## 📱 Especificação de Telas

### 1. Header (Sticky)

**Componentes:**
- Logo SVG (Neural Network Icon + "N")
  - Tamanho: 56px
  - Gradient: purple (#9333ea → #7e22ce)
  - Centro: letra "N" estilizada
  - Nodes conectados representando rede neural

- Título: "Nexus AI Agent"
  - Font: 1.75rem, weight 900
  - Gradient text: purple → cyan

- Badges:
  - "ADM EXCLUSIVO" (purple, com dot indicator)
  - "POWERED BY REDPRO" (gold)

- Workspace Switcher (Dropdown)
  - Ícone: Building
  - Nome do workspace atual
  - Plano (Free/Pro/Enterprise)
  - Créditos: número ou ∞ (para admin)
  - Dropdown lista todos workspaces disponíveis

- Botão Save
  - Texto: "Gravar Comportamento"
  - Ícone: Save (18px)
  - Variant: primary
  - Loading state: spinner + "Salvando..."

**Estado de Loading:**
```jsx
<Button
  variant="primary"
  icon={<Save />}
  loading={isSaving}
  onClick={handleSave}
>
  Gravar Comportamento
</Button>
```

---

### 2. Sidebar (280px fixed)

**Estilo:**
```css
width: 280px;
background: rgba(19, 19, 26, 0.4);
backdrop-filter: blur(12px);
border-right: 1px solid var(--border-subtle);
padding: 1.5rem 1rem;
display: flex;
flex-direction: column;
gap: 0.5rem;
overflow-y: auto;
```

**Tabs (7 items):**

Cada tab é um botão com:
```jsx
<button style={{
  background: isActive ? 'rgba(147, 51, 234, 0.15)' : 'transparent',
  border: `1px solid ${isActive ? 'var(--border-main)' : 'transparent'}`,
  borderRadius: 'var(--radius-md)',
  padding: '1rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  transition: 'all var(--transition-normal)',
  textAlign: 'left',
  color: isActive ? 'var(--accent-purple-hover)' : 'var(--text-secondary)'
}}>
  <Icon size={22} />
  <div>
    <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>
      {tab.label}
    </div>
    <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>
      {tab.desc}
    </div>
  </div>
</button>
```

**Lista de Tabs:**

| ID | Ícone | Label | Descrição |
|----|-------|-------|-----------|
| brain | Bot | Cérebro | Identidade e comportamento |
| training | Database | Treinamento | Base de conhecimento |
| settings | Settings | Configurações | Regras e ajustes |
| channels | MessageSquare | Canais | WhatsApp, Telegram, etc |
| integrations | Plug2 | Integrações | ElevenLabs, Calendar |
| history | History | Interações | Histórico de conversas |
| billing | Coins | Créditos | Consumo e multiplicador |

**IMPORTANTE:** Botões da sidebar NÃO devem ter box-shadow! CSS override:
```css
aside button {
  box-shadow: none !important;
}
```

---

### 3. Content Area (Main)

**Layout:**
```css
flex: 1;
padding: 2rem;
overflow-y: auto;
background: radial-gradient(circle at top right, rgba(147, 51, 234, 0.05), transparent);
max-width: 900px;
margin: 0 auto;
```

**Estrutura:**
```jsx
<main>
  {/* Tab Header */}
  <div style={{ marginBottom: '2rem' }}>
    <h2 style={{
      fontSize: '2.5rem',
      fontWeight: 900,
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: 'var(--text-primary)'
    }}>
      {activeTab.label}
      <Sparkles size={32} className="text-gradient" />
    </h2>
    <p style={{
      color: 'var(--text-secondary)',
      fontSize: '1rem'
    }}>
      {activeTab.desc}
    </p>
  </div>

  {/* Tab Content */}
  <div className="animate-fade-in">
    {/* Cards aqui */}
  </div>
</main>
```

---

## 📄 Especificação das 7 Abas

### ABA 1: Cérebro (Brain)

**Objetivo:** Configurar identidade e modelo do agente

**Cards (3):**

#### Card 1 - Nome do Agente (com glow)
```jsx
<Card glow>
  <Input
    label="Nome do Agente"
    value={agentName}
    onChange={setAgentName}
    placeholder="Ex: Max - Consultor Imobiliário"
  />
</Card>
```

#### Card 2 - Modelo de IA
```jsx
<Card>
  <Select
    label="Modelo de Inteligência"
    options={modelOptions}
    value={model}
    onChange={setModel}
    helperText="Escolha entre OpenAI e Anthropic"
  />
</Card>
```

**Opções do Select (ordenadas por provider):**
```json
[
  { value: "gpt-4o", label: "GPT-4o (OpenAI)" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini (OpenAI)" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo (OpenAI)" },
  { value: "gpt-4", label: "GPT-4 (OpenAI)" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo (OpenAI)" },
  { value: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet (Anthropic)" },
  { value: "claude-3-opus-20240229", label: "Claude 3 Opus (Anthropic)" },
  { value: "claude-3-sonnet-20240229", label: "Claude 3 Sonnet (Anthropic)" },
  { value: "claude-3-haiku-20240307", label: "Claude 3 Haiku (Anthropic)" }
]
```

#### Card 3 - Prompt de Sistema
```jsx
<Card>
  <label style={{
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-muted)',
    marginBottom: '0.5rem'
  }}>
    Prompt de Sistema (Personalidade)
  </label>
  <textarea
    value={systemPrompt}
    onChange={setSystemPrompt}
    placeholder="Ex: Você é o Max, um corretor de imóveis extrovertido e proativo. Sempre ajuda os clientes com entusiasmo..."
    rows={12}
    className="input-premium"
    style={{
      minHeight: 200,
      resize: 'vertical',
      fontFamily: 'monospace',
      fontSize: '0.875rem'
    }}
  />
</Card>
```

**State necessário:**
```typescript
interface BrainState {
  agentName: string; // default: "Nexus AI Agent"
  model: string; // default: "gpt-4o-mini"
  systemPrompt: string; // default: ""
  temperature: number; // default: 0.7 (não mostrado na UI, mas guardar)
}
```

---

### ABA 2: Treinamento (Training)

**Objetivo:** Adicionar conhecimento ao agente via múltiplas fontes

**Sub-tabs horizontais:**

```jsx
const trainingTabs = [
  { id: 'text', label: 'Texto + Imagem', icon: '📝' },
  { id: 'url', label: 'Website (URL)', icon: '🌐' },
  { id: 'youtube', label: 'YouTube', icon: <YouTubeIcon /> },
  { id: 'document', label: 'Documentos', icon: '📄' }
];

<div className="flex gap-2 mb-6 overflow-x-auto pb-2">
  {trainingTabs.map(tab => (
    <button
      key={tab.id}
      onClick={() => setTrainingSubTab(tab.id)}
      className={`px-4 py-2 rounded-lg font-semibold text-sm ${
        isActive
          ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/30'
          : 'bg-bg-tertiary text-text-secondary hover:bg-bg-card border border-border-subtle'
      }`}
    >
      {tab.icon} {tab.label}
    </button>
  ))}
</div>
```

#### Sub-tab 1: Texto + Imagem

**Layout:**
```jsx
<Card>
  <h3>Instrução com Imagem (Opcional)</h3>

  <label>Instrução Afirmativa</label>
  <textarea
    placeholder="Ex: Sempre que o usuário pedir informações sobre o convênio médico, mostre a imagem do guia de convênios..."
    rows={6}
    className="input-premium"
  />
  <p className="helper-text">
    Escreva instruções claras e específicas sobre quando e como o agente deve usar essa informação.
  </p>

  <label>Imagem Associada (Max 10MB)</label>
  <FileUpload
    accept="image/*"
    maxSize={10}
    onFileSelect={setImage}
  />
</Card>

<div className="flex justify-end">
  <Button variant="primary" icon={<Save />}>
    Salvar Treinamento
  </Button>
</div>
```

#### Sub-tab 2: Website (URL)

**Layout:**
```jsx
<Card>
  <Input
    label="URL do Website"
    placeholder="https://exemplo.com/produtos"
    value={url}
    onChange={setUrl}
  />

  <Toggle
    checked={crawlEnabled}
    onChange={setCrawlEnabled}
    label="Navegar em subpáginas (Crawl)"
    description="Se ativado, o sistema irá extrair conteúdo de até 50 páginas vinculadas"
  />

  <Select
    label="Intervalo de Atualização"
    value={updateFrequency}
    onChange={setUpdateFrequency}
    options={[
      { value: 'never', label: 'Nunca (manual)' },
      { value: 'daily', label: 'Diariamente' },
      { value: 'weekly', label: 'Semanalmente' },
      { value: 'monthly', label: 'Mensalmente (Padrão)' }
    ]}
    helperText="Com que frequência o conteúdo deve ser atualizado automaticamente"
  />

  {previewContent && (
    <div className="preview-box">
      <label>Preview do Conteúdo</label>
      <pre>{previewContent}</pre>
    </div>
  )}
</Card>

<Button variant="secondary" icon={<Eye />} onClick={handlePreview}>
  Pré-visualizar Conteúdo
</Button>
<Button variant="primary" icon={<Save />} onClick={handleSave}>
  Salvar Treinamento
</Button>
```

#### Sub-tab 3: YouTube

**Layout:**
```jsx
<Card>
  <Input
    label="URL do Vídeo YouTube"
    placeholder="https://youtube.com/watch?v=xyz"
    value={youtubeUrl}
    onChange={setYoutubeUrl}
  />

  {videoInfo && (
    <div className="video-info">
      <img src={videoInfo.thumbnail} alt="Thumbnail" />
      <div>
        <strong>{videoInfo.title}</strong>
        <p>Duração: {videoInfo.duration} | Canal: {videoInfo.channel}</p>
      </div>
    </div>
  )}

  {duration > 3600 && (
    <Alert variant="error">
      ⚠️ Vídeos acima de 1 hora não são suportados.
    </Alert>
  )}

  <Button
    variant="primary"
    icon={<Download />}
    onClick={handleTranscribe}
    disabled={isTranscribing || duration > 3600}
  >
    {isTranscribing ? 'Transcrevendo...' : 'Transcrever'}
  </Button>

  {transcription && (
    <div className="transcription-result">
      <label>Transcrição Completa</label>
      <textarea
        value={transcription}
        rows={10}
        className="input-premium"
        readOnly
      />
    </div>
  )}
</Card>
```

**Validação:** Max 1 hora (3600 segundos)

#### Sub-tab 4: Documentos

**Layout:**
```jsx
<Card>
  <label>Upload de Documentos (PDF, DOCX, TXT)</label>
  <FileUpload
    accept=".pdf,.docx,.txt"
    maxSize={100}
    multiple
    onFilesSelect={setDocuments}
  />
  <p className="helper-text">
    Limite: 100MB por arquivo. O sistema automaticamente divide documentos grandes em chunks de 5000 tokens.
  </p>

  {documents.length > 0 && (
    <div className="documents-list">
      {documents.map(doc => (
        <div key={doc.id} className="document-item">
          <FileIcon type={doc.type} />
          <div>
            <strong>{doc.filename}</strong>
            <p>{doc.size} MB | {doc.pages} páginas | {doc.chunks} chunks</p>
          </div>
          <span className={`status ${doc.status}`}>{doc.status}</span>
          <button onClick={() => removeDocument(doc.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  )}
</Card>

<Button variant="primary" icon={<Upload />} onClick={handleUpload}>
  Processar Documentos
</Button>
```

**State de Documentos:**
```typescript
interface Document {
  id: string;
  filename: string;
  type: 'pdf' | 'docx' | 'txt';
  size: number; // MB
  pages?: number;
  chunks: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
}
```

---

### ABA 3: Configurações (Settings)

**Objetivo:** Ajustes avançados de comportamento do agente

**Cards (3):**

#### Card 1 - Funcionalidades Principais
```jsx
<Card>
  <h3>Funcionalidades Principais</h3>

  <Toggle
    checked={humanHandoff}
    onChange={setHumanHandoff}
    label="Transferir para Humano"
    description="Habilite para que o agente possa transferir o atendimento para aba 'em espera' de equipe humana"
  />

  {humanHandoff && (
    <Input
      label="Contato para Transferência"
      placeholder="email@empresa.com ou +5511999999999"
      helperText="Email ou telefone da equipe humana"
    />
  )}

  <Divider />

  <Toggle
    checked={useEmojis}
    onChange={setUseEmojis}
    label="Usar Emojis nas Respostas"
    description="Define se o agente pode utilizar emojis em suas respostas"
  />

  <Divider />

  <Toggle
    checked={signatureEnabled}
    onChange={setSignatureEnabled}
    label="Assinar Nome do Agente nas Respostas"
    description="Ative esta opção para que o agente de IA adicione automaticamente sua assinatura em cada resposta"
  />

  {signatureEnabled && (
    <Input
      label="Assinatura Personalizada"
      placeholder="Ex: Atenciosamente, Max - Consultor Virtual"
    />
  )}

  <Divider />

  <Toggle
    checked={scopeRestriction}
    onChange={setScopeRestriction}
    label="Restringir Temas Permitidos"
    description="Marque essa opção para que o agente não fale sobre outros assuntos"
  />

  {scopeRestriction && (
    <Input
      label="Temas Permitidos (separados por vírgula)"
      placeholder="vendas, imóveis, agendamento, suporte"
    />
  )}

  <Divider />

  <Toggle
    checked={splitResponses}
    onChange={setSplitResponses}
    label="Dividir Resposta em Partes"
    description="Em caso da mensagem ficar grande, o agente pode separar em várias mensagens"
  />

  {splitResponses && (
    <Slider
      label="Tamanho Máximo por Mensagem"
      value={maxResponseLength}
      onChange={setMaxResponseLength}
      min={500}
      max={2000}
      step={100}
      unit=" caracteres"
    />
  )}

  <Divider />

  <Toggle
    checked={allowReminders}
    onChange={setAllowReminders}
    label="Permitir Registrar Lembretes"
    description="Habilite essa opção para que o agente tenha a capacidade de registrar lembretes ao usuário"
  />
</Card>
```

**Divider Component:**
```css
.divider {
  height: 1px;
  background: var(--border-subtle);
  margin: 1rem 0;
}
```

#### Card 2 - Timing e Limites
```jsx
<Card>
  <h3>Timing e Limites</h3>

  <Select
    label="Timezone do Agente"
    options={[
      { value: 'America/Sao_Paulo', label: 'São Paulo (GMT-3)' },
      { value: 'America/New_York', label: 'New York (GMT-5)' },
      { value: 'Europe/London', label: 'London (GMT+0)' },
      { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' }
    ]}
    helperText="Escolha o timezone que agente usará para datas, por exemplo agendar reuniões"
  />

  <Slider
    label="Tempo de Resposta"
    value={responseDelay}
    onChange={setResponseDelay}
    min={0}
    max={30}
    step={1}
    unit=" segundos"
    showValue
  />
  <p className="helper-text">
    Defina um intervalo para o agente esperar e dar uma resposta (buffer para múltiplas mensagens)
  </p>

  <Toggle
    checked={messageBufferEnabled}
    onChange={setMessageBufferEnabled}
    label="Buffer de Mensagens"
    description="Aguarda o tempo definido acima para acumular mensagens e responder tudo de uma vez"
  />

  <Slider
    label="Limite de Interações por Atendimento"
    value={maxInteractions}
    onChange={setMaxInteractions}
    min={10}
    max={100}
    step={10}
    unit=" interações"
    showValue
  />
  <p className="helper-text">
    Defina a quantidade de interações que o agente pode aceitar por atendimento
  </p>
</Card>
```

**Slider Component:**
```jsx
interface SliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  showValue?: boolean;
}

// Estilo do slider (usar input range nativo com CSS customizado)
```

#### Card 3 - Ações de Inatividade
```jsx
<Card>
  <div className="card-header">
    <h3>Ações de Inatividade</h3>
    <Button variant="secondary" icon={<Plus />} onClick={addAction}>
      Adicionar Ação
    </Button>
  </div>

  <p className="helper-text">
    Configure ações que o agente deve executar quando o cliente parar de responder
  </p>

  {inactivityActions.map(action => (
    <div key={action.id} className="action-item">
      <div className="action-header">
        <h4>Se não responder em {action.timeoutMinutes} minutos</h4>
        <button onClick={() => removeAction(action.id)}>
          <Trash2 size={16} />
        </button>
      </div>

      <div className="grid-2-cols">
        <Input
          label="Minutos"
          type="number"
          value={action.timeoutMinutes}
          onChange={updateActionTimeout}
          min={1}
        />

        <Select
          label="Ação"
          options={[
            { value: 'finalize', label: 'Finalizar atendimento' },
            { value: 'send_message', label: 'Enviar mensagem' },
            { value: 'transfer', label: 'Transferir para humano' }
          ]}
          value={action.action}
          onChange={updateActionType}
        />
      </div>

      {action.action === 'send_message' && (
        <Input
          label="Mensagem"
          value={action.message}
          onChange={updateActionMessage}
          placeholder="Ex: Ainda está aí? Posso ajudar em mais alguma coisa?"
        />
      )}
    </div>
  ))}
</Card>
```

**Action Item Style:**
```css
.action-item {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1rem;
  margin-bottom: 0.75rem;
}
```

---

### ABA 4: Canais (Channels)

**Objetivo:** Configurar integrações com plataformas de mensageria

**Sub-tabs horizontais:**

```jsx
const channelTabs = [
  { id: 'whatsapp', label: 'WhatsApp', Icon: WhatsAppIcon },
  { id: 'telegram', label: 'Telegram', Icon: TelegramIcon },
  { id: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { id: 'webchat', label: 'Web Chat', Icon: WebChatIcon }
];

<div className="flex gap-2 mb-6">
  {channelTabs.map(tab => (
    <button
      key={tab.id}
      onClick={() => setChannelSubTab(tab.id)}
      className={`${isActive ? 'active' : ''}`}
    >
      <tab.Icon size={18} variant={isActive ? 'white' : 'color'} />
      {tab.label}
    </button>
  ))}
</div>
```

**Ícones Necessários (criar como SVG):**
- WhatsAppIcon: Logo WhatsApp verde (#25D366)
- TelegramIcon: Logo Telegram azul (#0088cc)
- InstagramIcon: Gradient Instagram (purple/pink/orange)
- WebChatIcon: Ícone de chat genérico

#### Sub-tab 1: WhatsApp

**Mode Selector:**
```jsx
<div className="mode-selector">
  <button
    className={mode === 'meta' ? 'active' : ''}
    onClick={() => setMode('meta')}
  >
    WhatsApp Business API (Meta)
  </button>
  <button
    className={mode === 'web' ? 'active' : ''}
    onClick={() => setMode('web')}
  >
    WhatsApp Web (Evolution API)
  </button>
</div>
```

**Config: WhatsApp Business API (Meta)**
```jsx
<Card>
  <Input
    label="Phone Number ID"
    placeholder="1234567890"
    value={phoneNumberId}
    onChange={setPhoneNumberId}
  />

  <Input
    label="Access Token"
    type="password"
    placeholder="EAAC..."
    value={accessToken}
    onChange={setAccessToken}
  />

  <Input
    label="Webhook Verification Token"
    placeholder="meu-token-secreto"
    value={webhookToken}
    onChange={setWebhookToken}
  />

  <div className="info-box">
    <strong>Webhook URL:</strong>
    <code>https://seu-dominio.com/api/webhooks/whatsapp/meta</code>
    <button onClick={() => copyToClipboard()}>
      <Copy size={16} />
    </button>
  </div>

  <Button variant="secondary" icon={<TestTube />} onClick={testConnection}>
    Testar Conexão
  </Button>
</Card>
```

**Config: WhatsApp Web (Evolution API)**
```jsx
<Card>
  <Input
    label="Evolution API Endpoint"
    placeholder="https://api.evolution.com.br"
    value={evolutionEndpoint}
    onChange={setEvolutionEndpoint}
  />

  <Input
    label="Instance Name"
    placeholder="nexus-agent-01"
    value={instanceName}
    onChange={setInstanceName}
  />

  <Input
    label="API Key"
    type="password"
    placeholder="B6D9BF5..."
    value={apiKey}
    onChange={setApiKey}
  />

  <Button variant="secondary" icon={<TestTube />} onClick={testConnection}>
    Testar Conexão
  </Button>

  {connectionStatus === 'success' && (
    <Alert variant="success">
      ✅ Conectado com sucesso! Instância: {instanceName}
    </Alert>
  )}

  {qrCode && (
    <div className="qr-code-box">
      <h4>Escaneie o QR Code com WhatsApp</h4>
      <img src={qrCode} alt="QR Code" />
      <p>Status: {connectionStatus}</p>
    </div>
  )}
</Card>
```

**Card de Configurações Gerais (todos canais):**
```jsx
<Card>
  <h3>Configurações de Comportamento</h3>

  <Toggle
    checked={typingIndicator}
    onChange={setTypingIndicator}
    label="Indicador de Digitação"
    description="Mostra '...' quando o agente está processando"
  />

  <Toggle
    checked={autoRead}
    onChange={setAutoRead}
    label="Marcar como Lido Automaticamente"
    description="Marca mensagens recebidas como lidas"
  />

  <Select
    label="Processamento de Áudio"
    options={[
      { value: 'ignore', label: 'Ignorar áudios' },
      { value: 'transcribe', label: 'Transcrever e responder' },
      { value: 'reply_unavailable', label: 'Responder "Não aceito áudios"' }
    ]}
  />

  <Select
    label="Gatilho de Ativação"
    options={[
      { value: 'first_message', label: 'Primeira mensagem do usuário' },
      { value: 'keyword', label: 'Palavra-chave específica' },
      { value: 'always', label: 'Sempre ativo' }
    ]}
  />

  <Toggle
    checked={groupMessages}
    onChange={setGroupMessages}
    label="Responder em Grupos"
    description="Permite que o agente responda em conversas de grupo"
  />

  <Select
    label="Tratamento de Chamadas"
    options={[
      { value: 'reject', label: 'Rejeitar automaticamente' },
      { value: 'ignore', label: 'Ignorar' },
      { value: 'custom_message', label: 'Enviar mensagem customizada' }
    ]}
  />

  {callHandling === 'custom_message' && (
    <Input
      label="Mensagem de Rejeição de Chamada"
      placeholder="Desculpe, mas este canal não aceita chamadas telefônicas..."
      value={callRejectionMessage}
      onChange={setCallRejectionMessage}
    />
  )}

  <Toggle
    checked={mobileTakeover}
    onChange={setMobileTakeover}
    label="Desconectar Celular ao Conectar"
    description="(WhatsApp Web) Desloga celular quando conecta via Evolution"
  />
</Card>
```

#### Sub-tab 2: Telegram

```jsx
<Card>
  <Input
    label="Bot Token"
    placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
    value={botToken}
    onChange={setBotToken}
    helperText="Obtenha em @BotFather no Telegram"
  />

  <div className="info-box">
    <strong>Webhook URL:</strong>
    <code>https://seu-dominio.com/api/webhooks/telegram</code>
  </div>

  <Input
    label="Comandos Customizados (opcional)"
    placeholder="/start, /help, /precos"
    helperText="Comandos que o bot responderá além das mensagens normais"
  />

  <Button variant="secondary" icon={<TestTube />}>
    Testar Conexão
  </Button>
</Card>

{/* Card de Configurações Gerais (mesmo do WhatsApp) */}
```

#### Sub-tab 3: Instagram

```jsx
<Card>
  <Input
    label="Page Access Token"
    type="password"
    placeholder="EAAC..."
    value={pageAccessToken}
    onChange={setPageAccessToken}
  />

  <Input
    label="Page ID"
    placeholder="123456789012345"
    value={pageId}
    onChange={setPageId}
  />

  <div className="info-box">
    <strong>Webhook URL:</strong>
    <code>https://seu-dominio.com/api/webhooks/instagram</code>
  </div>

  <Alert variant="info">
    ℹ️ Instagram Direct Messages requer conta Business conectada a uma página do Facebook.
  </Alert>

  <Button variant="secondary" icon={<TestTube />}>
    Testar Conexão
  </Button>
</Card>

{/* Card de Configurações Gerais */}
```

#### Sub-tab 4: Web Chat

```jsx
<Card>
  <h3>Personalização do Widget</h3>

  <Input
    label="Título do Chat"
    placeholder="Fale com nosso assistente"
    value={chatTitle}
    onChange={setChatTitle}
  />

  <Input
    label="Mensagem de Boas-Vindas"
    placeholder="Olá! Como posso ajudar você hoje?"
    value={welcomeMessage}
    onChange={setWelcomeMessage}
  />

  <Input
    label="Cor Principal"
    type="color"
    value={primaryColor}
    onChange={setPrimaryColor}
  />

  <Select
    label="Posição na Tela"
    options={[
      { value: 'bottom-right', label: 'Canto inferior direito' },
      { value: 'bottom-left', label: 'Canto inferior esquerdo' }
    ]}
  />

  <Toggle
    checked={showAvatar}
    onChange={setShowAvatar}
    label="Mostrar Avatar do Agente"
  />
</Card>

<Card>
  <h3>Código de Integração</h3>
  <p>Copie e cole este código antes do fechamento da tag &lt;/body&gt; do seu site:</p>

  <div className="code-box">
    <pre>{embedCode}</pre>
    <button onClick={copyEmbedCode}>
      <Copy size={16} /> Copiar
    </button>
  </div>

  <div className="preview-box">
    <h4>Preview do Chat</h4>
    <iframe src="/preview/webchat" width="400" height="600" />
  </div>
</Card>
```

**Embed Code Template:**
```html
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://seu-dominio.com/widget.js';
    script.dataset.agentId = 'AGENT_ID_AQUI';
    document.body.appendChild(script);
  })();
</script>
```

---

### ABA 5: Integrações (Integrations)

**Objetivo:** Conectar serviços externos (TTS, Calendários, etc)

**Sub-tabs horizontais:**

```jsx
const integrationTabs = [
  { id: 'elevenlabs', label: 'ElevenLabs TTS', Icon: ElevenLabsIcon },
  { id: 'calendar', label: 'Google Calendar', Icon: GoogleCalendarIcon }
];
```

**Ícones:**
- ElevenLabsIcon: Logo ElevenLabs (preto/branco)
- GoogleCalendarIcon: Logo Google Calendar (colorido)

#### Sub-tab 1: ElevenLabs TTS

```jsx
<Card>
  <Input
    label="API Key"
    type="password"
    placeholder="sk_..."
    value={elevenLabsApiKey}
    onChange={setElevenLabsApiKey}
    helperText="Obtenha em elevenlabs.io/app/settings"
  />

  <Select
    label="Voz Padrão"
    options={voices}
    value={selectedVoice}
    onChange={setSelectedVoice}
  />

  <Button variant="secondary" icon={<Play />} onClick={previewVoice}>
    Pré-visualizar Voz
  </Button>

  {audioPreview && (
    <audio controls src={audioPreview} />
  )}

  <Toggle
    checked={ttsEnabled}
    onChange={setTtsEnabled}
    label="Usar TTS nas Respostas"
    description="Quando ativado, todas as respostas do agente incluirão áudio gerado"
  />

  <Slider
    label="Velocidade de Fala"
    value={speechSpeed}
    onChange={setSpeechSpeed}
    min={0.5}
    max={2}
    step={0.1}
    showValue
  />

  <Slider
    label="Estabilidade"
    value={stability}
    onChange={setStability}
    min={0}
    max={1}
    step={0.1}
    showValue
  />
</Card>

<Card>
  <h3>Vozes Disponíveis</h3>
  {isLoadingVoices ? (
    <Spinner />
  ) : (
    <div className="voices-grid">
      {voices.map(voice => (
        <div key={voice.id} className="voice-card">
          <strong>{voice.name}</strong>
          <p>{voice.description}</p>
          <button onClick={() => selectVoice(voice.id)}>
            Selecionar
          </button>
        </div>
      ))}
    </div>
  )}
</Card>
```

**Voice Interface:**
```typescript
interface Voice {
  id: string;
  name: string;
  description: string;
  preview_url?: string;
}
```

#### Sub-tab 2: Google Calendar

```jsx
<Card>
  <h3>Autenticação OAuth 2.0</h3>

  {!isConnected ? (
    <>
      <p>Conecte sua conta Google para permitir que o agente agende eventos no calendário.</p>

      <Button variant="primary" icon={<GoogleIcon />} onClick={handleGoogleAuth}>
        Conectar com Google
      </Button>
    </>
  ) : (
    <>
      <Alert variant="success">
        ✅ Conectado como: {userEmail}
      </Alert>

      <Select
        label="Calendário Padrão"
        options={calendars}
        value={selectedCalendar}
        onChange={setSelectedCalendar}
      />

      <div className="permissions-list">
        <h4>Permissões Concedidas:</h4>
        <ul>
          <li>✅ Ler eventos</li>
          <li>✅ Criar eventos</li>
          <li>✅ Atualizar eventos</li>
          <li>❌ Deletar eventos (não solicitado)</li>
        </ul>
      </div>

      <Button variant="secondary" onClick={handleDisconnect}>
        Desconectar
      </Button>
    </>
  )}
</Card>

<Card>
  <h3>Configurações de Agendamento</h3>

  <Input
    label="Duração Padrão de Reuniões"
    type="number"
    value={defaultDuration}
    onChange={setDefaultDuration}
    unit="minutos"
    helperText="Usado quando o usuário não especificar duração"
  />

  <Toggle
    checked={autoConfirmMeetings}
    onChange={setAutoConfirmMeetings}
    label="Confirmar Reuniões Automaticamente"
    description="Se desativado, o agente perguntará confirmação antes de criar evento"
  />

  <Toggle
    checked={sendNotifications}
    onChange={setSendNotifications}
    label="Enviar Notificações ao Criar Evento"
    description="Notifica participantes via email quando evento for criado"
  />
</Card>
```

---

### ABA 6: Interações (History)

**Objetivo:** Visualizar histórico de conversas

```jsx
<Card>
  <div className="filters-bar">
    <Input
      placeholder="Buscar por usuário, canal ou mensagem..."
      icon={<Search />}
      value={searchQuery}
      onChange={setSearchQuery}
    />

    <Select
      placeholder="Canal"
      options={[
        { value: 'all', label: 'Todos os canais' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'telegram', label: 'Telegram' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'webchat', label: 'Web Chat' }
      ]}
    />

    <Input
      type="date"
      label="De"
      value={dateFrom}
      onChange={setDateFrom}
    />

    <Input
      type="date"
      label="Até"
      value={dateTo}
      onChange={setDateTo}
    />
  </div>
</Card>

<Card>
  <div className="interactions-table">
    <table>
      <thead>
        <tr>
          <th>Data/Hora</th>
          <th>Usuário</th>
          <th>Canal</th>
          <th>Mensagens</th>
          <th>Créditos</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {interactions.map(interaction => (
          <tr key={interaction.id}>
            <td>{formatDateTime(interaction.created_at)}</td>
            <td>{interaction.user_id}</td>
            <td>
              <ChannelBadge type={interaction.channel} />
            </td>
            <td>{interaction.message_count}</td>
            <td>{interaction.credits_used}</td>
            <td>
              <button onClick={() => viewDetails(interaction.id)}>
                <Eye size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="pagination">
    <button disabled={page === 1}>Anterior</button>
    <span>Página {page} de {totalPages}</span>
    <button disabled={page === totalPages}>Próxima</button>
  </div>
</Card>

{selectedInteraction && (
  <Modal onClose={() => setSelectedInteraction(null)}>
    <h3>Detalhes da Interação</h3>

    <div className="conversation-thread">
      {selectedInteraction.messages.map(msg => (
        <div key={msg.id} className={`message ${msg.role}`}>
          <strong>{msg.role === 'user' ? 'Usuário' : 'Agente'}:</strong>
          <p>{msg.content}</p>
          <span className="timestamp">{formatTime(msg.timestamp)}</span>
        </div>
      ))}
    </div>

    <div className="interaction-meta">
      <p><strong>Total de mensagens:</strong> {selectedInteraction.message_count}</p>
      <p><strong>Créditos consumidos:</strong> {selectedInteraction.credits_used}</p>
      <p><strong>Duração:</strong> {selectedInteraction.duration} minutos</p>
    </div>
  </Modal>
)}
```

**Table Style:**
```css
.interactions-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th {
  text-align: left;
  padding: 1.25rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
}

td {
  padding: 1.25rem 1.5rem;
  font-size: 0.875rem;
  color: var(--text-primary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}

tr:hover td {
  background: rgba(147, 51, 234, 0.05);
}
```

---

### ABA 7: Créditos (Billing)

**Objetivo:** Gerenciar créditos e multiplicador de contexto

```jsx
<Card glow>
  <div className="billing-header">
    <div>
      <h3>Saldo de Créditos</h3>
      <div className="credits-display">
        {isAdmin ? (
          <>
            <span className="infinite-icon">∞</span>
            <span className="admin-badge">👑 ADMIN</span>
          </>
        ) : (
          <span className="credits-number">{creditsBalance}</span>
        )}
      </div>
    </div>

    {!isAdmin && (
      <Button variant="primary" icon={<CreditCard />}>
        Recarregar Créditos
      </Button>
    )}
  </div>

  <div className="usage-stats">
    <div className="stat-item">
      <label>Usado Este Mês</label>
      <span>{usedThisMonth} créditos</span>
    </div>
    <div className="stat-item">
      <label>Média Diária</label>
      <span>{averageDaily} créditos/dia</span>
    </div>
    <div className="stat-item">
      <label>Projeção Mensal</label>
      <span>{monthlyProjection} créditos</span>
    </div>
  </div>
</Card>

<Card>
  <h3>Multiplicador de Contexto</h3>

  <p className="helper-text">
    Quanto mais contexto, melhor o agente entende e responde. Mas consome mais créditos por interação.
  </p>

  <div className="multiplier-selector">
    {[1, 2, 3, 4, 5].map(level => (
      <button
        key={level}
        className={`multiplier-option ${contextLevel === level ? 'active' : ''}`}
        onClick={() => setContextLevel(level)}
      >
        <div className="level-badge">Nível {level}</div>
        <div className="level-details">
          <p><strong>Histórico:</strong> {level * 20} mensagens</p>
          <p><strong>Contexto:</strong> {level * 3}k tokens</p>
          <p><strong>Créditos:</strong> {level}x por interação</p>
        </div>
      </button>
    ))}
  </div>

  <Alert variant="info">
    ℹ️ Com Nível {contextLevel}, cada interação consumirá <strong>{contextLevel} crédito(s)</strong>.
  </Alert>
</Card>

<Card>
  <h3>Histórico de Consumo</h3>

  <div className="chart-container">
    {/* Gráfico de linha mostrando consumo nos últimos 30 dias */}
    <LineChart data={usageHistory} />
  </div>

  <div className="consumption-table">
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Interações</th>
          <th>Créditos Usados</th>
          <th>Multiplicador</th>
        </tr>
      </thead>
      <tbody>
        {dailyUsage.map(day => (
          <tr key={day.date}>
            <td>{formatDate(day.date)}</td>
            <td>{day.interactions}</td>
            <td>{day.credits_used}</td>
            <td>{day.multiplier}x</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</Card>
```

**Credits Display Style:**
```css
.credits-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.infinite-icon {
  font-size: 4rem;
  font-weight: 900;
  color: var(--accent-gold);
  text-shadow: var(--glow-gold);
}

.credits-number {
  font-size: 4rem;
  font-weight: 900;
  color: var(--accent-cyan);
  text-shadow: var(--glow-cyan);
}

.admin-badge {
  font-size: 1.5rem;
}
```

**Multiplier Selector:**
```css
.multiplier-selector {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}

.multiplier-option {
  background: var(--bg-tertiary);
  border: 2px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.5rem 1rem;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-align: center;
}

.multiplier-option.active {
  background: rgba(147, 51, 234, 0.2);
  border-color: var(--accent-purple);
  box-shadow: var(--glow-purple);
}

.level-badge {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.level-details {
  font-size: 0.75rem;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
```

---

## 🔌 Integração com Backend (APIs Necessárias)

### Endpoints Existentes (NÃO criar, apenas consumir)

```typescript
// Workspaces (Multi-tenant)
GET  /api/workspaces
  → Lista todos workspaces do usuário
  → Response: { id, name, plan, credits_balance, is_admin }

// Agents (Cérebro)
GET    /api/agents?workspace_id={id}
POST   /api/agents
PUT    /api/agents/{id}
DELETE /api/agents/{id}

// Training Data
POST /api/training/text
  → Body: { workspace_id, agent_id, instruction, image? }

POST /api/training/url
  → Body: { workspace_id, agent_id, url, crawl, update_frequency }

POST /api/training/youtube
  → Body: { workspace_id, agent_id, video_url }

POST /api/training/documents
  → Body: FormData with files
  → Response: { chunks, status }

// Channels
GET  /api/channels/whatsapp?mode={meta|web}
POST /api/channels/whatsapp
  → Body: { workspace_id, agent_id, mode, config }

POST /api/channels/telegram
POST /api/channels/instagram
POST /api/channels/webchat

// Integrations
POST /api/integrations/elevenlabs
  → Body: { workspace_id, agent_id, api_key, voice_id, enabled }

POST /api/integrations/google-calendar
  → Body: { workspace_id, agent_id, refresh_token, calendar_id }

// Interactions (History)
GET /api/interactions?workspace_id={id}&page={n}&limit={n}
  → Query params: channel, date_from, date_to, search
  → Response: { data: [], total, page, pages }

GET /api/interactions/{id}
  → Detalhes completos de uma interação

// Billing
GET /api/billing/usage?workspace_id={id}
  → Response: { balance, used_this_month, average_daily }

GET /api/billing/history?workspace_id={id}
  → Response: [ { date, interactions, credits_used, multiplier } ]
```

### Estado Global Necessário

```typescript
interface GlobalState {
  // User & Workspace
  currentWorkspace: {
    id: string;
    name: string;
    plan: 'free' | 'pro' | 'enterprise';
    credits_balance: number;
    is_admin: boolean;
  };
  workspaces: Workspace[];

  // Agent Config (Brain)
  agentName: string;
  model: string;
  systemPrompt: string;
  temperature: number;

  // Settings
  settings: {
    human_handoff: boolean;
    handoff_contact: string;
    use_emojis: boolean;
    signature_enabled: boolean;
    agent_signature: string;
    scope_restriction: boolean;
    allowed_topics: string;
    split_responses: boolean;
    max_response_length: number;
    allow_reminders: boolean;
    timezone: string;
    response_delay: number;
    message_buffer_enabled: boolean;
    max_interactions: number;
  };

  // Channels
  channels: {
    whatsapp: ChannelConfig;
    telegram: ChannelConfig;
    instagram: ChannelConfig;
    webchat: ChannelConfig;
  };

  // Integrations
  integrations: {
    elevenlabs: ElevenLabsConfig;
    google_calendar: GoogleCalendarConfig;
  };

  // Billing
  billing: {
    balance: number;
    context_level: 1 | 2 | 3 | 4 | 5;
    usage_history: UsageRecord[];
  };
}
```

---

## 🎬 Animações e Transições

### Fade In (conteúdo das abas)
```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease;
}
```

### Pulse Glow (cards especiais)
```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: var(--shadow-md);
  }
  50% {
    box-shadow: var(--shadow-md), var(--glow-purple);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease infinite;
}
```

### Spinner (loading states)
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

---

## 📦 Estrutura de Componentes Reutilizáveis

### Componentes Necessários

1. **Card** - Container glassmorphism
2. **Button** - Primary, Secondary, variants
3. **Input** - Text, number, password, date
4. **Select** - Dropdown com opções
5. **Toggle** - Switch on/off
6. **Slider** - Range input
7. **Badge** - Labels coloridos
8. **FileUpload** - Drag & drop de arquivos
9. **Modal** - Popup overlay
10. **Alert** - Info, success, error, warning
11. **Spinner** - Loading indicator
12. **Divider** - Linha separadora

### Props Padrão

```typescript
// Card
interface CardProps {
  children: ReactNode;
  glow?: boolean;
  className?: string;
}

// Button
interface ButtonProps {
  children: ReactNode;
  variant: 'primary' | 'secondary';
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

// Input
interface InputProps {
  label?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'password' | 'date' | 'color';
  helperText?: string;
  disabled?: boolean;
}

// Toggle
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

// Select
interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  helperText?: string;
}

// FileUpload
interface FileUploadProps {
  accept: string;
  maxSize: number; // MB
  multiple?: boolean;
  onFileSelect: (file: File | File[]) => void;
  currentFile?: File | null;
  onClear?: () => void;
}
```

---

## ✅ Checklist de Exportação (Pós-Lovable)

Após criar no Lovable, garantir que o export tenha:

- [ ] Todas 7 abas implementadas
- [ ] WorkspaceSwitcher no header
- [ ] Logo Nexus AI (SVG neural network)
- [ ] Todos sub-tabs (Training, Channels, Integrations)
- [ ] Componentes reutilizáveis (Card, Button, Input, etc)
- [ ] Variáveis CSS do Design System
- [ ] Animações (fade-in, pulse-glow, spin)
- [ ] Estados de loading
- [ ] Estados de erro
- [ ] Validações de formulário
- [ ] Responsive (mínimo tablet/desktop)
- [ ] **IMPORTANTE:** Pasta `app/api/` NÃO incluída (backend separado)
- [ ] **IMPORTANTE:** Sem lógica de backend (apenas UI + fetch para APIs)
- [ ] TypeScript types para todas interfaces
- [ ] Comments nos componentes principais

---

## 🚨 Requisitos Críticos para Integração

### 1. Separação Frontend/Backend

**Frontend (Lovable) deve ter:**
- Apenas componentes React
- Chamadas fetch() para APIs
- Estado local (useState, useContext)
- Validações client-side

**Frontend NÃO deve ter:**
- ❌ Pasta `app/api/`
- ❌ Lógica de banco de dados
- ❌ Conexões Supabase diretas
- ❌ Secrets/API keys hardcoded

### 2. Variáveis de Ambiente

Criar `.env.example`:
```bash
# APIs Backend (local dev)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Supabase (apenas se frontend precisar ler, não escrever)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 3. Fetch Helper

Criar `lib/api.ts` para centralizar chamadas:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function apiRequest(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Exemplos de uso
export const workspacesAPI = {
  list: () => apiRequest('/api/workspaces'),
  get: (id: string) => apiRequest(`/api/workspaces/${id}`),
};

export const agentsAPI = {
  get: (workspaceId: string) => apiRequest(`/api/agents?workspace_id=${workspaceId}`),
  create: (data: any) => apiRequest('/api/agents', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiRequest(`/api/agents/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// ... etc para todas APIs
```

---

## 📝 Notas Finais

### Tecnologias a Usar no Lovable

- **Framework:** Next.js 15+ (App Router)
- **Styling:** CSS Modules ou Styled Components (evitar Tailwind se possível)
- **Icons:** Lucide React (já estamos usando)
- **Estado:** Context API ou Zustand
- **Forms:** React Hook Form (opcional)
- **Validação:** Zod
- **Fetch:** Native fetch com helper customizado

### Responsividade

- **Desktop:** 1920px+ (layout completo)
- **Tablet:** 768px-1919px (sidebar collapsible)
- **Mobile:** <768px (menu hamburger, tabs scrollable)

### Acessibilidade

- Labels ARIA em todos inputs
- Keyboard navigation (Tab, Enter, Esc)
- Focus states visíveis
- Color contrast WCAG AA

---

**Fim do PRD**

Red, este documento tem TUDO que você precisa para construir no Lovable e depois integrar com nosso backend Next.js/Supabase. Qualquer dúvida, é só perguntar! 🚀
