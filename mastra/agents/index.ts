import { Agent } from '@mastra/core';
import { openai } from '@ai-sdk/openai';

export const nexusAgent = new Agent({
    id: 'nexus-admin',
    name: 'Nexus Admin',
    instructions: 'Você é o Nexus, um agente administrativo de elite para o Victor. Sua missão é gerenciar integrações e bases de dados com precisão cirúrgica.',
    model: openai('gpt-4o'),
});
