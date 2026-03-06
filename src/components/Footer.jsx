import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Disc as Discord, Github, Twitter, Mail, ExternalLink, Send } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            console.log('Newsletter subscription:', email);
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const socialLinks = [
        { 
            icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277 12.2986 12.2986 0 01-1.873.8923.076.076 0 00-.0416.1057c.3604.698.7719 1.3628 1.226 1.9932a.0752.0752 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                </svg>
            ), 
            href: 'https://discord.gg/hWSeGCgumW', 
            label: 'Discord' 
        },
        { 
            icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13-.08-.13-.08-.13.06v5.48c.01 2.35-.91 4.74-2.61 6.33-2.01 1.95-5.26 2.22-7.55 1.01-2.58-1.31-4.04-4.24-3.51-7.07.3-1.77 1.23-3.48 2.76-4.4a7.12 7.12 0 015.42-1h.01v4.03c-1-.31-2.14-.15-2.98.54-.85.66-1.31 1.76-1.2 2.84.11 1.09.76 2.06 1.7 2.61.94.55 2.13.56 3.08.02.39-.23.67-.58.82-.99.08-.2.1-.42.1-.64V.02z"/>
                </svg>
            ), 
            href: 'https://tiktok.com/@cayxana.tv', 
            label: 'TikTok' 
        }
    ];

    const resources = [
        { name: 'Sənədləşmə', href: 'https://docs.serversec.az' },
        { name: 'Dərsliklər', href: 'https://academy.serversec.az' },
        { name: 'API Referans', href: 'https://api.serversec.az/v1' },
        { name: 'Alətlər', href: 'https://tools.serversec.az' },
    ];

    const community = [
        { name: 'Discord İcması', href: 'https://discord.gg/hWSeGCgumW' },
        { name: 'Forum', href: 'https://forum.serversec.az' },
        { name: 'Tədbirlər', href: '#timeline' },
        { name: 'Bloq', href: 'https://blog.serversec.az' },
    ];

    return (
        <footer className="py-24 px-6 border-t border-cyber-border bg-cyber-dark relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
                <div className="md:w-1/3">
                    <div className="flex items-center space-x-2 mb-6">
                        <Shield className="w-8 h-8 text-neon-blue font-black" />
                        <span className="text-2xl font-black tracking-tighter text-white">SERVER<span className="text-neon-blue uppercase">SEC</span></span>
                    </div>
                    <p className="text-slate-500 mb-8 max-w-sm leading-relaxed">
                        Kibertəhlükəsizlik həvəskarları üçün təhlükəsiz sandboxed mühitində texniki bacarıqlarını sınaqdan keçirmək, paylaşmaq və genişləndirmək üçün yaradılmış xüsusi platforma.
                    </p>
                    <div className="flex space-x-4">
                        {socialLinks.map((link, idx) => (
                            <a 
                                key={idx}
                                href={link.href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 bg-cyber-card border border-cyber-border rounded-lg text-slate-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all group"
                                title={link.label}
                            >
                                <span className="group-hover:scale-110 block transition-transform">{link.icon}</span>
                            </a>
                        ))}
                    </div>
                    <div className="mt-8 space-y-3">
                        <div className="flex items-center text-slate-500 hover:text-white transition-colors">
                            <Mail className="w-4 h-4 mr-3 text-neon-blue" />
                            <a href="mailto:riyad@garakhanov.az" className="text-sm font-mono lowercase tracking-tight">riyad@garakhanov.az</a>
                        </div>
                        <div className="flex items-center text-slate-500 hover:text-white transition-colors">
                            <Mail className="w-4 h-4 mr-3 text-neon-blue" />
                            <a href="mailto:hsmov09@gmail.com" className="text-sm font-mono lowercase tracking-tight">hsmov09@gmail.com</a>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h4 className="text-white font-bold tracking-widest uppercase text-xs opacity-50">RESURSLAR</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-medium">
                            {resources.map((res, idx) => (
                                <li key={idx}>
                                    <a href={res.href} className="hover:text-neon-blue transition-colors uppercase tracking-widest flex items-center group">
                                        {res.name}
                                        <ExternalLink size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                         <h4 className="text-white font-bold tracking-widest uppercase text-xs opacity-50">İCMA</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-medium">
                            {community.map((com, idx) => (
                                <li key={idx}>
                                    <a href={com.href} className="hover:text-neon-blue transition-colors uppercase tracking-widest flex items-center group">
                                        {com.name}
                                        {com.href.startsWith('http') && <ExternalLink size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="md:w-1/4">
                    <h4 className="text-white font-bold tracking-widest uppercase text-xs opacity-50 mb-6">XƏBƏR BÜLLETENİ</h4>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">Ən son yarışlarımız və təhlükəsizlik yeniliklərindən xəbərdar olun.</p>
                    <form onSubmit={handleSubscribe} className="relative">
                        <div className="flex">
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-POÇT ÜNVANI" 
                                className="bg-cyber-card border border-cyber-border rounded-l-lg px-4 py-4 w-full focus:outline-none focus:border-neon-blue text-xs transition-all text-white placeholder:text-slate-700 font-mono"
                            />
                            <button 
                                type="submit"
                                className="bg-neon-blue px-6 rounded-r-lg text-cyber-dark font-black hover:bg-white transition-colors flex items-center justify-center group"
                            >
                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                        {subscribed && (
                            <p className="absolute -bottom-6 left-0 text-[10px] text-neon-blue font-bold tracking-[0.2em] uppercase transition-all animate-pulse">
                                ABUNƏ OLUNDU! ✓
                            </p>
                        )}
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-24 border-t border-cyber-border/30 mt-8 flex flex-col md:flex-row justify-between items-center text-slate-600 text-[10px] font-mono tracking-[0.2em] uppercase">
                <div className="text-center md:text-left">&copy; {new Date().getFullYear()} CAYXANA. ALL RIGHTS RESERVED.</div>
                <div className="flex space-x-8 mt-6 md:mt-0">
                    <Link to="/legal/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/legal/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
