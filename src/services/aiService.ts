// AI Service for handling Gemini API calls
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBH7XgxqVy8QoQZQZQZQZQZQZQZQZQZQZQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

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
  private async callGeminiAPI(prompt: string, temperature: number = 0.7): Promise<string> {
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
            temperature,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('Invalid API response structure:', data);
        throw new Error('Invalid response from AI service');
      }

      return data.candidates[0].content.parts[0]?.text || 'No response generated';
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
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

Provide only the assignment content, formatted clearly. If generating multiple choice questions, include 4 options (A, B, C, D) for each question. If generating essay prompts, provide clear instructions and expectations.`;

      const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
      const draftContent = await this.callGeminiAPI(fullPrompt, 0.3);

      return {
        success: true,
        draftContent
      };
    } catch (error) {
      console.error('Assignment generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate assignment content'
      };
    }
  }

  async resolveDoubtAI(request: DoubtResolutionRequest): Promise<{ success: boolean; hint?: string; error?: string }> {
    try {
      const systemPrompt = `You are a helpful and patient K-12 educational tutor. Your goal is to guide students by providing helpful hints and explanations without giving away complete answers. 

Key guidelines:
- Provide step-by-step guidance
- Ask clarifying questions when needed
- Encourage critical thinking
- Use simple, age-appropriate language
- Be supportive and encouraging
- If it's a math problem, guide them through the process
- If it's a concept question, help them understand the underlying principles

Remember: Guide them to the answer, don't give the answer directly.`;

      let conversationContext = '';
      if (request.conversationHistory && request.conversationHistory.length > 0) {
        conversationContext = '\n\nPrevious conversation:\n' + 
          request.conversationHistory.map(msg => `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.content}`).join('\n');
      }

      const userPrompt = `Student's question: "${request.studentQuestion}"

Assignment context: "${request.assignmentContext}"${conversationContext}

Please provide a helpful hint or guidance to help the student understand the concept or solve the problem. Remember to guide them step by step without giving the complete answer.`;

      const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
      const hint = await this.callGeminiAPI(fullPrompt, 0.6);

      return {
        success: true,
        hint
      };
    } catch (error) {
      console.error('Doubt resolution error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'I\'m having trouble right now. Please try asking your teacher or classmates for help.'
      };
    }
  }

  // Test connection method
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.callGeminiAPI('Hello, this is a test. Please respond with "Connection successful".');
      return response.includes('successful') || response.includes('test');
    } catch (error) {
      console.error('AI service connection test failed:', error);
      return false;
    }
  }
}

export const aiService = new AIService();