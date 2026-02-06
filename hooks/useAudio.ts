import { useState, useEffect, useRef } from 'react';

export const useAudio = (shouldPlay: boolean) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Playlist of 8 songs
        const SONGS = [
            'https://zptgxbsyvfmdsihzsqod.supabase.co/storage/v1/object/public/uploads/melodyloops-preview-afternoon-in-montmartre-0m30s.mp3',
            'https://zptgxbsyvfmdsihzsqod.supabase.co/storage/v1/object/public/uploads/melodyloops-preview-beloved-family-0m30s.mp3',
            'https://zptgxbsyvfmdsihzsqod.supabase.co/storage/v1/object/public/uploads/melodyloops-preview-everlasting-0m30s.mp3',
            'https://zptgxbsyvfmdsihzsqod.supabase.co/storage/v1/object/public/uploads/melodyloops-preview-falling-into-quiet-0m30s.mp3',
            'https://zptgxbsyvfmdsihzsqod.supabase.co/storage/v1/object/public/uploads/melodyloops-preview-loving-you-0m30s.mp3',
            'https://zptgxbsyvfmdsihzsqod.supabase.co/storage/v1/object/public/uploads/melodyloops-preview-subtle-motions-0m30s.mp3',
            'https://zptgxbsyvfmdsihzsqod.supabase.co/storage/v1/object/public/uploads/melodyloops-preview-the-light-you-give-0m30s.mp3',
            'https://zptgxbsyvfmdsihzsqod.supabase.co/storage/v1/object/public/uploads/melodyloops-preview-the-most-beautiful-story-0m30s.mp3'
        ];

        // Pick a random song
        const randomSong = SONGS[Math.floor(Math.random() * SONGS.length)];

        // Initialize audio
        audioRef.current = new Audio(randomSong);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const fadeOutAudio = () => {
        if (!audioRef.current || !isPlaying) return;

        const fadeAudio = setInterval(() => {
            if (audioRef.current) {
                if (audioRef.current.volume > 0.05) {
                    audioRef.current.volume -= 0.05;
                } else {
                    audioRef.current.volume = 0;
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    setIsPlaying(false);
                    clearInterval(fadeAudio);
                }
            } else {
                clearInterval(fadeAudio);
            }
        }, 100);
    };

    useEffect(() => {
        if (shouldPlay) {
            // Try to play audio
            if (audioRef.current) {
                audioRef.current.volume = 0.5; // Reset volume
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(e => {
                        console.log("Auto-play blocked", e);
                        setIsPlaying(false);
                    });
            }
        } else {
            // Stop audio if slideshow is hidden
            fadeOutAudio();
        }
    }, [shouldPlay]);

    const toggleAudio = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (audioRef.current) {
            if (isPlaying) {
                fadeOutAudio();
            } else {
                audioRef.current.volume = 0.5; // Reset volume before playing
                audioRef.current.play().catch(e => console.log(e));
                setIsPlaying(true);
            }
        }
    };

    return { isPlaying, toggleAudio, fadeOutAudio };
};
