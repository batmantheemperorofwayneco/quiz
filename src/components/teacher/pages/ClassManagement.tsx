import React, { useState } from 'react';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  Plus, 
  Users, 
  Settings, 
  Copy, 
  Eye, 
  Archive,
  BookOpen,
  Calendar,
  MoreVertical
} from 'lucide-react';

const ClassManagement: React.FC = () => {
  const { user } = useAuth();
  const { classes, students, createClass } = useData();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    grade: ''
  });

  const teacherClasses = classes.filter(c => c.teacherId === user?.id);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    createClass({
      ...formData,
      teacherId: user?.id || '',
      studentIds: [],
      settings: {
        peerLearningEnabled: true,
        gamificationEnabled: true
      }
    });
    setFormData({ name: '', subject: '', grade: '' });
    setShowCreateForm(false);
  };

  const copyClassCode = (classCode: string) => {
    navigator.clipboard.writeText(classCode);
    // You could add a toast notification here
  };

  const getClassStudents = (classId: string) => {
    const classData = classes.find(c => c.id === classId);
    return students.filter(s => classData?.studentIds.includes(s.id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Management</h1>
          <p className="text-gray-600">Create and manage your classes, invite students, and track enrollment.</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create New Class
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teacherClasses.map((classItem) => {
          const classStudents = getClassStudents(classItem.id);
          
          return (
            <div key={classItem.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{classItem.name}</h3>
                  <p className="text-sm text-gray-600">{classItem.subject} • {classItem.grade}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{classStudents.length} students enrolled</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>Class Code: {classItem.classCode}</span>
                  <button 
                    onClick={() => copyClassCode(classItem.classCode)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedClass(classItem.id)}
                  className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {teacherClasses.length === 0 && (
          <div className="col-span-full bg-white rounded-xl shadow-sm border p-12 text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Classes Yet</h3>
            <p className="text-gray-600 mb-4">Create your first class to start managing students and assignments.</p>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Class
            </button>
          </div>
        )}
      </div>

      {/* Create Class Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Class</h2>
            
            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Algebra I - Period 3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Mathematics"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Level
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="6th Grade">6th Grade</option>
                  <option value="7th Grade">7th Grade</option>
                  <option value="8th Grade">8th Grade</option>
                  <option value="9th Grade">9th Grade</option>
                  <option value="10th Grade">10th Grade</option>
                  <option value="11th Grade">11th Grade</option>
                  <option value="12th Grade">12th Grade</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Class Details Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const classData = classes.find(c => c.id === selectedClass);
              const classStudents = getClassStudents(selectedClass);
              
              if (!classData) return null;

              return (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{classData.name}</h2>
                    <button 
                      onClick={() => setSelectedClass(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-600">Subject</p>
                      <p className="text-lg font-semibold text-gray-900">{classData.subject}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-600">Grade</p>
                      <p className="text-lg font-semibold text-gray-900">{classData.grade}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-600">Class Code</p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold text-gray-900">{classData.classCode}</p>
                        <button 
                          onClick={() => copyClassCode(classData.classCode)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Enrolled Students ({classStudents.length})
                    </h3>
                    {classStudents.length > 0 ? (
                      <div className="space-y-2">
                        {classStudents.map((student) => (
                          <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">
                                  {student.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{student.name}</p>
                                <p className="text-sm text-gray-600">{student.email}</p>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.performance.averageScore}% avg
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">No students enrolled yet</p>
                        <p className="text-sm text-gray-500">Share the class code with students to get started</p>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Class Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Peer Learning</span>
                        <input 
                          type="checkbox" 
                          checked={classData.settings.peerLearningEnabled}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Gamification</span>
                        <input 
                          type="checkbox" 
                          checked={classData.settings.gamificationEnabled}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;