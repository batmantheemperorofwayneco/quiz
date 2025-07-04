import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  Clock, 
  Search,
  Filter,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  content: string;
  timestamp: string;
  status: 'read' | 'unread' | 'replied';
  priority: 'normal' | 'urgent';
}

const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const mockMessages: Message[] = [
    {
      id: '1',
      studentId: '2',
      studentName: 'Sarah Chen',
      subject: 'Help with Linear Equations Assignment',
      content: 'Hi Ms. Johnson, I\'m having trouble with questions 8 and 12 on the linear equations assignment. Could you please explain the steps for solving systems of equations using substitution method?',
      timestamp: '2024-01-15T14:30:00Z',
      status: 'unread',
      priority: 'normal'
    },
    {
      id: '2',
      studentId: '4',
      studentName: 'Emma Thompson',
      subject: 'Missed Class - Assignment Clarification',
      content: 'Dear Ms. Johnson, I was absent yesterday due to a doctor\'s appointment. Could you please let me know what assignments I missed and when they are due? Thank you.',
      timestamp: '2024-01-15T09:15:00Z',
      status: 'replied',
      priority: 'urgent'
    },
    {
      id: '3',
      studentId: '5',
      studentName: 'David Kim',
      subject: 'Request for Extension',
      content: 'Hello, I\'ve been working on the quadratic functions assignment but I\'m struggling with the word problems. Would it be possible to get a 2-day extension to complete it properly?',
      timestamp: '2024-01-14T16:45:00Z',
      status: 'read',
      priority: 'normal'
    },
    {
      id: '4',
      studentId: '1',
      studentName: 'Alex Johnson',
      subject: 'Thank you for feedback',
      content: 'Thank you for the detailed feedback on my last assignment. The suggestions really helped me understand where I went wrong. Looking forward to applying these concepts in future work!',
      timestamp: '2024-01-14T11:20:00Z',
      status: 'read',
      priority: 'normal'
    }
  ];

  const [messages] = useState<Message[]>(mockMessages);

  const filteredMessages = messages.filter(message =>
    message.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(m => m.status === 'unread').length;
  const urgentCount = messages.filter(m => m.priority === 'urgent').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      // Here you would normally send the reply to your backend
      console.log('Sending reply:', replyText);
      setReplyText('');
      if (selectedMessage) {
        selectedMessage.status = 'replied';
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with students about assignments and provide support.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Messages</p>
              <p className="text-3xl font-bold text-gray-900">{messages.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-3xl font-bold text-blue-600">{unreadCount}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-3xl font-bold text-red-600">{urgentCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-3xl font-bold text-green-600">96%</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 p-1 rounded-full">
                      <User className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{message.studentName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {message.priority === 'urgent' && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1 truncate">{message.subject}</h4>
                <p className="text-xs text-gray-600 line-clamp-2">{message.content}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {new Date(message.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.studentName}</h3>
                      <p className="text-sm text-gray-600">Student ID: {selectedMessage.studentId}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedMessage.status)}`}>
                    {selectedMessage.status}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{selectedMessage.subject}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {new Date(selectedMessage.timestamp).toLocaleString()}
                  {selectedMessage.priority === 'urgent' && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium ml-2">
                      Urgent
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 p-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">{selectedMessage.content}</p>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Reply</h4>
                  <div className="space-y-4">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply here..."
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          Save Draft
                        </button>
                      </div>
                      <button
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Message</h3>
                <p className="text-gray-600">Choose a message from the list to view and reply.</p>
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
            onClick={() => setReplyText("Thank you for reaching out. I'll review your question and provide detailed feedback within 24 hours.")}
            className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900 mb-1">Standard Acknowledgment</h4>
            <p className="text-sm text-gray-600">General response for student inquiries</p>
          </button>
          <button
            onClick={() => setReplyText("I understand you're having difficulty with this concept. Let's schedule a brief meeting during office hours to work through this together.")}
            className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900 mb-1">Offer Help</h4>
            <p className="text-sm text-gray-600">When student needs additional support</p>
          </button>
          <button
            onClick={() => setReplyText("Extension approved. Please submit your completed assignment by [date]. Remember to show all your work for full credit.")}
            className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900 mb-1">Extension Approval</h4>
            <p className="text-sm text-gray-600">For assignment deadline extensions</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;