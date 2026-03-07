import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useScrollParallax } from '../hooks/useScrollParallax';

const Concept = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const blueCardRef = useRef(null);
    const redCardRef = useRef(null);

    useScrollParallax(titleRef, 0.05);
    useScrollParallax(blueCardRef, 0.08);
    useScrollParallax(redCardRef, 0.12);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.concept-card',
                        opacity: [0, 1],
                        translateX: [-50, 0],
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
        <section id="concept" ref={sectionRef} className="py-24 px-6 bg-cyber-card/30 border-y border-cyber-border/50">
            <div ref={titleRef} className="max-w-7xl mx-auto text-center mb-16 will-change-transform">
                <h2 className="text-4xl md:text-5xl tracking-tighter concept-reveal font-extrabold mb-4 uppercase">
                    RED TEAM <span className="text-neon-red">VS</span> BLUE TEAM
                </h2>
                <p className="text-slate-400 font-mono tracking-widest text-sm uppercase">ƏSAS MODEL</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                {/* BLUE TEAM CARD */}
                <div ref={blueCardRef} className="concept-card bg-cyber-card p-10 relative overflow-hidden group border border-cyber-border hover:border-neon-blue transition-all duration-500 rounded-2xl will-change-transform">
                    <div className="absolute top-0 right-0 p-8 text-neon-blue/10 group-hover:text-neon-blue/20 transition-colors">
                        <ShieldCheck size={200} />
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex px-4 py-1 bg-neon-blue/10 border border-neon-blue rounded-full text-neon-blue text-xs font-bold tracking-widest uppercase mb-6">
                            MÜDAFİƏÇİLƏR
                        </div>
                        <h3 className="text-3xl font-black mb-6 text-white tracking-tighter">BLUE TEAM</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed max-w-sm">
                            Sizin missiyanız serverin işləkliyini və məlumat bütövlüyünü qorumaqdır. Konfiqurasiyaları təhlükəsizləşdirin, sistem boşluqlarını bağlayın və sistem loqlarını real vaxtda izləyin.
                        </p>
                        <ul className="space-y-4 font-mono text-sm text-slate-500">
                            <li className="flex items-center"><span className="w-2 h-2 bg-neon-blue rounded-full mr-3"></span> SSH girişini qoru</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-neon-blue rounded-full mr-3"></span> İcazələri sərtləşdir</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-neon-blue rounded-full mr-3"></span> Unauthorized girişi izlə</li>
                        </ul>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-neon-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-500 transform origin-left"></div>
                </div>

                {/* RED TEAM CARD */}
                <div ref={redCardRef} className="concept-card bg-cyber-card p-10 relative overflow-hidden group border border-cyber-border hover:border-neon-red transition-all duration-500 rounded-2xl will-change-transform">
                    <div className="absolute top-0 right-0 p-8 text-neon-red/10 group-hover:text-neon-red/20 transition-colors">
                        <ShieldAlert size={200} />
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex px-4 py-1 bg-neon-red/10 border border-neon-red rounded-full text-neon-red text-xs font-bold tracking-widest uppercase mb-6">
                            HÜCUMÇULAR
                        </div>
                        <h3 className="text-3xl font-black mb-6 text-white tracking-tighter">RED TEAM</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed max-w-sm">
                             Haker kimi düşünün. Serverdə gizlədilmiş "Flag"i tapmaq və ələ keçirmək üçün kəşfiyyat, istismar (exploitation) və sızma üsullarından istifadə edin.
                        </p>
                        <ul className="space-y-4 font-mono text-sm text-slate-500">
                            <li className="flex items-center"><span className="w-2 h-2 bg-neon-red rounded-full mr-3"></span> Kəşfiyyat (Reconnaissance)</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-neon-red rounded-full mr-3"></span> Səlahiyyətlərin artırılması</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-neon-red rounded-full mr-3"></span> Məlumatın sızdırılması</li>
                        </ul>
                    </div>
                     <div className="absolute bottom-0 left-0 w-full h-[3px] bg-neon-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 transform origin-left"></div>
                </div>
            </div>
        </section>
    );
};

export default Concept;
