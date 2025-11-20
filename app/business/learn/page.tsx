import SemicircleGauge from '@/components/SemicircleGauge';
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Transform Your Workforce
              </h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                Potenzia il tuo team con soluzioni di formazione all'avanguardia. Il nostro sistema di gestione 
                dell'apprendimento aiuta le aziende a crescere attraverso l'educazione continua.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Corsi personalizzati per il tuo settore</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Analytics avanzate per monitorare i progressi</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Supporto dedicato 24/7</span>
                </li>
              </ul>
              <button className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-lg font-semibold transition shadow-xl text-lg">
                Richiedi una Demo
              </button>
            </div>

            {/* Gauge Visual */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-3xl p-12 border border-accent/30">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">Success Rate</h2>
                  <p className="text-white/70">Team Performance Indicator</p>
                </div>
                <SemicircleGauge 
                  period={4000}
                  radius={120}
                  strokeWidth={24}
                  label="Team success rate gauge"
                />
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-2xl font-bold text-white">95%</p>
                    <p className="text-white/70 text-sm">Completion</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-2xl font-bold text-white">4.8</p>
                    <p className="text-white/70 text-sm">Avg Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="text-5xl font-bold text-accent mb-2">500+</div>
              <p className="text-xl">Aziende Partner</p>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold text-accent mb-2">50K+</div>
              <p className="text-xl">Dipendenti Formati</p>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold text-accent mb-2">98%</div>
              <p className="text-xl">Tasso di Soddisfazione</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
