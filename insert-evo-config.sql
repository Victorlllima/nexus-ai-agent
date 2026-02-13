-- Inserir configuração Evolution API direto no banco

-- 1. Buscar ou criar agente
INSERT INTO agents (name, model, system_prompt, temperature)
SELECT 'Nexus AI Agent', 'gpt-4o-mini', 'Você é um assistente virtual prestativo e amigável.', 0.7
WHERE NOT EXISTS (SELECT 1 FROM agents LIMIT 1);

-- 2. Inserir canal WhatsApp Web
INSERT INTO channels (agent_id, type, config, is_active)
SELECT
  (SELECT id FROM agents LIMIT 1),
  'whatsapp_web',
  jsonb_build_object(
    'mode', 'web',
    'evolutionEndpoint', 'https://evo.redpro.com.br',
    'instanceId', 'A6B7E7CCE241-4DCB-9E27-5EDA0C6908C2',
    'apiKey', 'kpzAaBVqwV6DdjV4iqDjG83BbJ6JqtUomXm'
  ),
  true
ON CONFLICT DO NOTHING;
