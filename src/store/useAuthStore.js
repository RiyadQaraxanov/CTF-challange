import { create } from 'zustand';
import { authService } from '../services/auth.service';

export const useAuthStore = create((set) => ({
    user: null,
    isLoggedIn: false,
    isLoading: true,
    error: null,

    setAuth: (status, user = null) => set({ isLoggedIn: status, user, isLoading: false }),

    login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
            await authService.login(username, password);
            set({ isLoggedIn: true, user: { username }, isLoading: false });
            return true;
        } catch (error) {
            set({ 
                error: error.response?.data?.message || 'Giriş uğursuz oldu.', 
                isLoading: false 
            });
            return false;
        }
    },

    logout: async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            set({ isLoggedIn: false, user: null });
        }
    },

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            await authService.checkAuth();
            set({ isLoggedIn: true, isLoading: false });
        } catch (error) {
            set({ isLoggedIn: false, isLoading: false });
        }
    }
}));
