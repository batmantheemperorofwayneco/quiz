import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  User
} from 'lucide-react';
import { mockStudents } from '../data/mockData';

const Students: React.FC = () => {
  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600 bg-green-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPerformanceIcon = (percentage: number) => {
    if (percentage >= 85) return <TrendingUp className="w-4 h-4" />;
    if (percentage >= 70) return <Clock className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Overview</h1>
        <p className="text-gray-600">Monitor individual student performance and identify areas for improvement.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Algebra I - Period 3</h2>
          <p className="text-gray-600 mt-1">5 students enrolled</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Struggling Areas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full p-2 mr-3">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 mr-3">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span>{student.performance.averageCompletion}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              student.performance.averageCompletion >= 85 ? 'bg-green-500' :
                              student.performance.averageCompletion >= 70 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${student.performance.averageCompletion}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className={`p-1 rounded-full ${getPerformanceColor(student.performance.averageCompletion)}`}>
                        {getPerformanceIcon(student.performance.averageCompletion)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.performance.completedAssignments}/{student.performance.totalAssignments}
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      {student.performance.strugglingAreas.length > 0 ? (
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
                      ) : (
                        <span className="text-sm text-gray-500">None identified</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(student.performance.lastActivity).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.performance.averageCompletion >= 85 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3" />
                        Excellent
                      </span>
                    ) : student.performance.averageCompletion >= 70 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3" />
                        On Track
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertTriangle className="w-3 h-3" />
                        Needs Help
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Performance Insights */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">High Performers</h3>
            <p className="text-2xl font-bold text-green-600">
              {mockStudents.filter(s => s.performance.averageCompletion >= 85).length}
            </p>
            <p className="text-sm text-gray-600">Students excelling (≥85%)</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">On Track</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {mockStudents.filter(s => s.performance.averageCompletion >= 70 && s.performance.averageCompletion < 85).length}
            </p>
            <p className="text-sm text-gray-600">Students progressing (70-84%)</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Need Support</h3>
            <p className="text-2xl font-bold text-red-600">
              {mockStudents.filter(s => s.performance.averageCompletion < 70).length}
            </p>
            <p className="text-sm text-gray-600">Students struggling (&lt;70%)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;