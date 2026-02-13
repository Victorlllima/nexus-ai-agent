// Script para inserir config Evolution no Supabase
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://yjipzehopyndeigjrpsb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqaXB6ZWhvcHluZGVpZ2pycHNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MzA1NTUsImV4cCI6MjA4NjUwNjU1NX0.20J8b7jwOsG7JOKRJNItonHKQXabUjZLNtMqXDUtfPM'
);

async function setup() {
  console.log('🚀 Configurando Evolution API no Supabase...\n');

  // 1. Buscar ou criar agente
  let agent;
  const { data: existingAgent } = await supabase
    .from('agents')
    .select('*')
    .limit(1)
    .single();

  if (existingAgent) {
    agent = existingAgent;
    console.log('✅ Agente existente encontrado:', agent.name);
  } else {
    const { data: newAgent, error: agentError } = await supabase
      .from('agents')
      .insert({
        name: 'Nexus AI Agent',
        model: 'gpt-4o-mini',
        system_prompt: 'Você é um assistente virtual prestativo e amigável.',
        temperature: 0.7
      })
      .select()
      .single();

    if (agentError) throw agentError;
    agent = newAgent;
    console.log('✅ Agente criado:', agent.name);
  }

  // 2. Deletar canal existente (se houver)
  await supabase
    .from('channels')
    .delete()
    .eq('type', 'whatsapp_web');

  // 3. Inserir canal WhatsApp Web
  const { data: channel, error: channelError } = await supabase
    .from('channels')
    .insert({
      agent_id: agent.id,
      type: 'whatsapp_web',
      config: {
        mode: 'web',
        evolutionEndpoint: 'https://evo.redpro.com.br',
        instanceId: 'A6B7E7CCE241-4DCB-9E27-5EDA0C6908C2',
        apiKey: 'kpzAaBVqwV6DdjV4iqDjG83BbJ6JqtUomXm'
      },
      is_active: true
    })
    .select()
    .single();

  if (channelError) throw channelError;

  console.log('\n✅ Canal WhatsApp configurado com sucesso!');
  console.log('📋 Detalhes:');
  console.log('  - Agent ID:', agent.id);
  console.log('  - Channel ID:', channel.id);
  console.log('  - Endpoint:', channel.config.evolutionEndpoint);
  console.log('  - Instance ID:', channel.config.instanceId);
  console.log('\n🎯 Pronto para receber mensagens!\n');
}

setup().catch(console.error);
