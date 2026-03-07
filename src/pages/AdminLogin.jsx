import React, { useState, useEffect } from 'react';
import { Lock, User, Shield, AlertTriangle, Cpu, Terminal, Loader2 } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const AdminLogin = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const { login, isLoggedIn, isLoading, error, checkAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/admin');
        } else {
            // Initial scan animation
            const tl = anime.timeline({ easing: 'easeOutExpo' });
            tl.add({
                targets: '.login-border',
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: 1500,
                delay: 500
            }).add({
                targets: '.admin-login-fade',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(100),
                duration: 800
            }, '-=1000');
        }
    }, [isLoggedIn, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await login(loginData.username, loginData.password);
        if (success) {
            anime({
                targets: '.login-card',
                scale: 0.9,
                opacity: 0,
                duration: 500,
                easing: 'easeInBack',
                complete: () => navigate('/admin')
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-mono">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00e5ff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
            
            {/* Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-neon-blue/50 shadow-[0_0_15px_#00e5ff] animate-[scan_4s_linear_infinite]"></div>

            <div className="login-card relative w-full max-w-md">
                {/* Decorative Corners */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-neon-blue z-20"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-neon-red z-20"></div>

                <div className="bg-cyber-card/90 backdrop-blur-xl border border-cyber-border p-10 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-red"></div>
                    
                    <div className="admin-login-fade text-center mb-10">
                        <div className="relative inline-block mb-4">
                            <div className="inline-flex p-4 bg-neon-blue/10 rounded-full border border-neon-blue/20">
                                <Shield className="w-10 h-10 text-neon-blue" />
                            </div>
                            {isLoading && (
                                <div className="absolute -inset-2 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
                            )}
                        </div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-[0.3em]">System<span className="text-neon-blue">Admin</span></h1>
                        <p className="text-slate-500 text-[10px] mt-2 font-mono uppercase tracking-widest">Authorized Access Only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="admin-login-fade space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1 flex items-center">
                                <Cpu className="w-3 h-3 mr-2 text-neon-blue" /> Administrator ID
                            </label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 transition-colors group-focus-within:text-neon-blue" />
                                <input 
                                    type="text" 
                                    value={loginData.username}
                                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded py-4 pl-12 pr-4 text-white placeholder:text-slate-800 focus:outline-none focus:border-neon-blue transition-all font-mono text-sm"
                                    placeholder="UID_ACCESS"
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-login-fade space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1 flex items-center">
                                <Lock className="w-3 h-3 mr-2 text-neon-blue" /> Private Key
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 transition-colors group-focus-within:text-neon-blue" />
                                <input 
                                    type="password" 
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded py-4 pl-12 pr-4 text-white placeholder:text-slate-800 focus:outline-none focus:border-neon-blue transition-all font-mono text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="admin-login-fade bg-neon-red/10 border border-neon-red/30 p-4 rounded text-neon-red text-[10px] font-bold uppercase tracking-widest flex items-center animate-pulse">
                                <AlertTriangle className="w-4 h-4 mr-3 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="admin-login-fade w-full py-4 bg-neon-blue text-cyber-dark font-black uppercase tracking-[0.3em] rounded hover:neon-shadow-blue transition-all flex items-center justify-center text-xs"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Execute Login'}
                        </button>
                    </form>
                    
                    <div className="admin-login-fade mt-10 text-center border-t border-slate-800/50 pt-6">
                        <Link to="/" className="text-[10px] text-slate-600 hover:text-white uppercase tracking-widest transition-colors font-mono">
                            [ Return to Mainframe ]
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { top: -1%; }
                    100% { top: 101%; }
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;
