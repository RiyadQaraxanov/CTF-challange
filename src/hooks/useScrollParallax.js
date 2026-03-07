import { useEffect } from 'react';

export const useScrollParallax = (ref, speed = 0.1, isVertical = true) => {
    useEffect(() => {
        let animationFrameId;

        const handleScroll = () => {
            if (!ref.current) return;
            
            const element = ref.current;
            const rect = element.getBoundingClientRect();
            
            // Only animate if the element is somewhere in the viewport (or close to it)
            if (rect.top <= window.innerHeight + 200 && rect.bottom >= -200) {
                // Calculate distance from center of viewport to create smooth relative parallax
                const viewportCenter = window.innerHeight / 2;
                const elementCenter = rect.top + rect.height / 2;
                const distanceFromCenter = elementCenter - viewportCenter;
                
                const offset = distanceFromCenter * speed;
                
                if (isVertical) {
                    element.style.transform = `translateY(${offset}px)`;
                } else {
                    element.style.transform = `translateX(${offset}px)`;
                }
            }
        };

        const onScroll = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            animationFrameId = requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        // Initial setup
        handleScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [ref, speed, isVertical]);
};
