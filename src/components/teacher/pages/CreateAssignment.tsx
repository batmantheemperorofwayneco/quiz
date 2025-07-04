import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../contexts/DataContext';
import { useAuth } from '../../../contexts/AuthContext';
import { aiService } from '../../../services/aiService';
import { 
  Save, 
  Eye, 
  Send, 
  Upload, 
  Mic, 
  Video, 
  Palette,
  Calendar,
  Users,
  Settings,
  Plus,
  X,
  Sparkles,
  Loader,
  RefreshCw,
  Wifi,
  WifiOff
} from 'lucide-react';

const CreateAssignment: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { classes, createAssignment } = useData();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDraft, setAiDraft] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [apiStatus, setApiStatus] = useState<{ connected: boolean; model: string; error?: string } | null>(null);
  const [aiOptions, setAiOptions] = useState({
    questionType: 'MCQ',
    difficulty: 'Medium',
    topic: '',
    gradeLevel: '9th Grade',
    numQuestions: 5,
    wordCount: 200
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    subject: '',
    totalQuestions: 10,
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    classId: '',
    content: {
      text: '',
      images: [] as string[],
      audio: [] as string[],
      video: [] as string[],
      drawings: [] as string[]
    },
    differentiation: {
      enabled: false,
      tiers: [] as Array<{
        name: string;
        scoreRange: { min: number; max: number };
        content: any;
      }>
    },
    scheduling: {
      releaseDate: '',
      unlockCondition: ''
    }
  });

  const teacherClasses = classes.filter(c => c.teacherId === user?.id);

  // Check API status when AI assistant is opened
  React.useEffect(() => {
    if (showAIAssistant && !apiStatus) {
      checkAPIStatus();
    }
  }, [showAIAssistant]);

  const checkAPIStatus = async () => {
    try {
      const status = await aiService.getAPIStatus();
      setApiStatus(status);
    } catch (error) {
      setApiStatus({
        connected: false,
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        error: 'Failed to check API status'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent, status: 'Draft' | 'Active') => {
    e.preventDefault();
    
    createAssignment({
      ...formData,
      status,
      completionRate: 0,
      createdBy: user?.id || ''
    });

    navigate('/assignments');
  };

  const handleContentUpload = (type: 'images' | 'audio' | 'video') => {
    // Mock file upload - in real app, this would handle actual file uploads
    const mockFile = `mock-${type}-${Date.now()}`;
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [type]: [...prev.content[type], mockFile]
      }
    }));
  };

  const addDifferentiationTier = () => {
    setFormData(prev => ({
      ...prev,
      differentiation: {
        ...prev.differentiation,
        tiers: [
          ...prev.differentiation.tiers,
          {
            name: `Tier ${prev.differentiation.tiers.length + 1}`,
            scoreRange: { min: 0, max: 100 },
            content: {}
          }
        ]
      }
    }));
  };

  const removeDifferentiationTier = (index: number) => {
    setFormData(prev => ({
      ...prev,
      differentiation: {
        ...prev.differentiation,
        tiers: prev.differentiation.tiers.filter((_, i) => i !== index)
      }
    }));
  };

  const handleGenerateAIDraft = async () => {
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    try {
      const response = await aiService.generateAssignmentDraft({
        promptDescription: aiPrompt,
        options: aiOptions
      });

      if (response.success && response.draftContent) {
        setAiDraft(response.draftContent);
      } else {
        alert('Failed to generate assignment: ' + (response.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('AI generation error:', error);
      alert('Failed to generate assignment. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleAcceptAIDraft = () => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        text: prev.content.text + '\n\n' + aiDraft
      }
    }));
    setAiDraft('');
    setShowAIAssistant(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Assignment</h1>
        <p className="text-gray-600">Design engaging assignments with multi-modal content and AI assistance.</p>
      </div>

      <form className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Assignment Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter assignment title"
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
                Assign to Class
              </label>
              <select
                value={formData.classId}
                onChange={(e) => setFormData(prev => ({ ...prev, classId: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a class</option>
                {teacherClasses.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Provide detailed instructions for the assignment..."
                required
              />
            </div>
          </div>
        </div>

        {/* Multi-Modal Content */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Assignment Content</h2>
            <button
              type="button"
              onClick={() => setShowAIAssistant(true)}
              className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              AI Assistant (Llama 3.3)
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Content
              </label>
              <textarea
                value={formData.content.text}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, text: e.target.value }
                }))}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Enter the main content of your assignment..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attach Media
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => handleContentUpload('images')}
                  className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-600">Upload Image</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleContentUpload('audio')}
                  className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Mic className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-600">Record Audio</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleContentUpload('video')}
                  className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Video className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-600">Record Video</span>
                </button>

                <button
                  type="button"
                  className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Palette className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-600">Draw/Sketch</span>
                </button>
              </div>
            </div>

            {/* Show uploaded content */}
            {(formData.content.images.length > 0 || formData.content.audio.length > 0 || formData.content.video.length > 0) && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Attached Content</h4>
                <div className="space-y-2">
                  {formData.content.images.map((img, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Upload className="w-4 h-4" />
                      <span>Image {index + 1}</span>
                    </div>
                  ))}
                  {formData.content.audio.map((audio, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Mic className="w-4 h-4" />
                      <span>Audio {index + 1}</span>
                    </div>
                  ))}
                  {formData.content.video.map((video, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Video className="w-4 h-4" />
                      <span>Video {index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Scheduling */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Advanced Scheduling</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Release Date (Optional)
              </label>
              <input
                type="datetime-local"
                value={formData.scheduling.releaseDate}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  scheduling: { ...prev.scheduling, releaseDate: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to release immediately</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unlock Condition
              </label>
              <select
                value={formData.scheduling.unlockCondition}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  scheduling: { ...prev.scheduling, unlockCondition: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">No condition</option>
                <option value="manual">Manual unlock</option>
                <option value="previous">After previous assignment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Differentiated Instruction */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Differentiated Instruction</h2>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.differentiation.enabled}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  differentiation: { ...prev.differentiation, enabled: e.target.checked }
                }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Enable differentiation</span>
            </label>
          </div>

          {formData.differentiation.enabled && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Create different versions of this assignment based on student performance levels.
              </p>

              {formData.differentiation.tiers.map((tier, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="text"
                      value={tier.name}
                      onChange={(e) => {
                        const newTiers = [...formData.differentiation.tiers];
                        newTiers[index].name = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          differentiation: { ...prev.differentiation, tiers: newTiers }
                        }));
                      }}
                      className="font-medium text-gray-900 bg-transparent border-none focus:outline-none"
                      placeholder="Tier name"
                    />
                    <button
                      type="button"
                      onClick={() => removeDifferentiationTier(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Min Score %</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={tier.scoreRange.min}
                        onChange={(e) => {
                          const newTiers = [...formData.differentiation.tiers];
                          newTiers[index].scoreRange.min = parseInt(e.target.value);
                          setFormData(prev => ({
                            ...prev,
                            differentiation: { ...prev.differentiation, tiers: newTiers }
                          }));
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Max Score %</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={tier.scoreRange.max}
                        onChange={(e) => {
                          const newTiers = [...formData.differentiation.tiers];
                          newTiers[index].scoreRange.max = parseInt(e.target.value);
                          setFormData(prev => ({
                            ...prev,
                            differentiation: { ...prev.differentiation, tiers: newTiers }
                          }));
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addDifferentiationTier}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-4 h-4" />
                Add Tier
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'Draft')}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save as Draft
          </button>
          
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-5 h-5" />
            Preview
          </button>
          
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'Active')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-5 h-5" />
            Assign to Students
          </button>
        </div>
      </form>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">AI Assignment Assistant</h2>
                  {apiStatus && (
                    <div className={`flex items-center gap-2 text-sm ${
                      apiStatus.connected ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {apiStatus.connected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                      {apiStatus.connected 
                        ? `Connected (${apiStatus.model})` 
                        : `Offline - ${apiStatus.error || 'Connection failed'}`
                      }
                    </div>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setShowAIAssistant(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe the assignment you need
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  placeholder="e.g., Generate 5 multiple choice questions about photosynthesis for 9th grade students"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                  <select
                    value={aiOptions.questionType}
                    onChange={(e) => setAiOptions(prev => ({ ...prev, questionType: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="MCQ">Multiple Choice</option>
                    <option value="Short Answer">Short Answer</option>
                    <option value="Essay">Essay</option>
                    <option value="Problem Set">Problem Set</option>
                    <option value="True/False">True/False</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={aiOptions.difficulty}
                    onChange={(e) => setAiOptions(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                  <input
                    type="text"
                    value={aiOptions.topic}
                    onChange={(e) => setAiOptions(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="e.g., Photosynthesis"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
                  <select
                    value={aiOptions.gradeLevel}
                    onChange={(e) => setAiOptions(prev => ({ ...prev, gradeLevel: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="5th Grade">5th Grade</option>
                    <option value="6th Grade">6th Grade</option>
                    <option value="7th Grade">7th Grade</option>
                    <option value="8th Grade">8th Grade</option>
                    <option value="9th Grade">9th Grade</option>
                    <option value="10th Grade">10th Grade</option>
                    <option value="11th Grade">11th Grade</option>
                    <option value="12th Grade">12th Grade</option>
                  </select>
                </div>

                {(aiOptions.questionType === 'MCQ' || aiOptions.questionType === 'Problem Set') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={aiOptions.numQuestions}
                      onChange={(e) => setAiOptions(prev => ({ ...prev, numQuestions: parseInt(e.target.value) }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                )}

                {aiOptions.questionType === 'Essay' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Word Count</label>
                    <input
                      type="number"
                      min="50"
                      max="2000"
                      value={aiOptions.wordCount}
                      onChange={(e) => setAiOptions(prev => ({ ...prev, wordCount: parseInt(e.target.value) }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={handleGenerateAIDraft}
                disabled={!aiPrompt.trim() || aiLoading || !apiStatus?.connected}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {aiLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Draft
                  </>
                )}
              </button>

              {aiDraft && (
                <div className="border-t pt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Generated Content:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">{aiDraft}</pre>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAcceptAIDraft}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      Accept & Insert
                    </button>
                    <button
                      onClick={handleGenerateAIDraft}
                      disabled={aiLoading}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </button>
                    <button
                      onClick={() => setAiDraft('')}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Discard
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

export default CreateAssignment;