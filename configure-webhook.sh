#!/bin/bash
# Configurar webhook Evolution API

curl -X POST 'https://evo.redpro.com.br/webhook/set/A6B7E7CCE241-4DCB-9E27-5EDA0C6908C2' \
  -H 'Content-Type: application/json' \
  -H 'apikey: kpzAaBVqwV6DdjV4iqDjG83BbJ6JqtUomXm' \
  -d '{
    "url": "https://nexus-ai-agent-one.vercel.app/api/webhooks/evolution",
    "webhook_by_events": false,
    "webhook_base64": false,
    "events": [
      "MESSAGES_UPSERT"
    ]
  }'
