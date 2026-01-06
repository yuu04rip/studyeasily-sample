
import { Suspense } from 'react';
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function ContattiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-darkPurple py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-wide">
                Contatti
              </h1>
              <div className="space-y-6">
                <div>
                  <p className="text-white/70 mb-2 text-lg">Email:</p>
                  <p className="text-2xl font-semibold">study.easilyhm@gmail.com</p>
                </div>
                <div>
                  <p className="text-white/70 mb-2 text-lg">Telefono:</p>
                  <p className="text-2xl font-semibold">xxxxxx-xxxx</p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-4">
                    <span className="text-white/70 text-lg">social</span>
                    <div className="flex gap-4">
                      <a
                          href="https://www.facebook.com/tuoprofilo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-accent transition text-2xl font-bold"
                      >
                        <FaFacebookF />
                      </a>
                      <a
                          href="https://www.instagram.com/study.easily_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-accent transition text-2xl font-bold"
                      >
                        <FaInstagram />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex justify-center">
              <img
                  src="/icons/1000127298.png" // Inserisci il percorso della tua immagine qui
                  alt="Icona geometrica"
                  className="w-auto h-auto md:w-96 md:h-72 object-contain"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-16 max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-accent/30">
            <h2 className="text-3xl font-bold mb-6 text-white">Inviaci un messaggio</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full px-4 py-3 bg-white/90 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                />
                <input
                  type="text"
                  placeholder="Cognome"
                  className="w-full px-4 py-3 bg-white/90 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white/90 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              />
              <textarea
                rows={6}
                placeholder="Il tuo messaggio..."
                className="w-full px-4 py-3 bg-white/90 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-semibold transition shadow-xl"
              >
                Invia Messaggio
              </button>
            </form>
          </div>


        </div>
      </div>
    </div>
  );
}
