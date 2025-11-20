import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="bg-gradient-main min-h-screen">
      {/* Hero Section with custom fonts and animated spheres */}
      <Hero />

      {/* Search Section */}
      <section className="bg-gradient-to-b from-primary to-darkPurple py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-full px-6 py-4 flex items-center shadow-lg">
              <input
                type="text"
                placeholder="Search Course"
                className="flex-1 outline-none text-gray-800 text-lg"
              />
              <button className="text-gray-500 hover:text-primary transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Cards Section */}
      <section className="bg-gradient-to-b from-darkPurple to-primary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Link key={i} href={`/corsi/${i}`} className="group">
                <div className="relative rounded-3xl overflow-hidden shadow-xl transform transition hover:scale-105">
                  <div className="aspect-square bg-gradient-to-br from-accent to-primary">
                    {/* Placeholder for course image */}
                    <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                      {i}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/80 to-transparent"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="bg-gradient-to-b from-primary via-purple-800 to-accent py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12 uppercase tracking-wide">
            I Nostri Piani
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {["Freemium", "Premium", "Premium Plus"].map((plan) => (
              <div key={plan} className="bg-gradient-dark rounded-3xl p-8 shadow-2xl transform transition hover:scale-105">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">{plan}</h3>
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels Section */}
      <section className="bg-gradient-to-b from-accent via-purple-600 to-accent py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Canali di connessione
          </h2>
          <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
            Scegli la lezione o qualsiasi community di studio
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { name: "Google Meet", icon: "📹" },
              { name: "Zoom", icon: "💬" },
              { name: "Discord", icon: "🎮" },
              { name: "YouTube", icon: "📺" },
              { name: "Telegram", icon: "✈️" }
            ].map((platform) => (
              <div key={platform.name} className="flex flex-col items-center group cursor-pointer">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-lg transform transition group-hover:scale-110 mb-3">
                  <span className="text-3xl md:text-4xl">{platform.icon}</span>
                </div>
                <p className="text-white text-sm md:text-base font-medium">{platform.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section className="bg-gradient-to-b from-accent via-purple-700 to-darkPurple py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* Chart placeholder */}
              <div className="aspect-square bg-gradient-to-br from-purple-600 to-accent/50 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-purple-400/30"></div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-2/3">
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    <path
                      d="M 0,80 Q 50,20 100,40 T 200,30"
                      fill="none"
                      stroke="#E84CB4"
                      strokeWidth="3"
                    />
                    <path
                      d="M 0,80 Q 50,20 100,40 T 200,30 L 200,100 L 0,100 Z"
                      fill="url(#gradient1)"
                      opacity="0.6"
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#E84CB4" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#5B4D9D" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className="text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Let&apos;s talk business.
              </h2>
              <Link
                href="/business"
                className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-darkPurple to-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-accent mb-8">FAQ</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between border border-white/20">
                    <span className="text-white">Question {i}</span>
                    <button className="text-white hover:text-accent transition">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">📄</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-b from-primary to-darkPurple py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-wide">
                Contatti
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-white/70 mb-1">Email:</p>
                  <p className="text-xl">study.easilyhm@gmail.com</p>
                </div>
                <div>
                  <p className="text-white/70 mb-1">Telefono:</p>
                  <p className="text-xl">xxxxxx-xxxx</p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <span className="text-white/70">social</span>
                <div className="flex gap-3">
                  <a href="#" className="text-white hover:text-accent transition text-xl">f</a>
                  <a href="#" className="text-white hover:text-accent transition text-xl">@</a>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="text-accent/30">
                <svg className="w-48 h-48 md:w-64 md:h-64" viewBox="0 0 200 200" fill="none">
                  {/* Graduation cap icon */}
                  <path d="M100 50 L180 80 L100 110 L20 80 Z" fill="currentColor" />
                  <path d="M180 80 L180 120 L100 150 L20 120 L20 80" stroke="currentColor" strokeWidth="3" fill="none" />
                  <circle cx="100" cy="130" r="40" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
