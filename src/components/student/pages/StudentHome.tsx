import React from 'react';
import { BookOpen, Clock, TrendingUp, Award } from 'lucide-react';

const StudentHome: React.FC = () => {
  const stats = [
    { label: 'Active Assignments', value: '5', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Pending Submissions', value: '2', icon: Clock, color: 'bg-orange-500' },
    { label: 'Average Score', value: '85%', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Achievements', value: '12', icon: Award, color: 'bg-purple-500' },
  ];

  const recentAssignments = [
    { title: 'Math Quiz - Algebra', subject: 'Mathematics', dueDate: '2024-01-15', status: 'pending' },
    { title: 'Science Lab Report', subject: 'Physics', dueDate: '2024-01-18', status: 'submitted' },
    { title: 'History Essay', subject: 'History', dueDate: '2024-01-20', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600">Here's what's happening with your studies today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Assignments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Assignments</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentAssignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                  <p className="text-sm text-gray-600">{assignment.subject}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    assignment.status === 'submitted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {assignment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;