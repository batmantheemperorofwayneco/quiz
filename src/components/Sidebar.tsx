import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Settings,
  GraduationCap
} from 'lucide-react';
import Logo from './common/Logo';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'remediation', label: 'Remediation', icon: GraduationCap },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-slate-900 text-white w-64 min-h-screen p-6">
      <div className="flex items-center gap-3 mb-8">
        <Logo size="md" />
        <div>
          <h1 className="text-lg font-bold text-white">The Learning</h1>
          <h1 className="text-lg font-bold text-white">Canvas</h1>
        </div>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeView === item.id
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
    </div>
  );
};

export default Sidebar;