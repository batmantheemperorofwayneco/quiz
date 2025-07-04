import React, { useState } from 'react';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Send,
  Filter,
  Search,
  Bot,
  Users as UsersIcon
} from 'lucide-react';

const DoubtResolution: React.FC = () => {
  const { user } = useAuth();
  const { doubts, students } = useData();
  const [selectedDoubt, setSelectedDoubt] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Mock doubts data since we don't have real doubts yet
  const mockDoubts = [
    {
      id: '1',
      studentId: '1',
      studentName: 'Alex Johnson',
      question: 'I\'m having trouble understanding how to solve quadratic equations using the quadratic formula. Can you help me with the steps?',
      assignmentId: '1',
      assignmentTitle: 'Quadratic Functions Review',
      status: 'Open' as const,
      aiResponse: 'The quadratic formula is x = (-b ± √(b²-4ac)) / 2a. Let me break this down step by step...',
      peerResponses: [
        { response: 'I found it helpful to memorize the formula first, then practice with simple examples.', helpful: true }
      ],
      createdAt: '2024-01-15T14:30:00Z',
      priority: 'Medium'
    },
    {
      id: '2',
      studentId: '2',
      studentName: 'Sarah Chen',
      question: 'What\'s the difference between linear and quadratic functions? I keep getting confused.',
      assignmentId: '1',
      assignmentTitle: 'Linear vs Quadratic Functions',
      status: 'AI Resolved' as const,
      aiResponse: 'Linear functions have a constant rate of change and form straight lines, while quadratic functions have a variable rate of change and form parabolas.',
      createdAt: '2024-01-15T10:15:00Z',
      priority: 'Low'
    },
    {
      id: '3',
      studentId: '3',
      studentName: 'Michael Rodriguez',
      question: 'I don\'t understand how to graph parabolas. The vertex form is confusing me.',
      status: 'Open' as const,
      createdAt: '2024-01-14T16:45:00Z',
      priority: 'High'
    }
  ];

  const filteredDoubts = mockDoubts.filter(doubt => 
    statusFilter === 'All' || doubt.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'AI Resolved': return 'bg-blue-100 text-blue-800';
      case 'Peer Resolved': return 'bg-green-100 text-green-800';
      case 'Teacher Resolved': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendResponse = () => {
    if (response.trim()) {
      // Here you would update the doubt with teacher response
      console.log('Sending response:', response);
      setResponse('');
      setSelectedDoubt(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Doubt Resolution Queue</h1>
        <p className="text-gray-600">Manage student questions and provide personalized support.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Doubts</p>
              <p className="text-3xl font-bold text-gray-900">{mockDoubts.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open</p>
              <p className="text-3xl font-bold text-red-600">
                {mockDoubts.filter(d => d.status === 'Open').length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Resolved</p>
              <p className="text-3xl font-bold text-blue-600">
                {mockDoubts.filter(d => d.status === 'AI Resolved').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-3xl font-bold text-green-600">94%</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doubts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="AI Resolved">AI Resolved</option>
              <option value="Peer Resolved">Peer Resolved</option>
              <option value="Teacher Resolved">Teacher Resolved</option>
            </select>
            
            <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doubts List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Doubts</h2>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredDoubts.map((doubt) => (
              <div
                key={doubt.id}
                onClick={() => setSelectedDoubt(doubt.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedDoubt === doubt.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 p-1 rounded-full">
                      <User className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{doubt.studentName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {doubt.priority && (
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(doubt.priority)}`}>
                        {doubt.priority}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(doubt.status)}`}>
                      {doubt.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{doubt.question}</p>
                
                {doubt.assignmentTitle && (
                  <p className="text-xs text-blue-600 mb-2">📚 {doubt.assignmentTitle}</p>
                )}
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {new Date(doubt.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doubt Details */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border">
          {selectedDoubt ? (
            (() => {
              const doubt = mockDoubts.find(d => d.id === selectedDoubt);
              if (!doubt) return null;

              return (
                <div className="h-full flex flex-col">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-200 p-2 rounded-full">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{doubt.studentName}</h3>
                          <p className="text-sm text-gray-600">Student Question</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doubt.status)}`}>
                        {doubt.status}
                      </span>
                    </div>
                    
                    {doubt.assignmentTitle && (
                      <div className="bg-blue-50 p-3 rounded-lg mb-4">
                        <p className="text-sm text-blue-800">
                          <strong>Assignment:</strong> {doubt.assignmentTitle}
                        </p>
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-500 mb-2">
                      Asked on {new Date(doubt.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="space-y-6">
                      {/* Student Question */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Student Question</h4>
                        <p className="text-gray-700">{doubt.question}</p>
                      </div>

                      {/* AI Response */}
                      {doubt.aiResponse && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="w-4 h-4 text-blue-600" />
                            <h4 className="font-medium text-gray-900">AI Assistant Response</h4>
                          </div>
                          <p className="text-gray-700">{doubt.aiResponse}</p>
                        </div>
                      )}

                      {/* Peer Responses */}
                      {doubt.peerResponses && doubt.peerResponses.length > 0 && (
                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <UsersIcon className="w-4 h-4 text-green-600" />
                            <h4 className="font-medium text-gray-900">Peer Help</h4>
                          </div>
                          {doubt.peerResponses.map((response, index) => (
                            <div key={index} className="bg-white p-3 rounded border">
                              <p className="text-gray-700">{response.response}</p>
                              {response.helpful && (
                                <span className="inline-flex items-center gap-1 text-xs text-green-600 mt-1">
                                  <CheckCircle className="w-3 h-3" />
                                  Marked as helpful
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Response Area */}
                  <div className="border-t p-6">
                    <h4 className="font-medium text-gray-900 mb-3">Teacher Response</h4>
                    <div className="space-y-4">
                      <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Provide detailed explanation and guidance..."
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            Attach Resource
                          </button>
                          <button className="text-sm text-blue-600 hover:text-blue-800">
                            Schedule Meeting
                          </button>
                        </div>
                        <button
                          onClick={handleSendResponse}
                          disabled={!response.trim()}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Send className="w-4 h-4" />
                          Send Response
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Doubt</h3>
                <p className="text-gray-600">Choose a student question from the list to provide support.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Response Templates */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Response Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setResponse("Great question! Let me break this down step by step for you. First, let's identify what we know...")}
            className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900 mb-1">Step-by-Step Explanation</h4>
            <p className="text-sm text-gray-600">Provide detailed breakdown of the solution</p>
          </button>
          
          <button
            onClick={() => setResponse("I can see where the confusion might be coming from. Let's try a different approach that might make this clearer...")}
            className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900 mb-1">Alternative Approach</h4>
            <p className="text-sm text-gray-600">Suggest a different method or perspective</p>
          </button>
          
          <button
            onClick={() => setResponse("This is a common area where students struggle. Let me provide some additional practice problems and resources...")}
            className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900 mb-1">Additional Resources</h4>
            <p className="text-sm text-gray-600">Provide extra practice and learning materials</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoubtResolution;