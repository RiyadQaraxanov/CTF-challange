import React from 'react';
import { Shield, Disc as Discord, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-24 px-6 border-t border-cyber-border bg-cyber-dark relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
                <div className="md:w-1/3">
                    <div className="flex items-center space-x-2 mb-6">
                        <Shield className="w-8 h-8 text-neon-blue font-black" />
                        <span className="text-2xl font-black tracking-tighter text-white lowercase">SERVER<span className="text-neon-blue uppercase">SEC</span></span>
                    </div>
                    <p className="text-slate-500 mb-8 max-w-sm leading-relaxed">
                        Kibertəhlükəsizlik həvəskarları üçün təhlükəsiz sandboxed mühitində texniki bacarıqlarını sınaqdan keçirmək, paylaşmaq və genişləndirmək üçün yaradılmış xüsusi platforma.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="p-3 bg-cyber-card border border-cyber-border rounded-lg text-slate-400 hover:text-neon-blue transition-colors group">
                             <Discord size={20} className="group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="#" className="p-3 bg-cyber-card border border-cyber-border rounded-lg text-slate-400 hover:text-neon-blue transition-colors group">
                             <Github size={20} className="group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="#" className="p-3 bg-cyber-card border border-cyber-border rounded-lg text-slate-400 hover:text-neon-blue transition-colors group">
                             <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h4 className="text-white font-bold tracking-widest uppercase text-sm">RESURSLAR</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-medium">
                            <li><a href="#" className="hover:text-neon-blue transition-colors uppercase tracking-widest">Sənədləşmə</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors uppercase tracking-widest">Dərsliklər</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors uppercase tracking-widest">API Referans</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors uppercase tracking-widest">Alətlər</a></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                         <h4 className="text-white font-bold tracking-widest uppercase text-sm">İCMA</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-medium">
                            <li><a href="#" className="hover:text-neon-blue transition-colors uppercase tracking-widest">Discord</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors uppercase tracking-widest">Forum</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors uppercase tracking-widest">Tədbirlər</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors uppercase tracking-widest">Bloq</a></li>
                        </ul>
                    </div>
                </div>

                <div className="md:w-1/4">
                    <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-6">XƏBƏR BÜLLETENİ</h4>
                    <p className="text-slate-500 text-sm mb-6">Ən son yarışlarımızdan xəbərdar olun.</p>
                    <div className="flex">
                        <input 
                            type="email" 
                            placeholder="E-POÇT_ÜNVANI" 
                            className="bg-cyber-card border border-cyber-border rounded-l-lg px-4 py-3 w-full focus:outline-none focus:border-neon-blue text-sm transition-colors text-white"
                        />
                        <button className="bg-neon-blue px-6 rounded-r-lg text-cyber-dark font-bold hover:bg-neon-blue/80 transition-colors">
                            <Mail size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-24 flex flex-col md:flex-row justify-between items-center text-slate-600 text-[10px] font-mono tracking-[0.2em] uppercase">
                <div>&copy; 2026 SERVER SECURITY CHALLENGE. ALL RIGHTS RESERVED.</div>
                <div className="flex space-x-8 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
