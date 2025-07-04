import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Monitor,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: 'Ms. Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      department: 'Mathematics',
      phone: '+1 (555) 123-4567',
      bio: 'Passionate mathematics educator with 8 years of experience helping students discover the beauty of algebra and geometry.'
    },
    notifications: {
      emailAssignments: true,
      emailMessages: true,
      emailRemediation: true,
      pushAssignments: false,
      pushMessages: true,
      pushRemediation: true,
      weeklyReports: true,
      monthlyAnalytics: false
    },
    privacy: {
      profileVisibility: 'students',
      contactVisibility: 'students',
      performanceSharing: false
    },
    appearance: {
      theme: 'light',
      language: 'en',
      timezone: 'America/New_York'
    }
  });

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-blue-600" />
                    </div>
                    <div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Change Photo
                      </button>
                      <p className="text-sm text-gray-600 mt-1">JPG, PNG max 2MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={settings.profile.name}
                        onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <input
                        type="text"
                        value={settings.profile.department}
                        onChange={(e) => handleInputChange('profile', 'department', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={settings.profile.bio}
                      onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'emailAssignments', label: 'Assignment submissions and updates', desc: 'Get notified when students submit or update assignments' },
                        { key: 'emailMessages', label: 'Student messages', desc: 'Receive emails when students send you messages' },
                        { key: 'emailRemediation', label: 'Remediation alerts', desc: 'Get alerts when students need additional support' },
                        { key: 'weeklyReports', label: 'Weekly performance reports', desc: 'Summary of class performance and analytics' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                            onChange={(e) => handleInputChange('notifications', item.key, e.target.checked)}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div>
                            <label className="text-sm font-medium text-gray-900">{item.label}</label>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'pushMessages', label: 'Urgent student messages', desc: 'Immediate notifications for urgent communications' },
                        { key: 'pushRemediation', label: 'Critical remediation needs', desc: 'Alerts for students requiring immediate attention' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                            onChange={(e) => handleInputChange('notifications', item.key, e.target.checked)}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div>
                            <label className="text-sm font-medium text-gray-900">{item.label}</label>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                    <select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="students">Students and Faculty</option>
                      <option value="faculty">Faculty Only</option>
                      <option value="private">Private</option>
                    </select>
                    <p className="text-sm text-gray-600 mt-1">Control who can see your profile information</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
                    <select
                      value={settings.privacy.contactVisibility}
                      onChange={(e) => handleInputChange('privacy', 'contactVisibility', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="students">Students can contact me</option>
                      <option value="limited">Office hours only</option>
                      <option value="faculty">Faculty only</option>
                    </select>
                    <p className="text-sm text-gray-600 mt-1">Set your preferred contact method</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={settings.privacy.performanceSharing}
                      onChange={(e) => handleInputChange('privacy', 'performanceSharing', e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <label className="text-sm font-medium text-gray-900">Share anonymized performance data</label>
                      <p className="text-sm text-gray-600">Help improve the platform by sharing anonymized student performance data for research</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Appearance & Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={settings.appearance.theme === 'light'}
                          onChange={(e) => handleInputChange('appearance', 'theme', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">Light Mode</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={settings.appearance.theme === 'dark'}
                          onChange={(e) => handleInputChange('appearance', 'theme', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">Dark Mode</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={settings.appearance.language}
                      onChange={(e) => handleInputChange('appearance', 'language', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={settings.appearance.timezone}
                      onChange={(e) => handleInputChange('appearance', 'timezone', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;