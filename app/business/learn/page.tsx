import Link from 'next/link';

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-darkPurple via-primary to-accent py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Link href="/business" className="text-white/70 hover:text-white inline-flex items-center mb-8 transition">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Business
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            {/* Content */}
            <div className="text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Data Analytics
              </h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                Il sistema di data analytics raccoglie e analizza in modo automatico e organizzato i dati 
                provenienti dagli studenti (materiali usati, progressi, difficoltà, risorse online consultate).
              </p>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                L'algoritmo elabora queste informazioni per generare report, individuare pattern, prevedere 
                i bisogni formativi e suggerire contenuti personalizzati.
              </p>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Tutto avviene in modo anonimo e aggregato, così il sistema migliora continuamente l'apprendimento 
                e supporta scuole e tutor con analisi chiare e utili.
              </p>
            </div>

            {/* Analytics Icon */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-3xl p-12 border border-accent/30">
                <svg className="w-64 h-64 text-accent" viewBox="0 0 200 200" fill="none">
                  <rect x="20" y="120" width="30" height="60" fill="currentColor" opacity="0.8" rx="4" />
                  <rect x="60" y="90" width="30" height="90" fill="currentColor" opacity="0.9" rx="4" />
                  <rect x="100" y="60" width="30" height="120" fill="currentColor" rx="4" />
                  <rect x="140" y="40" width="30" height="140" fill="currentColor" opacity="0.9" rx="4" />
                  <path d="M 35 120 L 75 90 L 115 60 L 155 40" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.6" />
                  <circle cx="35" cy="120" r="5" fill="white" />
                  <circle cx="75" cy="90" r="5" fill="white" />
                  <circle cx="115" cy="60" r="5" fill="white" />
                  <circle cx="155" cy="40" r="5" fill="white" />
                </svg>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-accent/20">
              <div className="text-accent text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-white mb-3">Report Automatici</h3>
              <p className="text-white/80">Generazione automatica di report dettagliati sui progressi degli studenti</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-accent/20">
              <div className="text-accent text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-3">Pattern Recognition</h3>
              <p className="text-white/80">Individuazione di pattern di apprendimento per ottimizzare i contenuti</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-accent/20">
              <div className="text-accent text-4xl mb-4">🔮</div>
              <h3 className="text-2xl font-bold text-white mb-3">Previsioni AI</h3>
              <p className="text-white/80">Previsione dei bisogni formativi con intelligenza artificiale</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="text-5xl font-bold text-accent mb-2">95%</div>
              <p className="text-xl">Accuratezza Predittiva</p>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold text-accent mb-2">100K+</div>
              <p className="text-xl">Dati Analizzati</p>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold text-accent mb-2">24/7</div>
              <p className="text-xl">Monitoraggio Continuo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
