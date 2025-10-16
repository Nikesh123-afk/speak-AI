/**
 * Google Gemini AI Client
 * FREE alternative to Perplexity for IELTS feedback
 * 1500 requests/day free tier
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with API key from environment
const getGeminiClient = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn('⚠️ VITE_GOOGLE_GEMINI_API_KEY not found in environment');
    console.warn('Get your free API key at: https://aistudio.google.com/apikey');
    return null;
  }
  
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Generate IELTS speaking feedback using Gemini
 */
export async function generateSpeakingFeedbackWithGemini(
  transcript: string,
  question: string,
  currentBandScore: number,
  part: 1 | 2 | 3 = 2
): Promise<string> {
  const genAI = getGeminiClient();
  
  if (!genAI) {
    throw new Error('Gemini API key not configured. Please add VITE_GOOGLE_GEMINI_API_KEY to your .env file.');
  }

  try {
    // Use Gemini 1.5 Flash (fastest, free, great quality)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert IELTS speaking examiner with 10+ years of experience. Provide detailed, constructive feedback based on the four IELTS speaking assessment criteria:

1. Fluency and Coherence
2. Lexical Resource (Vocabulary)
3. Lexical Range and Accuracy
4. Pronunciation

IELTS Speaking Part ${part}
Question: "${question}"

Student's Response:
"${transcript}"

Current Estimated Band Score: ${currentBandScore}

Please provide:
1. Overall assessment of the response
2. Specific strengths in each criterion
3. Areas for improvement in each criterion
4. Estimated band scores for each criterion (0-9 scale)
5. Actionable tips to improve to the next band level
6. An example of how a Band 7-8 candidate might answer this question

Be specific, encouraging, and constructive in your feedback. Use the IELTS band descriptors accurately.`;

    console.log('🤖 Generating feedback with Gemini 1.5 Flash...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const feedback = response.text();
    
    console.log('✅ Gemini feedback generated successfully');
    return feedback;
    
  } catch (error: any) {
    console.error('❌ Error generating feedback with Gemini:', error);
    
    if (error.message?.includes('API key')) {
      throw new Error('Invalid Gemini API key. Get a free key at: https://aistudio.google.com/apikey');
    }
    
    throw new Error('Failed to generate feedback. Please try again.');
  }
}

/**
 * Generate follow-up question using Gemini (optional, for fallback)
 */
export async function generateFollowUpWithGemini(
  topic: string,
  previousResponse: string,
  difficulty: 'easy' | 'medium' | 'hard',
  part: 1 | 2 | 3
): Promise<string> {
  const genAI = getGeminiClient();
  
  if (!genAI) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const difficultyGuidance = {
      easy: 'Keep questions straightforward and focused on personal experience or factual information.',
      medium: 'Ask questions that require elaboration, examples, and some abstract thinking.',
      hard: 'Ask questions that require analysis, comparison, abstract thinking, and well-developed arguments.',
    };

    const partGuidance = {
      1: 'Ask about personal information, daily life, hobbies, or familiar topics. Keep it simple and direct.',
      2: 'This is a long turn topic. Generate questions related to describing experiences, places, or people.',
      3: 'Ask analytical, abstract questions that require discussion of ideas, causes, effects, or societal implications.',
    };

    const prompt = `You are an experienced IELTS speaking examiner conducting Part ${part} of the speaking test.

${partGuidance[part]}
${difficultyGuidance[difficulty]}

Topic: ${topic}
Student's Previous Response: "${previousResponse}"
Difficulty Level: ${difficulty}

Generate ONE natural follow-up question that:
- Is relevant to what the student just said
- Encourages them to elaborate or explore a new angle
- Matches the ${difficulty} difficulty level
- Sounds natural and conversational
- Is appropriate for IELTS Part ${part}

Respond with ONLY the question, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const question = response.text().trim();
    
    console.log('✅ Follow-up question generated:', question);
    return question;
    
  } catch (error) {
    console.error('❌ Error generating question with Gemini:', error);
    throw error;
  }
}

/**
 * Generate Part 2 cue card using Gemini (optional, for fallback)
 */
export async function generateCueCardWithGemini(): Promise<{
  mainTopic: string;
  description: string;
  points: string[];
}> {
  const genAI = getGeminiClient();
  
  if (!genAI) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Generate a realistic IELTS Speaking Part 2 cue card topic.

Format your response exactly like this:

Topic: [Main topic title]
Description: [Brief description of what to talk about]
Points:
1. [First bullet point]
2. [Second bullet point]
3. [Third bullet point]
4. [Fourth bullet point]

Example topics: Describe a memorable journey, Describe a person who influenced you, Describe a skill you learned, etc.

Generate a new, interesting cue card now:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the response
    const topicMatch = text.match(/Topic:\s*(.+)/);
    const descMatch = text.match(/Description:\s*(.+)/);
    const pointsMatch = text.match(/Points:\s*\n([\s\S]+)/);
    
    const mainTopic = topicMatch ? topicMatch[1].trim() : 'Describe a memorable experience';
    const description = descMatch ? descMatch[1].trim() : 'Talk about a memorable experience you had.';
    const pointsText = pointsMatch ? pointsMatch[1] : '';
    const points = pointsText
      .split('\n')
      .filter(line => line.trim().match(/^\d+\./))
      .map(line => line.replace(/^\d+\.\s*/, '').trim());
    
    return {
      mainTopic,
      description,
      points: points.length > 0 ? points : [
        'When and where it happened',
        'Who was involved',
        'What made it memorable',
        'How you felt about it'
      ]
    };
    
  } catch (error) {
    console.error('❌ Error generating cue card with Gemini:', error);
    throw error;
  }
}

/**
 * Check if Gemini is configured
 */
export function isGeminiConfigured(): boolean {
  return !!import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
}

/**
 * Get setup instructions
 */
export function getGeminiSetupInstructions(): string {
  return `
🔑 Gemini API Setup (100% FREE):

1. Go to: https://aistudio.google.com/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy your API key
5. Create a .env file in your project root
6. Add: VITE_GOOGLE_GEMINI_API_KEY=your_api_key_here
7. Restart the development server

Free tier: 1500 requests per day (enough for 100+ practice sessions!)
No credit card required!
  `.trim();
}
