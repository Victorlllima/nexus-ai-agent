import { Mastra } from '@mastra/core';
import { nexusAgent } from './agents';

export const mastra = new Mastra({
    agents: { nexusAgent },
});
