import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';

const PageLogger = () => {
    const location = useLocation();

    useEffect(() => {
        const logPageView = async () => {
            try {
                await api.post('/logs', {
                    page: location.pathname + location.search,
                    actor: 'Visitor' // Could be updated to show username if logged in
                });
            } catch (error) {
                console.error('Failed to log page view:', error);
            }
        };

        logPageView();
    }, [location]);

    return null; // This component doesn't render anything
};

export default PageLogger;
