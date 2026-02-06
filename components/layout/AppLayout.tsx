import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import FloatingHearts from '../ui/FloatingHearts';
import { Theme } from '../../types';

const AppLayout = () => {
    const [theme, setTheme] = useState<Theme>('dark'); // Default to dark for romance

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={theme}>
            <div className="min-h-screen relative overflow-x-hidden no-scrollbar mesh-gradient transition-colors duration-700 bg-stone-50 dark:bg-black text-stone-900 dark:text-stone-100 font-sans selection:bg-brand-500/30">
                <FloatingHearts />
                <Navigation theme={theme} toggleTheme={toggleTheme} />

                <main className="mx-auto max-w-[1600px] overflow-hidden">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default AppLayout;
