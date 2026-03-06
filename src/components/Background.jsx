import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const Background = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Create floating particles
        const container = containerRef.current;
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full bg-neon-blue/20 pointer-events-none';
            const size = Math.random() * 4 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            container.appendChild(particle);

            anime({
                targets: particle,
                translateX: () => anime.random(-50, 50),
                translateY: () => anime.random(-50, 50),
                opacity: [0.2, 0.8, 0.2],
                duration: () => anime.random(3000, 7000),
                easing: 'easeInOutQuad',
                loop: true,
                direction: 'alternate'
            });
        }
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 -z-10 bg-cyber-dark overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-cyber-dark"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-red/5 rounded-full blur-[120px]"></div>
        </div>
    );
};

export default Background;
