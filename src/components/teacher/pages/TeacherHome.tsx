import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  Eye,
  MessageSquare,
  Calendar,
  Clock
} from 'lucide-react';

const TeacherHome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { assignments, students, classes } = useData();

  const teacherClasses = classes.filter(c => c.teacherId === user?.id);
  const teacherAssignments = assignments.filter(a => a.createdBy === user?.id);
  const activeAssignments = teacherAssignments.filter(a => a.status === 'Active');
  const totalStudents = teacherClasses.reduce((acc, c) => acc + c.studentIds.length, 0);

  const recentActivity = [
    { student: 'Alex Johnson', action: 'Completed Linear Equations Practice', time: '2 hours ago', type: 'completion' },
    { student: 'Sarah Chen', action: 'Asked a doubt about Quadratic Functions', time: '4 hours ago', type: 'doubt' },
    { student: 'Michael Rodriguez', action: 'Submitted Algebra Assignment', time: '6 hours ago', type: 'submission' },
    { student: 'Emma Thompson', action: 'Started working on Geometry Problems', time: '1 day ago', type: 'start' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completion': return <BookOpen className="w-4 h-4 text-green-600" />;
      case 'doubt': return <MessageSquare className="w-4 h-4 text-orange-600" />;
      case 'submission': return <TrendingUp className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-gray-600">Here's what's happening with your classes today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Assignments</p>
              <p className="text-3xl font-bold text-gray-900">{activeAssignments.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
              <p className="text-3xl font-bold text-gray-900">
                {teacherAssignments.length > 0 
                  ? Math.round(teacherAssignments.reduce((acc, a) => acc + a.completionRate, 0) / teacherAssignments.length)
                  : 0}%
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Need Attention</p>
              <p className="text-3xl font-bold text-gray-900">2</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignment Progress */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Assignments</h2>
            <button 
              onClick={() => navigate('/assignments')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {teacherAssignments.slice(0, 3).map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assignment.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    assignment.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {assignment.difficulty}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{assignment.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${assignment.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate('/assignments')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.student}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/assignments/create')}
            className="flex items-center gap-3 p-4 border border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-700">Create New Assignment</span>
          </button>
          
          <button 
            onClick={() => navigate('/classes')}
            className="flex items-center gap-3 p-4 border border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
          >
            <Users className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">Manage Classes</span>
          </button>
          
          <button 
            onClick={() => navigate('/performance')}
            className="flex items-center gap-3 p-4 border border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors"
          >
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-700">View Performance</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;