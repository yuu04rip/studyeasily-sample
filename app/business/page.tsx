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
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <path d="M 0,80 Q 50,20 100,40 T 200,30" fill="none" stroke="#E84CB4" strokeWidth="3" />
                  <path d="M 0,80 Q 50,20 100,40 T 200,30 L 200,100 L 0,100 Z" fill="url(#gradientBiz)" opacity="0.6" />
                  <defs>
                    <linearGradient id="gradientBiz" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#E84CB4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#5B4D9D" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Let's talk business.</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Trasforma la tua forza lavoro con programmi di formazione personalizzati e gestione avanzata dell'apprendimento. Offriamo soluzioni enterprise per team di tutte le dimensioni.
            </p>
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold transition shadow-xl text-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
