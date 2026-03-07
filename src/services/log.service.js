import api from '../api/axios';

export const logService = {
    getAll: async (params) => {
        const response = await api.get('/logs', { params });
        return response.data;
    },
    getStats: async () => {
        const response = await api.get('/logs/stats');
        return response.data;
    }
};
