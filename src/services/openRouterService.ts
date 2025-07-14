// LLM7.io AI Service for handling GPT-4.1 API calls
const LLM7_API_KEY = 'unused'; // Free access doesn't require a real API key
const LLM7_API_URL = 'https://api.llm7.io/v1/chat/completions';
const SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';

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

interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class OpenRouterService {
  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async callLLM7API(
    messages: OpenRouterMessage[], 
    temperature: number = 0.7,
    maxTokens: number = 1500,
    retryCount: number = 0
  ): Promise<string> {

    const maxRetries = 3;
    const baseDelay = 1000; // 1 second

    try {
      const response = await fetch(LLM7_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LLM7_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages,
          temperature,
          max_tokens: maxTokens,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('LLM7 API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          retryCount
        });

        // Handle specific error cases
        if (response.status === 401) {
          throw new Error('API authentication failed. Please check the LLM7.io service status.');
        } else if (response.status === 402) {
          throw new Error('Service quota exceeded. Please try again later or get a token at https://token.llm7.io/');
        } else if (response.status === 429) {
          // Rate limit exceeded - implement exponential backoff retry
          if (retryCount < maxRetries) {
            const delay = baseDelay * Math.pow(2, retryCount); // Exponential backoff
            console.log(`Rate limit hit. Retrying in ${delay}ms... (attempt ${retryCount + 1}/${maxRetries})`);
            await this.sleep(delay);
            return this.callLLM7API(messages, temperature, maxTokens, retryCount + 1);
          } else {
            throw new Error('Rate limit exceeded. Please wait a few minutes before trying again.');
          }
        } else if (response.status >= 500) {
          // Server errors - also retry with exponential backoff
          if (retryCount < maxRetries) {
            const delay = baseDelay * Math.pow(2, retryCount);
            console.log(`Server error. Retrying in ${delay}ms... (attempt ${retryCount + 1}/${maxRetries})`);
            await this.sleep(delay);
            return this.callLLM7API(messages, temperature, maxTokens, retryCount + 1);
          } else {
            throw new Error('LLM7.io service is temporarily unavailable. Please try again later.');
          }
        }

        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Invalid API response structure:', data);
        throw new Error('Invalid response from AI service');
      }

      const content = data.choices[0].message.content;
      
      if (!content || !content.trim()) {
        throw new Error('AI generated empty content. Please try rephrasing your request.');
      }

      // Check for common AI refusal patterns
      const refusalPatterns = [
        'i cannot fulfill this request',
        'as an ai model',
        'i cannot provide a direct answer',
        'i\'m unable to assist'
      ];

      if (refusalPatterns.some(pattern => content.toLowerCase().includes(pattern))) {
        throw new Error('AI could not process this request. Please try rephrasing or ask for human assistance.');
      }

      return content;
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      throw error;
    }
  }

  async generateAssignmentDraft(request: AssignmentGenerationRequest): Promise<{ success: boolean; draftContent?: string; error?: string }> {
    try {
      const systemPrompt: OpenRouterMessage = {
        role: 'system',
        content: `You are an expert K-12 educational content creator for 'The Learning Canvas' app. Your task is to generate high-quality, structured assignment questions or prompts based on the user's detailed request. The content must be accurate, age-appropriate, and directly address the specified topic, question type, difficulty, and grade level. 

**Crucially, do not include any conversational intros or conclusions (e.g., 'Here is your assignment:').** Provide only the assignment content itself, formatted clearly as a numbered list of questions, a problem set, or an essay prompt. 

Ensure the language and tone are suitable for an Indian educational context (e.g., CBSE/NCERT style if applicable, neutral and formal tone). For multiple choice questions, provide the question, then clearly labeled options (A, B, C, D), and indicate the correct answer at the end.`
      };

      let userMessageContent = `Generate an assignment based on the following criteria:\n`;
      userMessageContent += `- Topic: ${request.options.topic}\n`;
      userMessageContent += `- Grade Level: ${request.options.gradeLevel}\n`;
      userMessageContent += `- Question Type: ${request.options.questionType}\n`;
      userMessageContent += `- Difficulty: ${request.options.difficulty}\n`;
      
      if (request.options.numQuestions) {
        userMessageContent += `- Number of Questions: ${request.options.numQuestions}\n`;
      }
      if (request.options.wordCount) {
        userMessageContent += `- Approximate Word Count (for essay): ${request.options.wordCount}\n`;
      }
      
      userMessageContent += `- Specific focus/description: ${request.promptDescription}\n\n`;
      userMessageContent += `Provide only the assignment content, formatted clearly and precisely, without any conversational filler.`;

      const userMessage: OpenRouterMessage = {
        role: 'user',
        content: userMessageContent
      };

      const draftContent = await this.callLLM7API(
        [systemPrompt, userMessage], 
        0.2, // Very low temperature for deterministic, factual output
        1500
      );

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
      const systemPrompt: OpenRouterMessage = {
        role: 'system',
        content: `You are a highly empathetic, patient, and knowledgeable K-12 educational tutor for 'The Learning Canvas' app. Your primary goal is to guide the student towards understanding by providing *only the next logical step, a single concise hint, or a clarifying question*. 

**DO NOT provide the full solution or final answer.** Encourage critical thinking and self-discovery. If the student explicitly asks for the 'next step' or 'another hint', provide the *subsequent* logical progression concisely. 

If the question is unclear or beyond your scope, politely ask for clarification or suggest they ask their teacher. Maintain a supportive and encouraging tone suitable for an Indian student. Avoid phrases like 'I am an AI' and keep responses focused on the hint.`
      };

      const messages: OpenRouterMessage[] = [systemPrompt];

      // Add conversation history if provided
      if (request.conversationHistory && request.conversationHistory.length > 0) {
        request.conversationHistory.forEach(msg => {
          messages.push({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
          });
        });
      }

      // Add current question
      messages.push({
        role: 'user',
        content: `My question is: "${request.studentQuestion}". The context for this problem is: "${request.assignmentContext}". Please provide the next logical step or a hint.`
      });

      const hint = await this.callLLM7API(
        messages, 
        0.6, // Slightly higher for varied hints, but still grounded
        150  // Keep hints concise
      );

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
      const testMessages: OpenRouterMessage[] = [
        {
          role: 'system',
          content: 'You are a helpful assistant. Respond with exactly "Connection successful" to test the API.'
        },
        {
          role: 'user',
          content: 'Hello, this is a test. Please respond with "Connection successful".'
        }
      ];

      const response = await this.callLLM7API(testMessages, 0.1, 50);
      return response.toLowerCase().includes('connection successful') || response.toLowerCase().includes('successful');
    } catch (error) {
      console.error('LLM7.io service connection test failed:', error);
      return false;
    }
  }

  // Get API status and usage information
  async getAPIStatus(): Promise<{ connected: boolean; model: string; error?: string }> {
    try {
      await this.testConnection();
      return {
        connected: true,
        model: 'gpt-4.1-2025-04-14'
      };
    } catch (error) {
      return {
        connected: false,
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        error: error instanceof Error ? error.message : 'Connection failed'
      };
    }
  }
}

export const openRouterService = new OpenRouterService();