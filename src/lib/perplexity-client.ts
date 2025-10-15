/**
 * Perplexity AI Client
 * Handles all interactions with the Perplexity API for IELTS Speaking AI
 */

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

export interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface PerplexityConfig {
  model?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  stream?: boolean;
  presence_penalty?: number;
  frequency_penalty?: number;
}

export interface PerplexityResponse {
  id: string;
  model: string;
  created: number;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: Array<{
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta?: {
      role?: string;
      content?: string;
    };
  }>;
}

/**
 * Available Perplexity AI Models (Updated for 2025)
 */
export const PERPLEXITY_MODELS = {
  SONAR: 'sonar',                           // Lightweight, cost-effective search model
  SONAR_PRO: 'sonar-pro',                   // Advanced search with complex queries
  SONAR_REASONING: 'sonar-reasoning',       // Fast reasoning with search
  SONAR_REASONING_PRO: 'sonar-reasoning-pro', // Precise reasoning powered by DeepSeek-R1
  SONAR_DEEP_RESEARCH: 'sonar-deep-research', // Expert-level comprehensive research
} as const;

/**
 * Default configuration for IELTS feedback generation
 */
export const DEFAULT_CONFIG: PerplexityConfig = {
  model: PERPLEXITY_MODELS.SONAR_PRO,
  max_tokens: 1500,
  temperature: 0.7,
  top_p: 0.9,
  stream: false,
};

/**
 * Call Perplexity AI API
 * @param messages - Array of conversation messages
 * @param config - Optional configuration overrides
 * @returns API response with generated content
 */
export async function callPerplexity(
  messages: PerplexityMessage[],
  config: PerplexityConfig = {}
): Promise<PerplexityResponse> {
  const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Perplexity API key not configured. Please add VITE_PERPLEXITY_API_KEY to your .env file'
    );
  }

  const requestConfig = { ...DEFAULT_CONFIG, ...config };

  try {
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...requestConfig,
        messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Perplexity API error (${response.status}): ${
          errorData.error?.message || response.statusText
        }`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to call Perplexity API: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Stream responses from Perplexity AI (for real-time feedback)
 * @param messages - Array of conversation messages
 * @param config - Optional configuration overrides
 * @param onChunk - Callback for each response chunk
 */
export async function streamPerplexity(
  messages: PerplexityMessage[],
  onChunk: (chunk: string) => void,
  config: PerplexityConfig = {}
): Promise<void> {
  const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;

  if (!apiKey) {
    throw new Error('Perplexity API key not configured');
  }

  const requestConfig = { ...DEFAULT_CONFIG, ...config, stream: true };

  const response = await fetch(PERPLEXITY_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...requestConfig,
      messages,
    }),
  });

  if (!response.ok) {
    throw new Error(`Perplexity API error: ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    throw new Error('Response body is not readable');
  }

  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0]?.delta?.content;
            if (content) {
              onChunk(content);
            }
          } catch (e) {
            console.error('Failed to parse stream chunk:', e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Test Perplexity API connection
 * @returns True if API is working, false otherwise
 */
export async function testPerplexityConnection(): Promise<boolean> {
  try {
    const response = await callPerplexity(
      [
        {
          role: 'user',
          content: 'Say "OK" if you can read this message.',
        },
      ],
      {
        model: PERPLEXITY_MODELS.SONAR,
        max_tokens: 10,
      }
    );

    return response.choices[0]?.message?.content.length > 0;
  } catch (error) {
    console.error('Perplexity connection test failed:', error);
    return false;
  }
}
