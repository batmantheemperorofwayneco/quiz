import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from './components/auth/WelcomeScreen';
import TeacherLogin from './components/auth/TeacherLogin';
import StudentLogin from './components/auth/StudentLogin';
import TeacherRegister from './components/auth/TeacherRegister';
import StudentRegister from './components/auth/StudentRegister';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

function AppContent() {
  const { user, userType } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/register" element={<TeacherRegister />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {userType === 'teacher' ? (
        <Route path="/*" element={<TeacherDashboard />} />
      ) : (
        <Route path="/*" element={<StudentDashboard />} />
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <AppContent />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;