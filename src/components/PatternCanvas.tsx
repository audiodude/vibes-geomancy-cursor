import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePatternStore } from '../store/patternStore';

const PatternCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    shape,
    size,
    rotation,
    scale,
    position,
    opacity,
    color,
    density,
    spacing,
    symmetry,
    noise,
    complexity,
    numShapes,
  } = usePatternStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation frame
    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate pattern parameters
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Calculate the maximum distance from center to any corner
      const maxDistance = Math.sqrt(
        Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2),
      );

      // Use spacing to determine the number of rings
      const maxRings = Math.floor(maxDistance / (spacing * scale));
      const ringCount = Math.min(density * complexity, maxRings);

      // Draw pattern: multiple rings, each with numShapes
      for (let ring = 1; ring <= ringCount; ring++) {
        const radius = ring * spacing * scale;
        for (let j = 0; j < numShapes; j++) {
          const angle = (j * (2 * Math.PI)) / numShapes;

          // Add noise to position
          const noiseX = Math.sin(position + ring * 10 + j) * noise * size;
          const noiseY = Math.cos(position + ring * 10 + j) * noise * size;

          const x = centerX + Math.cos(angle + rotation) * radius + noiseX;
          const y = centerY + Math.sin(angle + rotation) * radius + noiseY;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle + rotation + position);
          ctx.globalAlpha = opacity;

          // Draw shape
          ctx.beginPath();
          switch (shape) {
            case 'circle':
              ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
              break;
            case 'square':
              ctx.rect(-size / 2, -size / 2, size, size);
              break;
            case 'triangle':
              ctx.moveTo(0, -size / 2);
              ctx.lineTo(size / 2, size / 2);
              ctx.lineTo(-size / 2, size / 2);
              break;
            case 'hexagon':
              for (let k = 0; k < 6; k++) {
                const hexAngle = (k * Math.PI) / 3;
                const hexX = (Math.cos(hexAngle) * size) / 2;
                const hexY = (Math.sin(hexAngle) * size) / 2;
                if (k === 0) ctx.moveTo(hexX, hexY);
                else ctx.lineTo(hexX, hexY);
              }
              break;
          }

          ctx.fillStyle = color;
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    shape,
    size,
    rotation,
    scale,
    position,
    opacity,
    color,
    density,
    spacing,
    symmetry,
    noise,
    complexity,
    numShapes,
  ]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default PatternCanvas;
