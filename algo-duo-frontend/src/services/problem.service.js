import api from './api';

export const problemService = {
  getAllProblems: async (params) => {
    const response = await api.get('/problems', { params });
    return response.data;
  },

  getProblem: async (problemId) => {
    const response = await api.get(`/problems/${problemId}`);
    return response.data;
  },

  getModuleProblems: async (moduleId) => {
    const response = await api.get(`/modules/${moduleId}/problems`);
    return response.data;
  },

  submitSolution: async (problemId, solution) => {
    const response = await api.post(`/problems/${problemId}/submit`, solution);
    return response.data;
  },

  runCode: async (problemId, code) => {
    const response = await api.post(`/problems/${problemId}/run`, code);
    return response.data;
  },

  getProblemHints: async (problemId) => {
    const response = await api.get(`/problems/${problemId}/hints`);
    return response.data;
  },

  getProblemTestCases: async (problemId) => {
    const response = await api.get(`/problems/${problemId}/testcases`);
    return response.data;
  }
};