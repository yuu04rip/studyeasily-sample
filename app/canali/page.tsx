export default function CanaliPage() {
  const channels = [
    { icon: '📹', title: 'Google Meet', description: 'Videoconferenze e lezioni live' },
    { icon: '💬', title: 'Zoom', description: 'Riunioni virtuali e webinar' },
    { icon: '🎮', title: 'Discord', description: 'Community e discussioni di gruppo' },
    { icon: '📺', title: 'YouTube', description: 'Video lezioni e tutorial' },
    { icon: '✈️', title: 'Telegram', description: 'Messaggistica e aggiornamenti rapidi' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent via-purple-600 to-accent py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white uppercase tracking-wide">
            Canali di connessione
          </h1>
          <p className="text-xl text-white/90">
            Scegli la lezione o qualsiasi community di studio
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-5xl mx-auto">
          {channels.map((platform) => (
            <div key={platform.title} className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center shadow-2xl transform transition group-hover:scale-110 mb-4">
                <span className="text-4xl md:text-5xl">{platform.icon}</span>
              </div>
              <p className="text-white text-base md:text-lg font-semibold text-center">{platform.title}</p>
              <p className="text-white/70 text-sm text-center max-w-xs mt-1">{platform.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
