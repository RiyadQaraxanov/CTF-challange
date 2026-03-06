import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Shield, ScrollText, Terminal, ArrowLeft, Home } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Background from './Background';

const LegalPage = () => {
    const { type } = useParams();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const content = {
        'privacy-policy': {
            title: 'Məxfilik Siyasəti',
            icon: <Shield className="w-12 h-12 text-neon-blue mb-4" />,
            description: 'SERVERSEC platformasında şəxsi məlumatlarınızın necə qorunması haqqında məlumat.',
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
                },
                {
                    h: '4. Çərəz (Cookie) Siyasəti',
                    p: 'Sistem sessiya idarəetməsi üçün vacib çərəzlərdən istifadə edir. Bu, sizin sistemdə daxil olmuş halda qalmağınızı təmin edir.'
                }
            ]
        },
        'terms-of-service': {
            title: 'İstifadə Şərtləri',
            icon: <ScrollText className="w-12 h-12 text-neon-red mb-4" />,
            description: 'Platformadan istifadə zamanı riayət edilməli olan qaydalar və hüquqi öhdəliklər.',
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
                },
                {
                    h: '4. Mülkiyyət Hüquqları',
                    p: 'Platforma daxilindəki bütün kontent, ssenarilər və infrastruktur SERVERSEC layihəsinə məxsusdur.'
                }
            ]
        }
    };

    const data = content[type] || content['privacy-policy'];

    return (
        <div className="relative min-h-screen pt-32 pb-12">
            <Background />
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="mb-12">
                    <Link 
                        to="/" 
                        className="inline-flex items-center text-slate-500 hover:text-neon-blue transition-colors text-sm font-mono uppercase tracking-widest mb-10 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Geri qayıt
                    </Link>
                    
                    <div className="flex flex-col items-start">
                        {data.icon}
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
                            {data.title}
                        </h1>
                        <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
                            {data.description}
                        </p>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-cyber-card border border-cyber-border rounded-xl p-8 md:p-12 mb-12 shadow-2xl relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-full h-1 ${type === 'terms-of-service' ? 'bg-neon-red' : 'bg-neon-blue'}`}></div>
                    
                    <div className="flex items-center space-x-2 mb-10 text-[10px] font-mono text-neon-blue opacity-50 uppercase tracking-[0.3em]">
                        <Terminal size={14} />
                        <span>system/usr/legal/{type}.doc --cat</span>
                    </div>

                    <div className="space-y-12">
                        {data.sections.map((section, idx) => (
                            <div key={idx} className="space-y-4">
                                <h2 className="text-xl font-bold text-white uppercase tracking-tight flex items-center">
                                    <span className={`w-1.5 h-1.5 rounded-full mr-3 ${type === 'terms-of-service' ? 'bg-neon-red' : 'bg-neon-blue'}`}></span>
                                    {section.h}
                                </h2>
                                <p className="text-slate-400 leading-relaxed font-sans">
                                    {section.p}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-cyber-border/30 text-center">
                        <p className="text-slate-600 text-xs font-mono uppercase tracking-widest">
                            Son yenilənmə: 06 Mart 2026 | Sənəd ID: #{type?.toUpperCase()}-001
                        </p>
                    </div>
                </div>

                {/* Call to Action or Links */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-slate-900/30 border border-slate-800 rounded-xl">
                    <div className="text-center sm:text-left">
                        <h4 className="text-white font-bold mb-1 uppercase tracking-tighter">Sualınız var?</h4>
                        <p className="text-sm text-slate-500">Daha ətraflı məlumat üçün bizimlə əlaqə saxlayın.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-bold transition-all flex items-center">
                            <Home className="w-4 h-4 mr-2" /> Ana Səhifə
                        </Link>
                        <a href="mailto:support@serversec.az" className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${type === 'terms-of-service' ? 'bg-neon-red/10 border border-neon-red/50 text-neon-red' : 'bg-neon-blue/10 border border-neon-blue/50 text-neon-blue'}`}>
                            Əlaqə Saxla
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default LegalPage;
