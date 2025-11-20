'use client';

import { useEffect, useRef, useState } from 'react';

export interface WaveConfig {
  id: string;
  amplitude: number;
  frequency: number;
  speed: number;
  baseY: number;
  colorStart: string;
  colorEnd: string;
  opacity: number;
}

interface AnimatedWavesProps {
  waves?: WaveConfig[];
  width?: number;
  height?: number;
  resolution?: number;
  className?: string;
}

const defaultWaves: WaveConfig[] = [
  {
    id: 'wave1',
    amplitude: 15,
    frequency: 0.02,
    speed: 0.02,
    baseY: 60,
    colorStart: '#E84CB4',
    colorEnd: '#5B4D9D',
    opacity: 0.6,
  },
  {
    id: 'wave2',
    amplitude: 20,
    frequency: 0.015,
    speed: 0.015,
    baseY: 65,
    colorStart: '#8B5CF6',
    colorEnd: '#4A5FD9',
    opacity: 0.5,
  },
  {
    id: 'wave3',
    amplitude: 18,
    frequency: 0.025,
    speed: 0.018,
    baseY: 70,
    colorStart: '#D184FF',
    colorEnd: '#7b3bd6',
    opacity: 0.4,
  },
  {
    id: 'wave4',
    amplitude: 12,
    frequency: 0.03,
    speed: 0.025,
    baseY: 75,
    colorStart: '#F6C3FF',
    colorEnd: '#9b4dff',
    opacity: 0.3,
  },
];

export default function AnimatedWaves({
  waves = defaultWaves,
  width = 200,
  height = 100,
  resolution = 150,
  className = '',
}: AnimatedWavesProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const animationFrameRef = useRef<number>();
  const phaseRef = useRef<{ [key: string]: number }>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !svgRef.current) return;

    const svg = svgRef.current;
    let lastTime = 0;
    let isPaused = false;

    // Initialize phases for each wave
    waves.forEach((wave) => {
      if (phaseRef.current[wave.id] === undefined) {
        phaseRef.current[wave.id] = Math.random() * Math.PI * 2;
      }
    });

    const generateWavePath = (wave: WaveConfig, phase: number) => {
      const points: string[] = [];
      const step = width / resolution;

      for (let x = 0; x <= width; x += step) {
        const y = wave.baseY + wave.amplitude * Math.sin(wave.frequency * x + phase);
        points.push(`${x},${y}`);
      }

      return points;
    };

    const animate = (time: number) => {
      if (isPaused) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      if (lastTime === 0) lastTime = time;
      const deltaTime = (time - lastTime) / 16.67; // Normalize to ~60fps
      lastTime = time;

      waves.forEach((wave) => {
        // Update phase
        phaseRef.current[wave.id] = (phaseRef.current[wave.id] + wave.speed * deltaTime) % (Math.PI * 2);

        const strokePath = svg.querySelector(`#stroke-${wave.id}`) as SVGPathElement;
        const fillPath = svg.querySelector(`#fill-${wave.id}`) as SVGPathElement;

        if (strokePath && fillPath) {
          const points = generateWavePath(wave, phaseRef.current[wave.id]);
          const pathData = `M ${points.join(' L ')}`;
          const fillData = `${pathData} L ${width},${height} L 0,${height} Z`;

          strokePath.setAttribute('d', pathData);
          fillPath.setAttribute('d', fillData);
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Pause animation when document is hidden
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [waves, width, height, resolution, prefersReducedMotion]);

  // Generate static snapshot for reduced motion
  const generateStaticPath = (wave: WaveConfig) => {
    const points: string[] = [];
    const step = width / resolution;
    const phase = 0; // Static phase

    for (let x = 0; x <= width; x += step) {
      const y = wave.baseY + wave.amplitude * Math.sin(wave.frequency * x + phase);
      points.push(`${x},${y}`);
    }

    const pathData = `M ${points.join(' L ')}`;
    return {
      stroke: pathData,
      fill: `${pathData} L ${width},${height} L 0,${height} Z`,
    };
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-full ${className}`}
      preserveAspectRatio="none"
      aria-label="Animated wave chart"
    >
      <defs>
        {waves.map((wave) => (
          <linearGradient key={`gradient-${wave.id}`} id={`gradient-${wave.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={wave.colorStart} stopOpacity={wave.opacity} />
            <stop offset="100%" stopColor={wave.colorEnd} stopOpacity={wave.opacity * 0.5} />
          </linearGradient>
        ))}
      </defs>

      {prefersReducedMotion
        ? // Static snapshot
          waves.map((wave) => {
            const paths = generateStaticPath(wave);
            return (
              <g key={wave.id}>
                <path d={paths.fill} fill={`url(#gradient-${wave.id})`} />
                <path d={paths.stroke} fill="none" stroke={wave.colorStart} strokeWidth="2" opacity={wave.opacity} />
              </g>
            );
          })
        : // Animated paths
          waves.map((wave) => (
            <g key={wave.id}>
              <path id={`fill-${wave.id}`} fill={`url(#gradient-${wave.id})`} />
              <path
                id={`stroke-${wave.id}`}
                fill="none"
                stroke={wave.colorStart}
                strokeWidth="2"
                opacity={wave.opacity}
              />
            </g>
          ))}
    </svg>
  );
}
