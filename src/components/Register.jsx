import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { User, Mail, GraduationCap, MessageSquare, Shield, Zap, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import api from '../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        university: '',
        introMessage: '',
        team: 'blue'
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const formRef = useRef(null);

    useEffect(() => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        try {
            await api.post('/users/register', formData);
            
            anime({
                targets: formRef.current,
                scale: [1, 0.95, 1],
                opacity: [1, 0.5, 1],
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => setStatus('success')
            });
        } catch (err) {
            console.error(err);
            let rawMsg = err.response?.data?.message;
            if (Array.isArray(rawMsg)) {
                rawMsg = rawMsg[0];
            }
            if (!rawMsg || rawMsg.toLowerCase().includes('server error')) {
                rawMsg = 'artıq qeydiyyatdan keçmisiniz';
            }
            setErrorMessage(rawMsg);
            setStatus('error');
            setTimeout(() => {
                setStatus('idle');
                setErrorMessage('');
            }, 5000);
        }
    };

    if (status === 'success') {
        return (
            <section id="register" className="py-24 px-6 flex items-center justify-center min-h-[600px]">
                <div className="max-w-md w-full bg-cyber-card border border-neon-blue p-10 rounded-lg text-center neon-shadow-blue relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-neon-blue"></div>
                    <CheckCircle2 className="w-20 h-20 text-neon-blue mx-auto mb-6 animate-bounce" />
                    <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter">Müraciət Göndərildi!</h2>
                    <p className="text-slate-400 mb-8 font-mono leading-relaxed">
                        Təbrik edirik, {formData.fullName.split(' ')[0]}! Müraciətiniz qəbul edildi. Admin təsdiqlədikdən sonra e-poçt ünvanınıza bildiriş göndəriləcək.
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full py-4 bg-transparent border border-neon-blue text-neon-blue uppercase tracking-widest font-bold hover:bg-neon-blue/10 transition-all font-mono text-sm"
                    >
                        Ana Səhifəyə Qayıt
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section id="register" className="relative py-24 px-6 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-neon-blue/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-neon-red/10 blur-[100px] rounded-full"></div>
            
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div className="register-fade-in">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neon-blue/30 bg-neon-blue/5 text-neon-blue text-[10px] font-mono uppercase tracking-[0.2em] mb-8">
                        <Zap className="w-3 h-3 mr-2" /> Qəbul Açıqdır
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-tight">
                        Arenalara <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-red font-black">Qədəm Qoy</span>
                    </h2>
                    <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
                        Bacarıqlarını sübut etmək üçün qeydiyyatdan keç. Komandanı seç, sistemləri müdafiə et və ya onları ələ keçir. Yarış səni gözləyir.
                    </p>
                    
                    <ul className="space-y-5 mb-12">
                        {[
                            'Real infrastruktur üzərində sınaqlar',
                            '24/7 Aktiv monitorinq sistemi',
                            'Xüsusi mükafat fondu və sertifikatlar',
                            'Peşəkar mentor dəstəyi'
                        ].map((item, i) => (
                            <li key={i} className="flex items-center text-slate-300 font-medium">
                                <div className="w-6 h-6 rounded-full bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center mr-4 flex-shrink-0">
                                    <ChevronRight className="w-4 h-4 text-neon-blue" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div ref={formRef} className="register-fade-in relative">
                    <div className={`p-8 md:p-10 bg-cyber-card border rounded-xl relative z-10 transition-all duration-500 ${formData.team === 'blue' ? 'border-neon-blue/30' : 'border-neon-red/30'}`}>
                        <div className={`absolute top-0 left-0 w-full h-1 transition-colors duration-500 ${formData.team === 'blue' ? 'bg-neon-blue' : 'bg-neon-red'}`}></div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Ad Soyad</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 transition-colors group-focus-within:text-neon-blue" />
                                        <input 
                                            type="text" 
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Əli Əliyev"
                                            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-neon-blue transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">E-poçt ünvanı</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 transition-colors group-focus-within:text-neon-blue" />
                                        <input 
                                            type="email" 
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="ali@example.com"
                                            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-neon-blue transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Təhsil Müəssisəsi</label>
                                <div className="relative group">
                                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 transition-colors group-focus-within:text-neon-blue" />
                                    <input 
                                        type="text" 
                                        name="university"
                                        required
                                        value={formData.university}
                                        onChange={handleChange}
                                        placeholder="Məs: ADA Universiteti"
                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-neon-blue transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Özünüz haqqında qısa məlumat</label>
                                <div className="relative group">
                                    <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-slate-600 transition-colors group-focus-within:text-neon-blue" />
                                    <textarea 
                                        name="introMessage"
                                        required
                                        value={formData.introMessage}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Məs: Kibertəhlükəsizliyə marağım necə başlayıb..."
                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-neon-blue transition-all resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Komanda Seçimi</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, team: 'blue' }))}
                                        className={`flex items-center justify-center p-4 rounded-lg border transition-all ${formData.team === 'blue' ? 'border-neon-blue bg-neon-blue/10 text-neon-blue font-bold shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'border-slate-800 bg-slate-900/40 text-slate-500'}`}
                                    >
                                        <Shield className="w-4 h-4 mr-2" /> Blue Team
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, team: 'red' }))}
                                        className={`flex items-center justify-center p-4 rounded-lg border transition-all ${formData.team === 'red' ? 'border-neon-red bg-neon-red/10 text-neon-red font-bold shadow-[0_0_15px_rgba(255,45,85,0.1)]' : 'border-slate-800 bg-slate-900/40 text-slate-500'}`}
                                    >
                                        <Shield className="w-4 h-4 mr-2" /> Red Team
                                    </button>
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className="p-4 rounded-lg bg-neon-red/10 border border-neon-red/30 text-neon-red text-center text-sm font-bold uppercase">
                                    {errorMessage}
                                </div>
                            )}

                            <button 
                                type="submit"
                                disabled={status === 'submitting'}
                                className={`w-full py-5 rounded-lg font-black uppercase tracking-[0.3em] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center text-xs ${formData.team === 'blue' ? 'bg-neon-blue text-cyber-dark hover:neon-shadow-blue' : 'bg-neon-red text-white hover:neon-shadow-red'}`}
                            >
                                {status === 'submitting' ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                                {status === 'submitting' ? 'GÖNDƏRİLİR...' : 'Müraciəti Tamamla'}
                            </button>
                        </form>
                    </div>

                    <div className={`absolute -inset-1 blur-3xl opacity-20 -z-10 transition-all duration-500 ${formData.team === 'blue' ? 'bg-neon-blue' : 'bg-neon-red'}`}></div>
                </div>
            </div>
        </section>
    );
};

export default Register;
