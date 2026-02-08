import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import PageWrapper from '../layout/PageWrapper';
import { useAudio } from '../../hooks/useAudio';
import { supabase } from '../../utils/supabase';
import { IMAGES, MOODS } from '../../constants';
import { Mood } from '../../types';
import { useMeta } from '../../hooks/useMeta';

const getSpotifyEmbedUrl = (url?: string) => {
    if (!url) return null;
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    if (!match) return null;
    return `https://open.spotify.com/embed/track/${match[1]}?utm_source=generator&theme=0`;
};

const ProposalView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id: idParamFromRoute } = useParams();
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });
    const [noCount, setNoCount] = useState(0);
    const [celebrated, setCelebrated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Parse customization from URL
    const queryParams = new URLSearchParams(location.search);
    const dataParam = queryParams.get('data') || queryParams.get('d');
    const idParam = queryParams.get('id') || idParamFromRoute;

    const [customizedData, setCustomizedData] = useState<{ name: string; sender: string; image: string; question: string; mood: Mood; spotify_url?: string; images?: string[] }>({
        name: "Valentine",
        sender: "Admirer",
        image: IMAGES.roses,
        question: "Will you be my Valentine?",
        mood: 'classic'
    });
    const [loadingConfig, setLoadingConfig] = useState(false);

    useMeta({
        title: customizedData.name ? `For ${customizedData.name}` : "A Special Message",
        description: `${customizedData.sender} has a special question for you. Open to reveal the magic.`,
        image: customizedData.image
    });

    // Apply Mood class to body
    useEffect(() => {
        const moodClass = `mood-${customizedData.mood || 'classic'}`;
        document.body.classList.add(moodClass);
        return () => document.body.classList.remove(moodClass);
    }, [customizedData.mood]);

    const currentMood = MOODS[customizedData.mood || 'classic'];

    // Slideshow Logic
    const [showSlideshow, setShowSlideshow] = useState(customizedData.images && customizedData.images.length > 1);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Audio Logic (Custom Hook)
    const shouldPlayAudio = showSlideshow && !!customizedData.images && customizedData.images.length > 1;
    const { isPlaying, toggleAudio, fadeOutAudio } = useAudio(shouldPlayAudio);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingConfig(true);
            if (idParam) {
                const { data, error } = await supabase
                    .from('proposals')
                    .select('*')
                    .eq('id', idParam)
                    .single();

                if (data && !error) {
                    const hasImages = data.images && data.images.length > 1;
                    setCustomizedData({
                        name: data.name,
                        sender: data.sender_name || "Admirer",
                        question: data.question || "Will you be my Valentine?",
                        image: data.images && data.images.length > 0 ? data.images[data.images.length - 1] : IMAGES.roses,
                        mood: (data.mood as Mood) || 'classic',
                        spotify_url: data.spotify_url || '',
                        images: data.images || []
                    });
                    if (hasImages) setShowSlideshow(true);
                }
            } else if (dataParam) {
                try {
                    const decoded = JSON.parse(atob(dataParam));
                    // Support both expanded and compact keys
                    setCustomizedData({
                        name: decoded.n || decoded.name || "Valentine",
                        sender: decoded.s || decoded.sender || "Admirer",
                        image: decoded.i ? decoded.i[decoded.i.length - 1] : (decoded.image || IMAGES.roses),
                        question: decoded.q || decoded.question || "Will you be my Valentine?",
                        mood: decoded.m || decoded.mood || 'classic',
                        spotify_url: decoded.u || decoded.spotify_url || decoded.spotifyUrl || '',
                        images: decoded.i || decoded.images || []
                    });
                    if ((decoded.i || decoded.images) && (decoded.i || decoded.images).length > 1) setShowSlideshow(true);
                } catch (e) {
                    console.error("Failed to decode data", e);
                }
            }
            setLoadingConfig(false);
        };
        fetchData();
    }, [idParam, dataParam]);

    useEffect(() => {
        // Sync slideshow state updates (e.g. from fetch)
        if (customizedData.images && customizedData.images.length > 1 && !showSlideshow) {
            // Only set true if it wasn't explicitly closed? 
            // Logic from before: "if (hasImages) setShowSlideshow(true)" inside fetchData handles this.
            // We might not need this useEffect if fetchData does it. 
            // But let's check the update logic in original App.tsx. 
            // It sets showSlideshow(true) inside fetchData.
        }
    }, [customizedData.images]);


    useEffect(() => {
        if (showSlideshow && customizedData.images && customizedData.images.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide(prev => {
                    // Exclude the last image (main photo) from the slideshow
                    if (prev + 1 >= customizedData.images!.length - 1) {
                        fadeOutAudio();
                        setShowSlideshow(false); // End slideshow
                        return prev;
                    }
                    return prev + 1;
                });
            }, 6000); // Slowed down to 6s
            return () => clearInterval(timer);
        }
    }, [showSlideshow, customizedData.images, fadeOutAudio]);

    const handleNo = () => {
        const x = Math.random() * (window.innerWidth < 640 ? 150 : 300) - (window.innerWidth < 640 ? 75 : 150);
        const y = Math.random() * (window.innerWidth < 640 ? 150 : 300) - (window.innerWidth < 640 ? 75 : 150);
        setNoPos({ x, y });
        setNoCount(noCount + 1);
    };

    const handleYes = () => {
        // Multiple confetti bursts for extra celebration
        const duration = 3000;
        const animationEnd = Date.now() + duration;

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(interval);
                return;
            }

            confetti({
                particleCount: 3,
                angle: randomInRange(55, 125),
                spread: randomInRange(50, 70),
                origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
                colors: ['#f43f5e', '#ffffff', '#fb7185', '#ffd700', '#ffc0cb'],
                scalar: randomInRange(0.8, 1.4),
                drift: randomInRange(-0.5, 0.5)
            });
        }, 50);

        // Initial big burst
        confetti({
            particleCount: 150,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#ffffff', '#fb7185', '#ffd700', '#ffc0cb'],
            scalar: 1.5,
            gravity: 0.8
        });

        setCelebrated(true);
    };

    const noTexts = [
        "No", "Really?", "Think again!", "Wait!", "Wrong button!", "Oops!", "Try YES", "Surely not?", "Give it a heart!", "Reconsider?", "Last chance!", "I'll wait...", "Please?", "💔"
    ];

    return (
        <PageWrapper>
            {/* Cinematic Slideshow Overlay */}
            <AnimatePresence>
                {showSlideshow && customizedData.images && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentSlide}
                                src={customizedData.images[currentSlide]}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                                className="absolute inset-0 w-full h-full object-cover opacity-60"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

                        <motion.div
                            className="relative z-10 text-center space-y-6 max-w-2xl px-6"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Heart className="size-16 text-brand-500 fill-current mx-auto animate-pulse" />
                            <h2 className="text-4xl sm:text-6xl font-display text-white tracking-tighter leading-tight">
                                Every moment led to <br /> <span className="italic font-serif text-brand-500 text-glow">this.</span>
                            </h2>
                        </motion.div>

                        <div className="absolute top-8 right-8 z-50 flex gap-4">
                            <button
                                onClick={toggleAudio}
                                className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors animate-fade-in"
                            >
                                {isPlaying ? <Volume2 className="size-6" /> : <Play className="size-6 fill-current" />}
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                fadeOutAudio();
                                setShowSlideshow(false);
                            }}
                            className="absolute bottom-12 right-12 text-white/50 hover:text-white text-xs uppercase tracking-[0.3em] font-bold transition-colors"
                        >
                            Skip Memory Lane
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="min-h-screen flex items-center justify-center p-6 pt-32 relative">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, rotateY: -15 }}
                            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                            exit={{ scale: 1.1, opacity: 0, y: -100, rotateX: 45 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute z-50 cursor-pointer group"
                            onClick={() => setIsOpen(true)}
                            whileHover={{ scale: 1.05, rotateY: 5 }}
                        >
                            <div className="relative w-72 sm:w-80 h-48 sm:h-52 glass-2 prismatic-glow rounded-2xl shadow-2xl overflow-hidden border-2 border-brand-100 dark:border-brand-800 flex items-center justify-center">
                                <div className="absolute top-0 inset-x-0 h-1/2 bg-brand-100/50 dark:bg-brand-800/30 clip-path-v" />
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Heart className="size-16 text-brand-500 fill-current group-hover:scale-125 transition-transform drop-shadow-lg" />
                                </motion.div>
                                <div className="absolute bottom-4 text-xs font-black uppercase tracking-widest text-brand-500 dark:text-brand-400 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">Click to Open</div>
                            </div>
                        </motion.div>
                    )}

                    {celebrated && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-500/95 backdrop-blur-3xl"
                        >
                            <motion.div
                                initial={{ scale: 0.5, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-[4rem] p-12 sm:p-20 text-center shadow-[0_0_100px_rgba(255,255,255,0.4)] relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-white dark:from-stone-800 dark:to-stone-900 -z-10" />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="inline-block text-brand-500 mb-8"
                                >
                                    <Heart className="size-32 fill-current" />
                                </motion.div>

                                <h2 className="text-5xl sm:text-7xl font-medium tracking-tighter leading-tight font-display mb-6 dark:text-white">
                                    YES! <br /> <span className="italic font-serif text-brand-500 text-glow">I Knew It!</span>
                                </h2>

                                <p className="text-xl text-stone-500 dark:text-stone-400 mb-12 antialiased">
                                    You've just made this Valentine's Day the best one yet. Get ready for some magic!
                                </p>

                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={() => {
                                            const target = idParamFromRoute ? `/s/${idParamFromRoute}${location.search}` : `/success${location.search}`;
                                            navigate(target);
                                        }}
                                        className="w-full py-5 bg-brand-500 text-white rounded-3xl font-bold text-xl shadow-xl shadow-brand-500/40 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        View Our Promise
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                        opacity: isOpen ? 1 : 0,
                        y: isOpen ? 0 : 50
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className={`w-full max-w-4xl glass-2 prismatic-glow rounded-[3.5rem] p-8 lg:p-20 shadow-5xl card-glow text-center space-y-10 relative overflow-hidden border border-brand-100 dark:border-white/5 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-300 via-brand-500 to-brand-300" />

                    <div className="relative mx-auto size-48 sm:size-64 mb-6">
                        <motion.div
                            animate={{
                                rotateY: [0, 5, -5, 0],
                                scale: [1, 1.02, 1]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl ring-8 ring-brand-50 dark:ring-white/5"
                        >
                            <img
                                src={customizedData.images && customizedData.images.length > 0 ? customizedData.images[customizedData.images.length - 1] : customizedData.image}
                                alt={customizedData.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -bottom-4 -right-4 size-16 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center shadow-xl border-4 border-brand-50"
                        >
                            <Heart className="size-8 text-brand-500 fill-current" />
                        </motion.div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-6xl font-medium tracking-tighter leading-tight font-display dark:text-white">
                            Hey {customizedData.name}, <br />
                            <span className={`italic font-serif ${currentMood.text} text-glow`}>{customizedData.question}</span>
                        </h1>

                        <p className="text-lg sm:text-xl font-light text-stone-500 dark:text-stone-400 max-w-lg mx-auto italic">
                            "In a world of constant change, you are my only certainty. Choose me, today and always?"
                        </p>

                        {getSpotifyEmbedUrl(customizedData.spotify_url) && (
                            <div className="max-w-xs mx-auto pt-4">
                                <iframe
                                    src={getSpotifyEmbedUrl(customizedData.spotify_url)!}
                                    width="100%"
                                    height="80"
                                    frameBorder="0"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    className="rounded-2xl shadow-lg"
                                ></iframe>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
                        <button
                            onClick={handleYes}
                            className={`w-full sm:w-auto px-16 py-6 ${currentMood.accent} text-white rounded-full text-2xl font-black shadow-2xl shadow-brand-500/40 hover:scale-110 active:scale-95 transition-all z-10`}
                        >
                            YES!
                        </button>
                        <motion.button
                            animate={{ x: noPos.x, y: noPos.y }}
                            onMouseEnter={handleNo}
                            onClick={handleNo}
                            className="w-full sm:w-auto px-12 py-5 bg-stone-100 dark:bg-white/5 text-stone-500 dark:text-stone-400 rounded-full font-bold transition-all border border-stone-200 dark:border-white/10 hover:bg-stone-200"
                        >
                            {noTexts[Math.min(noCount, noTexts.length - 1)]}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </PageWrapper>
    );
};

export default ProposalView;
