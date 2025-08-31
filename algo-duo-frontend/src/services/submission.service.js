import api from './api';

export const submissionService = {
  getUserSubmissions: async (params) => {
    const response = await api.get('/submissions', { params });
    return response.data;
  },

  getSubmission: async (submissionId) => {
    const response = await api.get(`/submissions/${submissionId}`);
    return response.data;
  },

  getProblemSubmissions: async (problemId) => {
    const response = await api.get(`/problems/${problemId}/submissions`);
    return response.data;
  },

  getRecentSubmissions: async (limit = 10) => {
    const response = await api.get('/submissions/recent', { params: { limit } });
    return response.data;
  }
};  