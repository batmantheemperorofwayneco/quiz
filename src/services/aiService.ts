// AI Service for handling Gemini API calls
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key-here';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

interface AssignmentGenerationRequest {
  promptDescription: string;
  options: {
    questionType: string;
    difficulty: string;
    topic: string;
    gradeLevel: string;
    numQuestions?: number;
    wordCount?: number;
  };
}

interface DoubtResolutionRequest {
  studentQuestion: string;
  assignmentContext: string;
  conversationHistory?: Array<{ role: string; content: string }>;
}

export class AIService {
  private async callGeminiAPI(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to get AI response');
    }
  }

  async generateAssignmentDraft(request: AssignmentGenerationRequest): Promise<{ success: boolean; draftContent?: string; error?: string }> {
    try {
      const systemPrompt = `You are an expert K-12 educational content creator specializing in generating accurate, age-appropriate, and structured assignment questions or prompts. Your output must be directly usable as assignment content. Do not include any conversational intros, conclusions, or meta-commentary. Focus solely on the requested assignment content.`;

      const userPrompt = `Generate an assignment based on the following criteria:
- Topic: ${request.options.topic}
- Grade Level: ${request.options.gradeLevel}
- Question Type: ${request.options.questionType}
- Difficulty: ${request.options.difficulty}
${request.options.numQuestions ? `- Number of Questions: ${request.options.numQuestions}` : ''}
${request.options.wordCount ? `- Word Count (approx): ${request.options.wordCount}` : ''}
- Specific focus/description: ${request.promptDescription}

Provide only the assignment content, formatted clearly.`;

      const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
      const draftContent = await this.callGeminiAPI(fullPrompt);

      return {
        success: true,
        draftContent
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async resolveDoubtAI(request: DoubtResolutionRequest): Promise<{ success: boolean; hint?: string; error?: string }> {
    try {
      const systemPrompt = `You are a highly empathetic, patient, and knowledgeable K-12 educational tutor. Your sole purpose is to guide the student towards understanding by providing *only the next logical step, a single concise hint, or a clarifying question*. DO NOT provide the full solution or final answer. Encourage critical thinking. If the student explicitly asks for the 'next step' or 'another hint', provide the *subsequent* logical progression. If the question is unclear, ask for clarification. If it's a very simple factual lookup, you may provide the direct factual answer. Maintain a supportive and encouraging tone.`;

      let conversationContext = '';
      if (request.conversationHistory && request.conversationHistory.length > 0) {
        conversationContext = '\n\nPrevious conversation:\n' + 
          request.conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n');
      }

      const userPrompt = `My question is: "${request.studentQuestion}". The context is: "${request.assignmentContext}". Please provide the next logical step or a hint.${conversationContext}`;

      const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
      const hint = await this.callGeminiAPI(fullPrompt);

      return {
        success: true,
        hint
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

export const aiService = new AIService();