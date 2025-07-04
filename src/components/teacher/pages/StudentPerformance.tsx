import React, { useState } from 'react';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Download,
  Filter,
  Calendar
} from 'lucide-react';

const StudentPerformance: React.FC = () => {
  const { user } = useAuth();
  const { students, classes, assignments } = useData();
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [timeRange, setTimeRange] = useState('month');

  const teacherClasses = classes.filter(c => c.teacherId === user?.id);
  const classStudents = selectedClass === 'all' 
    ? students.filter(s => s.classIds.some(id => teacherClasses.find(c => c.id === id)))
    : students.filter(s => s.classIds.includes(selectedClass));

  const highPerformers = classStudents.filter(s => s.performance.averageScore >= 85);
  const strugglingStudents = classStudents.filter(s => s.performance.averageScore < 70);
  const averagePerformance = classStudents.length > 0 
    ? Math.round(classStudents.reduce((acc, s) => acc + s.performance.averageScore, 0) / classStudents.length)
    : 0;

  const performanceDistribution = [
    { range: '90-100%', count: classStudents.filter(s => s.performance.averageScore >= 90).length, color: 'bg-green-500' },
    { range: '80-89%', count: classStudents.filter(s => s.performance.averageScore >= 80 && s.performance.averageScore < 90).length, color: 'bg-blue-500' },
    { range: '70-79%', count: classStudents.filter(s => s.performance.averageScore >= 70 && s.performance.averageScore < 80).length, color: 'bg-yellow-500' },
    { range: '60-69%', count: classStudents.filter(s => s.performance.averageScore >= 60 && s.performance.averageScore < 70).length, color: 'bg-orange-500' },
    { range: 'Below 60%', count: classStudents.filter(s => s.performance.averageScore < 60).length, color: 'bg-red-500' }
  ];

  const maxCount = Math.max(...performanceDistribution.map(d => d.count));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Insights</h1>
        <p className="text-gray-600">Comprehensive analytics to track student progress and identify intervention opportunities.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Classes</option>
              {teacherClasses.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Class Average</p>
              <p className="text-3xl font-bold text-gray-900">{averagePerformance}%</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +5% from last period
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
              <p className="text-3xl font-bold text-gray-900">{highPerformers.length}</p>
              <p className="text-sm text-gray-600 mt-1">≥85% average</p>
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
              <p className="text-sm text-gray-600 mt-1">&lt;70% average</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{classStudents.length}</p>
              <p className="text-sm text-gray-600 mt-1">Active learners</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Distribution */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Distribution</h2>
          <div className="space-y-4">
            {performanceDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.range}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: maxCount > 0 ? `${(item.count / maxCount) * 100}%` : '0%' }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Common Struggling Areas</h2>
          <div className="space-y-4">
            {['Quadratic Equations', 'Word Problems', 'Geometry Proofs', 'Statistics', 'Fractions'].map((topic, index) => {
              const strugglingCount = Math.floor(Math.random() * 5) + 1;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{topic}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-red-600">{strugglingCount} students</span>
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Student Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Performers</h2>
          <div className="space-y-4">
            {highPerformers.slice(0, 5).map((student, index) => (
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
                  <p className="font-bold text-green-600">{student.performance.averageScore}%</p>
                  <p className="text-xs text-gray-500">average score</p>
                </div>
              </div>
            ))}
            {highPerformers.length === 0 && (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No high performers yet</p>
              </div>
            )}
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
                  <p className="font-bold text-red-600">{student.performance.averageScore}%</p>
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
                <div className="mt-3 flex gap-2">
                  <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
                    Assign Remediation
                  </button>
                  <button className="text-xs bg-gray-600 text-white px-3 py-1 rounded-full hover:bg-gray-700 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            ))}
            {strugglingStudents.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-gray-600">All students performing well!</p>
              </div>
            )}
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
                <p className="text-sm text-gray-700">Class average improved by 5% this period</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-green-100 p-1 rounded-full mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-sm text-gray-700">{Math.round((classStudents.length - strugglingStudents.length) / classStudents.length * 100)}% of students meeting expectations</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Areas for Improvement</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="bg-orange-100 p-1 rounded-full mt-0.5">
                  <AlertTriangle className="w-3 h-3 text-orange-600" />
                </div>
                <p className="text-sm text-gray-700">{strugglingStudents.length} students need immediate support</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-orange-100 p-1 rounded-full mt-0.5">
                  <BarChart3 className="w-3 h-3 text-orange-600" />
                </div>
                <p className="text-sm text-gray-700">Focus on quadratic equations - highest struggle area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance;