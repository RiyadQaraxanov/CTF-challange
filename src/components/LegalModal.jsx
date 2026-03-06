import React, { useEffect, useRef } from 'react';
import { X, Shield, ScrollText, Terminal } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';

const LegalModal = ({ isOpen, onClose, type }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            anime({
                targets: modalRef.current,
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 400,
                easing: 'easeOutExpo'
            });
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const content = {
        privacy: {
            title: 'Məxfilik Siyasəti',
            icon: <Shield className="text-neon-blue" />,
            sections: [
                {
                    h: '1. Məlumatların Toplanması',
                    p: 'Platformamızda qeydiyyat zamanı yalnız tələb olunan məlumatlar (ad, e-poçt) toplanır. Bu məlumatlar sizin yarışma profilinizin yaradılması və sistem daxilində eyniləşdirmə üçün istifadə olunur.'
                },
                {
                    h: '2. Məlumatların İstifadəsi',
                    p: 'Toplanan məlumatlar yarış nəticələrinin elan edilməsi, mükafatlandırma və təhlükəsizlik bildirişləri üçün istifadə olunur. Üçüncü tərəflərə heç bir məlumat ötürülmür.'
                },
                {
                    h: '3. Təhlükəsizlik',
                    p: 'Şifrələriniz və şəxsi məlumatlarınız müasir kriptoqrafik üsullarla qorunur. Yarışma zamanı topladığınız "flag"-lər və sistem fəaliyyətləriniz yalnız log məqsədilə saxlanılır.'
                }
            ]
        },
        terms: {
            title: 'İstifadə Şərtləri',
            icon: <ScrollText className="text-neon-red" />,
            sections: [
                {
                    h: '1. Etik Davranış',
                    p: 'İştirakçılar yarışma zamanı etik qaydalara riayət etməli, digər komandaların fəaliyyətinə mane olmamalı və platformanın özünə qarşı (icazə verilməyən sahələrdə) hücum etməməlidir.'
                },
                {
                    h: '2. İmtina',
                    p: 'Platformada təqdim olunan boşluqlar və texniki mühit yalnız təhsil məqsədi daşıyır. Burada öyrənilən metodların real sistemlərdə qanunsuz istifadəsinə görə platforma məsuliyyət daşımır.'
                },
                {
                    h: '3. Hesabın Silinməsi',
                    p: 'Qaydaları pozan və ya hiylə işlədən iştirakçıların hesabı xəbərdarlıq edilmədən bloklana və ya silinə bilər.'
                }
            ]
        }
    };

    const data = content[type] || content.privacy;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 bg-cyber-dark/95 backdrop-blur-xl">
            <div 
                ref={modalRef}
                className="relative w-full max-w-2xl bg-cyber-card border border-cyber-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-full"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-cyber-border bg-slate-900/50">
                    <div className="flex items-center space-x-3">
                        {data.icon}
                        <h2 className="text-xl font-bold text-white uppercase tracking-tighter">{data.title}</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div ref={contentRef} className="p-8 overflow-y-auto font-sans leading-relaxed">
                    <div className="flex items-center space-x-2 mb-8 text-[10px] font-mono text-neon-blue opacity-70">
                        <Terminal size={12} />
                        <span>SYSTEM_LEGAL_DOC_V1.0.4.sh --read</span>
                    </div>

                    {data.sections.map((s, i) => (
                        <div key={i} className="mb-8">
                            <h3 className="text-white font-bold mb-3 uppercase tracking-wide text-sm">{s.h}</h3>
                            <p className="text-slate-400 text-sm">{s.p}</p>
                        </div>
                    ))}

                    <div className="mt-12 p-4 bg-slate-900/40 border border-slate-800 rounded text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center">
                        Son yenilənmə: 06 Mart 2026
                    </div>
                </div>

                {/* Footer bar decoration */}
                <div className={`h-1 w-full ${type === 'privacy' ? 'bg-neon-blue' : 'bg-neon-red'}`}></div>
            </div>
        </div>
    );
};

export default LegalModal;
