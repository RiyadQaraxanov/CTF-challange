import React, { useState, useEffect } from 'react';
import { 
    Lock, User, Shield, Terminal, Users, List, 
    LogOut, AlertCircle, Activity, Search, Filter,
    CheckCircle2, XCircle, Clock
} from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';
import { Link, useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('users'); // 'users' or 'logs'
    const navigate = useNavigate();

    // Mock Data
    const users = [
        { id: 1, name: 'Ali Aliyev', email: 'ali@example.com', team: 'Blue', joined: '2026-03-05', status: 'Active' },
        { id: 2, name: 'Riyad Garakhanov', email: 'riyad@garakhanov.az', team: 'Red', joined: '2026-03-04', status: 'Active' },
        { id: 3, name: 'Hasan Mammadv', email: 'hsmov09@gmail.com', team: 'Blue', joined: '2026-03-06', status: 'Pending' },
        { id: 4, name: 'Leyla Karimova', email: 'leyla@tech.az', team: 'Red', joined: '2026-03-01', status: 'Active' },
        { id: 5, name: 'Murad Nagiyev', email: 'murad@cyber.az', team: 'Blue', joined: '2026-03-03', status: 'Banned' },
    ];

    const logs = [
        { id: 1, user: 'riyad@garakhanov.az', ip: '192.168.1.1', time: '2026-03-06 20:45', action: 'Login Success', status: 'OK' },
        { id: 2, user: 'admin', ip: '192.168.1.10', time: '2026-03-06 20:30', action: 'Failed Login Attempt', status: 'FAIL' },
        { id: 3, user: 'ali@example.com', ip: '172.16.0.4', time: '2026-03-06 19:12', action: 'Profile Update', status: 'OK' },
        { id: 4, user: 'hsmov09@gmail.com', ip: '85.132.44.1', time: '2026-03-06 18:55', action: 'Registration', status: 'OK' },
        { id: 5, user: 'murad@cyber.az', ip: '10.0.0.5', time: '2026-03-05 22:10', action: 'Unauthorized Access', status: 'WARN' },
    ];

    useEffect(() => {
        if (!isLoggedIn) {
            anime({
                targets: '.admin-login-fade',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(100),
                easing: 'easeOutExpo',
                duration: 800
            });
        }
    }, [isLoggedIn]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple mock login
        if (loginData.username === 'admin' && loginData.password === 'admin123') {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Keçərsiz administrator məlumatları!');
            anime({
                targets: '.login-card',
                translateX: [0, -10, 10, -10, 10, 0],
                duration: 400,
                easing: 'easeInOutQuad'
            });
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setLoginData({ username: '', password: '' });
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/5 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-red/5 blur-[150px] rounded-full"></div>
                
                <div className="login-card w-full max-w-md bg-cyber-card border border-cyber-border rounded-xl p-8 shadow-2xl relative z-10 transition-all">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-red"></div>
                    
                    <div className="text-center mb-10">
                        <div className="inline-flex p-4 bg-neon-blue/10 rounded-full mb-4 border border-neon-blue/20">
                            <Shield className="w-10 h-10 text-neon-blue" />
                        </div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-[0.2em]">Admin<span className="text-neon-blue">Auth</span></h1>
                        <p className="text-slate-500 text-sm mt-2 font-mono">SERVERSEC İdarəetmə Paneli</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="admin-login-fade space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Administrator UID</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input 
                                    type="text" 
                                    value={loginData.username}
                                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-neon-blue transition-colors font-mono"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-login-fade space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Təhlükəsizlik şifrəsi</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input 
                                    type="password" 
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-neon-blue transition-colors font-mono"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="admin-login-fade bg-neon-red/10 border border-neon-red/30 p-4 rounded-lg flex items-center text-neon-red text-xs font-bold leading-tight uppercase tracking-widest animate-pulse">
                                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit"
                            className="admin-login-fade w-full py-4 bg-neon-blue text-cyber-dark font-black uppercase tracking-[0.2em] rounded-lg hover:neon-shadow-blue transition-all transform active:scale-95"
                        >
                            Sistemə Giriş
                        </button>
                    </form>
                    
                    <div className="mt-8 text-center">
                        <Link to="/" className="text-[10px] text-slate-600 hover:text-white uppercase tracking-widest transition-colors">
                            ← Ana Səhifəyə Qayıt
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-20 md:w-64 bg-slate-900/50 border-r border-cyber-border z-50 flex flex-col">
                <div className="p-6 border-b border-cyber-border">
                    <div className="flex items-center space-x-3 overflow-hidden">
                        <Shield className="w-8 h-8 text-neon-blue flex-shrink-0" />
                        <span className="hidden md:block font-black text-white text-lg tracking-tighter uppercase whitespace-nowrap">Admin<span className="text-neon-blue">Panel</span></span>
                    </div>
                </div>

                <div className="flex-1 py-10 px-4 space-y-4">
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center md:space-x-4 p-4 rounded-lg transition-all ${activeTab === 'users' ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20 shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'hover:bg-white/5 opacity-50'}`}
                    >
                        <Users size={24} />
                        <span className="hidden md:block font-bold uppercase tracking-widest text-sm">İstifadəçilər</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('logs')}
                        className={`w-full flex items-center md:space-x-4 p-4 rounded-lg transition-all ${activeTab === 'logs' ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20 shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'hover:bg-white/5 opacity-50'}`}
                    >
                        <List size={24} />
                        <span className="hidden md:block font-bold uppercase tracking-widest text-sm">Giriş Kayıtları</span>
                    </button>
                </div>

                <div className="p-6 border-t border-cyber-border">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center md:space-x-4 p-4 text-neon-red hover:bg-neon-red/10 rounded-lg transition-all group"
                    >
                        <LogOut size={24} />
                        <span className="hidden md:block font-bold uppercase tracking-widest text-sm">Çıxış</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-20 md:ml-64 p-8 md:p-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                            {activeTab === 'users' ? 'İstifadəçi idarəetməsi' : 'Sistem Loqları'}
                        </h2>
                        <div className="flex items-center text-xs font-mono text-slate-500 uppercase tracking-[.2em]">
                            <Clock className="w-3 h-3 mr-2" /> Son yenilənmə: 21:07 | <Activity className="w-3 h-3 mx-2" /> STATUS: ONLINE
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 bg-slate-900/40 p-1.5 rounded-lg border border-slate-800">
                        <Search className="w-4 h-4 text-slate-600 ml-3" />
                        <input 
                            type="text" 
                            placeholder="Axtarış..." 
                            className="bg-transparent border-none py-2 px-3 text-sm focus:outline-none w-48 md:w-64"
                        />
                        <button className="p-2 bg-slate-800 rounded hover:bg-slate-700 transition-colors">
                            <Filter size={16} />
                        </button>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Ümumi İstifadəçilər', val: '1,284', icon: <Users />, color: 'text-neon-blue' },
                        { label: 'Aktiv Seanslar', val: '42', icon: <Activity />, color: 'text-green-500' },
                        { label: 'Sistem Alertləri', val: '0', icon: <AlertCircle />, color: 'text-neon-red' },
                        { label: 'Məlumat Trafiki', val: '2.4 GB', icon: <Terminal />, color: 'text-purple-500' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-cyber-card border border-cyber-border p-6 rounded-xl hover:border-white/10 transition-colors group">
                            <div className={`p-2 rounded-lg bg-slate-900 w-fit mb-4 ${stat.color} group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <div className="text-2xl font-black text-white mb-1">{stat.val}</div>
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tables Content */}
                <div className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden shadow-2xl relative">
                    {/* Glowing effect inside card */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-neon-blue opacity-30"></div>
                    
                    <div className="overflow-x-auto">
                        {activeTab === 'users' ? (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-900/50 border-b border-cyber-border text-xs uppercase tracking-[0.2em] font-black text-slate-500">
                                    <tr>
                                        <th className="px-8 py-6">İştirakçı</th>
                                        <th className="px-8 py-6">Email</th>
                                        <th className="px-8 py-6">Komanda</th>
                                        <th className="px-8 py-6">Qoşulma</th>
                                        <th className="px-8 py-6">Status</th>
                                        <th className="px-8 py-6">Əməliyyat</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-cyber-border/50 text-sm">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-white/2 transition-colors">
                                            <td className="px-8 py-5 font-bold text-white tracking-tight">{user.name}</td>
                                            <td className="px-8 py-5 font-mono text-slate-400">{user.email}</td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest ${user.team === 'Blue' ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30' : 'bg-neon-red/10 text-neon-red border border-neon-red/30'}`}>
                                                    {user.team}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-slate-500">{user.joined}</td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center">
                                                    <span className={`w-2 h-2 rounded-full mr-2 ${user.status === 'Active' ? 'bg-green-500' : user.status === 'Pending' ? 'bg-yellow-500' : 'bg-neon-red shadow-[0_0_5px_#ff2d55]'}`}></span>
                                                    <span className="text-[10px] uppercase tracking-widest font-bold">{user.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <button className="text-slate-600 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest px-3 py-1 border border-slate-800 rounded">Detallar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-900/50 border-b border-cyber-border text-xs uppercase tracking-[0.2em] font-black text-slate-500">
                                    <tr>
                                        <th className="px-8 py-6">İstifadəçi</th>
                                        <th className="px-8 py-6">IP Adresi</th>
                                        <th className="px-8 py-6">Zaman</th>
                                        <th className="px-8 py-6">Hərəkət</th>
                                        <th className="px-8 py-6">Nəticə</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-cyber-border/50 text-xs font-mono">
                                    {logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-white/2 transition-colors">
                                            <td className="px-8 py-5 text-slate-300 font-bold">{log.user}</td>
                                            <td className="px-8 py-5 text-slate-500">{log.ip}</td>
                                            <td className="px-8 py-5 text-slate-500">{log.time}</td>
                                            <td className="px-8 py-5 uppercase tracking-widest text-slate-300">{log.action}</td>
                                            <td className="px-8 py-5">
                                                <span className={`flex items-center ${log.status === 'OK' ? 'text-green-500' : log.status === 'WARN' ? 'text-yellow-500' : 'text-neon-red'}`}>
                                                    {log.status === 'OK' ? <CheckCircle2 size={14} className="mr-2" /> : <XCircle size={14} className="mr-2" />}
                                                    {log.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Maintenance Message */}
                <div className="mt-8 p-6 border border-yellow-500/20 bg-yellow-500/5 rounded-xl flex items-start">
                    <AlertCircle className="text-yellow-500 w-6 h-6 mr-4 flex-shrink-0" />
                    <div>
                        <h4 className="text-yellow-500 font-bold uppercase tracking-widest text-sm mb-1">Backup Xəbərdarlığı</h4>
                        <p className="text-xs text-yellow-500/70 leading-relaxed font-mono">Sistemin verilənlər bazası hər 6 saatdan bir avtomatik olaraq ehtiyat nüsxəyə (backup) alınır. Son uğurlu backup zamanı: 2026-03-06 18:00:00</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
