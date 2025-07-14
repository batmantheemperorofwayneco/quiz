import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, BookOpen, TrendingUp, MessageCircle, User, GraduationCap, Users, Bot, Trophy } from 'lucide-react';
import Logo from '../common/Logo';

interface StudentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/assignments', icon: BookOpen, label: 'Assignments' },
    { to: '/progress', icon: TrendingUp, label: 'Progress' },
    { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { to: '/peer-help', icon: Users, label: 'Peer Help' },
    { to: '/ai-doubts', icon: Bot, label: 'AI Doubt Resolution' },
    { to: '/doubts', icon: MessageCircle, label: 'Ask Teacher' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Logo size="md" />
            <div>
              <span className="text-lg font-bold text-gray-900">The Learning</span>
              <br />
              <span className="text-lg font-bold text-gray-900">Canvas</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
                onClick={() => onClose()}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default StudentSidebar;