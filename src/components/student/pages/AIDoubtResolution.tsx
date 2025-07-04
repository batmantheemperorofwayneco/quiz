import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  User, 
  Users, 
  ArrowRight, 
  ThumbsUp, 
  ThumbsDown,
  Lightbulb,
  MessageSquare,
  Clock,
  AlertCircle,
  Loader,
  Wifi,
  WifiOff
} from 'lucide-react';
import { aiService } from '../../../services/aiService';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const AIDoubtResolution: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [assignmentContext, setAssignmentContext] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<{ connected: boolean; model: string; error?: string } | null>(null);

  // Test AI connection on component mount
  useEffect(() => {
    const checkAPIStatus = async () => {
      try {
        const status = await aiService.getAPIStatus();
        setApiStatus(status);
      } catch (error) {
        setApiStatus({
          connected: false,
          model: 'meta-llama/llama-3.3-70b-instruct:free',
          error: 'Failed to check API status'
        });
      }
    };
    checkAPIStatus();
  }, []);

  const handleSubmitQuestion = async () => {
    if (!question.trim()) return;

    const userMessage: ConversationMessage = {
      role: 'user',
      content: question,
      timestamp: new Date().toISOString()
    };

    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    setQuestion('');

    try {
      const response = await aiService.resolveDoubtAI({
        studentQuestion: question,
        assignmentContext: assignmentContext || 'General question',
        conversationHistory: conversation.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      });

      if (response.success && response.hint) {
        const aiResponse: ConversationMessage = {
          role: 'assistant',
          content: response.hint,
          timestamp: new Date().toISOString()
        };
        setConversation(prev => [...prev, aiResponse]);
      } else {
        setError(response.error || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      setError('Sorry, I\'m having trouble right now. Please try asking your teacher or classmates for help.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowNextStep = async () => {
    if (conversation.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await aiService.resolveDoubtAI({
        studentQuestion: 'Please show me the next step.',
        assignmentContext: assignmentContext || 'General question',
        conversationHistory: conversation.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      });

      if (response.success && response.hint) {
        const nextStep: ConversationMessage = {
          role: 'assistant',
          content: response.hint,
          timestamp: new Date().toISOString()
        };
        setConversation(prev => [...prev, nextStep]);
      } else {
        setError(response.error || 'Failed to get next step');
      }
    } catch (error) {
      console.error('Error getting next step:', error);
      setError('Sorry, I couldn\'t provide the next step. Please try asking your teacher for help.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (helpful: boolean) => {
    console.log('Feedback:', helpful ? 'helpful' : 'not helpful');
    // Here you would send feedback to your backend
  };

  const escalateToTeacher = () => {
    console.log('Escalating to teacher...');
    // Here you would redirect to teacher help or create a teacher help request
  };

  const escalateToPeers = () => {
    console.log('Escalating to peers...');
    // Here you would redirect to peer help board
  };

  const clearConversation = () => {
    setConversation([]);
    setError(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Doubt Resolution</h1>
        <p className="text-gray-600">Get instant help with your questions using Llama 3.3 70B. If AI can't help, we'll connect you with teachers or classmates.</p>
        
        {/* API Status */}
        {apiStatus && (
          <div className={`mt-2 flex items-center gap-2 text-sm ${
            apiStatus.connected ? 'text-green-600' : 'text-red-600'
          }`}>
            {apiStatus.connected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {apiStatus.connected 
              ? `AI Assistant is online (${apiStatus.model})` 
              : `AI Assistant is offline - ${apiStatus.error || 'Connection failed'}`
            }
          </div>
        )}
      </div>

      {/* AI Chat Interface */}
      <div className="bg-white rounded-xl shadow-sm border">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Learning Assistant (Llama 3.3)</h3>
                <p className="text-sm text-gray-600">I'm here to help guide you through problems step by step</p>
              </div>
            </div>
            {conversation.length > 0 && (
              <button
                onClick={clearConversation}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-white"
              >
                Clear Chat
              </button>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {conversation.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ask me anything!</h3>
              <p className="text-gray-600 mb-4">I'll help you understand concepts step by step without giving away the full answer.</p>
              
              {/* Example Questions */}
              <div className="max-w-md mx-auto space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Try asking:</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>"How do I solve quadratic equations?"</p>
                  <p>"What's the difference between mean and median?"</p>
                  <p>"Can you help me understand photosynthesis?"</p>
                </div>
              </div>
            </div>
          )}

          {conversation.map((message, index) => (
            <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && (
                <div className="bg-blue-100 p-2 rounded-full h-fit">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
              )}
              
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="bg-blue-600 p-2 rounded-full h-fit">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* AI Response Actions */}
          {conversation.length > 0 && conversation[conversation.length - 1].role === 'assistant' && !isLoading && (
            <div className="flex items-center gap-3 ml-11">
              <button
                onClick={handleShowNextStep}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors"
              >
                <ArrowRight className="w-3 h-3" />
                Show Next Step
              </button>
              
              <div className="flex gap-1">
                <button
                  onClick={() => handleFeedback(true)}
                  className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                  title="Helpful"
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Not helpful"
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-3">
            {/* Assignment Context */}
            <div>
              <input
                type="text"
                value={assignmentContext}
                onChange={(e) => setAssignmentContext(e.target.value)}
                placeholder="Assignment context (e.g., Math Chapter 5, Problem 3)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Question Input */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSubmitQuestion()}
                  placeholder="Ask your question..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading || !apiStatus?.connected}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleSubmitQuestion}
                disabled={!question.trim() || isLoading || !apiStatus?.connected}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Escalation Options */}
      <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-orange-900 mb-2">Need More Help?</h3>
            <p className="text-orange-800 text-sm mb-4">
              If the AI assistant can't help you understand the concept, you can get help from humans:
            </p>
            <div className="flex gap-3">
              <button
                onClick={escalateToTeacher}
                className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 text-sm transition-colors"
              >
                <User className="w-4 h-4" />
                Ask Teacher
              </button>
              <button
                onClick={escalateToPeers}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm transition-colors"
              >
                <Users className="w-4 h-4" />
                Ask Classmates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Doubts */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Recent Questions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">How to solve quadratic equations?</p>
              <p className="text-xs text-gray-500">Math Chapter 5 • 2 hours ago</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">AI Helped</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">What is the domain of this function?</p>
              <p className="text-xs text-gray-500">Functions Worksheet • 1 day ago</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">AI Helped</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDoubtResolution;