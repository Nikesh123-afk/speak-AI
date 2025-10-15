/**
 * AI Examiner using Perplexity AI
 * Simulates a realistic IELTS speaking examiner
 */

import { callPerplexity, PERPLEXITY_MODELS, type PerplexityMessage } from './perplexity-client';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type SpeakingPart = 1 | 2 | 3;

/**
 * Generate a follow-up question based on the student's response
 */
export async function generateFollowUpQuestion(
  topic: string,
  previousResponse: string,
  difficulty: Difficulty = 'medium',
  part: SpeakingPart = 2
): Promise<string> {
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

  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: `You are an experienced IELTS speaking examiner conducting Part ${part} of the speaking test. 
${partGuidance[part]}
${difficultyGuidance[difficulty]}

Generate natural, conversational questions that follow IELTS format and maintain a professional but friendly tone.`,
    },
    {
      role: 'user',
      content: `Topic: ${topic}
Student's Previous Response: "${previousResponse}"
Difficulty Level: ${difficulty}

Generate ONE natural follow-up question that:
- Is relevant to what the student just said
- Encourages them to elaborate or explore a new angle
- Matches the ${difficulty} difficulty level
- Follows IELTS Part ${part} question patterns

Return ONLY the question, nothing else.`,
    },
  ];

  const response = await callPerplexity(messages, {
    model: PERPLEXITY_MODELS.SONAR,
    max_tokens: 100,
    temperature: 0.8,
  });

  return response.choices[0].message.content.trim().replace(/^["']|["']$/g, '');
}

/**
 * Generate Part 1 questions (Introduction & Interview)
 */
export async function generatePart1Questions(
  count: number = 4,
  topics?: string[]
): Promise<string[]> {
  const topicList = topics && topics.length > 0 
    ? `Focus on these topics: ${topics.join(', ')}`
    : 'Choose common IELTS Part 1 topics like work, studies, hometown, hobbies, daily routine, etc.';

  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: 'You are an IELTS examiner creating Part 1 questions.',
    },
    {
      role: 'user',
      content: `Generate ${count} IELTS Speaking Part 1 questions.
${topicList}

Requirements:
- Simple, direct questions about familiar topics
- Focus on personal experience and daily life
- Natural, conversational tone
- Mix of present, past, and future tenses

Return ONLY the questions, one per line, numbered.`,
    },
  ];

  const response = await callPerplexity(messages, {
    model: PERPLEXITY_MODELS.SONAR,
    max_tokens: 300,
  });

  return response.choices[0].message.content
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.replace(/^\d+\.\s*/, '').trim());
}

/**
 * Generate Part 2 cue card (Long Turn)
 */
export async function generatePart2CueCard(topic?: string): Promise<{
  mainTopic: string;
  description: string;
  points: string[];
  finalPrompt: string;
}> {
  const topicGuidance = topic 
    ? `Create a cue card about: ${topic}`
    : 'Choose a common IELTS Part 2 topic (describe a person, place, object, event, or experience)';

  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: 'You are an IELTS examiner creating Part 2 cue cards.',
    },
    {
      role: 'user',
      content: `${topicGuidance}

Format the cue card as JSON:
{
  "mainTopic": "Describe a...",
  "description": "You should say:",
  "points": [
    "What/Where/When/Who...",
    "How...",
    "Why...",
    "And explain..."
  ],
  "finalPrompt": "You will have 1-2 minutes to speak. You have 1 minute to prepare."
}

Make it realistic and interesting. Use proper IELTS Part 2 format.`,
    },
  ];

  const response = await callPerplexity(messages, {
    model: PERPLEXITY_MODELS.SONAR,
    max_tokens: 400,
  });

  const content = response.choices[0].message.content;
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }

  throw new Error('Failed to generate cue card in correct format');
}

/**
 * Generate Part 3 questions (Two-way Discussion)
 */
export async function generatePart3Questions(
  part2Topic: string,
  count: number = 5
): Promise<string[]> {
  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: 'You are an IELTS examiner creating Part 3 discussion questions.',
    },
    {
      role: 'user',
      content: `The Part 2 topic was: "${part2Topic}"

Generate ${count} Part 3 discussion questions that:
- Relate to the Part 2 topic but are more abstract
- Require analysis, comparison, or discussion of broader issues
- Cover different aspects: causes, effects, changes, predictions, comparisons
- Gradually increase in difficulty
- Are suitable for band 6-9 candidates

Return ONLY the questions, one per line, numbered.`,
    },
  ];

  const response = await callPerplexity(messages, {
    model: PERPLEXITY_MODELS.SONAR,
    max_tokens: 500,
  });

  return response.choices[0].message.content
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.replace(/^\d+\.\s*/, '').trim());
}

/**
 * Generate examiner's response/encouragement during the test
 */
export async function generateExaminerResponse(
  context: 'good_answer' | 'short_answer' | 'off_topic' | 'encouragement'
): Promise<string> {
  const prompts = {
    good_answer: 'The candidate gave a well-developed, relevant answer. Give brief, natural acknowledgment (1-2 sentences).',
    short_answer: 'The candidate gave a very short answer. Encourage them to elaborate (1-2 sentences).',
    off_topic: 'The candidate went off-topic. Gently redirect them (1-2 sentences).',
    encouragement: 'The candidate seems nervous. Give brief encouragement (1 sentence).',
  };

  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: 'You are a supportive IELTS examiner. Respond naturally and professionally.',
    },
    {
      role: 'user',
      content: `${prompts[context]}

Respond as an examiner would during a real test. Be natural and concise.
Return ONLY the response, nothing else.`,
    },
  ];

  const response = await callPerplexity(messages, {
    model: PERPLEXITY_MODELS.SONAR,
    max_tokens: 50,
    temperature: 0.9,
  });

  return response.choices[0].message.content.trim();
}

/**
 * Evaluate if a response is on-topic
 */
export async function evaluateResponseRelevance(
  question: string,
  response: string
): Promise<{ isRelevant: boolean; reason: string; score: number }> {
  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: 'You are an IELTS examiner evaluating response relevance.',
    },
    {
      role: 'user',
      content: `Question: "${question}"
Response: "${response}"

Evaluate if the response addresses the question. Return JSON:
{
  "isRelevant": true/false,
  "reason": "Brief explanation",
  "score": 0-10 (relevance score)
}`,
    },
  ];

  const response_data = await callPerplexity(messages, {
    model: PERPLEXITY_MODELS.SONAR,
    max_tokens: 150,
  });

  const content = response_data.choices[0].message.content;
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }

  return { isRelevant: true, reason: 'Unable to evaluate', score: 5 };
}

/**
 * Generate a complete mock test
 */
export async function generateMockTest(topics?: string[]): Promise<{
  part1: string[];
  part2: { mainTopic: string; description: string; points: string[]; finalPrompt: string };
  part3: string[];
}> {
  // Generate Part 1 questions
  const part1 = await generatePart1Questions(4, topics);

  // Generate Part 2 cue card
  const part2 = await generatePart2CueCard(topics?.[0]);

  // Generate Part 3 questions based on Part 2 topic
  const part3 = await generatePart3Questions(part2.mainTopic, 5);

  return { part1, part2, part3 };
}
