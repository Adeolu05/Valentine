import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Download, Sparkles, Award } from 'lucide-react';
import PageWrapper from '../layout/PageWrapper';
import { generateLoveLetter } from '../../services/geminiService';
import { supabase } from '../../utils/supabase';
import { IMAGES } from '../../constants';

const FloatingParticles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                        scale: 0,
                        opacity: 0
                    }}
                    animate={{
                        y: [`${Math.random() * 100}%`, `${Math.random() * 100 - 20}%`],
                        scale: [0, 1, 0],
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{
                        duration: Math.random() * 8 + 6,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                    }}
                >
                    <Heart className="text-brand-500/30 fill-current" size={Math.random() * 20 + 10} />
                </motion.div>
            ))}
        </div>
    );
};

const SuccessView = () => {
    const [letter, setLetter] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [customizedData, setCustomizedData] = useState({ name: "Valentine", sender: "Admirer", image: IMAGES.roses });
    const location = useLocation();

    // Parse customization
    const queryParams = new URLSearchParams(location.search);
    const dataParam = queryParams.get('data');
    const idParam = queryParams.get('id');

    useEffect(() => {
        const fetchData = async () => {
            if (idParam) {
                // Fetch from database
                const { data, error } = await supabase
                    .from('proposals')
                    .select('*')
                    .eq('id', idParam)
                    .single();

                if (data && !error) {
                    setCustomizedData({
                        name: data.name,
                        sender: data.sender_name || "Admirer",
                        image: data.images && data.images.length > 0 ? data.images[data.images.length - 1] : IMAGES.roses
                    });
                }
            } else if (dataParam) {
                // Parse from URL parameter
                try {
                    const decoded = JSON.parse(atob(dataParam));
                    setCustomizedData({
                        name: decoded.name || "Valentine",
                        sender: decoded.sender || "Admirer",
                        image: decoded.image || IMAGES.roses
                    });
                } catch (e) {
                    console.error("Failed to decode data", e);
                }
            }
        };
        fetchData();
    }, [idParam, dataParam]);

    const fetchLetter = async () => {
        setLetter(null); // Clear letter to show loading state
        setLoading(true);
        // Add random element to keywords to ensure freshness
        const themes = ['Destiny', 'Laughter', 'Sanctuary', 'Forever', 'Adventure', 'Soulmate', 'Magic', 'Starlight'];
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];

        try {
            const text = await generateLoveLetter([customizedData.name, randomTheme, 'Love']);
            setLetter(text.trim());
        } catch (error) {
            console.error("Failed to generate vow:", error);
            setLetter("Every beat of my heart is a testament to the love we share. From the quiet mornings to the starlit nights, you are my sanctuary and my greatest adventure. I promise to hold your hand through every season, for now and for all the eternities to come.");
        }
        setLoading(false);
    };

    useEffect(() => { fetchLetter(); }, []);

    const handleSave = async () => {
        const element = document.getElementById('certificate');
        if (element) {
            try {
                // Dynamically import html2canvas to avoid SSR issues if any (though this is SPA)
                const html2canvas = (await import('html2canvas')).default;
                const canvas = await html2canvas(element, {
                    scale: 2, // Higher quality
                    backgroundColor: null,
                    logging: false,
                    useCORS: true
                });

                const link = document.createElement('a');
                link.download = `Promise-to-${customizedData.name}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            } catch (error) {
                console.error("Failed to save certificate:", error);
                alert("Could not save the certificate. Please try taking a screenshot!");
            }
        }
    };

    return (
        <PageWrapper>
            <div className="min-h-screen flex items-center justify-center p-6 pt-32 relative overflow-hidden">
                {/* Floating Particles */}
                <FloatingParticles />

                {/* Certificate Decoration */}
                <motion.div
                    className="absolute top-10 left-10 size-64 bg-brand-500/5 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-10 right-10 size-64 bg-gold-500/5 rounded-full blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-5xl bg-white dark:bg-stone-900 rounded-[4rem] p-1 sm:p-2 shadow-6xl relative border-8 border-brand-50 dark:border-white/5 overflow-hidden"
                    id="certificate"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-gold-500/5 -z-10" />

                    <div className="bg-white dark:bg-stone-900 border-2 border-brand-200 dark:border-brand-900/50 rounded-[3.5rem] p-8 sm:p-16 lg:p-24 space-y-12 relative">
                        {/* Animated Gold Seal */}
                        <motion.div
                            className="absolute top-10 right-10 size-24 sm:size-32 opacity-20"
                            animate={{ rotate: [12, 24, 12] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="w-full h-full border-4 border-brand-500 rounded-full flex items-center justify-center">
                                <div className="size-16 sm:size-24 border-2 border-brand-500 border-dashed rounded-full flex items-center justify-center font-display font-bold text-brand-600 text-[10px] sm:text-xs">
                                    UNENDING LOVE
                                </div>
                            </div>
                        </motion.div>

                        <div className="text-center space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-brand-50 to-pink-50 dark:from-brand-900/20 dark:to-pink-900/20 text-brand-600 dark:text-brand-400 rounded-full text-xs font-bold uppercase tracking-widest border border-brand-100 dark:border-brand-900/30 shadow-lg"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                >
                                    <Award className="size-4" />
                                </motion.div>
                                Certificate of Devotion
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tighter leading-tight font-display dark:text-white"
                            >
                                The Promise with <br />
                                <motion.span
                                    className="italic font-serif text-brand-500 text-glow"
                                    animate={{
                                        textShadow: [
                                            "0 0 20px rgba(244, 63, 94, 0.3)",
                                            "0 0 40px rgba(244, 63, 94, 0.6)",
                                            "0 0 20px rgba(244, 63, 94, 0.3)",
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {customizedData.name}
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-stone-400 dark:text-stone-500 uppercase tracking-[0.4em] text-xs font-black"
                            >
                                Verified & Authenticated by the Heart
                            </motion.p>
                        </div>

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {loading ? (
                                    <motion.div
                                        key="load"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="py-24 flex flex-col items-center gap-6"
                                    >
                                        <motion.div
                                            className="size-12 border-4 border-brand-500 border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        <p className="text-sm font-black tracking-[0.3em] text-brand-500 uppercase">Indexing Feelings...</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="letter"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="p-10 sm:p-16 bg-gradient-to-br from-stone-50 to-pink-50/30 dark:from-black/40 dark:to-pink-900/10 rounded-[3rem] border border-brand-100/50 dark:border-white/5 shadow-inner text-left relative overflow-hidden"
                                    >
                                        <motion.div
                                            className="absolute top-0 right-0 p-8 opacity-5"
                                            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <Heart className="size-40 fill-current text-brand-500" />
                                        </motion.div>
                                        <p className="text-xl sm:text-2xl font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed relative z-10 antialiased">
                                            <span className="block mb-4">My dearest, <span className="text-brand-500 font-bold">{customizedData.name}</span></span>
                                            <span className="whitespace-pre-wrap">{letter}</span>
                                            <span className="block mt-8 text-right">
                                                Yours eternally, <br />
                                                <span className="text-brand-500 font-bold not-italic">{customizedData.sender}</span>
                                            </span>
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-brand-100 dark:border-white/5">
                            <div className="space-y-1">
                                <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Date Issued</p>
                                <p className="text-xl font-medium dark:text-white">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>

                            {/* Signature Display */}
                            <div className="space-y-1 text-right">
                                <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Signed By</p>
                                <p className="text-xl font-medium dark:text-white">{customizedData.sender}</p>
                            </div>

                            {/* Actions - Inside but ignored by html2canvas */}
                            <div className="flex gap-4" data-html2canvas-ignore="true">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSave}
                                    className="flex items-center gap-3 bg-gradient-to-r from-brand-500 to-pink-500 text-white px-10 py-5 rounded-full font-bold transition-all shadow-xl shadow-brand-500/30"
                                >
                                    Save Record <Download className="size-4" />
                                </motion.button>
                                <motion.button
                                    onClick={fetchLetter}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 border-2 border-stone-200 dark:border-white/10 px-8 py-5 rounded-full font-bold hover:bg-stone-50 dark:hover:bg-white/5 transition-all dark:text-white"
                                >
                                    New Vow <Sparkles className="size-4 text-brand-500" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </PageWrapper>
    );
};

export default SuccessView;
