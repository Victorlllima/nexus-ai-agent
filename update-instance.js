const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://yjipzehopyndeigjrpsb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqaXB6ZWhvcHluZGVpZ2pycHNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MzA1NTUsImV4cCI6MjA4NjUwNjU1NX0.20J8b7jwOsG7JOKRJNItonHKQXabUjZLNtMqXDUtfPM'
);

async function update() {
  console.log('🔄 Atualizando Instance ID...\n');

  const { data, error } = await supabase
    .from('channels')
    .update({
      config: {
        mode: 'web',
        evolutionEndpoint: 'https://evo.redpro.com.br',
        instanceId: 'A6B7E7CCE241-4DCB-9E27-5EDA0C6908C2',
        apiKey: 'kpzAaBVqwV6DdjV4iqDjG83BbJ6JqtUomXm'
      }
    })
    .eq('type', 'whatsapp_web')
    .select();

  if (error) throw error;

  console.log('✅ Instance ID atualizado com sucesso!');
  console.log('📋 Config:', data[0].config);
}

update().catch(console.error);
