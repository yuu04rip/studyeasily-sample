export default function ContattiPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contattaci
          </h1>
          <p className="text-xl text-gray-600">
            Hai domande o suggerimenti? Siamo qui per aiutarti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Invia un Messaggio
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="Il tuo nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="La tua email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oggetto
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="Oggetto del messaggio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Messaggio
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="Scrivi il tuo messaggio qui..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Invia Messaggio
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📧</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">info@studyeasily.com</p>
                  <p className="text-gray-600">support@studyeasily.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📞</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Telefono
                  </h3>
                  <p className="text-gray-600">+39 02 1234 5678</p>
                  <p className="text-sm text-gray-500">Lun-Ven, 9:00-18:00</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📍</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Indirizzo
                  </h3>
                  <p className="text-gray-600">
                    Via Roma 123
                    <br />
                    20100 Milano, Italia
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Social Media</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition"
                >
                  f
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition"
                >
                  t
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition"
                >
                  in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
