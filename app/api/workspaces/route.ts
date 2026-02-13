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

// GET - Listar workspaces do usuário
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();

    // TODO: Integrar com autenticação real (Supabase Auth)
    // Por enquanto, usa email fixo para desenvolvimento
    const userEmail = 'admin@nexus.ai';

    // Configurar contexto de usuário para RLS
    await supabase.rpc('set_config', {
      key: 'app.current_user_email',
      value: userEmail
    });

    const { data: workspaces, error } = await supabase
      .from('workspaces')
      .select('*')
      .eq('owner_email', userEmail)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: workspaces
    });
  } catch (error: any) {
    console.error('Erro ao listar workspaces:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao listar workspaces'
      },
      { status: 500 }
    );
  }
}

// POST - Criar novo workspace
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    const { name, plan = 'free' } = body;

    // Validação
    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nome do workspace deve ter no mínimo 3 caracteres'
        },
        { status: 400 }
      );
    }

    // TODO: Integrar com autenticação real
    const userEmail = 'admin@nexus.ai';

    // Configurar créditos baseado no plano
    const creditsMap = {
      free: 100,
      pro: 1000,
      enterprise: 10000
    };

    const { data: workspace, error } = await supabase
      .from('workspaces')
      .insert({
        name: name.trim(),
        owner_email: userEmail,
        plan,
        credits_balance: creditsMap[plan as keyof typeof creditsMap] || 100
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: workspace
    });
  } catch (error: any) {
    console.error('Erro ao criar workspace:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao criar workspace'
      },
      { status: 500 }
    );
  }
}

// PATCH - Atualizar workspace
export async function PATCH(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    const { id, name, plan, credits_balance } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do workspace é obrigatório' },
        { status: 400 }
      );
    }

    // TODO: Integrar com autenticação real
    const userEmail = 'admin@nexus.ai';

    const updateData: any = {};
    if (name) updateData.name = name.trim();
    if (plan) updateData.plan = plan;
    if (credits_balance !== undefined) updateData.credits_balance = credits_balance;

    const { data: workspace, error } = await supabase
      .from('workspaces')
      .update(updateData)
      .eq('id', id)
      .eq('owner_email', userEmail) // Garante que só atualiza se for owner
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: workspace
    });
  } catch (error: any) {
    console.error('Erro ao atualizar workspace:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao atualizar workspace'
      },
      { status: 500 }
    );
  }
}

// DELETE - Deletar workspace
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do workspace é obrigatório' },
        { status: 400 }
      );
    }

    // TODO: Integrar com autenticação real
    const userEmail = 'admin@nexus.ai';

    const { error } = await supabase
      .from('workspaces')
      .delete()
      .eq('id', id)
      .eq('owner_email', userEmail); // Garante que só deleta se for owner

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Workspace deletado com sucesso'
    });
  } catch (error: any) {
    console.error('Erro ao deletar workspace:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao deletar workspace'
      },
      { status: 500 }
    );
  }
}
