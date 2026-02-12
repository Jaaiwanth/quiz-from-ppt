import { useEffect, useRef } from 'react';
import '../styles/GradientBackground.css';

export default function GradientBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        // Set canvas size
        const setCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Gradient blob class
        class GradientBlob {
            constructor(canvas) {
                this.canvas = canvas;
                this.reset();
            }

            reset() {
                const rect = this.canvas.getBoundingClientRect();
                this.x = Math.random() * rect.width;
                this.y = Math.random() * rect.height;
                this.radius = 150 + Math.random() * 200;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.hue = Math.random() * 60 + 260; // Purple range (260-320)
            }

            update(time) {
                const rect = this.canvas.getBoundingClientRect();

                // Smooth oscillating movement
                this.x += this.speedX + Math.sin(time * 0.001) * 0.5;
                this.y += this.speedY + Math.cos(time * 0.001) * 0.5;

                // Bounce off edges
                if (this.x < -this.radius) this.x = rect.width + this.radius;
                if (this.x > rect.width + this.radius) this.x = -this.radius;
                if (this.y < -this.radius) this.y = rect.height + this.radius;
                if (this.y > rect.height + this.radius) this.y = -this.radius;

                // Pulse radius
                this.radius = 150 + Math.sin(time * 0.0005) * 50 + Math.random() * 200;
            }

            draw(ctx) {
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.radius
                );

                gradient.addColorStop(0, `hsla(${this.hue}, 80%, 70%, 0.8)`);
                gradient.addColorStop(0.5, `hsla(${this.hue}, 70%, 60%, 0.4)`);
                gradient.addColorStop(1, `hsla(${this.hue}, 60%, 50%, 0)`);

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, this.canvas.getBoundingClientRect().width, this.canvas.getBoundingClientRect().height);
            }
        }

        // Create blobs
        const blobs = Array.from({ length: 5 }, () => new GradientBlob(canvas));

        // Animation loop
        const animate = () => {
            const rect = canvas.getBoundingClientRect();

            // Clear with white background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, rect.width, rect.height);

            // Set blend mode for blobs
            ctx.globalCompositeOperation = 'screen';

            // Update and draw blobs
            blobs.forEach(blob => {
                blob.update(time);
                blob.draw(ctx);
            });

            // Reset blend mode
            ctx.globalCompositeOperation = 'source-over';

            time += 16;
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="gradient-background-canvas" />;
}
