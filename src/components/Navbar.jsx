import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, Terminal, Settings } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { isLoggedIn } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    { name: 'Qeydiyyat', href: '#register', important: true },
    ...(isLoggedIn ? [{ name: 'Admin', href: '/admin', isRoute: true }] : []),
  ];

  const handleNavClick = (e, link) => {
    if (link.isRoute) {
      navigate(link.href);
      setIsMobileMenuOpen(false);
      return;
    }
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and then scroll
      setTimeout(() => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-cyber-dark/80 backdrop-blur-md border-b border-cyber-border py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 outline-none group">
          <Shield className="w-8 h-8 text-neon-blue group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold tracking-tighter text-white">
            SERVER<span className="text-neon-blue">SEC</span>
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm tracking-widest uppercase hover:text-neon-blue transition-colors ${link.important ? 'px-4 py-2 bg-neon-blue/10 border border-neon-blue rounded-md text-neon-blue' : link.name === 'Admin' ? 'px-4 py-2 bg-neon-red/10 border border-neon-red/30 rounded-md text-neon-red font-bold' : 'text-slate-400'}`}
              onClick={(e) => handleNavClick(e, link)}
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-cyber-card border-b border-cyber-border py-8 flex flex-col items-center space-y-8 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-lg tracking-widest uppercase transition-colors ${link.important ? 'text-neon-blue font-bold px-6 py-2 border border-neon-blue rounded' : link.name === 'Admin' ? 'text-neon-red font-bold px-6 py-2 border border-neon-red rounded' : 'text-slate-300'}`}
              onClick={(e) => handleNavClick(e, link)}
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
