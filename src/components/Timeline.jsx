import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Clock, Lock, Unlock, Trophy } from 'lucide-react';
import { useScrollParallax } from '../hooks/useScrollParallax';

const Timeline = () => {
    const timelineRef = useRef(null);
    const titleRef = useRef(null);
    const lineRef = useRef(null);

    useScrollParallax(titleRef, 0.05);
    useScrollParallax(lineRef, 0.15);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.timeline-item',
                        opacity: [0, 1],
                        translateX: [-50, 0],
                        delay: anime.stagger(300),
                        easing: 'easeOutExpo'
                    });
                    
                    anime({
                        targets: '.timeline-line',
                        scaleY: [0, 1],
                        duration: 1500,
                        easing: 'easeInOutQuad'
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(timelineRef.current);
    }, []);

    const events = [
        {
            time: "10:00",
            title: "HAZIRLIQ MƏRHƏLƏSİ",
            desc: "Blue Team server giriş məlumatlarını əldə edir. Sistemin təhlükəsizliyini təmin etmək üçün 2 saat vaxtları var.",
            icon: <Lock className="w-6 h-6 text-neon-blue" />,
            team: "blue"
        },
        {
            time: "12:00",
            title: "HÜCUM MƏRHƏLƏSİ BAŞLAYIR",
            desc: "Red Team hücuma keçir. Tam şəbəkə görünürlüyü və terminal girişi aktivdir.",
            icon: <Unlock className="w-6 h-6 text-neon-red" />,
            team: "red"
        },
        {
            time: "16:00",
            title: "ATƏŞKƏS",
            desc: "Bütün aktiv terminallar bağlanır. Son Flag yoxlamaları həyata keçirilir.",
            icon: <Clock className="w-6 h-6 text-slate-400" />,
            team: "neutral"
        },
        {
            time: "17:00",
            title: "NƏTİCƏLƏR",
            desc: "Qalib komanda elan edilir. Texniki analiz və hesabat sessiyası baş tutur.",
            icon: <Trophy className="w-6 h-6 text-yellow-400" />,
            team: "neutral"
        }
    ];

    return (
        <section id="timeline" ref={timelineRef} className="py-24 px-6 bg-cyber-dark overflow-hidden">
            <div className="max-w-4xl mx-auto">
                 <div ref={titleRef} className="text-center mb-24 will-change-transform">
                    <h2 className="text-4xl md:text-5xl tracking-tighter font-extrabold mb-4 uppercase">
                        TƏDBİR <span className="text-neon-blue">CƏDVƏLİ</span>
                    </h2>
                    <div className="flex justify-center items-center space-x-2 text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">
                        <Clock size={14} /> <span>Status: CANLI</span>
                    </div>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div ref={lineRef} className="timeline-line absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-blue via-neon-red to-transparent origin-top will-change-transform"></div>

                    <div className="space-y-16">
                        {events.map((event, idx) => (
                            <div key={idx} className="timeline-item opacity-0 flex items-start space-x-12 relative group">
                                <div className={`relative z-10 w-16 h-16 rounded-full bg-cyber-card border-2 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${event.team === 'blue' ? 'border-neon-blue shadow-[0_0_10px_rgba(0,229,255,0.2)]' : event.team === 'red' ? 'border-neon-red shadow-[0_0_10px_rgba(255,45,85,0.2)]' : 'border-slate-700'}`}>
                                    {event.icon}
                                </div>
                                <div className="pt-2">
                                    <span className={`font-mono text-sm tracking-widest ${event.team === 'blue' ? 'text-neon-blue' : event.team === 'red' ? 'text-neon-red' : 'text-slate-500'}`}>
                                        {event.time}
                                    </span>
                                    <h3 className="text-xl font-black text-white mt-1 border-b border-cyber-border pb-2 mb-4 tracking-tighter uppercase whitespace-nowrap">
                                        {event.title}
                                    </h3>
                                    <p className="text-slate-500 max-w-lg leading-relaxed">
                                        {event.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
