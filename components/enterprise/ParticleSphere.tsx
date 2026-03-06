"use client";

import { useEffect, useRef} from"react";
import { motion} from"framer-motion";

interface ParticleSphereProps {
    isProcessing: boolean;
    progress: number; // 0-100
}

export default function ParticleSphere({ isProcessing, progress}: ParticleSphereProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const particles: Array<{
            x: number;
            y: number;
            z: number;
            vx: number;
            vy: number;
            size: number;
       }> = [];

        // Create particles
        const particleCount = 200;
        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const radius = 100;

            particles.push({
                x: radius * Math.sin(phi) * Math.cos(theta),
                y: radius * Math.sin(phi) * Math.sin(theta),
                z: radius * Math.cos(phi),
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
           });
       }

        let animationId: number;
        let rotation = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            rotation += isProcessing ? 0.005 : 0.001;

            // Sort particles by z-depth
            particles.sort((a, b) => b.z - a.z);

            particles.forEach(particle => {
                // Rotate particle
                const cos = Math.cos(rotation);
                const sin = Math.sin(rotation);
                const x1 = particle.x * cos - particle.z * sin;
                const z1 = particle.x * sin + particle.z * cos;

                // Project 3D to 2D
                const scale = 300 / (300 + z1);
                const x2d = x1 * scale + canvas.width / 2;
                const y2d = particle.y * scale + canvas.height / 2;

                // Color based on processing state and progress
                const opacity = isProcessing
                    ? (0.3 + (progress / 100) * 0.7) * scale
                    : 0.3 * scale;

                const hue = isProcessing ? 25 + (progress / 100) * 30 : 20;
                ctx.fillStyle =`hsla(${hue}, 100%, 50%, ${opacity})`;

                ctx.beginPath();
                ctx.arc(x2d, y2d, particle.size * scale, 0, Math.PI * 2);
                ctx.fill();

                // Drift particles slightly
                if (isProcessing) {
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    // Keep particles in sphere
                    const dist = Math.sqrt(particle.x ** 2 + particle.y ** 2 + particle.z ** 2);
                    if (dist > 120 || dist < 80) {
                        particle.vx *= -1;
                        particle.vy *= -1;
                   }
               }
           });

            animationId = requestAnimationFrame(animate);
       };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
       };
   }, [isProcessing, progress]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="w-full h-full"
            />

            {isProcessing && (
                <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                    <div className="text-6xl font-mono font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                        {progress}%
                    </div>
                    <div className="text-sm text-orange-600">Analyzing voice DNA...</div>
                </motion.div>
            )}
        </div>
    );
}
