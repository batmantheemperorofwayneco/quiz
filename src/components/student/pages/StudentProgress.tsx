import React from 'react';
import { TrendingUp, Award, Target, BookOpen } from 'lucide-react';

const StudentProgress: React.FC = () => {
  const subjects = [
    { name: 'Mathematics', progress: 85, grade: 'A-', assignments: 12, completed: 10 },
    { name: 'Physics', progress: 78, grade: 'B+', assignments: 8, completed: 7 },
    { name: 'History', progress: 92, grade: 'A', assignments: 10, completed: 9 },
    { name: 'English', progress: 88, grade: 'A-', assignments: 15, completed: 13 },
  ];

  const achievements = [
    { title: 'Perfect Attendance', description: 'Attended all classes this month', icon: Award, color: 'text-yellow-500' },
    { title: 'Quick Learner', description: 'Completed 5 assignments ahead of schedule', icon: TrendingUp, color: 'text-green-500' },
    { title: 'Math Wizard', description: 'Scored 100% on 3 consecutive math quizzes', icon: Target, color: 'text-blue-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Progress Overview</h1>
        <p className="text-gray-600">Track your academic performance and achievements</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall GPA</p>
              <p className="text-2xl font-bold text-gray-900">3.7</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assignments Completed</p>
              <p className="text-2xl font-bold text-gray-900">39/45</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Subject Progress</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{subject.name}</h3>
                    <p className="text-sm text-gray-600">
                      {subject.completed}/{subject.assignments} assignments completed
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900">{subject.grade}</span>
                    <p className="text-sm text-gray-600">{subject.progress}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Achievements</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <achievement.icon className={`h-8 w-8 ${achievement.color}`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;