import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  Users, 
  BookOpen, 
  Plus, 
  BarChart3, 
  MessageSquare, 
  Settings,
  LogOut,
  X,
  GraduationCap,
  Calendar,
  Bot
} from 'lucide-react';

interface TeacherSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
    { id: 'classes', label: 'My Classes', icon: Users, path: '/classes' },
    { id: 'create-assignment', label: 'Create Assignment', icon: Plus, path: '/assignments/create' },
    { id: 'assignment-calendar', label: 'Assignment Calendar', icon: Calendar, path: '/assignment-calendar' },
    { id: 'assignments', label: 'All Assignments', icon: BookOpen, path: '/assignments' },
    { id: 'performance', label: 'Performance Insights', icon: BarChart3, path: '/performance' },
    { id: 'doubts', label: 'Doubt Resolution', icon: MessageSquare, path: '/doubts' },
    { id: 'profile', label: 'Profile & Settings', icon: Settings, path: '/profile' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold">EduAssist</h1>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      location.pathname === item.path
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherSidebar;