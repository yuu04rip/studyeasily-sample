'use client';

import Link from 'next/link';
import AnimatedWaves from '@/components/AnimatedWaves';

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent via-purple-700 to-darkPurple py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Chart Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-purple-600 to-accent/50 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-purple-400/30"></div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-2/3">
                <AnimatedWaves />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Let's talk business.</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Trasforma la tua forza lavoro con programmi di formazione personalizzati e gestione avanzata dell'apprendimento. Offriamo soluzioni enterprise per team di tutte le dimensioni.
            </p>
            <Link href="/business/learn">
              <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold transition shadow-xl text-lg">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
