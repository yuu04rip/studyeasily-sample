'use client';

export default function DataAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-darkPurple via-primary to-gradientBlueEnd">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <svg viewBox="0 0 400 250" className="w-full">
                {/* Semi-circle segments */}
                <path
                  d="M 50,200 A 150,150 0 0 1 200,50"
                  fill="none"
                  stroke="#4A5FD9"
                  strokeWidth="80"
                  strokeLinecap="round"
                />
                <path
                  d="M 200,50 A 150,150 0 0 1 350,200"
                  fill="none"
                  stroke="#E84CB4"
                  strokeWidth="80"
                  strokeLinecap="round"
                />
                {/* Inner circle - dark */}
                <circle
                  cx="200"
                  cy="200"
                  r="80"
                  fill="#2D1B69"
                />
              </svg>
            </div>
          </div>

          {/* Right Side - Text */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-accent mb-8 uppercase tracking-wide">
              Data Analytics
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-white/90">
              Il sistema di data analytics raccoglie e analizza in modo automatico e organizzato i dati provenienti dagli studenti (materiali usati, progressi, difficoltà, risorse online consultate). L&apos;algoritmo elabora queste informazioni per generare report, individuare pattern, prevedere i bisogni formativi e suggerire contenuti personalizzati. Tutto avviene in modo anonimo e aggregato, così il sistema migliora continuamente l&apos;apprendimento e supporta scuole e tutor con analisi chiare e utili.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
