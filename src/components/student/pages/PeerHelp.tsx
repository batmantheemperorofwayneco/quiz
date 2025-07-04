import React, { useState } from 'react';
import { 
  Plus, 
  Users, 
  Lightbulb, 
  MessageSquare, 
  Clock, 
  Eye,
  Send,
  User,
  BookOpen,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface PeerQuestion {
  id: string;
  question: string;
  assignmentContext: string;
  timePosted: string;
  responseCount: number;
  isAnonymous: boolean;
  responses: PeerResponse[];
}

interface PeerResponse {
  id: string;
  response: string;
  timePosted: string;
  helpful: boolean;
  helpfulVotes: number;
}

const PeerHelp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my-questions' | 'help-others'>('help-others');
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<PeerQuestion | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newResponse, setNewResponse] = useState('');

  const myQuestions: PeerQuestion[] = [
    {
      id: '1',
      question: 'How do I solve quadratic equations using the quadratic formula?',
      assignmentContext: 'Math Chapter 5 - Quadratic Functions',
      timePosted: '2 hours ago',
      responseCount: 3,
      isAnonymous: true,
      responses: [
        {
          id: '1',
          response: 'Remember the formula is x = (-b ± √(b²-4ac)) / 2a. Start by identifying a, b, and c from your equation.',
          timePosted: '1 hour ago',
          helpful: true,
          helpfulVotes: 2
        }
      ]
    }
  ];

  const availableQuestions: PeerQuestion[] = [
    {
      id: '2',
      question: 'I\'m stuck on finding the vertex of a parabola. Can someone explain the steps?',
      assignmentContext: 'Algebra II - Parabolas Assignment',
      timePosted: '30 minutes ago',
      responseCount: 1,
      isAnonymous: true,
      responses: []
    },
    {
      id: '3',
      question: 'What\'s the difference between domain and range in functions?',
      assignmentContext: 'Functions and Relations Worksheet',
      timePosted: '1 hour ago',
      responseCount: 2,
      isAnonymous: true,
      responses: []
    },
    {
      id: '4',
      question: 'How do I factor trinomials when the coefficient of x² is not 1?',
      assignmentContext: 'Factoring Practice Problems',
      timePosted: '2 hours ago',
      responseCount: 0,
      isAnonymous: true,
      responses: []
    }
  ];

  const handleSubmitQuestion = () => {
    if (newQuestion.trim()) {
      // Here you would submit the question to your backend
      console.log('Submitting question:', newQuestion);
      setNewQuestion('');
      setShowQuestionModal(false);
    }
  };

  const handleSubmitResponse = () => {
    if (newResponse.trim() && selectedQuestion) {
      // Here you would submit the response to your backend
      console.log('Submitting response:', newResponse);
      setNewResponse('');
      setSelectedQuestion(null);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Peer Help</h1>
        <p className="text-gray-600">Get help from classmates and help others with their questions.</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('help-others')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'help-others'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Help Others
              </div>
            </button>
            <button
              onClick={() => setActiveTab('my-questions')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'my-questions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                My Questions
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'help-others' && (
            <div>
              {/* Post Question Button */}
              <div className="mb-6">
                <button
                  onClick={() => setShowQuestionModal(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Ask a Question
                </button>
              </div>

              {/* Question Feed */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions from Classmates</h3>
                {availableQuestions.map((question) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-200 p-2 rounded-full">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-900">Anonymous Student</span>
                          <span className="text-xs text-gray-500">{question.timePosted}</span>
                        </div>
                        
                        <p className="text-gray-700 mb-2">{question.question}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-600">{question.assignmentContext}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{question.responseCount} responses</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedQuestion(question)}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <Eye className="w-4 h-4" />
                              View Question
                            </button>
                            <button
                              onClick={() => setSelectedQuestion(question)}
                              className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200"
                            >
                              <Lightbulb className="w-4 h-4" />
                              Offer Help
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'my-questions' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Questions</h3>
              <div className="space-y-4">
                {myQuestions.map((question) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-600">{question.assignmentContext}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {question.timePosted}
                          </div>
                          <span>{question.responseCount} responses</span>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View Responses
                      </button>
                    </div>
                    
                    {question.responses.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Response:</h4>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700">{question.responses[0].response}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">{question.responses[0].timePosted}</span>
                            <div className="flex items-center gap-2">
                              <button className="flex items-center gap-1 text-green-600 text-xs">
                                <ThumbsUp className="w-3 h-3" />
                                {question.responses[0].helpfulVotes}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ask Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ask a Question</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question
                </label>
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Describe what you're stuck on..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assignment Context
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Math Chapter 5 - Problem 3"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="anonymous" defaultChecked className="w-4 h-4 text-blue-600" />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Post anonymously
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowQuestionModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitQuestion}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Post Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Response Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Help a Classmate</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Question:</h3>
              <p className="text-gray-700 mb-2">{selectedQuestion.question}</p>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-600">{selectedQuestion.assignmentContext}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Helpful Response
                </label>
                <textarea
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Provide a helpful hint or explanation..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedQuestion(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitResponse}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Help
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerHelp;