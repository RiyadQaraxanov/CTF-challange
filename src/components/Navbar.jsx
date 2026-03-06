import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Terminal } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Haqqında', href: '#about' },
    { name: 'Konsept', href: '#concept' },
    { name: 'Zaman Çizelgesi', href: '#timeline' },
    { name: 'Qaydalar', href: '#win-conditions' },
    { name: 'Qeydiyyat', href: '#hero', important: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-cyber-dark/80 backdrop-blur-md border-b border-cyber-border py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-neon-blue" />
          <span className="text-xl font-bold tracking-tighter text-white">
            SERVER<span className="text-neon-blue">SEC</span>
          </span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm tracking-widest uppercase hover:text-neon-blue transition-colors ${link.important ? 'px-4 py-2 bg-neon-blue/10 border border-neon-blue rounded-md text-neon-blue' : 'text-slate-400'}`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cyber-card border-b border-cyber-border py-6 flex flex-col items-center space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg tracking-widest uppercase text-slate-300 active:text-neon-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
