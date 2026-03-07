import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Trophy, TrendingUp, Skull, ShieldCheck } from 'lucide-react';
import { useScrollParallax } from '../hooks/useScrollParallax';

const WinConditions = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const redCardRef = useRef(null);
    const blueCardRef = useRef(null);

    useScrollParallax(titleRef, 0.05);
    useScrollParallax(redCardRef, 0.08);
    useScrollParallax(blueCardRef, 0.12);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.win-card',
                        opacity: [0, 1],
                        translateY: [20, 0],
                        scale: [0.95, 1],
                        delay: anime.stagger(200),
                        easing: 'easeOutExpo'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(sectionRef.current);
    }, []);

    return (
        <section id="win-conditions" ref={sectionRef} className="py-24 px-6 bg-cyber-card/50 relative overflow-hidden">
            <div ref={titleRef} className="max-w-7xl mx-auto text-center mb-16 will-change-transform">
                 <h2 className="text-4xl md:text-5xl tracking-tighter font-extrabold mb-4 uppercase">
                    QALİBİYYƏT <span className="text-neon-red">ŞƏRTLƏRİ</span>
                </h2>
                <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">QƏLƏBƏ KRİTERİYALARI</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                {/* Red Side */}
                <div ref={redCardRef} className="win-card opacity-0 bg-cyber-card p-10 relative overflow-hidden group border-2 border-neon-red/20 hover:border-neon-red transition-all duration-500 rounded-3xl will-change-transform">
                     <div className="absolute top-[-20%] right-[-10%] opacity-5 rotate-12 transition-transform group-hover:scale-110">
                        <Skull size={300} />
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex px-4 py-1 bg-neon-red/10 border border-neon-red rounded-full text-neon-red text-xs font-bold tracking-widest uppercase mb-6">
                            HÜCUM QƏLƏBƏSİ
                        </div>
                        <h3 className="text-3xl font-black mb-6 text-white tracking-tighter uppercase whitespace-nowrap">RED TEAM QALİB GƏLİR, ƏGƏR...</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed max-w-sm">
                             Flag tapılarsa və ayrılmış hücum vaxtı ərzində yoxlama portalı vasitəsilə uğurla təqdim edilərsə.
                        </p>
                        <div className="flex items-center space-x-4 bg-neon-red/10 p-4 rounded-xl border border-neon-red/20 shadow-lg">
                            <Trophy className="w-8 h-8 text-neon-red shrink-0" />
                            <span className="text-sm font-bold text-white tracking-tight">HÜCUMUN DƏRHAL DAYANDIRILMASI</span>
                        </div>
                    </div>
                </div>

                {/* Blue Side */}
                <div ref={blueCardRef} className="win-card opacity-0 bg-cyber-card p-10 relative overflow-hidden group border-2 border-neon-blue/20 hover:border-neon-blue transition-all duration-500 rounded-3xl will-change-transform">
                    <div className="absolute top-[-20%] right-[-10%] opacity-5 rotate-12 transition-transform group-hover:scale-110">
                        <ShieldCheck size={300} />
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex px-4 py-1 bg-neon-blue/10 border border-neon-blue rounded-full text-neon-blue text-xs font-bold tracking-widest uppercase mb-6">
                            MÜDAFİƏ QƏLƏBƏSİ
                        </div>
                        <h3 className="text-3xl font-black mb-6 text-white tracking-tighter uppercase whitespace-nowrap">BLUE TEAM QALİB GƏLİR, ƏGƏR...</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed max-w-sm">
                             Flag təhlükəsiz qalsa və server mühiti vaxt bitənə qədər kritik xidmətləri işlətməyə davam edərsə.
                        </p>
                        <div className="flex items-center space-x-4 bg-neon-blue/10 p-4 rounded-xl border border-neon-blue/20 shadow-lg">
                            <TrendingUp className="w-8 h-8 text-neon-blue shrink-0" />
                            <span className="text-sm font-bold text-white tracking-tight">SAAT 16:00-A QƏDƏR TƏHLÜKƏSİZ QALMAQ</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WinConditions;
