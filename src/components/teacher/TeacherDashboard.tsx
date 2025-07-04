import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import TeacherHeader from './TeacherHeader';
import TeacherHome from './pages/TeacherHome';
import ClassManagement from './pages/ClassManagement';
import CreateAssignment from './pages/CreateAssignment';
import AssignmentList from './pages/AssignmentList';
import StudentPerformance from './pages/StudentPerformance';
import DoubtResolution from './pages/DoubtResolution';
import TeacherProfile from './pages/TeacherProfile';
import WorkflowBuilder from './pages/WorkflowBuilder';

const TeacherDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TeacherHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<TeacherHome />} />
            <Route path="/classes" element={<ClassManagement />} />
            <Route path="/assignments/create" element={<CreateAssignment />} />
            <Route path="/workflow-builder" element={<WorkflowBuilder />} />
            <Route path="/assignments" element={<AssignmentList />} />
            <Route path="/performance" element={<StudentPerformance />} />
            <Route path="/doubts" element={<DoubtResolution />} />
            <Route path="/profile" element={<TeacherProfile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;