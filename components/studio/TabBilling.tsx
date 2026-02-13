'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CreditCard, TrendingUp, Zap, Info, Plus } from 'lucide-react';

interface ContextMultiplier {
  level: 1 | 2 | 3 | 4 | 5;
  name: string;
  history_messages: number;
  behavior_tokens: number;
  base_credits: number;
  multiplier: number;
  total_per_interaction: number;
  color: string;
  recommended?: boolean;
}

export const TabBilling: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [currentBalance, setCurrentBalance] = useState(1500);

  const multipliers: ContextMultiplier[] = [
    {
      level: 1,
      name: 'Básico',
      history_messages: 20,
      behavior_tokens: 3000,
      base_credits: 1,
      multiplier: 1,
      total_per_interaction: 1,
      color: 'from-gray-500 to-gray-600'
    },
    {
      level: 2,
      name: 'Padrão',
      history_messages: 40,
      behavior_tokens: 6000,
      base_credits: 1,
      multiplier: 2,
      total_per_interaction: 2,
      color: 'from-blue-500 to-blue-600'
    },
    {
      level: 3,
      name: 'Avançado',
      history_messages: 60,
      behavior_tokens: 9000,
      base_credits: 1,
      multiplier: 3,
      total_per_interaction: 3,
      color: 'from-accent-purple to-purple-600',
      recommended: true
    },
    {
      level: 4,
      name: 'Profissional',
      history_messages: 80,
      behavior_tokens: 12000,
      base_credits: 1,
      multiplier: 4,
      total_per_interaction: 4,
      color: 'from-accent-cyan to-cyan-600'
    },
    {
      level: 5,
      name: 'Enterprise',
      history_messages: 100,
      behavior_tokens: 15000,
      base_credits: 1,
      multiplier: 5,
      total_per_interaction: 5,
      color: 'from-accent-gold to-yellow-600'
    }
  ];

  const usageStats = {
    total_interactions_today: 47,
    credits_used_today: 141,
    avg_per_interaction: 3,
    projected_monthly: 4230
  };

  const recentTransactions = [
    { date: '12/02/2024', type: 'Compra', amount: 1000, balance: 1500 },
    { date: '10/02/2024', type: 'Consumo', amount: -150, balance: 500 },
    { date: '05/02/2024', type: 'Compra', amount: 500, balance: 650 },
    { date: '01/02/2024', type: 'Consumo', amount: -280, balance: 150 }
  ];

  const selectedMultiplier = multipliers.find(m => m.level === selectedLevel)!;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Saldo Atual */}
      <Card>
        <div style={{ padding: '1.5rem' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-text-muted mb-2">
                Saldo Atual de Créditos
              </h3>
              <p className="text-5xl font-bold text-accent-purple">
                {currentBalance.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-text-muted mt-2">
                Projeção mensal: <span className="text-accent-gold font-semibold">{usageStats.projected_monthly.toLocaleString('pt-BR')} créditos</span>
              </p>
            </div>
            <Button
              variant="primary"
              icon={<Plus size={20} />}
              onClick={() => alert('💳 Redirecionando para página de compra de créditos...')}
            >
              Comprar Créditos
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border-subtle">
            <div className="bg-bg-tertiary rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-1">
                Interações Hoje
              </p>
              <p className="text-2xl font-bold text-accent-cyan">
                {usageStats.total_interactions_today}
              </p>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-1">
                Créditos Gastos Hoje
              </p>
              <p className="text-2xl font-bold text-accent-purple">
                {usageStats.credits_used_today}
              </p>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-text-muted mb-1">
                Média por Interação
              </p>
              <p className="text-2xl font-bold text-accent-gold">
                {usageStats.avg_per_interaction}x
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Multiplicador de Contexto */}
      <Card>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Zap size={20} className="text-accent-gold" />
              Multiplicador de Contexto
            </h3>
            <div className="flex items-center gap-2 bg-accent-purple/10 border border-accent-purple/30 rounded-lg px-3 py-1.5">
              <Info size={16} className="text-accent-purple" />
              <span className="text-xs text-accent-purple font-semibold">
                Atualmente: Nível {selectedLevel} ({selectedMultiplier.total_per_interaction} crédito{selectedMultiplier.total_per_interaction > 1 ? 's' : ''}/interação)
              </span>
            </div>
          </div>

          <p className="text-sm text-text-muted mb-6">
            Escolha o nível de contexto do seu agente. Quanto maior o nível, mais mensagens anteriores e comportamentos o agente lembra durante a conversa.
          </p>

          <div className="grid grid-cols-5 gap-6">
            {multipliers.map((multiplier) => (
              <div
                key={multiplier.level}
                onClick={() => setSelectedLevel(multiplier.level)}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: selectedLevel === multiplier.level ? '3px solid var(--accent-purple)' : '2px solid var(--border-subtle)',
                  backgroundColor: selectedLevel === multiplier.level ? 'rgba(147, 51, 234, 0.05)' : 'var(--bg-card)',
                  transition: 'all 0.3s ease',
                  transform: selectedLevel === multiplier.level ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: selectedLevel === multiplier.level ? '0 8px 32px rgba(147, 51, 234, 0.3)' : 'none'
                }}
              >
                {multiplier.recommended && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--accent-gold)',
                    color: 'var(--bg-primary)',
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Recomendado
                  </div>
                )}

                <div style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '4px',
                  background: `linear-gradient(to right, ${multiplier.color.replace('from-', '#').replace(' to-', ', #')})`,
                  marginBottom: '1.25rem'
                }} />

                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                  textAlign: 'center'
                }}>
                  Nível {multiplier.level}
                </h4>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginBottom: '1.25rem',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600
                }}>
                  {multiplier.name}
                </p>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    marginBottom: '8px'
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>Histórico:</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{multiplier.history_messages} msgs</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem'
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>Comportamento:</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{(multiplier.behavior_tokens / 1000).toFixed(0)}k</span>
                  </div>
                </div>

                <div style={{
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-subtle)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    gap: '4px',
                    marginBottom: '6px'
                  }}>
                    <span style={{
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                      color: 'var(--accent-purple)',
                      lineHeight: 1
                    }}>
                      {multiplier.total_per_interaction}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      fontWeight: 600
                    }}>
                      {multiplier.total_per_interaction > 1 ? 'créditos' : 'crédito'}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    fontWeight: 500
                  }}>
                    por interação
                  </p>
                  <p style={{
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    marginTop: '6px',
                    opacity: 0.7
                  }}>
                    Base: {multiplier.base_credits} × {multiplier.multiplier}x
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-accent-purple/10 border border-accent-purple/30 rounded-lg p-4">
            <h4 className="text-sm font-bold text-accent-purple mb-2">Como Funciona?</h4>
            <ul className="text-xs text-text-muted space-y-1 list-disc list-inside">
              <li>Cada interação do usuário consome créditos baseado no multiplicador escolhido</li>
              <li>Níveis mais altos permitem conversas mais contextualizadas e precisas</li>
              <li>O custo é fixo e previsível: você sabe exatamente quanto cada conversa irá consumir</li>
              <li>Você pode alterar o multiplicador a qualquer momento sem perder o histórico</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Histórico de Transações */}
      <Card>
        <div style={{ padding: '1.5rem' }}>
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-accent-cyan" />
            Histórico de Transações
          </h3>

          <div className="space-y-2">
            {recentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-bg-tertiary border border-border-subtle rounded-lg p-4 hover:border-border-main transition-colors"
              >
                <div className="flex items-center gap-4">
                  <CreditCard size={20} className={transaction.type === 'Compra' ? 'text-green-400' : 'text-red-400'} />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {transaction.type}
                    </p>
                    <p className="text-xs text-text-muted">
                      {transaction.date}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-lg font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-xs text-text-muted">
                    Saldo: {transaction.balance.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            className="w-full mt-4"
            onClick={() => alert('📊 Abrindo relatório completo de transações...')}
          >
            Ver Histórico Completo
          </Button>
        </div>
      </Card>
    </div>
  );
};
