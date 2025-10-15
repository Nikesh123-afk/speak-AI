/**
 * User Dashboard Component
 * Shows user profile, progress, and settings
 */

import { useAuth } from '../context/AuthContext';

interface UserDashboardProps {
  onClose: () => void;
}

export function UserDashboard({ onClose }: UserDashboardProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const planLimits = {
    free: { sessions: 3, color: 'gray' },
    standard: { sessions: Infinity, color: 'blue' },
    premium: { sessions: Infinity, color: 'purple' },
  };

  const currentPlan = planLimits[user.plan];
  const sessionsRemaining = currentPlan.sessions === Infinity 
    ? 'Unlimited' 
    : Math.max(0, currentPlan.sessions - user.practiceCount);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-orange-600">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-orange-100">{user.email}</p>
              <div className="mt-2 inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
              <p className="text-sm text-gray-600 mb-1">Practice Sessions</p>
              <p className="text-3xl font-bold text-orange-600">{user.practiceCount}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <p className="text-sm text-gray-600 mb-1">Sessions Remaining</p>
              <p className="text-3xl font-bold text-amber-600">{sessionsRemaining}</p>
            </div>
          </div>

          {/* Plan Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Plan</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">
                  {user.plan === 'free' ? 'Basic 3 sessions' : 'Unlimited practice sessions'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">
                  {user.plan === 'free' ? 'Part 1 only' : 'All Parts 1, 2, 3'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">
                  {user.plan === 'free' ? 'Basic feedback' : 'Detailed AI feedback'}
                </span>
              </div>
            </div>

            {user.plan === 'free' && (
              <button className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg transition">
                Upgrade to Premium
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
            
            <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-left flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">View Progress</p>
                <p className="text-sm text-gray-500">Track your improvement over time</p>
              </div>
            </button>

            <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-left flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">Settings</p>
                <p className="text-sm text-gray-500">Manage your account preferences</p>
              </div>
            </button>

            <button 
              onClick={handleLogout}
              className="w-full px-4 py-3 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition text-left flex items-center gap-3 text-red-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <div>
                <p className="font-semibold">Logout</p>
                <p className="text-sm text-red-500">Sign out of your account</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
