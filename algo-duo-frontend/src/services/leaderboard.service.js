import api from './api';

export const leaderboardService = {
  getGlobalLeaderboard: async (params) => {
    const response = await api.get('/leaderboard', { params });
    return response.data;
  },

  getModuleLeaderboard: async (moduleId, params) => {
    const response = await api.get(`/leaderboard/module/${moduleId}`, { params });
    return response.data;
  },

  getWeeklyLeaderboard: async (params) => {
    const response = await api.get('/leaderboard/weekly', { params });
    return response.data;
  },

  getUserRank: async () => {
    const response = await api.get('/leaderboard/rank');
    return response.data;
  }
};