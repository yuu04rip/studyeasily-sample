'use client';

import { useEffect, useRef, useState } from 'react';

interface SemicircleGaugeProps {
  period?: number; // Time in ms for full cycle (fill + unfill)
  radius?: number;
  strokeWidth?: number;
  colorStart?: string;
  colorEnd?: string;
  backgroundColor?: string;
  className?: string;
  label?: string;
}

export default function SemicircleGauge({
  period = 3000,
  radius = 100,
  strokeWidth = 20,
  colorStart = '#E84CB4',
  colorEnd = '#5B4D9D',
  backgroundColor = '#2D1B69',
  className = '',
  label = 'Progress',
}: SemicircleGaugeProps) {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<'filling' | 'unfilling'>('filling');
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
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
    if (prefersReducedMotion) {
      setProgress(0.5); // Show static at 50%
      return;
    }

    let isPaused = false;

    const animate = (time: number) => {
      if (isPaused) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      if (startTimeRef.current === 0) {
        startTimeRef.current = time;
      }

      const elapsed = time - startTimeRef.current;
      const halfPeriod = period / 2;
      const cyclePosition = elapsed % period;

      let newProgress: number;
      let newDirection: 'filling' | 'unfilling';

      if (cyclePosition < halfPeriod) {
        // Filling phase
        newProgress = cyclePosition / halfPeriod;
        newDirection = 'filling';
      } else {
        // Unfilling phase
        newProgress = 1 - (cyclePosition - halfPeriod) / halfPeriod;
        newDirection = 'unfilling';
      }

      setProgress(newProgress);
      setDirection(newDirection);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Pause animation when document is hidden
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused && startTimeRef.current > 0) {
        // Reset start time when resuming to avoid jumps
        startTimeRef.current = 0;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [period, prefersReducedMotion]);

  // Calculate semicircle path
  const centerX = radius + strokeWidth;
  const centerY = radius + strokeWidth;
  const viewBoxSize = (radius + strokeWidth) * 2;

  // Semicircle arc (180 degrees)
  const circumference = Math.PI * radius; // Half circle
  const offset = circumference * (1 - progress);

  // Create semicircle path
  const startAngle = Math.PI; // Start at left (180 degrees)
  const endAngle = 0; // End at right (0 degrees)

  const x1 = centerX + radius * Math.cos(startAngle);
  const y1 = centerY + radius * Math.sin(startAngle);
  const x2 = centerX + radius * Math.cos(endAngle);
  const y2 = centerY + radius * Math.sin(endAngle);

  const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={viewBoxSize}
        height={radius + strokeWidth * 2}
        viewBox={`0 0 ${viewBoxSize} ${radius + strokeWidth * 2}`}
        className="overflow-visible"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-label={label}
      >
        <defs>
          <linearGradient id="semicircleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d={pathData}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress arc */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#semicircleGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.1s linear',
          }}
        />

        {/* Center text */}
        <text
          x={centerX}
          y={centerY + 10}
          textAnchor="middle"
          fill="white"
          fontSize={radius / 3}
          fontWeight="bold"
          className="select-none"
        >
          {Math.round(progress * 100)}%
        </text>
      </svg>

      <div className="mt-4 text-center">
        <p className="text-white/70 text-sm">
          {prefersReducedMotion ? 'Static Mode' : direction === 'filling' ? 'Filling...' : 'Unfilling...'}
        </p>
      </div>
    </div>
  );
}
