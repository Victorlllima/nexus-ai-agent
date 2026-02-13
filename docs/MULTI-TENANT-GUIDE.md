# 🏢 Guia Multi-Tenant - Nexus AI Agent

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Implementação](#implementação)
4. [Uso no Código](#uso-no-código)
5. [Planos e Limites](#planos-e-limites)
6. [Próximos Passos](#próximos-passos)

---

## 🎯 Visão Geral

O Nexus AI Agent agora suporta **multi-tenancy** (múltiplos clientes/workspaces) usando **isolamento lógico** em um único banco de dados Supabase.

### **O que mudou?**

**Antes:**
```
Dashboard → 1 Agente → 1 Cliente
```

**Depois:**
```
Dashboard → N Workspaces
            ├─ Workspace A → N Agentes → N Canais
            ├─ Workspace B → N Agentes → N Canais
            └─ Workspace C → N Agentes → N Canais
```

### **Vantagens:**
- ✅ Gerenciar múltiplos clientes no mesmo painel
- ✅ Isolamento total de dados entre workspaces
- ✅ Planos diferentes (Free, Pro, Enterprise)
- ✅ Sistema de créditos por workspace
- ✅ Escalável até milhares de clientes
- ✅ Custo fixo ($25/mês Supabase Pro)

---

## 🏗️ Arquitetura

### **Schema do Banco de Dados**

```sql
workspaces
├─ id (UUID)
├─ name (TEXT)
├─ owner_email (TEXT)
├─ plan (TEXT: free|pro|enterprise)
├─ credits_balance (INTEGER)
└─ created_at (TIMESTAMP)

agents
├─ id (UUID)
├─ workspace_id (UUID FK → workspaces)
├─ name, model, system_prompt, etc
└─ ...

channels
├─ id (UUID)
├─ workspace_id (UUID FK → workspaces)
├─ agent_id (UUID FK → agents)
└─ ...

// Mesma estrutura para:
// - training_data
// - interactions
// - integrations
```

### **Row Level Security (RLS)**

Cada tabela tem política RLS que garante:
```sql
-- Usuário só vê dados do seu workspace
WHERE workspace_id IN (
  SELECT id FROM workspaces
  WHERE owner_email = current_user_email
)
```

**Resultado:** Isolamento automático e seguro! 🔒

---

## 🛠️ Implementação

### **1. Aplicar Migrations**

```bash
# Conectar ao Supabase
npx supabase link --project-ref yjipzehopyndeigjrpsb

# Aplicar migrations
npx supabase db push

# Ou via SQL Editor no painel Supabase:
# - Copiar conteúdo de migrations/008_create_workspaces.sql
# - Executar
# - Copiar conteúdo de migrations/009_workspace_rls_policies.sql
# - Executar
```

### **2. Adicionar WorkspaceSwitcher no Header**

```tsx
// app/page.tsx
import { WorkspaceSwitcher } from '@/components/studio/WorkspaceSwitcher';

export default function Home() {
  return (
    <div className="studio">
      <header>
        <h1>Nexus AI Agent</h1>
        <WorkspaceSwitcher /> {/* ⬅️ Adicionar aqui */}
      </header>
      ...
    </div>
  );
}
```

### **3. Modificar API Routes para usar Workspace Context**

**Exemplo: app/api/agents/route.ts**

```typescript
import { getWorkspaceIdFromRequest } from '@/lib/workspace-context';

export async function GET(request: NextRequest) {
  const workspaceId = getWorkspaceIdFromRequest(request);

  if (!workspaceId) {
    return NextResponse.json(
      { success: false, error: 'Workspace não selecionado' },
      { status: 400 }
    );
  }

  const { data } = await supabase
    .from('agents')
    .select('*')
    .eq('workspace_id', workspaceId); // ⬅️ Filtro por workspace

  return NextResponse.json({ success: true, data });
}
```

**Exemplo: Frontend (componentes)**

```typescript
import { getWorkspaceHeaders } from '@/lib/workspace-context';

const response = await fetch('/api/agents', {
  headers: getWorkspaceHeaders() // ⬅️ Envia X-Workspace-ID
});
```

---

## 📊 Planos e Limites

### **Free Plan**
- 1 agente
- 100 créditos/mês
- 1 canal
- Suporte básico

### **Pro Plan** ($29/mês)
- 5 agentes
- 1.000 créditos/mês
- Canais ilimitados
- Suporte prioritário

### **Enterprise Plan** ($199/mês)
- Agentes ilimitados
- 10.000 créditos/mês (ou sob demanda)
- Canais ilimitados
- SLA garantido
- Suporte dedicado

### **Implementar Limites**

```typescript
// Exemplo: Validar limite de agentes ao criar
export async function POST(request: NextRequest) {
  const workspaceId = getWorkspaceIdFromRequest(request);

  // Buscar workspace para ver plano
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('plan')
    .eq('id', workspaceId)
    .single();

  // Contar agentes existentes
  const { count } = await supabase
    .from('agents')
    .select('*', { count: 'exact', head: true })
    .eq('workspace_id', workspaceId);

  // Validar limites
  const limits = { free: 1, pro: 5, enterprise: Infinity };
  if (count >= limits[workspace.plan]) {
    return NextResponse.json(
      { success: false, error: `Limite de agentes atingido para plano ${workspace.plan}` },
      { status: 403 }
    );
  }

  // Criar agente...
}
```

---

## 🔄 Fluxo de Uso

### **1. Usuário faz login**
```typescript
// TODO: Implementar Supabase Auth
// Por enquanto, usa email fixo 'admin@nexus.ai'
```

### **2. Sistema carrega workspaces do usuário**
```typescript
GET /api/workspaces
→ Retorna [{id: 'ws-1', name: 'Cliente A'}, ...]
```

### **3. Usuário seleciona workspace**
```typescript
// Salva no localStorage
localStorage.setItem('currentWorkspaceId', 'ws-1');
```

### **4. Todas requisições incluem workspace_id**
```typescript
fetch('/api/agents', {
  headers: { 'X-Workspace-ID': 'ws-1' }
})
→ Retorna apenas agentes do workspace 'ws-1'
```

### **5. RLS garante isolamento**
```sql
-- Mesmo que frontend envie workspace errado,
-- RLS bloqueia acesso a dados de outros workspaces
```

---

## 🚀 Próximos Passos

### **Fase 1: Autenticação** (Próxima)
- [ ] Implementar Supabase Auth (Email/Password)
- [ ] Adicionar tela de login
- [ ] Substituir email fixo por `auth.user.email`

### **Fase 2: UI de Gerenciamento**
- [ ] Modal "Criar Novo Workspace"
- [ ] Tela de configurações do workspace
- [ ] Dashboard de estatísticas por workspace
- [ ] Gráficos de consumo de créditos

### **Fase 3: Billing**
- [ ] Integrar Stripe para pagamentos
- [ ] Sistema de upgrade/downgrade de plano
- [ ] Recarga de créditos
- [ ] Faturas e histórico de pagamentos

### **Fase 4: Permissões Avançadas**
- [ ] Convidar usuários para workspace (roles: owner, admin, viewer)
- [ ] Permissões granulares (quem pode criar agentes, canais, etc)
- [ ] Auditoria de ações

---

## 🐛 Troubleshooting

### **"Workspace não encontrado"**
- Verifique se migrations foram aplicadas
- Verifique se existe ao menos 1 workspace na tabela
- Verifique localStorage: `localStorage.getItem('currentWorkspaceId')`

### **"Acesso negado" (403)**
- RLS está bloqueando. Verifique se:
  - `owner_email` está correto
  - Policies foram criadas corretamente
  - `current_setting('app.current_user_email')` está setado

### **Dados de outro workspace aparecem**
- ❌ NUNCA deve acontecer! Se acontecer:
  - RLS está mal configurado
  - Revisar policies em 009_workspace_rls_policies.sql

---

## 📝 Exemplo Completo

**Criar novo workspace:**
```bash
curl -X POST http://localhost:3000/api/workspaces \
  -H "Content-Type: application/json" \
  -d '{"name": "Acme Corp", "plan": "pro"}'
```

**Criar agente no workspace:**
```bash
curl -X POST http://localhost:3000/api/agents \
  -H "Content-Type: application/json" \
  -H "X-Workspace-ID: <workspace-id>" \
  -d '{
    "name": "Agente Vendas",
    "model": "gpt-4o-mini",
    "system_prompt": "Você é um vendedor"
  }'
```

**Listar agentes do workspace:**
```bash
curl -X GET http://localhost:3000/api/agents \
  -H "X-Workspace-ID: <workspace-id>"
```

---

## 🎓 Conceitos Importantes

### **Multi-Tenancy**
Sistema que permite múltiplos clientes (tenants) compartilharem a mesma infraestrutura, com isolamento de dados.

### **Row Level Security (RLS)**
Recurso do PostgreSQL que filtra linhas automaticamente baseado em políticas. Garante que mesmo com SQL direto, usuários só veem seus dados.

### **Workspace**
Espaço de trabalho isolado. Cada cliente tem seu workspace. Todos os dados (agentes, canais, interações) pertencem a um workspace.

---

**Criado por:** Shiva (Arquiteto S.H.A.R.K.)
**Para:** Red (Engenheiro de Telecomunicações)
**Data:** 2026-02-12
**Versão:** 1.0
