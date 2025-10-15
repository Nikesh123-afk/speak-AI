/**
 * Speaking Feedback Generator using Perplexity AI
 * Generates detailed IELTS-specific feedback on speaking responses
 */

import { callPerplexity, PERPLEXITY_MODELS, type PerplexityMessage } from './perplexity-client';

export interface SpeakingFeedback {
  strengths: string[];
  improvements: {
    fluency: string;
    vocabulary: string;
    grammar: string;
    pronunciation: string;
  };
  actionableTips: string[];
  exampleResponse: string;
  bandScoreBreakdown: {
    fluency: number;
    vocabulary: number;
    grammar: number;
    pronunciation: number;
  };
}

/**
 * Generate comprehensive feedback for an IELTS speaking response
 */
export async function generateSpeakingFeedback(
  transcript: string,
  question: string,
  currentBandScore: number,
  part: 1 | 2 | 3 = 2
): Promise<string> {
  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: `You are an expert IELTS speaking examiner with 10+ years of experience. Provide detailed, constructive feedback based on the four IELTS speaking assessment criteria:
1. Fluency and Coherence
2. Lexical Resource (Vocabulary)
3. Grammatical Range and Accuracy
4. Pronunciation

Be specific, encouraging, and actionable in your feedback.`,
    },
    {
      role: 'user',
      content: `
IELTS Speaking Part ${part}
Question: "${question}"
Student Response: "${transcript}"
Current Estimated Band Score: ${currentBandScore}

Please provide comprehensive feedback in the following format:

**STRENGTHS:**
- List 3-4 specific strengths in the response

**AREAS FOR IMPROVEMENT:**

*Fluency & Coherence:*
- Specific observations and suggestions

*Lexical Resource:*
- Vocabulary usage analysis and recommendations

*Grammatical Range & Accuracy:*
- Grammar observations and corrections needed

*Pronunciation:*
- Pronunciation patterns and improvement areas

**ACTIONABLE TIPS:**
1. First specific action to improve
2. Second specific action to improve
3. Third specific action to improve

**IMPROVED EXAMPLE RESPONSE:**
Provide a band ${Math.min(currentBandScore + 1, 9)} version of the same response, showing exactly how it could be improved.

**BAND SCORE BREAKDOWN:**
- Fluency & Coherence: X.X/9
- Lexical Resource: X.X/9
- Grammatical Range & Accuracy: X.X/9
- Pronunciation: X.X/9 (estimated based on transcript patterns)
      `.trim(),
    },
  ];

  const response = await callPerplexity(messages, {
    model: PERPLEXITY_MODELS.SONAR_PRO,
    max_tokens: 2000,
    temperature: 0.6,
  });

  return response.choices[0].message.content;
}

/**
 * Generate quick feedback for real-time practice
 */
export async function generateQuickFeedback(
  transcript: string,
  question: string
): Promise<string> {
  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: 'You are an IELTS speaking coach. Provide brief, encouraging feedback.',
    },
    {
      role: 'user',
      content: `Question: "${question}"
Response: "${transcript}"

Provide brief feedback (3-4 sentences) highlighting:
1. One thing done well
2. One area to improve
3. One quick tip for next time`,
    },
  ];

  const response = await callPerplexity(messages, {
    model: PERPLEXITY_MODELS.SONAR,
    max_tokens: 300,
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}

/**
 * Generate grammar corrections with explanations
 */
export async function generateGrammarCorrections(transcript: string): Promise<string> {
  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: 'You are an expert English grammar teacher specializing in IELTS preparation.',
    },
    {
      role: 'user',
      content: `Analyze this IELTS speaking response for grammatical errors:

"${transcript}"

For each error found:
1. Quote the incorrect phrase
2. Provide the correction
3. Explain why (briefly)
4. Rate the severity (minor/moderate/major)

If there are no errors, acknowledge the correct usage.`,
    },
  ];

  const response = await callPerplexity(messages, {
    model: PERPLEXITY_MODELS.SONAR_PRO,
    max_tokens: 1000,
  });

  return response.choices[0].message.content;
}

/**
 * Generate vocabulary enhancement suggestions
 */
export async function generateVocabularyEnhancements(
  transcript: string,
  topic: string,
  targetBand: number
): Promise<string> {
  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: `You are a vocabulary expert for IELTS speaking. Help students use more sophisticated, topic-specific vocabulary suitable for band ${targetBand}.`,
    },
    {
      role: 'user',
      content: `Topic: ${topic}
Current Response: "${transcript}"
Target Band: ${targetBand}

Suggest vocabulary improvements:
1. Identify basic words that could be upgraded
2. Suggest band ${targetBand} alternatives
3. Provide example sentences using the new vocabulary
4. List 5 additional topic-specific words/phrases they should learn

Format each suggestion as:
- Basic word → Advanced alternative
- Example: "..."
- Why it's better: (brief explanation)`,
    },
  ];

  const response = await callPerplexity(messages, {
    model: PERPLEXITY_MODELS.SONAR_PRO,
    max_tokens: 1500,
  });

  return response.choices[0].message.content;
}

/**
 * Generate pronunciation tips based on transcript
 */
export async function generatePronunciationTips(
  transcript: string,
  detectedIssues?: string[]
): Promise<string> {
  const issuesText = detectedIssues && detectedIssues.length > 0
    ? `\n\nDetected pronunciation challenges: ${detectedIssues.join(', ')}`
    : '';

  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: 'You are a pronunciation specialist for IELTS speaking test preparation.',
    },
    {
      role: 'user',
      content: `Based on this speaking response, provide pronunciation guidance:

"${transcript}"${issuesText}

Provide:
1. Identify 3-5 words that might be challenging to pronounce
2. Give phonetic pronunciation for each
3. Provide tips for correct pronunciation
4. Suggest similar-sounding words to practice
5. Recommend specific pronunciation exercises`,
    },
  ];

  const response = await callPerplexity(messages, {
    model: PERPLEXITY_MODELS.SONAR,
    max_tokens: 1000,
  });

  return response.choices[0].message.content;
}

/**
 * Compare response to model answer
 */
export async function compareToModelAnswer(
  studentResponse: string,
  modelAnswer: string,
  question: string
): Promise<string> {
  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: 'You are an IELTS examiner comparing student responses to model answers.',
    },
    {
      role: 'user',
      content: `Question: "${question}"

Student Response: "${studentResponse}"

Model Answer (Band 9): "${modelAnswer}"

Compare these responses and explain:
1. Key differences in approach
2. What the model answer does better
3. What the student can learn from the model
4. Specific techniques to adopt
5. Estimated band score difference and why`,
    },
  ];

  const response = await callPerplexity(messages, {
    model: PERPLEXITY_MODELS.SONAR_PRO,
    max_tokens: 1500,
  });

  return response.choices[0].message.content;
}
