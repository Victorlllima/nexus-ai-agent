import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
    const supabase = getSupabaseClient();
    const body = await request.json();
    const {
      mode,
      evolutionEndpoint,
      instanceId,
      apiKey,
      phoneNumberId,
      accessToken,
      config
    } = body;

    // Verifica se já existe uma configuração de WhatsApp
    const { data: existing, error: fetchError } = await supabase
      .from('channels')
      .select('*')
      .eq('type', mode === 'web' ? 'whatsapp_web' : 'whatsapp_meta')
      .single();

    const channelConfig = {
      type: mode === 'web' ? 'whatsapp_web' : 'whatsapp_meta',
      config: {
        mode,
        ...(mode === 'web' ? {
          evolutionEndpoint,
          instanceId,
          apiKey
        } : {
          phoneNumberId,
          accessToken
        }),
        ...config
      },
      is_active: true
    };

    let result;
    if (existing) {
      // Atualiza registro existente
      const { data, error } = await supabase
        .from('channels')
        .update(channelConfig)
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Cria novo registro
      const { data, error } = await supabase
        .from('channels')
        .insert([channelConfig])
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Configuração salva com sucesso!'
    });

  } catch (error: any) {
    console.error('Erro ao salvar configuração WhatsApp:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao salvar configuração'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'web';

    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .eq('type', mode === 'web' ? 'whatsapp_web' : 'whatsapp_meta')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: data || null
    });

  } catch (error: any) {
    console.error('Erro ao carregar configuração WhatsApp:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao carregar configuração'
      },
      { status: 500 }
    );
  }
}
