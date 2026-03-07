import api from '../api/axios';

export const authService = {
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },
    checkAuth: async () => {
        const response = await api.get('/auth/check');
        return response.data;
    }
};
