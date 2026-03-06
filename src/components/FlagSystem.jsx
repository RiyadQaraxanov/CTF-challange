import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Terminal, Copy, Check } from 'lucide-react';

const FlagSystem = () => {
  const codeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const lines = codeRef.current.querySelectorAll('.code-line');
            anime({
                targets: lines,
                opacity: [0, 1],
                translateX: [-10, 0],
                delay: anime.stagger(100),
                easing: 'easeOutExpo'
            });
            observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(codeRef.current);
  }, []);

  const codeString = `
curl -X POST https://api.server-sec.event/verify \\
     -H "Content-Type: application/json" \\
     -d '{
       "team_token": "RED_TEAM_7x92",
       "flag": "SSC_FLAG{sys_root_pwned_2026}",
       "timestamp": "1709740800"
     }'
  `;

  return (
    <section id="flag-system" className="py-24 px-6 bg-cyber-dark relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
            <div className="p-3 bg-neon-red/10 rounded-lg">
                <Terminal className="text-neon-red" />
            </div>
            <div>
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">FLAG YOXLAMA SİSTEMİ</h2>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Protokol V2.4 // TƏHLÜKƏSİZ-ƏLAQƏ</p>
            </div>
        </div>

        <div className="bg-[#0b0f1a] rounded-xl border border-cyber-border overflow-hidden shadow-2xl">
          <div className="bg-cyber-card px-4 py-2 flex items-center justify-between border-b border-cyber-border">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">bash — 80x24</div>
            <Copy size={14} className="text-slate-600 cursor-pointer hover:text-white transition-colors" />
          </div>
          
          <div ref={codeRef} className="p-8 font-mono text-sm md:text-base leading-relaxed text-slate-300">
            <div className="code-line opacity-0"><span className="text-neon-blue">curl</span> -X POST https://api.server-sec.event/verify \\</div>
            <div className="code-line opacity-0 ml-5">-H <span className="text-green-400">"Content-Type: application/json"</span> \\</div>
            <div className="code-line opacity-0 ml-5">-d <span className="text-yellow-400">'{'{'}</span></div>
            <div className="code-line opacity-0 ml-10">"team_token": <span className="text-neon-red">"RED_TEAM_7x92"</span>,</div>
            <div className="code-line opacity-0 ml-10">"flag": <span className="text-neon-blue">"SSC_FLAG{'{'}sys_root_pwned_2026{'}'}"</span>,</div>
            <div className="code-line opacity-0 ml-10">"timestamp": "1709740800"</div>
            <div className="code-line opacity-0 ml-5"><span className="text-yellow-400">{'}'}'</span></div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-cyber-card/50 rounded-lg border border-cyber-border border-l-neon-red border-l-4">
                <h4 className="text-white font-bold mb-2">AUTH TOKEN</h4>
                <p className="text-sm text-slate-500">Hər bir komanda, təkrar hücumların (replay attacks) qarşısını almaq üçün hər mərhələdə unikal token əldə edir.</p>
            </div>
            <div className="p-6 bg-cyber-card/50 rounded-lg border border-cyber-border border-l-neon-blue border-l-4">
                <h4 className="text-white font-bold mb-2">FLAG FORMATI</h4>
                <p className="text-sm text-slate-500">Flag-lər həmişə SSC_FLAG ilə başlayır və kök (root) fayl sisteminin dərinliklərində gizlədilir.</p>
            </div>
            <div className="p-6 bg-cyber-card/50 rounded-lg border border-cyber-border border-l-slate-500 border-l-4">
                <h4 className="text-white font-bold mb-2">REAL-VAXT</h4>
                <p className="text-sm text-slate-500">Təqdim olunan Flag-lər dərhal emal edilir və canlı liderlər cədvəlində əks olunur.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FlagSystem;
