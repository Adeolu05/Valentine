import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => (
    <footer className="w-full max-w-[1500px] mx-auto p-12 border-t border-stone-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
            <Heart className="size-5 text-gold-500 fill-current shadow-gold-500/50" />
            <span className="text-xl font-bold tracking-tighter dark:text-white uppercase text-xs">Forever.Yours</span>
        </div>

        <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
            <Link to="/story" className="hover:text-brand-500 transition-colors">Engine</Link>
            <Link to="/gallery" className="hover:text-brand-500 transition-colors">Features</Link>
            <Link to="/create" className="hover:text-brand-500 transition-colors">Create</Link>
            <a href="#" className="hover:text-brand-500 transition-colors">Terms</a>
        </div>

        <div className="text-[10px] font-black text-stone-300 dark:text-stone-600 uppercase tracking-widest italic">
            © 2026 The Love Engine
        </div>
    </footer>
);

export default Footer;
