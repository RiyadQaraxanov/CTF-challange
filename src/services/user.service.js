import api from '../api/axios';

export const userService = {
    getAll: async (params) => {
        const response = await api.get('/users', { params });
        return response.data;
    },
    updateStatus: async (userId, status) => {
        const response = await api.patch(`/users/${userId}/status`, { status });
        return response.data;
    },
    softDelete: async (userId, reason) => {
        const response = await api.post(`/users/${userId}/delete`, { reason });
        return response.data;
    },
    restore: async (userId) => {
        const response = await api.post(`/users/${userId}/restore`);
        return response.data;
    }
};
