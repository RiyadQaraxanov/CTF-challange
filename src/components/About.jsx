import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Database, Network, Server, Shield } from 'lucide-react';
import { useScrollParallax } from '../hooks/useScrollParallax';

const About = () => {
  const sectionRef = useRef(null);
  const graphicRef = useRef(null);
  const textRef = useRef(null);

  useScrollParallax(graphicRef, 0.1); 
  useScrollParallax(textRef, -0.05);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: '.about-reveal',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(150),
            easing: 'easeOutExpo'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(sectionRef.current);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
      <div ref={textRef} className="md:w-1/2 space-y-8 will-change-transform">
        <h2 className="text-4xl md:text-5xl tracking-tighter about-reveal font-extrabold flex items-center">
          <span className="w-12 h-[2px] bg-neon-blue mr-4"></span>
          TƏDBİR HAQQINDA <span className="text-neon-blue ml-2">MƏLUMAT</span>
        </h2>
        
        <p className="text-xl text-slate-400 about-reveal leading-relaxed">
          <span className="text-white font-bold">Server Security Challenge</span>, kibertəhlükəsizlik və sistem inzibatçılığı bacarıqlarınızı limitlərinə qədər sınamaq üçün nəzərdə tutulmuş taktiki Discord icma tədbiridir.
        </p>
        
        <p className="about-reveal text-slate-400 italic">
          Real hücumların güclü müdafiə konfiqurasiyaları ilə qarşılaşdığı virtual sınaq mühiti təsəvvür edin.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          <div className="about-reveal bg-cyber-card p-6 border border-cyber-border rounded-lg hover:border-neon-blue transition-colors group">
            <Server className="w-8 h-8 text-neon-blue mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold mb-2">Canlı Mühitlər</h3>
            <p className="text-sm text-slate-500">Real boşluqları olan xüsusi hazırlanmış Ubuntu serverlərində fəaliyyət göstərin.</p>
          </div>
          <div className="about-reveal bg-cyber-card p-6 border border-cyber-border rounded-lg hover:border-neon-blue transition-colors group">
            <Network className="w-8 h-8 text-neon-blue mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold mb-2">İnteraktiv Terminallar</h3>
            <p className="text-sm text-slate-500">Sistemi qorumaq və ya ona sızmaq üçün birbaşa əmr sətri əməliyyatlarında iştirak edin.</p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 relative flex justify-center items-center">
        <div ref={graphicRef} className="about-reveal w-72 h-72 md:w-96 md:h-96 relative flex justify-center items-center will-change-transform">
          <div className="absolute inset-0 border-2 border-dashed border-neon-blue/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-4 border-2 border-dashed border-neon-red/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          <div className="w-48 h-48 md:w-64 md:h-64 bg-neon-blue/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-neon-blue/20">
            <Database className="w-24 h-24 text-neon-blue opacity-50" />
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-neon-red/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-neon-red/20">
            <Shield className="w-10 h-10 text-neon-red/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
