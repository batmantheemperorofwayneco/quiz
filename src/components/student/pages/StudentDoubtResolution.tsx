import React, { useState } from 'react';
import { MessageCircle, Send, Clock, CheckCircle } from 'lucide-react';

const StudentDoubtResolution: React.FC = () => {
  const [newDoubt, setNewDoubt] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const doubts = [
    {
      id: 1,
      question: 'How do I solve quadratic equations using the quadratic formula?',
      subject: 'Mathematics',
      status: 'answered',
      timestamp: '2024-01-10 14:30',
      answer: 'The quadratic formula is x = (-b ± √(b²-4ac)) / 2a. Here\'s how to use it step by step...',
      teacher: 'Ms. Johnson'
    },
    {
      id: 2,
      question: 'What is the difference between velocity and acceleration?',
      subject: 'Physics',
      status: 'pending',
      timestamp: '2024-01-12 09:15',
    },
    {
      id: 3,
      question: 'Can you explain the causes of World War I?',
      subject: 'History',
      status: 'answered',
      timestamp: '2024-01-11 16:45',
      answer: 'The main causes of WWI include militarism, alliances, imperialism, and nationalism (MAIN)...',
      teacher: 'Mr. Smith'
    },
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'History', 'English', 'Biology'];

  const handleSubmitDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDoubt.trim() && selectedSubject) {
      // Handle doubt submission
      setNewDoubt('');
      setSelectedSubject('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ask Your Doubts</h1>
        <p className="text-gray-600">Get help from your teachers on any topic</p>
      </div>

      {/* Submit New Doubt */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ask a New Question</h2>
        <form onSubmit={handleSubmitDoubt} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Question</label>
            <textarea
              value={newDoubt}
              onChange={(e) => setNewDoubt(e.target.value)}
              placeholder="Describe your doubt in detail..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>Submit Question</span>
          </button>
        </form>
      </div>

      {/* Previous Doubts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Your Questions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {doubts.map((doubt) => (
            <div key={doubt.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-medium text-blue-600">{doubt.subject}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      doubt.status === 'answered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {doubt.status}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{doubt.question}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{doubt.timestamp}</span>
                    </div>
                    {doubt.status === 'answered' && (
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">Answered by {doubt.teacher}</span>
                      </div>
                    )}
                  </div>
                </div>
                <MessageCircle className={`h-5 w-5 ${
                  doubt.status === 'answered' ? 'text-green-500' : 'text-orange-500'
                }`} />
              </div>
              
              {doubt.answer && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Answer:</h4>
                  <p className="text-gray-700">{doubt.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDoubtResolution;