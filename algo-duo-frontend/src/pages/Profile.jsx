import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import { analyticsService } from '../services/analytics.service';
import Loader from '../components/common/Loader';
import { FiEdit2, FiMail, FiUser, FiCalendar, FiAward } from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { formatDate } from '../utils/helpers';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: ''
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const [profileResponse, statsResponse] = await Promise.all([
        authService.getProfile(),
        analyticsService.getUserAnalytics()
      ]);
      
      setProfile(profileResponse.data);
      setStats(statsResponse.data);
      setFormData({
        username: profileResponse.data.username,
        email: profileResponse.data.email,
        bio: profileResponse.data.bio || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.updateProfile(formData);
      setProfile(response.data);
      updateUser(response.data);
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 h-32"></div>
          <div className="px-8 pb-8">
            <div className="flex items-end -mt-16 mb-4">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-5xl font-bold text-primary-600">
                  {profile?.username?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="ml-6 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{profile?.username}</h1>
                <p className="text-gray-600">{profile?.email}</p>
              </div>
              <button
                onClick={() => setEditing(!editing)}
                className="ml-auto mb-4 btn-secondary"
              >
                <FiEdit2 className="mr-2" />
                Edit Profile
              </button>
            </div>

            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="input-field"
                    rows="3"
                  />
                </div>
                <div className="flex space-x-3">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setEditing(false)} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <FiCalendar className="text-gray-400 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-semibold">{formatDate(profile?.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <HiOutlineFire className="text-orange-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Current Streak</p>
                    <p className="font-semibold">{stats?.streak || 0} days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FiAward className="text-primary-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Current Level</p>
                    <p className="font-semibold">Level {stats?.level || 1}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total XP</h3>
            <p className="text-3xl font-bold text-primary-600">{stats?.totalXP || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Problems Solved</h3>
            <p className="text-3xl font-bold text-green-600">{stats?.problemsSolved || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Accuracy</h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.accuracy || 0}%</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Max Streak</h3>
            <p className="text-3xl font-bold text-orange-600">{stats?.maxStreak || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;