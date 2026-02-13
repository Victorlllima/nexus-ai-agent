// Script para criar workspaces de teste
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://yjipzehopyndeigjrpsb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqaXB6ZWhvcHluZGVpZ2pycHNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MzA1NTUsImV4cCI6MjA4NjUwNjU1NX0.20J8b7jwOsG7JOKRJNItonHKQXabUjZLNtMqXDUtfPM'
);

async function seed() {
  console.log('🌱 Criando workspaces de teste...\n');

  // Deletar workspaces existentes para poder recriar
  await supabase.from('workspaces').delete().eq('owner_email', 'admin@nexus.ai');

  // Criar 3 workspaces de teste
  const { data: workspaces, error } = await supabase
    .from('workspaces')
    .insert([
      {
        name: 'Red - Workspace Principal',
        owner_email: 'admin@nexus.ai',
        plan: 'enterprise',
        credits_balance: 999999,
        is_admin: true // Admin = créditos ilimitados!
      },
      {
        name: 'Cliente Teste - Acme Corp',
        owner_email: 'admin@nexus.ai',
        plan: 'pro',
        credits_balance: 1000,
        is_admin: false
      },
      {
        name: 'Cliente Free - Startup XYZ',
        owner_email: 'admin@nexus.ai',
        plan: 'free',
        credits_balance: 100,
        is_admin: false
      }
    ])
    .select();

  if (error) {
    console.error('❌ Erro ao criar workspaces:', error);
    return;
  }

  workspaces.forEach((ws, i) => {
    const credits = ws.is_admin ? '∞ ILIMITADOS' : `${ws.credits_balance} créditos`;
    const adminBadge = ws.is_admin ? '👑 ADMIN' : '';
    console.log(`✅ Workspace ${i + 1}: ${ws.name} (${ws.plan.toUpperCase()}) ${adminBadge} - ${credits}`);
  });

  console.log('\n🎉 Seed completo!');
  console.log('\nAgora você pode testar o WorkspaceSwitcher com 3 workspaces diferentes.');
  console.log('Abra http://localhost:3000 e veja o seletor no header!');
}

seed().catch(console.error);
