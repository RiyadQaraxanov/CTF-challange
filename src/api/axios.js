import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ctf-challange-back.onrender.com',
    withCredentials: true, // Crucial for sending/receiving cookies
});

// Request interceptor to add the access token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors and token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loop if refresh token itself fails
        if (originalRequest.url === '/auth/refresh') {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                // Attempt to refresh the token using body
                const res = await api.post('/auth/refresh', { refreshToken });
                
                if (res.data?.accessToken) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                }
                if (res.data?.refreshToken) {
                    localStorage.setItem('refreshToken', res.data.refreshToken);
                }

                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, clear tokens and let the component handle the error
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
