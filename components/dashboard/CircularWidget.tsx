'use client';

import { motion } from 'framer-motion';

interface CircularWidgetProps {
  title: string;
  value: number | string;
  image?: string;
  progress?: number;
  index?: number;
}

export default function CircularWidget({ 
  title, 
  value, 
  image, 
  progress = 0,
  index = 0 
}: CircularWidgetProps) {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col items-center"
    >
      {/* Circular container with neon border */}
      <div className="circular-widget relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
        {/* Progress ring */}
        <svg 
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
          aria-label={`Progress: ${progress}%`}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(155,107,255,0.2)"
            strokeWidth="4"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#neonGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9B6BFF" />
              <stop offset="50%" stopColor="#FF66D7" />
              <stop offset="100%" stopColor="#35D6C6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Content */}
        <div className="absolute inset-2 md:inset-3 rounded-full overflow-hidden bg-gradient-to-br from-dashboard-bg to-dashboard-bgDark flex items-center justify-center">
          {image ? (
            <div 
              className="w-full h-full bg-cover bg-center opacity-80"
              style={{ backgroundImage: `url(${image})` }}
              role="img"
              aria-label={title}
            />
          ) : (
            <div className="text-center p-2">
              <div className="text-3xl md:text-4xl font-bold text-white neon-text-glow">
                {value}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        className="mt-4 text-center"
      >
        <h3 className="text-lg md:text-xl font-semibold text-white">
          {title}
        </h3>
        {progress > 0 && (
          <p className="text-sm text-neon-cyan mt-1">
            {progress}% completato
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
