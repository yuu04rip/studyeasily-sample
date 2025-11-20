'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scale based on scroll position
  // Starts at 1.2 and scales down to 0.6
  // Apply scale transformation over the first 500px of scroll
  const calculateScale = () => {
    const maxScroll = 500;
    const startScale = 1.2;
    const endScale = 0.6;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    return startScale - (startScale - endScale) * scrollProgress;
  };

  const sphereScale = calculateScale();

  return (
    <section className="relative bg-gradient-purple-blue text-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          {/* Title in Higuan font */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight font-higuan">
            StudyEasily
          </h1>
          
          {/* Quote text in Futura font */}
          <div className="font-futura">
            <p className="text-xl md:text-2xl lg:text-3xl mb-3 text-white/95 max-w-2xl uppercase font-medium tracking-wide">
              L&apos;UOMO COLTO È COLUI
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl mb-3 text-white/95 max-w-2xl uppercase font-medium tracking-wide">
              CHE SA DOVE TROVARE
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/95 max-w-2xl uppercase font-medium tracking-wide">
              CIÒ CHE NON SA.
            </p>
            <p className="text-lg md:text-xl mb-12 text-white/80 italic font-light">
              - Georg Simmel
            </p>
          </div>
        </div>

        {/* Decorative animated spheres with scroll effect */}
        <div 
          className="absolute top-10 right-10 md:right-20 flex gap-4 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${sphereScale})` }}
        >
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-accent to-pink-500 opacity-90 animate-float shadow-xl"></div>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 mt-8 opacity-80 animate-float-alt shadow-lg"></div>
        </div>
        
        <div 
          className="absolute top-32 right-32 md:right-48 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${sphereScale})` }}
        >
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-blue-600 opacity-85 animate-float-delayed shadow-2xl"></div>
        </div>
        
        <div 
          className="absolute top-40 right-12 md:right-24 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${sphereScale})` }}
        >
          <div className="w-10 h-10 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-300 to-purple-500 opacity-75 animate-float shadow-lg"></div>
        </div>
        
        {/* Additional sphere on the left side for balance */}
        <div 
          className="absolute bottom-20 left-10 md:left-20 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${sphereScale})` }}
        >
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-accent/70 to-pink-400 opacity-70 animate-float-alt shadow-lg"></div>
        </div>
      </div>
    </section>
  );
}
