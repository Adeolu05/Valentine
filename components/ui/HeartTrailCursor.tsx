import React, { useEffect, useRef } from 'react';

interface Point {
    x: number;
    y: number;
    age: number;
    life: number;
    size: number;
    color: string;
}

const HeartTrailCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const pointsRef = useRef<Point[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };

            // Add a new point on move
            if (Math.random() > 0.7) {
                pointsRef.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    age: 0,
                    life: 40 + Math.random() * 20,
                    size: 5 + Math.random() * 15,
                    color: `hsla(${340 + Math.random() * 30}, 100%, 70%, 0.6)`
                });
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        handleResize();

        const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, color: string) => {
            ctx.save();
            ctx.beginPath();
            ctx.translate(x, y);
            ctx.scale(size / 10, size / 10);
            ctx.fillStyle = color.replace('0.6', opacity.toString());

            // Simple heart shape
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10);
            ctx.bezierCurveTo(10, 0, 5, -5, 0, 0);

            ctx.fill();
            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = pointsRef.current.length - 1; i >= 0; i--) {
                const p = pointsRef.current[i];
                p.age++;
                p.y -= 0.5; // Slight upward drift

                const opacity = 1 - (p.age / p.life);

                if (p.age >= p.life) {
                    pointsRef.current.splice(i, 1);
                } else {
                    drawHeart(ctx, p.x, p.y, p.size, opacity, p.color);
                }
            }

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default HeartTrailCursor;
