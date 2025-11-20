export default function CanaliPage() {
  const channels = [
    {
      name: 'YouTube',
      description: 'Tutorial video e lezioni gratuite',
      icon: '🎥',
      link: '#',
    },
    {
      name: 'Discord',
      description: 'Community di studenti e supporto',
      icon: '💬',
      link: '#',
    },
    {
      name: 'LinkedIn',
      description: 'Aggiornamenti professionali e networking',
      icon: '💼',
      link: '#',
    },
    {
      name: 'Instagram',
      description: 'Tips quotidiani e motivazione',
      icon: '📸',
      link: '#',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            I Nostri Canali
          </h1>
          <p className="text-xl text-gray-600">
            Seguici sui social media per rimanere aggiornato e connetterti con la nostra community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {channels.map((channel) => (
            <a
              key={channel.name}
              href={channel.link}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-6xl mb-4">{channel.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {channel.name}
              </h3>
              <p className="text-gray-600">{channel.description}</p>
            </a>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Iscriviti alla nostra newsletter per ricevere aggiornamenti sui nuovi corsi, 
            offerte speciali e contenuti esclusivi.
          </p>
          <form className="flex gap-4">
            <input
              type="email"
              placeholder="Inserisci la tua email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Iscriviti
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
