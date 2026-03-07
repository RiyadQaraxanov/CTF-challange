import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true, // Crucial for sending/receiving cookies automatically
});

// Request interceptor to manually add token from cookie if needed
api.interceptors.request.use(
    (config) => {
        // Cookie-dən accessToken-i oxumaq (HttpOnly olmayan hissə üçün və ya fallback olaraq)
        // Lakin HttpOnly cookie brauzer tərəfindən idarə olunmalıdır.
        // Əgər backend-də "accessToken" cookie-si HttpOnly: false olarsa bura kömək edəcək.
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        const token = getCookie('access_token');
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
                // Attempt to refresh the token. 
                // The refresh_token cookie will be sent automatically.
                await api.post('/auth/refresh', {});
                
                // If successful, the new jwt cookie is automatically set by the server.
                // Retry the original request without needing to manually set headers.
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, let the component handle the error and redirect to login
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
