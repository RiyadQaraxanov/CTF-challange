import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Shield, AlertTriangle, Cpu, Terminal } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [status, setStatus] = useState('idle'); // idle, authenticating, error, success
    const navigate = useNavigate();

    useEffect(() => {
        // Initial scan animation
        const tl = anime.timeline({ easing: 'easeOutExpo' });
        tl.add({
            targets: '.login-border',
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 1500,
            delay: 500
        }).add({
            targets: '.login-fade-in',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100),
            duration: 800
        }, '-=1000');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('authenticating');

        // Simulate secure authentication process
        setTimeout(() => {
            if (credentials.username === 'admin' && credentials.password === 'admin123') {
                setStatus('success');
                // Store a mock session
                localStorage.setItem('admin_session', 'true');
                
                anime({
                    targets: '.login-box',
                    scale: 0.9,
                    opacity: 0,
                    duration: 500,
                    easing: 'easeInBack',
                    complete: () => navigate('/admin')
                });
            } else {
                setStatus('error');
                anime({
                    targets: '.login-box',
                    translateX: [0, -15, 15, -15, 15, 0],
                    duration: 400,
                    easing: 'easeInOutQuad'
                });
                setTimeout(() => setStatus('idle'), 3000);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-mono">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 cyber-grid opacity-20"></div>
            
            {/* Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-neon-blue/50 shadow-[0_0_15px_#00e5ff] animate-[scan_4s_linear_infinite]"></div>

            <div className="login-box relative w-full max-w-md">
                {/* Decorative Corners */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-neon-blue z-20"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-neon-red z-20"></div>

                <div className="bg-cyber-card/90 backdrop-blur-xl border border-cyber-border p-10 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden">
                    {/* Header */}
                    <div className="login-fade-in text-center mb-10">
                        <div className="relative inline-block mb-4">
                            <Shield className={`w-12 h-12 transition-colors duration-500 ${status === 'error' ? 'text-neon-red' : status === 'success' ? 'text-green-500' : 'text-neon-blue'}`} />
                            {status === 'authenticating' && (
                                <div className="absolute -inset-2 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
                            )}
                        </div>
                        <h1 className="text-xl font-black text-white tracking-[0.4em] uppercase">Security<span className="text-neon-blue">Node</span></h1>
                        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Authorized Access Only</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="login-fade-in space-y-2">
                            <label className="text-[10px] text-neon-blue font-bold uppercase tracking-widest pl-1 flex items-center">
                                <Cpu className="w-3 h-3 mr-2" /> Access ID
                            </label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-neon-blue transition-colors" />
                                <input 
                                    type="text" 
                                    required
                                    autoComplete="off"
                                    value={credentials.username}
                                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                    className="w-full bg-slate-900/80 border border-slate-800 rounded py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-neon-blue transition-all"
                                    placeholder="ADMIN_UID"
                                />
                            </div>
                        </div>

                        <div className="login-fade-in space-y-2">
                            <label className="text-[10px] text-neon-blue font-bold uppercase tracking-widest pl-1 flex items-center">
                                <Lock className="w-3 h-3 mr-2" /> Security Key
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-neon-blue transition-colors" />
                                <input 
                                    type="password" 
                                    required
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                    className="w-full bg-slate-900/80 border border-slate-800 rounded py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-neon-blue transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="h-4">
                            {status === 'error' && (
                                <div className="text-neon-red text-[10px] font-bold uppercase tracking-tighter flex items-center animate-pulse">
                                    <AlertTriangle className="w-4 h-4 mr-2" /> Encryption key mismatch. Access Denied.
                                </div>
                            )}
                            {status === 'authenticating' && (
                                <div className="text-neon-blue text-[10px] font-bold uppercase tracking-widest flex items-center">
                                    <Terminal className="w-4 h-4 mr-2" /> Decrypting credentials...
                                </div>
                            )}
                        </div>

                        <button 
                            type="submit"
                            disabled={status === 'authenticating'}
                            className={`login-fade-in w-full py-4 font-black uppercase tracking-[0.3em] text-xs rounded transition-all transform active:scale-95 ${
                                status === 'authenticating' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 
                                status === 'error' ? 'bg-neon-red text-white' :
                                'bg-neon-blue text-cyber-dark hover:neon-shadow-blue'
                            }`}
                        >
                            {status === 'authenticating' ? 'Processing...' : 'Execute Login'}
                        </button>
                    </form>

                    <div className="login-fade-in mt-10 pt-6 border-t border-slate-800/50 flex justify-between items-center text-[9px] text-slate-600 tracking-widest uppercase">
                        <div>ID: 0xSF-99</div>
                        <Link to="/" className="hover:text-white transition-colors cursor-pointer">Return to main_frame</Link>
                    </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="login-fade-in mt-6 text-center">
                    <div className="flex justify-center space-x-1">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-slate-800 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                        ))}
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
