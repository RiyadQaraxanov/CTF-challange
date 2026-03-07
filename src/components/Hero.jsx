import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Terminal, Shield, Zap } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  // Parallax state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initial entry animations
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1200
    });

    tl.add({
      targets: title1Ref.current,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: 200
    })
    .add({
      targets: title2Ref.current,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: -400
    })
    .add({
      targets: subtitleRef.current,
      opacity: [0, 0.7],
      translateY: [20, 0],
      delay: -400
    })
    .add({
      targets: buttonsRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: -200
    });

    // Parallax mouse event
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" ref={heroRef} className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <div 
        className="relative mb-8 z-10"
        style={{ transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)` }}
      >
        <h1 ref={title1Ref} className="text-4xl md:text-7xl lg:text-8xl tracking-tighter uppercase font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-red drop-shadow-2xl">
          Server Təhlükəsizliyi
        </h1>
        <h1 ref={title2Ref} className="text-4xl md:text-7xl lg:text-8xl tracking-tighter uppercase font-black text-white mt-1">
          Yarışı
        </h1>
      </div>

      <div 
        ref={subtitleRef} 
        className="max-w-2xl text-lg md:text-xl text-slate-400 font-mono tracking-widest uppercase mb-12 z-10"
        style={{ transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)` }}
      >
        <span className="text-neon-red">Red Team</span> vs <span className="text-neon-blue">Blue Team</span>
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent my-4"></div>
        Kibertəhlükəsizlik və sistem inzibatçılığı üzrə ən böyük döyüş arenası
      </div>

      <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 mt-4 z-10">
        <button 
          className="group relative px-10 py-4 bg-neon-blue border border-neon-blue rounded-md overflow-hidden transition-all duration-300 hover:neon-shadow-blue transform hover:-translate-y-1"
          style={{ transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)` }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <span className="relative font-bold uppercase tracking-widest text-[#020617] flex items-center">
            <Zap className="w-4 h-4 mr-2" /> Daha Ətraflı
          </span>
        </button>

        <button 
          className="group relative px-10 py-4 border border-slate-700 bg-transparent rounded-md overflow-hidden transition-all duration-300 hover:border-neon-red transform hover:-translate-y-1"
          style={{ transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)` }}
          onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-neon-red/10 scale-0 group-hover:scale-100 origin-center transition-transform duration-300 rounded-md"></div>
          <span className="relative font-bold uppercase tracking-widest text-white group-hover:text-neon-red flex items-center transition-colors">
            <Shield className="w-4 h-4 mr-2" /> Yarışa Qoşul
          </span>
        </button>
      </div>

      {/* Hero Icon Overlay Parallax */}
      <div 
        className="hidden lg:block absolute top-[25%] right-[10%] opacity-10"
        style={{ transform: `translate(${mousePosition.x * -60}px, ${mousePosition.y * -60}px)`, transition: 'transform 0.2s ease-out' }}
      >
        <Terminal size={400} />
      </div>
      <div 
        className="hidden lg:block absolute top-[40%] left-[5%] opacity-10"
        style={{ transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`, transition: 'transform 0.2s ease-out' }}
      >
        <Shield size={350} />
      </div>
    </section>
  );
};

export default Hero;
