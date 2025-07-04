import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  User,
  Crown,
  Star
} from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  rank: number;
  trend: 'up' | 'down' | 'same';
  badges: string[];
  avatar?: string;
}

const StudentLeaderboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('month');
  const [scopeFilter, setScopeFilter] = useState<'class' | 'all'>('class');

  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      points: 1250,
      rank: 1,
      trend: 'same',
      badges: ['Perfect Score', 'Helpful Peer', 'Quick Learner']
    },
    {
      id: '2',
      name: 'Sarah Chen',
      points: 1180,
      rank: 2,
      trend: 'up',
      badges: ['Consistent Performer', 'Team Player']
    },
    {
      id: '3',
      name: 'Michael Rodriguez',
      points: 1120,
      rank: 3,
      trend: 'down',
      badges: ['Problem Solver', 'Dedicated Student']
    },
    {
      id: '4',
      name: 'Emma Thompson',
      points: 980,
      rank: 4,
      trend: 'up',
      badges: ['Improvement Star']
    },
    {
      id: '5',
      name: 'David Kim',
      points: 920,
      rank: 5,
      trend: 'same',
      badges: ['Reliable Student']
    },
    {
      id: '6',
      name: 'You',
      points: 850,
      rank: 6,
      trend: 'up',
      badges: ['Rising Star', 'Active Learner']
    }
  ];

  const currentUser = leaderboardData.find(entry => entry.name === 'You');
  const topThree = leaderboardData.slice(0, 3);
  const others = leaderboardData.slice(3);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return null;
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default: return 'bg-white';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">See how you rank among your classmates and celebrate achievements together!</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as any)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Scope</label>
            <select
              value={scopeFilter}
              onChange={(e) => setScopeFilter(e.target.value as any)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="class">My Class</option>
              <option value="all">All Classes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Top Performers</h2>
        
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* 2nd Place */}
          <div className="text-center">
            <div className={`w-20 h-20 rounded-full ${getRankBackground(2)} flex items-center justify-center mb-3 mx-auto`}>
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-600" />
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg min-h-[100px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-center mb-1">
                  {getRankIcon(2)}
                  <span className="ml-1 text-lg font-bold text-gray-700">2nd</span>
                </div>
                <p className="font-semibold text-gray-900">{topThree[1]?.name}</p>
                <p className="text-sm text-gray-600">{topThree[1]?.points} pts</p>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className={`w-24 h-24 rounded-full ${getRankBackground(1)} flex items-center justify-center mb-3 mx-auto`}>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-gray-600" />
              </div>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg min-h-[120px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-center mb-1">
                  {getRankIcon(1)}
                  <span className="ml-1 text-xl font-bold text-yellow-600">1st</span>
                </div>
                <p className="font-semibold text-gray-900">{topThree[0]?.name}</p>
                <p className="text-sm text-gray-600">{topThree[0]?.points} pts</p>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className={`w-20 h-20 rounded-full ${getRankBackground(3)} flex items-center justify-center mb-3 mx-auto`}>
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-600" />
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg min-h-[100px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-center mb-1">
                  {getRankIcon(3)}
                  <span className="ml-1 text-lg font-bold text-amber-600">3rd</span>
                </div>
                <p className="font-semibold text-gray-900">{topThree[2]?.name}</p>
                <p className="text-sm text-gray-600">{topThree[2]?.points} pts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Rankings */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Full Rankings</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {leaderboardData.map((entry) => (
            <div 
              key={entry.id} 
              className={`p-4 flex items-center justify-between hover:bg-gray-50 ${
                entry.name === 'You' ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 min-w-[60px]">
                  <span className={`text-lg font-bold ${
                    entry.rank <= 3 ? 'text-yellow-600' : 'text-gray-700'
                  }`}>
                    #{entry.rank}
                  </span>
                  {entry.rank <= 3 && getRankIcon(entry.rank)}
                </div>
                
                <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold ${
                      entry.name === 'You' ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {entry.name}
                    </p>
                    {entry.name === 'You' && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">You</span>
                    )}
                  </div>
                  
                  {entry.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {entry.badges.slice(0, 2).map((badge, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                        >
                          <Star className="w-3 h-3" />
                          {badge}
                        </span>
                      ))}
                      {entry.badges.length > 2 && (
                        <span className="text-xs text-gray-500">+{entry.badges.length - 2} more</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-bold text-gray-900">{entry.points}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
                {getTrendIcon(entry.trend)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Stats */}
      {currentUser && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Your Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">{currentUser.rank}</p>
              <p className="text-sm text-blue-700">Current Rank</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">{currentUser.points}</p>
              <p className="text-sm text-blue-700">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">{currentUser.badges.length}</p>
              <p className="text-sm text-blue-700">Badges Earned</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLeaderboard;