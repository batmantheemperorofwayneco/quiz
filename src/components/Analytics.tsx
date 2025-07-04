import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock,
  Target,
  BookOpen
} from 'lucide-react';
import { mockAssignments, mockStudents } from '../data/mockData';

const Analytics: React.FC = () => {
  // Calculate analytics data
  const totalStudents = mockStudents.length;
  const averageCompletion = Math.round(
    mockStudents.reduce((acc, student) => acc + student.performance.averageCompletion, 0) / totalStudents
  );
  
  const topPerformers = mockStudents
    .filter(s => s.performance.averageCompletion >= 85)
    .sort((a, b) => b.performance.averageCompletion - a.performance.averageCompletion);
  
  const strugglingStudents = mockStudents
    .filter(s => s.performance.averageCompletion < 70)
    .sort((a, b) => a.performance.averageCompletion - b.performance.averageCompletion);

  const assignmentPerformance = mockAssignments.map(assignment => ({
    ...assignment,
    avgTimeSpent: Math.round(
      assignment.submissions.reduce((acc, sub) => acc + sub.timeSpent, 0) / assignment.submissions.length
    ),
    strugglingCount: assignment.submissions.filter(sub => sub.strugglingQuestions.length > 3).length
  }));

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights into student performance and learning patterns.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Class Average</p>
              <p className="text-3xl font-bold text-gray-900">{averageCompletion}%</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +5% from last week
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
              <p className="text-sm font-medium text-gray-600">High Performers</p>
              <p className="text-3xl font-bold text-gray-900">{topPerformers.length}</p>
              <p className="text-sm text-gray-600 mt-1">≥85% completion</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Need Support</p>
              <p className="text-3xl font-bold text-gray-900">{strugglingStudents.length}</p>
              <p className="text-sm text-gray-600 mt-1">&lt;70% completion</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Time/Assignment</p>
              <p className="text-3xl font-bold text-gray-900">52</p>
              <p className="text-sm text-gray-600 mt-1">minutes</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Distribution */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Distribution</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Excellent (90-100%)</span>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <span className="text-sm text-gray-600 w-8">1</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Good (80-89%)</span>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <span className="text-sm text-gray-600 w-8">2</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Average (70-79%)</span>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <span className="text-sm text-gray-600 w-8">1</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Below Average (&lt;70%)</span>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <span className="text-sm text-gray-600 w-8">1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assignment Difficulty Analysis */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Assignment Difficulty Impact</h2>
          <div className="space-y-4">
            {assignmentPerformance.map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assignment.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    assignment.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {assignment.difficulty}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Completion</p>
                    <p className="font-semibold">{assignment.completionRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Avg. Time</p>
                    <p className="font-semibold">{assignment.avgTimeSpent}m</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Struggling</p>
                    <p className="font-semibold">{assignment.strugglingCount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Performance Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Performers</h2>
          <div className="space-y-4">
            {topPerformers.map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">
                      {student.performance.completedAssignments}/{student.performance.totalAssignments} completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{student.performance.averageCompletion}%</p>
                  <p className="text-xs text-gray-500">completion rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Students Needing Support */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Students Needing Support</h2>
          <div className="space-y-4">
            {strugglingStudents.map((student) => (
              <div key={student.id} className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="font-bold text-red-600">{student.performance.averageCompletion}%</p>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {student.performance.completedAssignments}/{student.performance.totalAssignments} assignments completed
                </div>
                {student.performance.strugglingAreas.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {student.performance.strugglingAreas.map((area, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Insights & Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Positive Trends</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="bg-green-100 p-1 rounded-full mt-0.5">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm text-gray-700">Class average has improved by 5% over the past week</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-green-100 p-1 rounded-full mt-0.5">
                  <Target className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm text-gray-700">80% of students are meeting or exceeding expectations</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Areas for Improvement</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="bg-orange-100 p-1 rounded-full mt-0.5">
                  <Users className="w-3 h-3 text-orange-600" />
                </div>
                <p className="text-sm text-gray-700">1 student requires immediate intervention (Emma Thompson)</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-orange-100 p-1 rounded-full mt-0.5">
                  <BookOpen className="w-3 h-3 text-orange-600" />
                </div>
                <p className="text-sm text-gray-700">Quadratic Functions assignment showing high difficulty levels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;