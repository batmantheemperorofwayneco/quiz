import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingDown, 
  BookOpen, 
  Clock, 
  Target,
  CheckCircle,
  ExternalLink,
  User,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { mockRemediationSuggestions, mockStudents } from '../data/mockData';

const Remediation: React.FC = () => {
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedStudent, setSelectedStudent] = useState<string>('All');

  const priorities = ['All', 'High', 'Medium', 'Low'];
  const filteredSuggestions = mockRemediationSuggestions.filter(suggestion => {
    const priorityMatch = selectedPriority === 'All' || suggestion.priority === selectedPriority;
    const studentMatch = selectedStudent === 'All' || suggestion.studentId === selectedStudent;
    return priorityMatch && studentMatch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High': return <AlertTriangle className="w-4 h-4" />;
      case 'Medium': return <Clock className="w-4 h-4" />;
      case 'Low': return <Target className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Remediation</h1>
        <p className="text-gray-600">Personalized intervention strategies and resources for struggling students.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-3xl font-bold text-red-600">
                {mockRemediationSuggestions.filter(s => s.priority === 'High').length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Medium Priority</p>
              <p className="text-3xl font-bold text-yellow-600">
                {mockRemediationSuggestions.filter(s => s.priority === 'Medium').length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Priority</p>
              <p className="text-3xl font-bold text-blue-600">
                {mockRemediationSuggestions.filter(s => s.priority === 'Low').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Students Helped</p>
              <p className="text-3xl font-bold text-green-600">12</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Students</option>
              {mockStudents.map(student => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Remediation Suggestions */}
      <div className="space-y-6">
        {filteredSuggestions.map((suggestion) => (
          <div key={`${suggestion.studentId}-${suggestion.issue}`} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{suggestion.studentName}</h3>
                    <p className="text-sm text-gray-600">Student ID: {suggestion.studentId}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(suggestion.priority)}`}>
                  {getPriorityIcon(suggestion.priority)}
                  {suggestion.priority} Priority
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Identified Issue</h4>
                  <p className="text-gray-700 mb-4">{suggestion.issue}</p>
                  
                  <h4 className="font-medium text-gray-900 mb-2">Recommended Action</h4>
                  <p className="text-gray-700">{suggestion.suggestion}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Suggested Resources</h4>
                  <div className="space-y-2">
                    {suggestion.resources.map((resource, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700 flex-1">{resource}</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  Contact Student
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Calendar className="w-4 h-4" />
                  Schedule Meeting
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <CheckCircle className="w-4 h-4" />
                  Mark as Addressed
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSuggestions.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Remediation Needed</h3>
          <p className="text-gray-600">All students in the selected criteria are performing well!</p>
        </div>
      )}

      {/* Intervention Strategies */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">General Intervention Strategies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Additional Practice</h3>
            <p className="text-sm text-gray-600 mb-3">Provide targeted worksheets and exercises for weak areas.</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Khan Academy modules</li>
              <li>• Practice problem sets</li>
              <li>• Interactive exercises</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-3">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">One-on-One Support</h3>
            <p className="text-sm text-gray-600 mb-3">Schedule individual meetings to address specific challenges.</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Tutoring sessions</li>
              <li>• Office hours</li>
              <li>• Peer mentoring</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-3">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Modified Assignments</h3>
            <p className="text-sm text-gray-600 mb-3">Adjust difficulty and provide scaffolding for struggling students.</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Simplified instructions</li>
              <li>• Extended deadlines</li>
              <li>• Chunked assignments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Remediation;