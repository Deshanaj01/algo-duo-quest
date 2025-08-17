import api from './api';

export const moduleService = {
  getAllModules: async () => {
    const response = await api.get('/modules');
    return response.data;
  },

  getModule: async (moduleId) => {
    const response = await api.get(`/modules/${moduleId}`);
    return response.data;
  },

  getModuleProgress: async (moduleId) => {
    const response = await api.get(`/modules/${moduleId}/progress`);
    return response.data;
  },

  getUserModules: async () => {
    const response = await api.get('/modules/user');
    return response.data;
  }
};