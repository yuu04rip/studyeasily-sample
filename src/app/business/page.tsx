import Link from 'next/link';

export default function BusinessPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            StudyEasily per le Aziende
          </h1>
          <p className="text-xl mb-8">
            Forma il tuo team con i migliori corsi online. Soluzioni personalizzate 
            per la crescita professionale della tua organizzazione.
          </p>
          <Link
            href="/contatti"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Contattaci
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Vantaggi per la Tua Azienda
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Team Management
            </h3>
            <p className="text-gray-600">
              Gestisci facilmente i progressi del tuo team con dashboard dedicate
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Analytics Avanzate
            </h3>
            <p className="text-gray-600">
              Monitora le performance e i risultati con report dettagliati
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Contenuti Personalizzati
            </h3>
            <p className="text-gray-600">
              Corsi su misura per le esigenze specifiche della tua organizzazione
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg">Aziende Partner</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50k+</div>
              <div className="text-lg">Dipendenti Formati</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg">Tasso di Soddisfazione</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg">Corsi Disponibili</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto a Investire nella Formazione del Tuo Team?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contattaci per scoprire le nostre soluzioni enterprise personalizzate
          </p>
          <Link
            href="/contatti"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Richiedi una Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
