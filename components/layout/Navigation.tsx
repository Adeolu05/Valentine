import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Heart, Moon, Sun } from 'lucide-react';
import { Theme } from '../../types';

const Navigation = ({ theme, toggleTheme }: { theme: Theme, toggleTheme: () => void }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Engine', path: '/story' },
        { name: 'Features', path: '/gallery' },
        { name: 'Create Card', path: '/create' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[60] flex justify-center p-6 pointer-events-none">
            <div className={`flex items-center justify-between w-full max-w-[1500px] pointer-events-auto transition-all duration-500 ${isScrolled ? 'translate-y-[-10px]' : ''}`}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 px-5 py-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-full shadow-2xl hover:scale-105 transition-transform">
                    <Heart className="size-5 text-brand-500 fill-current shadow-brand-500/50" />
                    <span className="font-bold tracking-tighter text-stone-900 dark:text-white uppercase text-[10px]">Forever.Yours</span>
                </Link>

                {/* Pill Menu */}
                <div className="hidden md:flex items-center gap-1 p-1.5 glass-pill rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border dark:border-white/5">
                    {navLinks.map((link) => (
                        <button
                            key={link.path}
                            onClick={() => navigate(link.path)}
                            className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${location.pathname === link.path
                                ? 'bg-brand-500 text-white shadow-xl shadow-brand-500/30'
                                : 'text-stone-500 dark:text-stone-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-white/5'
                                }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="size-11 flex items-center justify-center rounded-full glass-pill text-stone-900 dark:text-white hover:bg-brand-500 hover:text-white transition-all shadow-xl group"
                    >
                        {theme === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
