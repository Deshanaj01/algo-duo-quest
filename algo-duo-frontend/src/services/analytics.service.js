import api from './api';

export const analyticsService = {
  getUserAnalytics: async () => {
    const response = await api.get('/analytics');
    return response.data;
  },

  getProgressAnalytics: async (period = '30d') => {
    const response = await api.get('/analytics/progress', { params: { period } });
    return response.data;
  },

  getTopicAnalytics: async () => {
    const response = await api.get('/analytics/topics');
    return response.data;
  },

  getStreakAnalytics: async () => {
    const response = await api.get('/analytics/streak');
    return response.data;
  },

  getAccuracyAnalytics: async () => {
    const response = await api.get('/analytics/accuracy');
    return response.data;
  }
};