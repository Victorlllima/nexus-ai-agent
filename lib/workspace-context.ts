/**
 * Workspace Context Helper
 *
 * Gerencia o contexto de workspace para multi-tenancy.
 * Todas as operações de API devem usar getCurrentWorkspaceId()
 * para garantir isolamento de dados.
 */

export function getCurrentWorkspaceId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('currentWorkspaceId');
}

export function setCurrentWorkspaceId(workspaceId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('currentWorkspaceId', workspaceId);
}

export function clearCurrentWorkspaceId(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('currentWorkspaceId');
}

/**
 * Adiciona workspace_id aos headers de requisição
 */
export function getWorkspaceHeaders(): HeadersInit {
  const workspaceId = getCurrentWorkspaceId();
  if (!workspaceId) {
    throw new Error('Nenhum workspace selecionado');
  }

  return {
    'Content-Type': 'application/json',
    'X-Workspace-ID': workspaceId
  };
}

/**
 * Extrai workspace_id dos headers de requisição (server-side)
 */
export function getWorkspaceIdFromRequest(request: Request): string | null {
  return request.headers.get('X-Workspace-ID');
}
