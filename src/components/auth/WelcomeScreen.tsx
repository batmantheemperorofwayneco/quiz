import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, BarChart3 } from 'lucide-react';
import Logo from '../common/Logo';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Logo size="xl" className="drop-shadow-lg" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">The Learning</h1>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Canvas</h1>
            </div>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Homework Management - Comprehensive system that enhances learning through intelligent insights and personalized support
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Smart Assignments</h3>
            <p className="text-blue-100 text-sm">Create multi-modal assignments with real-time progress tracking</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Performance Insights</h3>
            <p className="text-blue-100 text-sm">AI-powered analytics to identify struggling students and provide remediation</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Collaborative Learning</h3>
            <p className="text-blue-100 text-sm">Peer learning, gamification, and instant doubt resolution</p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Choose Your Role</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teacher Card */}
            <div 
              onClick={() => navigate('/teacher/login')}
              className="group cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Teacher</h3>
                <p className="text-gray-600 mb-4">Create assignments, track student progress, and provide personalized feedback</p>
                <div className="bg-blue-600 text-white px-6 py-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                  Get Started
                </div>
              </div>
            </div>

            {/* Student Card */}
            <div 
              onClick={() => navigate('/student/login')}
              className="group cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 hover:border-green-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Student</h3>
                <p className="text-gray-600 mb-4">Access assignments, get instant help, and track your learning progress</p>
                <div className="bg-green-600 text-white px-6 py-2 rounded-lg group-hover:bg-green-700 transition-colors">
                  Get Started
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-blue-100 text-sm">
            Empowering education through intelligent technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;