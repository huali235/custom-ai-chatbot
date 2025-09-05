import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

// Default to OpenAI, can be configured via environment variables
export const getAIModel = () => {
  const provider = process.env.AI_PROVIDER || 'openai';
  
  switch (provider) {
    case 'anthropic':
      return anthropic('claude-3-sonnet-20240229');
    case 'openai':
    default:
      return openai('gpt-4-turbo-preview');
  }
};

export const systemPrompt = `You are a helpful AI travel assistant. You specialize in helping users plan their trips, find accommodations, discover attractions, and arrange transportation. Be friendly, informative, and provide practical travel advice. Keep your responses concise but helpful.`;