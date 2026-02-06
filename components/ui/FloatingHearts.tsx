import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        y: '110vh',
                        x: `${Math.random() * 100}vw`,
                        scale: Math.random() * 0.5 + 0.5,
                        rotate: Math.random() * 360
                    }}
                    animate={{
                        opacity: [0, 0.3, 0],
                        y: '-10vh',
                        x: `${Math.random() * 100}vw`,
                        rotate: Math.random() * 360
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 20,
                        ease: "linear"
                    }}
                    className="absolute text-brand-500/20"
                >
                    <Heart className="fill-current" size={Math.random() * 20 + 20} />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
