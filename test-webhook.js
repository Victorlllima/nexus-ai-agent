// Script de teste do webhook Evolution API
// Simula uma mensagem recebida

const webhookPayload = {
  event: "messages.upsert",
  instance: "SEU_INSTANCE_ID_AQUI", // Substitua pelo seu instance ID
  data: {
    messages: [
      {
        key: {
          remoteJid: "5511999999999@s.whatsapp.net",
          fromMe: false,
          id: "3EB0ABCD1234567890"
        },
        message: {
          conversation: "Oi"
        },
        messageTimestamp: Date.now()
      }
    ]
  }
};

fetch('https://nexus-ai-agent-one.vercel.app/api/webhooks/evolution', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(webhookPayload)
})
.then(res => res.json())
.then(data => {
  console.log('✅ Resposta do webhook:');
  console.log(JSON.stringify(data, null, 2));
})
.catch(err => {
  console.error('❌ Erro:', err);
});
