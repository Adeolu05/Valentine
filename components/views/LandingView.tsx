import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Heart, Music, Image as ImageIcon, Zap, Lock, Smartphone } from 'lucide-react';
import PageWrapper from '../layout/PageWrapper';
import { IMAGES, MILESTONES } from '../../constants';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = new Date('2026-02-14T00:00:00');
        const interval = setInterval(() => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();

            if (diff <= 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex gap-4 sm:gap-6">
            {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="flex flex-col items-center">
                    <motion.div
                        whileHover={{ y: -5, scale: 1.05 }}
                        className="size-16 sm:size-20 rounded-[1.5rem] bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/5 flex items-center justify-center mb-2 shadow-2xl hover:shadow-brand-500/20 transition-shadow"
                    >
                        <span className="text-2xl sm:text-3xl font-bold text-white tracking-tighter text-glow">{value.toString().padStart(2, '0')}</span>
                    </motion.div>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-brand-300 antialiased">{label}</span>
                </div>
            ))}
        </div>
    );
};

// Animated particles for hero section
const AnimatedParticles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
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
                        scale: [0, 1, 0],
                        opacity: [0, 0.6, 0],
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                    }}
                >
                    <Sparkles className="text-gold-400" size={Math.random() * 15 + 10} />
                </motion.div>
            ))}
        </div>
    );
};

export const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <PageWrapper>
            <div className="p-2 sm:p-4 md:p-6 lg:p-8">
                <header className="relative w-full h-[90vh] min-h-[500px] sm:min-h-[600px] md:min-h-[700px] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-stone-900 shadow-5xl group">
                    {/* Background Image with Slow Zoom */}
                    <motion.img
                        src={IMAGES.roses}
                        alt="Love Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

                    {/* Animated Particles */}
                    <AnimatedParticles />

                    {/* Hero Content */}
                    <div className="absolute inset-0 flex flex-col justify-center p-4 pt-24 sm:p-8 md:p-12 lg:p-20 xl:p-24 z-10">
                        <div className="max-w-3xl space-y-3 sm:space-y-4 md:space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 bg-white/20 backdrop-blur-md border border-white/20 rounded-full"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles className="size-3 sm:size-4 text-gold-300" />
                                </motion.div>
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold-300">The Love Engine</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-white tracking-tighter leading-[0.85] font-display"
                            >
                                Infinite Love <br />
                                <motion.span
                                    className="italic font-serif text-gold-300 text-glow"
                                    animate={{
                                        textShadow: [
                                            "0 0 20px rgba(253, 224, 71, 0.5)",
                                            "0 0 40px rgba(253, 224, 71, 0.8)",
                                            "0 0 20px rgba(253, 224, 71, 0.5)",
                                        ]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    Digitized.
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/70 max-w-xl leading-relaxed antialiased"
                            >
                                The future of romance is here. Create, customize, and secure your love stories on the most premium habitat for lovers.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-wrap gap-3 sm:gap-4 items-center pt-1 sm:pt-2"
                            >
                                <CountdownTimer />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 }}
                                className="pt-2 sm:pt-3 md:pt-4"
                            >
                                <motion.button
                                    onClick={() => navigate('/create')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group inline-flex items-center gap-3 sm:gap-4 md:gap-5 bg-white text-stone-900 pl-5 sm:pl-6 md:pl-8 pr-2 sm:pr-2.5 md:pr-3 py-2 sm:py-2.5 md:py-3 rounded-full hover:shadow-2xl hover:shadow-brand-500/30 transition-all duration-500"
                                >
                                    <span className="text-sm sm:text-base md:text-lg font-semibold">Create Your Card</span>
                                    <motion.span
                                        className="size-10 sm:size-11 md:size-12 bg-brand-500 rounded-full flex items-center justify-center group-hover:bg-brand-600 transition-colors shadow-lg"
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <ArrowRight className="size-5 sm:size-5.5 md:size-6 text-white" />
                                    </motion.span>
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Floating Stat Cards */}
                    <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden xl:flex flex-col gap-6">
                        {[
                            { label: 'Cards Created', val: '2,460+' },
                            { label: 'Love Stories', val: '∞' },
                            { label: 'Success Rate', val: '99%' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.05, x: -10 }}
                                transition={{ delay: 1 + i * 0.2 }}
                                className="glass-2 prismatic-glow p-6 rounded-3xl border-white/10 backdrop-blur-2xl shadow-2xl cursor-pointer"
                            >
                                <p className="text-xs font-bold text-brand-300 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-3xl font-medium text-white tracking-tighter">{stat.val}</p>
                            </motion.div>
                        ))}
                    </div>
                </header>
            </div>
        </PageWrapper>
    );
};

// New Features Section
export const FeaturesSection = () => {
    const features = [
        {
            icon: ImageIcon,
            title: "Memory Lane Slideshow",
            description: "Tell your story with a cinematic photo slideshow set to romantic music.",
            color: "from-pink-500 to-rose-500"
        },
        {
            icon: Music,
            title: "Romantic Soundtrack",
            description: "8 handpicked tracks that fade in and out smoothly for the perfect ambiance.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Heart,
            title: "Interactive Proposal",
            description: "The 'No' button playfully runs away—because the only answer is YES!",
            color: "from-red-500 to-pink-500"
        },
        {
            icon: Zap,
            title: "Instant Generation",
            description: "Create your card in seconds. No coding, no hassle, just pure romance.",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: Lock,
            title: "Private & Secure",
            description: "Your love story is yours alone. Secured links, private moments.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Smartphone,
            title: "Works Everywhere",
            description: "Mobile-first design that looks stunning on any device, any screen.",
            color: "from-green-500 to-emerald-500"
        }
    ];

    return (
        <PageWrapper>
            <section className="py-32 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 right-20 size-96 bg-brand-500/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-20 size-96 bg-gold-500/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <span className="text-brand-500 font-black uppercase text-xs tracking-[0.4em] mb-4 block">What Makes Us Special</span>
                        <h2 className="text-5xl sm:text-7xl font-medium tracking-tighter font-display dark:text-white leading-[0.9] mb-6">
                            Features That <span className="italic font-serif text-brand-500 text-glow">Spark Joy</span>
                        </h2>
                        <p className="text-xl text-stone-500 dark:text-stone-400 max-w-3xl mx-auto">
                            Every detail designed to make your proposal unforgettable. Simple to use, impossible to forget.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group relative p-8 bg-white dark:bg-stone-900 rounded-[2rem] border border-stone-200 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 card-elevation"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-[2rem] transition-opacity`} />

                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="size-6 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold tracking-tight dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
};

export const StorySection = () => {
    return (
        <PageWrapper>
            <section className="py-24 px-6 sm:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                    <motion.div
                        className="lg:col-span-5 space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold-500 font-bold uppercase text-[10px] tracking-[0.4em]">How It Works</span>
                        <h2 className="text-5xl sm:text-7xl font-medium text-stone-900 dark:text-white tracking-tighter leading-[0.85] font-display">
                            From Heart to <br /> <span className="italic font-serif text-gold-500 text-glow">Screen.</span>
                        </h2>
                        <p className="text-xl font-light text-stone-500 dark:text-stone-400 leading-relaxed antialiased">
                            Three simple steps to create the most memorable proposal of your life. No technical skills needed.
                        </p>
                        <div className="space-y-6 pt-4">
                            {[
                                { step: "01", title: "Add Your Details", desc: "Name, photo, and your heartfelt question" },
                                { step: "02", title: "Customize (Optional)", desc: "Add Memory Lane photos and choose your vibe" },
                                { step: "03", title: "Share the Magic", desc: "Get your unique link and send it to your love" },
                                { step: "04", title: "Celebrate Together", desc: "Watch the magic unfold and say YES together" }
                            ].map((m, i) => (
                                <motion.div
                                    key={i}
                                    className="flex gap-6 group"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="size-12 rounded-full border border-gold-200 dark:border-white/10 flex items-center justify-center bg-white dark:bg-stone-800 group-hover:bg-gold-500 group-hover:border-gold-500 transition-all shadow-sm">
                                        <span className="text-xs font-black group-hover:text-white transition-colors">{m.step}</span>
                                    </div>
                                    <div className="flex-1 border-b border-stone-100 dark:border-white/5 pb-6">
                                        <h4 className="font-bold text-stone-900 dark:text-white mb-2 uppercase text-xs tracking-widest">{m.title}</h4>
                                        <p className="text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed">{m.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="lg:col-span-7 relative h-[700px] rounded-[4rem] overflow-hidden shadow-6xl group border-8 border-white dark:border-white/5"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src={IMAGES.roses}
                            alt="Valentine Magic"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[30%] group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <motion.div
                            className="absolute bottom-8 left-8 right-8 p-10 glass-2 prismatic-glow rounded-[3rem] border-white/20"
                            whileHover={{ scale: 1.02 }}
                        >
                            <p className="text-white text-2xl font-light italic leading-relaxed">"Every lover deserves an invitation that feels as unique and unrepeatable as the love it carries."</p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="size-4 bg-gold-500 rounded-full" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Founder, Forever.Yours</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </PageWrapper>
    );
};

export const GallerySection = () => {
    const [active, setActive] = useState(0);
    const items = [
        { title: 'Personalized Cards', img: IMAGES.envelope, tag: 'Bespoke', desc: 'Every card is unique to your love story' },
        { title: 'Interactive Magic', img: IMAGES.balloons, tag: 'Engaging', desc: 'The No button that brings smiles' },
        { title: 'Memory Lane', img: IMAGES.kyoto, tag: 'Cinematic', desc: 'Your photos, our storytelling' },
    ];

    return (
        <PageWrapper>
            <section className="py-24 px-6 bg-white/50 dark:bg-stone-900/50 backdrop-blur-3xl rounded-[5rem] mx-6 border border-white dark:border-white/5">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8 max-w-[1400px] mx-auto">
                    <motion.div
                        className="max-w-2xl px-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-brand-500 font-black uppercase text-[10px] tracking-[0.4em] mb-4 block">Gallery</span>
                        <h2 className="text-5xl sm:text-7xl font-medium tracking-tighter mb-8 font-display dark:text-white leading-[0.9]">
                            See It In <span className="italic font-serif text-brand-500 text-glow">Action</span>
                        </h2>
                        <p className="text-xl font-light text-stone-500 dark:text-stone-400 antialiased">Experience the magic through real examples. Every interaction designed to delight.</p>
                    </motion.div>
                    <div className="flex md:hidden gap-4 p-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setActive(Math.max(0, active - 1))}
                            className="size-16 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all shadow-xl"
                        >
                            <ChevronLeft />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setActive(Math.min(items.length - 1, active + 1))}
                            className="size-16 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all shadow-xl"
                        >
                            <ChevronRight />
                        </motion.button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1400px] mx-auto px-6">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`group relative h-[500px] sm:h-[650px] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-700 cursor-pointer card-elevation ${active === i ? 'block ring-4 sm:ring-8 ring-brand-500/30 scale-100 sm:scale-105' : 'hidden md:block scale-95 opacity-50'}`}
                            onClick={() => setActive(i)}
                        >
                            <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[40%] group-hover:grayscale-0" alt={item.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90" />
                            <motion.div
                                className="absolute top-8 right-8 px-6 py-2 bg-white/90 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-brand-600 shadow-xl"
                                whileHover={{ scale: 1.1 }}
                            >
                                {item.tag}
                            </motion.div>
                            <div className="absolute bottom-12 left-10 right-10 space-y-3">
                                <h3 className="text-4xl font-medium text-white tracking-tighter font-display">{item.title}</h3>
                                <p className="text-white/80 text-sm">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </PageWrapper>
    );
};

const LandingView = () => {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <StorySection />
            <GallerySection />
        </>
    );
};

export default LandingView;
