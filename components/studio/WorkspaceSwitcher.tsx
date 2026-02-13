'use client';

import React, { useState, useEffect } from 'react';
import { Select } from '@/components/ui/Select';
import { Building2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Workspace {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  credits_balance: number;
}

export const WorkspaceSwitcher: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/workspaces');
      const result = await response.json();

      if (result.success) {
        setWorkspaces(result.data);

        // Seleciona workspace salvo ou primeiro da lista
        const savedWorkspaceId = localStorage.getItem('currentWorkspaceId');
        if (savedWorkspaceId && result.data.find((w: Workspace) => w.id === savedWorkspaceId)) {
          setCurrentWorkspace(savedWorkspaceId);
        } else if (result.data.length > 0) {
          setCurrentWorkspace(result.data[0].id);
          localStorage.setItem('currentWorkspaceId', result.data[0].id);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar workspaces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWorkspaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const workspaceId = e.target.value;
    setCurrentWorkspace(workspaceId);
    localStorage.setItem('currentWorkspaceId', workspaceId);

    // Recarregar página para atualizar todos os dados
    window.location.reload();
  };

  const selectedWorkspace = workspaces.find(w => w.id === currentWorkspace);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-bg-tertiary rounded-lg">
        <Building2 size={18} className="text-text-muted animate-pulse" />
        <span className="text-sm text-text-muted">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Seletor de Workspace */}
      <div className="flex items-center gap-2 px-3 py-2 bg-bg-tertiary rounded-lg border border-border-subtle hover:border-border-main transition-colors">
        <Building2 size={18} className="text-accent-purple" />
        <select
          value={currentWorkspace || ''}
          onChange={handleWorkspaceChange}
          className="bg-transparent text-sm text-text-primary font-semibold outline-none cursor-pointer"
          style={{ minWidth: '150px' }}
        >
          {workspaces.map(workspace => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </select>
      </div>

      {/* Badge do Plano */}
      {selectedWorkspace && (
        <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${
          selectedWorkspace.plan === 'enterprise' ? 'bg-accent-gold/20 text-accent-gold' :
          selectedWorkspace.plan === 'pro' ? 'bg-accent-purple/20 text-accent-purple' :
          'bg-bg-tertiary text-text-muted'
        }`}>
          {selectedWorkspace.plan}
        </div>
      )}

      {/* Créditos */}
      {selectedWorkspace && (
        <div className="px-3 py-1 bg-bg-tertiary rounded text-xs">
          <span className="text-text-muted">Créditos:</span>{' '}
          <span className="font-bold text-accent-cyan">{selectedWorkspace.credits_balance}</span>
        </div>
      )}

      {/* Botão Novo Workspace */}
      <Button
        variant="secondary"
        icon={<Plus size={16} />}
        onClick={() => {
          // TODO: Abrir modal de criação de workspace
          alert('Modal de criação de workspace em desenvolvimento');
        }}
      >
        Novo
      </Button>
    </div>
  );
};
