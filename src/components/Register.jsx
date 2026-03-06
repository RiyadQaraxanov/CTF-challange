import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { User, Mail, Lock, Shield, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        team: 'blue' // default to blue team
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        // Animation when component mounts
        anime({
            targets: '.register-fade-in',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100),
            easing: 'easeOutExpo',
            duration: 1000
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate registration logic
        console.log('Registration data:', formData);
        
        // Show success animation
        anime({
            targets: formRef.current,
            scale: [1, 0.95, 1],
            opacity: [1, 0.5, 1],
            duration: 500,
            easing: 'easeInOutQuad',
            complete: () => setIsSubmitted(true)
        });
    };

    if (isSubmitted) {
        return (
            <section id="register" className="py-24 px-6 flex items-center justify-center min-h-[600px]">
                <div className="max-w-md w-full bg-cyber-card border border-neon-blue p-10 rounded-lg text-center neon-shadow-blue relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-neon-blue"></div>
                    <CheckCircle2 className="w-20 h-20 text-neon-blue mx-auto mb-6 animate-bounce" />
                    <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter">Qeydiyyat Tamamlandı!</h2>
                    <p className="text-slate-400 mb-8 font-mono">Təbrik edirik, {formData.fullName}! Siz artıq <span className={formData.team === 'blue' ? 'text-neon-blue' : 'text-neon-red'}>{formData.team === 'blue' ? 'Blue Team' : 'Red Team'}</span> üzvüsünüz. Təlimatlar e-poçt ünvanınıza göndərildi.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full py-4 bg-transparent border border-neon-blue text-neon-blue uppercase tracking-widest font-bold hover:bg-neon-blue/10 transition-all"
                    >
                        Ana Səhifəyə Qayıt
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section id="register" className="relative py-24 px-6 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-neon-blue/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-neon-red/10 blur-[100px] rounded-full"></div>
            
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Left side: Content */}
                <div className="register-fade-in">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/5 text-neon-blue text-xs font-mono uppercase tracking-widest mb-6">
                        <Zap className="w-3 h-3 mr-2" /> Qəbul Açıqdır
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
                        Arenalara <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-red">Qədəm Qoy</span>
                    </h2>
                    <p className="text-lg text-slate-400 mb-8 max-w-lg">
                        Bacarıqlarını sübut etmək üçün qeydiyyatdan keç. Komandanı seç, sistemləri müdafiə et və ya onları ələ keçir. Yarış səni gözləyir.
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                        {[
                            'Real infrastruktur üzərində sınaqlar',
                            '24/7 Aktiv monitorinq sistemi',
                            'Xüsusi mükafat fondu və sertifikatlar',
                            'Peşəkar mentor dəstəyi'
                        ].map((item, i) => (
                            <li key={i} className="flex items-center text-slate-300 font-medium">
                                <div className="w-6 h-6 rounded-full bg-neon-blue/20 border border-neon-blue/40 flex items-center justify-center mr-3 flex-shrink-0">
                                    <ChevronRight className="w-4 h-4 text-neon-blue" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right side: Form */}
                <div ref={formRef} className="register-fade-in relative">
                    <div className={`p-8 md:p-10 bg-cyber-card border rounded-xl relative z-10 transition-colors duration-500 ${formData.team === 'blue' ? 'border-neon-blue/30' : 'border-neon-red/30'}`}>
                        {/* Team Indicator Bar */}
                        <div className={`absolute top-0 left-0 w-full h-1 transition-colors duration-500 ${formData.team === 'blue' ? 'bg-neon-blue' : 'bg-neon-red'}`}></div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Ad Soyad</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input 
                                        type="text" 
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Məs: Əli Əliyev"
                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-blue transition-colors outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">E-poçt ünvanı</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input 
                                        type="email" 
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="ali@example.com"
                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-blue transition-colors outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Şifrə</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input 
                                        type="password" 
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-blue transition-colors outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Komanda Seçimi</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, team: 'blue' }))}
                                        className={`flex items-center justify-center p-4 rounded-lg border transition-all ${formData.team === 'blue' ? 'border-neon-blue bg-neon-blue/10 text-neon-blue font-bold shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'border-slate-800 bg-slate-900/40 text-slate-500'}`}
                                    >
                                        <Shield className="w-4 h-4 mr-2" /> Blue Team
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, team: 'red' }))}
                                        className={`flex items-center justify-center p-4 rounded-lg border transition-all ${formData.team === 'red' ? 'border-neon-red bg-neon-red/10 text-neon-red font-bold shadow-[0_0_15px_rgba(255,45,85,0.2)]' : 'border-slate-800 bg-slate-900/40 text-slate-500'}`}
                                    >
                                        <Shield className="w-4 h-4 mr-2" /> Red Team
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className={`w-full py-4 rounded-lg font-black uppercase tracking-[0.2em] transition-all transform hover:-translate-y-1 active:scale-95 ${formData.team === 'blue' ? 'bg-neon-blue text-cyber-dark hover:neon-shadow-blue' : 'bg-neon-red text-white hover:neon-shadow-red'}`}
                            >
                                Qeydiyyatı Tamamla
                            </button>
                        </form>
                    </div>

                    {/* Form glow decoration */}
                    <div className={`absolute -inset-1 blur-2xl opacity-20 -z-10 transition-colors duration-500 ${formData.team === 'blue' ? 'bg-neon-blue' : 'bg-neon-red'}`}></div>
                </div>
            </div>
        </section>
    );
};

export default Register;
