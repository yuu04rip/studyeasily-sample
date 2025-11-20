import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Impara Nuove Competenze con{' '}
            <span className="text-blue-600">StudyEasily</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Accedi a migliaia di corsi online di alta qualità. Impara al tuo ritmo, 
            ovunque tu sia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/corsi"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Esplora i Corsi
            </Link>
            <Link
              href="/signup"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
            >
              Registrati Gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Perché Scegliere StudyEasily?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Corsi di Qualità
            </h3>
            <p className="text-gray-600">
              Accedi a contenuti curati da esperti del settore
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Flessibilità
            </h3>
            <p className="text-gray-600">
              Impara quando e dove vuoi, al tuo ritmo
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Certificati
            </h3>
            <p className="text-gray-600">
              Ottieni certificati riconosciuti al completamento
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Pronto a Iniziare il Tuo Viaggio di Apprendimento?
          </h2>
          <p className="text-xl mb-8">
            Unisciti a migliaia di studenti che stanno già imparando con noi
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Inizia Ora
          </Link>
        </div>
      </section>
    </div>
  );
}
