import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

const StudentAssignments: React.FC = () => {
  const assignments = [
    {
      id: 1,
      title: 'Math Quiz - Algebra',
      subject: 'Mathematics',
      description: 'Complete the algebra problems covering linear equations and quadratic functions.',
      dueDate: '2024-01-15',
      status: 'pending',
      points: 100,
    },
    {
      id: 2,
      title: 'Science Lab Report',
      subject: 'Physics',
      description: 'Write a detailed report on the pendulum experiment conducted in class.',
      dueDate: '2024-01-18',
      status: 'submitted',
      points: 75,
      score: 68,
    },
    {
      id: 3,
      title: 'History Essay',
      subject: 'History',
      description: 'Write a 1000-word essay on the causes of World War I.',
      dueDate: '2024-01-20',
      status: 'pending',
      points: 150,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <p className="text-gray-600">View and manage your assignments</p>
      </div>

      <div className="grid gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>
                <p className="text-sm text-blue-600 font-medium mb-2">{assignment.subject}</p>
                <p className="text-gray-600 mb-4">{assignment.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{assignment.points} points</span>
                  </div>
                  {assignment.score && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">Score: {assignment.score}/{assignment.points}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="ml-4">
                {assignment.status === 'pending' ? (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Start Assignment
                  </button>
                ) : (
                  <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    View Submission
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAssignments;