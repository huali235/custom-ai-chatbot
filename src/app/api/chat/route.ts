import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { getAIModel, systemPrompt } from '@/lib/ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    // Validate that messages array exists and is not empty
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response('Invalid messages format', { status: 400 });
    }

    const result = streamText({
      model: getAIModel(),
      system: systemPrompt,
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Return more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return new Response('API configuration error', { status: 500 });
      }
      if (error.message.includes('rate limit')) {
        return new Response('Rate limit exceeded. Please try again later.', { status: 429 });
      }
    }
    
    return new Response('An error occurred while processing your request', { status: 500 });
  }
}