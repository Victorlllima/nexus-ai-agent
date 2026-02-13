import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { hasCredits, deductCredits, recordInteraction } from '@/lib/credits';

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase credentials not configured');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('📩 Webhook Evolution recebido:', JSON.stringify(body, null, 2));

    // Estrutura típica do webhook Evolution API
    const { event, instance, data } = body;

    // Ignorar eventos que não são mensagens recebidas
    if (event !== 'messages.upsert') {
      return NextResponse.json({
        success: true,
        message: 'Event ignored'
      });
    }

    // Extrair informações da mensagem (estrutura Evolution API)
    if (!data?.key) {
      return NextResponse.json({
        success: true,
        message: 'No message data'
      });
    }

    // Ignorar mensagens enviadas pelo próprio bot
    if (data.key.fromMe) {
      return NextResponse.json({
        success: true,
        message: 'Message from bot ignored'
      });
    }

    const remoteJid = data.key.remoteJid;
    const messageText = data.message?.conversation ||
                        data.message?.extendedTextMessage?.text ||
                        '';

    console.log('📱 Mensagem recebida:', {
      from: remoteJid,
      text: messageText,
      instance: instance
    });

    // Buscar configuração do canal no Supabase
    const supabase = getSupabaseClient();
    const { data: channel, error } = await supabase
      .from('channels')
      .select('*')
      .eq('type', 'whatsapp_web')
      .eq('is_active', true)
      .single();

    if (error || !channel) {
      console.error('❌ Canal não encontrado:', error);
      return NextResponse.json({
        success: false,
        error: 'Channel not configured'
      }, { status: 404 });
    }

    const config = channel.config as any;

    // Validar se a mensagem é da instância correta
    console.log('🔍 Validando instance:', {
      received: instance,
      configured: config.instanceId,
      match: config.instanceId === instance
    });

    if (config.instanceId !== instance) {
      return NextResponse.json({
        success: true,
        message: 'Instance mismatch',
        debug: {
          received: instance,
          configured: config.instanceId
        }
      });
    }

    // Verificar créditos antes de processar
    const creditsRequired = 1; // Echo simples = 1 crédito
    const workspaceId = channel.workspace_id;

    const canProceed = await hasCredits(workspaceId, creditsRequired);
    if (!canProceed) {
      console.log('❌ Créditos insuficientes');
      // Enviar mensagem de aviso
      await fetch(`${config.evolutionEndpoint}/message/sendText/${instance}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': config.apiKey
        },
        body: JSON.stringify({
          number: remoteJid,
          text: '⚠️ Créditos insuficientes. Por favor, recarregue seu saldo para continuar usando o serviço.'
        })
      });
      return NextResponse.json({
        success: false,
        error: 'Insufficient credits'
      }, { status: 402 });
    }

    console.log('✅ Mensagem válida para processamento');

    // Enviar resposta de teste via Evolution API
    const evolutionEndpoint = config.evolutionEndpoint;
    const apiKey = config.apiKey;

    const responseText = `Echo: ${messageText}`;

    const sendResponse = await fetch(`${evolutionEndpoint}/message/sendText/${instance}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify({
        number: remoteJid,
        text: responseText
      })
    });

    if (!sendResponse.ok) {
      console.error('❌ Erro ao enviar resposta:', await sendResponse.text());
    } else {
      console.log('✅ Resposta enviada com sucesso');
    }

    // Descontar créditos (admins não são descontados automaticamente)
    await deductCredits(workspaceId, creditsRequired);

    // Salvar interação no Supabase
    await recordInteraction(
      workspaceId,
      channel.agent_id,
      channel.id,
      messageText,
      responseText,
      creditsRequired
    );

    return NextResponse.json({
      success: true,
      message: 'Message processed'
    });

  } catch (error: any) {
    console.error('❌ Erro no webhook Evolution:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal error'
      },
      { status: 500 }
    );
  }
}

// GET para verificar se o webhook está funcionando
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    webhook: 'Evolution API Webhook',
    timestamp: new Date().toISOString()
  });
}
