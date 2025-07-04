// Updated AI Service to use OpenRouter instead of Gemini
import { openRouterService } from './openRouterService';

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
  async generateAssignmentDraft(request: AssignmentGenerationRequest): Promise<{ success: boolean; draftContent?: string; error?: string }> {
    return await openRouterService.generateAssignmentDraft(request);
  }

  async resolveDoubtAI(request: DoubtResolutionRequest): Promise<{ success: boolean; hint?: string; error?: string }> {
    return await openRouterService.resolveDoubtAI(request);
  }

  async testConnection(): Promise<boolean> {
    return await openRouterService.testConnection();
  }

  async getAPIStatus(): Promise<{ connected: boolean; model: string; error?: string }> {
    return await openRouterService.getAPIStatus();
  }
}

export const aiService = new AIService();