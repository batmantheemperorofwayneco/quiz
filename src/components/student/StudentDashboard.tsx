import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import StudentHeader from './StudentHeader';
import StudentHome from './pages/StudentHome';
import StudentAssignments from './pages/StudentAssignments';
import StudentProgress from './pages/StudentProgress';
import StudentDoubtResolution from './pages/StudentDoubtResolution';
import StudentProfile from './pages/StudentProfile';

const StudentDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <StudentHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<StudentHome />} />
            <Route path="/assignments" element={<StudentAssignments />} />
            <Route path="/progress" element={<StudentProgress />} />
            <Route path="/doubts" element={<StudentDoubtResolution />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;