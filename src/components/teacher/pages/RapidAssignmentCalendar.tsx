import React, { useState, useRef } from 'react';
import { 
  Save, 
  Calendar,
  Plus,
  X,
  ArrowLeft,
  Bot,
  Loader2,
  Upload,
  Mic,
  Video,
  PenTool,
  Clock,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { aiService } from '../../../services/aiService';

const RapidAssignmentCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Assignment form states
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [assignToClass, setAssignToClass] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('Medium');
  const [instructions, setInstructions] = useState('');
  const [textContent, setTextContent] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [unlockCondition, setUnlockCondition] = useState('No condition');
  const [autoHelp, setAutoHelp] = useState(false);
  const [unlockChallenges, setUnlockChallenges] = useState(false);
  
  // AI Assistant states
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'offline'>('checking');
  
  // Sample assignments data
  const [assignments, setAssignments] = useState<any[]>([]);
  
  const subjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography', 
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art'
  ];
  
  const classes = [
    'Class 6A', 'Class 6B', 'Class 7A', 'Class 7B', 
    'Class 8A', 'Class 8B', 'Class 9A', 'Class 9B'
  ];
  
  const checkAPIStatus = async () => {
    try {
      const status = await aiService.getAPIStatus();
      setApiStatus(status ? 'connected' : 'offline');
    } catch (error) {
      setApiStatus('offline');
    }
  };
  
  React.useEffect(() => {
    checkAPIStatus();
  }, []);
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setDueDate(date.toISOString().split('T')[0]);
    setShowAssignmentForm(true);
  };
  
  const handleGenerateContent = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const prompt = `Create assignment content for:\n\nSubject: ${subject}\nTitle: ${assignmentTitle}\nDifficulty: ${difficultyLevel}\nPrompt: ${aiPrompt}\n\nPlease provide detailed assignment content including questions, instructions, and any relevant materials.`;
      
      const response = await aiService.generateContent(prompt);
      setGeneratedContent(response);
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content. Please check your API connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleAcceptAIContent = () => {
    setTextContent(generatedContent);
    setGeneratedContent('');
    setShowAIAssistant(false);
    setAiPrompt('');
  };
  
  const handleSaveAssignment = () => {
    const newAssignment = {
      id: Date.now(),
      title: assignmentTitle,
      subject,
      class: assignToClass,
      dueDate,
      dueTime,
      difficulty: difficultyLevel,
      instructions,
      content: textContent,
      releaseDate,
      unlockCondition,
      autoHelp,
      unlockChallenges,
      createdAt: new Date().toISOString()
    };
    
    setAssignments([...assignments, newAssignment]);
    
    // Reset form
    setAssignmentTitle('');
    setSubject('Mathematics');
    setAssignToClass('');
    setDueDate('');
    setDueTime('');
    setDifficultyLevel('Medium');
    setInstructions('');
    setTextContent('');
    setReleaseDate('');
    setUnlockCondition('No condition');
    setAutoHelp(false);
    setUnlockChallenges(false);
    setShowAssignmentForm(false);
    
    alert('Assignment saved successfully!');
  };
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };
  
  const getAssignmentsForDate = (date: Date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return assignments.filter(assignment => assignment.dueDate === dateStr);
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/teacher/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Rapid Assignment Calendar</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowAIAssistant(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                apiStatus === 'connected' 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={apiStatus !== 'connected'}
            >
              <Bot className="w-4 h-4" />
              AI Assistant
            </button>
          </div>
        </div>
      </div>
      
      {/* Calendar */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              ←
            </button>
            <h2 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              →
            </button>
          </div>
          
          {/* Calendar Grid */}
          <div className="p-4">
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonth(currentDate).map((date, index) => {
                const dayAssignments = date ? getAssignmentsForDate(date) : [];
                return (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border rounded cursor-pointer hover:bg-gray-50 ${
                      date ? 'bg-white border-gray-200' : 'bg-gray-50 border-transparent'
                    }`}
                    onClick={() => date && handleDateClick(date)}
                  >
                    {date && (
                      <>
                        <div className="font-medium text-sm mb-1">{date.getDate()}</div>
                        {dayAssignments.map(assignment => (
                          <div
                            key={assignment.id}
                            className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded mb-1 truncate"
                            title={assignment.title}
                          >
                            {assignment.title}
                          </div>
                        ))}
                        {date && (
                          <div className="text-xs text-gray-400 hover:text-blue-600">
                            + Add Assignment
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Assignment Form Modal */}
      {showAssignmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add Assignment</h2>
              <button
                onClick={() => setShowAssignmentForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Math Practice Sheet"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {subjects.map(subj => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign to Class
                  </label>
                  <select
                    value={assignToClass}
                    onChange={(e) => setAssignToClass(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Time
                  </label>
                  <input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructions
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide detailed instructions for the assignment"
                />
              </div>
              
              {/* Content Section with AI */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Text Content
                  </label>
                  <button
                    onClick={() => setShowAIAssistant(true)}
                    className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
                  >
                    <Bot className="w-4 h-4" />
                    AI Help
                  </button>
                </div>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the main content of your assignment directly..."
                />
              </div>
              
              {/* Media Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Media
                </label>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Mic className="w-4 h-4" />
                    Record Audio
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Video className="w-4 h-4" />
                    Record Video
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <PenTool className="w-4 h-4" />
                    Draw/Sketch
                  </button>
                </div>
              </div>
              
              {/* Advanced Options */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Optional Advanced Scheduling</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Release Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={releaseDate}
                      onChange={(e) => setReleaseDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unlock Condition
                    </label>
                    <select
                      value={unlockCondition}
                      onChange={(e) => setUnlockCondition(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="No condition">No condition</option>
                      <option value="After Chapter 1 Quiz">Only after 'Chapter 1 Quiz' is submitted</option>
                      <option value="After Previous Assignment">After previous assignment completion</option>
                    </select>
                  </div>
                </div>
                
                {/* Differentiated Instruction */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">One-Click Smart Adaptation</h4>
                  
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={autoHelp}
                      onChange={(e) => setAutoHelp(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Automatically provide extra help for struggling students
                    </span>
                  </label>
                  
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={unlockChallenges}
                      onChange={(e) => setUnlockChallenges(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Unlock challenges for quick learners
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAssignmentForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAssignment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Assignment
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">AI Assistant (Llama 3.3)</h2>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  apiStatus === 'connected' ? 'bg-green-100 text-green-800' :
                  apiStatus === 'offline' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {apiStatus === 'connected' ? 'Connected' :
                   apiStatus === 'offline' ? 'Offline' : 'Checking...'}
                </div>
              </div>
              <button
                onClick={() => setShowAIAssistant(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe what content you need
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  placeholder="Example: Create 10 algebra word problems about linear equations for 8th grade students..."
                />
              </div>
              
              <button
                onClick={handleGenerateContent}
                disabled={!aiPrompt.trim() || isGenerating || apiStatus !== 'connected'}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    Generate Content
                  </>
                )}
              </button>
              
              {generatedContent && (
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800">{generatedContent}</pre>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleAcceptAIContent}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                      Use This Content
                    </button>
                    <button
                      onClick={handleGenerateContent}
                      disabled={isGenerating}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RapidAssignmentCalendar;