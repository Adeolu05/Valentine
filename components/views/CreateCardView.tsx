import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Upload, ArrowRight, Check, Copy, Heart, Image as ImageIcon, Film } from 'lucide-react';
import PageWrapper from '../layout/PageWrapper';
import { supabase } from '../../utils/supabase';
import { IMAGES, MOODS } from '../../constants';
import { Mood } from '../../types';
import { useMeta } from '../../hooks/useMeta';
import { compressImage } from '../../utils/imageProcessor';
import { uploadWithProgress } from '../../utils/uploadHelper';

const CreateCardView = () => {
    useMeta({
        title: "Creator Studio",
        description: "Design your perfect Valentine's proposal card with custom moods, music, and AI-generated vows."
    });

    const generateShortId = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz01234563789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };
    const [name, setName] = useState('');
    const [senderName, setSenderName] = useState('');
    const [question, setQuestion] = useState('');
    const [mood, setMood] = useState<Mood>('classic');
    const [spotifyUrl, setSpotifyUrl] = useState('');

    // Split state for better UX
    const [mainImage, setMainImage] = useState('');
    const [memoryImages, setMemoryImages] = useState<string[]>(['', '', '']);

    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    // Uploading states
    const [uploadingMain, setUploadingMain] = useState(false);
    const [uploadProgressMain, setUploadProgressMain] = useState(0);
    const [uploadingMemory, setUploadingMemory] = useState<boolean[]>([false, false, false]);
    const [uploadProgressMemory, setUploadProgressMemory] = useState<number[]>([0, 0, 0]);

    // Default values for preview
    const previewName = name || "Valentine";
    const previewSenderName = senderName || "Admirer";
    const previewImage = mainImage || memoryImages.find(img => img) || IMAGES.roses;
    const previewQuestion = question || "Will you be my Valentine?";

    const handleFileUpload = async (file: File, type: 'main' | 'memory', index: number = 0) => {
        try {
            // Set loading state
            if (type === 'main') {
                setUploadingMain(true);
                setUploadProgressMain(0);
            } else {
                const newUploading = [...uploadingMemory];
                newUploading[index] = true;
                setUploadingMemory(newUploading);
                const newProgress = [...uploadProgressMemory];
                newProgress[index] = 0;
                setUploadProgressMemory(newProgress);
            }

            // 1. Optimize Image
            const compressedBlob = await compressImage(file);

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // 2. Upload with Progress
            await uploadWithProgress(
                'uploads',
                filePath,
                compressedBlob,
                (progress) => {
                    if (type === 'main') {
                        setUploadProgressMain(progress);
                    } else {
                        const newProgress = [...uploadProgressMemory];
                        newProgress[index] = progress;
                        setUploadProgressMemory(newProgress);
                    }
                }
            );

            const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);

            if (type === 'main') {
                setMainImage(data.publicUrl);
            } else {
                const newImages = [...memoryImages];
                newImages[index] = data.publicUrl;
                setMemoryImages(newImages);
            }

        } catch (error) {
            alert('Error uploading image!');
            console.error(error);
        } finally {
            if (type === 'main') {
                setUploadingMain(false);
                setTimeout(() => setUploadProgressMain(0), 1000); // Reset after delay
            } else {
                const newUploading = [...uploadingMemory];
                newUploading[index] = false;
                setUploadingMemory(newUploading);
                setTimeout(() => {
                    const resetProgress = [...uploadProgressMemory];
                    resetProgress[index] = 0;
                    setUploadProgressMemory(resetProgress);
                }, 1000);
            }
        }
    };

    const handleGenerate = async () => {
        // combine memory images + main image at the end (or just use main image if no memory images)
        const validMemoryImages = memoryImages.filter(img => img.trim() !== "");

        let finalImages: string[] = [];

        if (validMemoryImages.length > 0) {
            // If they added memory images, we want the slideshow.
            // Structure: [...memoryImages, mainImage]
            // The ProposalView uses the LAST image as the cover if > 1 image.
            finalImages = [...validMemoryImages, mainImage || validMemoryImages[0]];
        } else {
            // Just the main image
            finalImages = [mainImage || IMAGES.roses];
        }

        // Filter valid final in case mainImage was empty and we pushed it
        finalImages = finalImages.filter(img => img && img.trim() !== "");
        if (finalImages.length === 0) finalImages = [IMAGES.roses];

        // Save to database
        try {
            const { data, error } = await supabase
                .from('proposals')
                .insert({
                    name: previewName,
                    sender_name: previewSenderName,
                    question: previewQuestion,
                    images: finalImages,
                    mood: mood,
                    spotify_url: spotifyUrl
                })
                .select()
                .single();

            if (error) throw error;

            if (data) {
                const url = `${window.location.origin}${window.location.pathname}#/p/${data.id}`;
                setGeneratedUrl(url);
            }
        } catch (error) {
            console.error("Error saving proposal:", error);
            // Fallback: Compact Data to keep URL short
            const compact = {
                n: previewName,
                s: previewSenderName,
                q: previewQuestion,
                i: finalImages,
                m: mood,
                u: spotifyUrl
            };
            const encoded = btoa(JSON.stringify(compact));
            const url = `${window.location.origin}${window.location.pathname}#/p/v?d=${encoded}`;
            setGeneratedUrl(url);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <PageWrapper>
            <div className="min-h-screen pt-32 p-6 flex items-center justify-center">
                <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* LEFT: Engine Controls */}
                    <div className="space-y-10 lg:sticky lg:top-32 pb-20">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                                <Sparkles className="size-4" /> The Creator Studio
                            </div>
                            <h1 className="text-5xl sm:text-7xl font-medium tracking-tighter font-display dark:text-white leading-[0.9]">
                                Design Your <br /><span className="italic font-serif text-brand-500 text-glow">Proposal.</span>
                            </h1>
                            <p className="text-stone-500 dark:text-stone-400 font-light text-lg max-w-md">
                                Customize every detail. Simple or elaborate—it's your story.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Section 1: The Basics */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 ml-6">Partner's Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Juliet"
                                        className="w-full px-8 py-6 bg-stone-50 dark:bg-black/30 border border-stone-200 dark:border-white/10 rounded-[2rem] outline-none focus:ring-4 ring-brand-500/10 transition-all dark:text-white text-lg placeholder:text-stone-300 font-medium"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 ml-6">Your Name</label>
                                    <input
                                        type="text"
                                        value={senderName}
                                        onChange={(e) => setSenderName(e.target.value)}
                                        placeholder="e.g. Romeo"
                                        className="w-full px-8 py-6 bg-stone-50 dark:bg-black/30 border border-stone-200 dark:border-white/10 rounded-[2rem] outline-none focus:ring-4 ring-brand-500/10 transition-all dark:text-white text-lg placeholder:text-stone-300 font-medium"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 ml-6 flex items-center gap-2">
                                        <ImageIcon className="size-3" /> Main Card Photo
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={mainImage}
                                            onChange={(e) => setMainImage(e.target.value)}
                                            placeholder="Paste URL or Upload ->"
                                            className="flex-1 px-8 py-4 bg-stone-50 dark:bg-black/30 border border-stone-200 dark:border-white/10 rounded-[2rem] outline-none focus:ring-4 ring-brand-500/10 transition-all dark:text-white text-sm placeholder:text-stone-300 font-medium"
                                        />
                                        <label className={`flex items-center justify-center px-6 bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-[2rem] cursor-pointer hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 transition-colors ${uploadingMain ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], 'main')}
                                                disabled={uploadingMain}
                                            />
                                            {uploadingMain ? (
                                                <div className="size-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <Upload className="size-5" />
                                            )}
                                        </label>
                                    </div>
                                    {uploadingMain && (
                                        <div className="mx-6 h-1 bg-stone-100 dark:bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-brand-500"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${uploadProgressMain}%` }}
                                            />
                                        </div>
                                    )}
                                    <p className="text-[10px] text-stone-400 ml-6 text-opacity-70">This is the photo they will see on the card.</p>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 ml-6">The Question</label>
                                    <input
                                        type="text"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        placeholder="Will you be my Valentine?"
                                        className="w-full px-8 py-6 bg-stone-50 dark:bg-black/30 border border-stone-200 dark:border-white/10 rounded-[2rem] outline-none focus:ring-4 ring-brand-500/10 transition-all dark:text-white text-lg placeholder:text-stone-300 font-medium"
                                    />
                                </div>
                            </div>

                            {/* Section: Select Atmosphere */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 ml-6">Select Atmosphere</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                    {(Object.keys(MOODS) as Mood[]).map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => setMood(m)}
                                            className={`px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider transition-all border ${mood === m
                                                ? `${MOODS[m].accent} text-white border-transparent shadow-lg scale-105`
                                                : "bg-white dark:bg-white/5 border-stone-200 dark:border-white/10 text-stone-500 dark:text-stone-400 hover:border-brand-300"
                                                }`}
                                        >
                                            {MOODS[m].name.split(' ')[0]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Section: Spotify Music */}
                            <div className="p-8 rounded-[2.5rem] glass-2 prismatic-glow border border-stone-200 dark:border-white/5 space-y-6 card-elevation">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold uppercase tracking-widest text-xs">
                                        <Heart className="size-4 text-green-500 fill-current" />
                                        Spotify Music
                                    </div>
                                    <p className="text-[10px] text-stone-400 font-medium">Add a romantic track (Paste Spotify track link)</p>
                                </div>
                                <input
                                    type="text"
                                    value={spotifyUrl}
                                    onChange={(e) => setSpotifyUrl(e.target.value)}
                                    placeholder="https://open.spotify.com/track/..."
                                    className="w-full px-6 py-4 bg-stone-50 dark:bg-black/30 border border-stone-200 dark:border-white/10 rounded-2xl outline-none focus:ring-4 ring-green-500/10 transition-all dark:text-white text-sm"
                                />
                            </div>

                            {/* Section 2: Optional Memory Lane */}
                            <div className="p-8 rounded-[2.5rem] glass-2 prismatic-glow border border-stone-200 dark:border-white/5 space-y-6 card-elevation">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold uppercase tracking-widest text-xs">
                                        <Film className="size-4 text-brand-500" />
                                        <span>Memory Lane (Optional)</span>
                                    </div>
                                    <p className="text-xs text-stone-500 dark:text-stone-400 font-light">
                                        Add up to 3 photos to play as a slideshow before the big question. Perfect for telling your story. Skip if you prefer simple.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {memoryImages.map((img, idx) => (
                                        <React.Fragment key={idx}>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={img}
                                                    onChange={(e) => {
                                                        const newImages = [...memoryImages];
                                                        newImages[idx] = e.target.value;
                                                        setMemoryImages(newImages);
                                                    }}
                                                    placeholder={`Memory Photo ${idx + 1}...`}
                                                    className="flex-1 px-6 py-3 bg-white dark:bg-black/30 border border-stone-200 dark:border-white/10 rounded-[1.5rem] outline-none focus:ring-2 ring-brand-500/10 transition-all dark:text-white text-sm placeholder:text-stone-300"
                                                />
                                                <label className="flex items-center justify-center px-4 bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-[1.5rem] cursor-pointer hover:bg-stone-200 dark:hover:bg-white/10 transition-colors">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], 'memory', idx)}
                                                        disabled={uploadingMemory[idx]}
                                                    />
                                                    {uploadingMemory[idx] ? (
                                                        <div className="size-4 border-2 border-stone-400 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <Upload className="size-4 text-stone-500 dark:text-stone-400" />
                                                    )}
                                                </label>
                                            </div>
                                            {
                                                uploadingMemory[idx] && (
                                                    <div className="h-1 bg-stone-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-brand-500"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${uploadProgressMemory[idx]}%` }}
                                                        />
                                                    </div>
                                                )
                                            }
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            <AnimatePresence>
                                {generatedUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        className="p-8 bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/50 rounded-[3rem] space-y-5 shadow-inner"
                                    >
                                        <div className="flex justify-between items-center ml-2">
                                            <p className="text-[10px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest">Your Private Link</p>
                                            {copied && <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Copied!</span>}
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex-1 px-5 py-4 bg-white dark:bg-black/40 border border-brand-200 dark:border-brand-900/30 rounded-2xl text-[11px] text-stone-500 dark:text-stone-300 font-mono overflow-hidden text-ellipsis whitespace-nowrap">
                                                {generatedUrl}
                                            </div>
                                            <button
                                                onClick={copyToClipboard}
                                                className="bg-white dark:bg-stone-800 p-4 rounded-2xl border border-brand-200 dark:border-brand-900/30 text-brand-500 hover:bg-brand-500 hover:text-white transition-all shadow-sm active:scale-90"
                                            >
                                                {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-stone-400 text-center italic">Share this link with your partner to ask the question.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={handleGenerate}
                                className="w-full py-6 bg-brand-500 text-white rounded-[2.5rem] font-black text-xl shadow-2xl shadow-brand-500/40 hover:bg-brand-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group"
                            >
                                Generate Invitation <ArrowRight className="size-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: Live Simulation */}
                    <div className="relative h-[800px] bg-stone-100 dark:bg-stone-900 rounded-[4rem] border-8 border-white dark:border-white/5 shadow-2xl overflow-hidden hidden lg:flex items-center justify-center">
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-stone-900/10 dark:bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-300 z-10 flex items-center gap-2">
                            <div className="size-2 bg-red-500 rounded-full animate-pulse" /> Live Preview
                        </div>

                        {/* Preview Content (Scaled down Proposal View) */}
                        <div className="scale-[0.85] w-full max-w-lg card-elevation">
                            <div className="w-full glass-2 prismatic-glow rounded-[3rem] p-10 shadow-xl card-glow text-center space-y-8 relative overflow-hidden border border-brand-100 dark:border-white/5">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-300 via-brand-500 to-brand-300" />

                                <div className="relative mx-auto size-48 mb-6">
                                    <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl ring-8 ring-brand-50 dark:ring-white/5">
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 size-12 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center shadow-xl border-4 border-brand-50 dark:border-white/10">
                                        <Heart className="size-6 text-brand-500 fill-current" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-4xl font-medium tracking-tighter leading-tight font-display dark:text-white">
                                        Hey {previewName}, <br />
                                        <span className={`italic font-serif ${MOODS[mood].text} text-glow`}>{previewQuestion}</span>
                                    </h1>
                                </div>

                                <div className="flex items-center justify-center gap-4 pt-4 opacity-50 pointer-events-none">
                                    <button className={`px-8 py-4 ${MOODS[mood].accent} text-white rounded-full text-lg font-black shadow-lg`}>YES!</button>
                                    <button className="px-6 py-4 bg-stone-100 text-stone-400 rounded-full font-bold">No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper >
    );
};

export default CreateCardView;
