import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    {
      id: '1',
      title: 'Come Imparare Efficacemente Online',
      excerpt:
        'Scopri le migliori strategie per massimizzare il tuo apprendimento online e raggiungere i tuoi obiettivi.',
      author: 'Mario Rossi',
      date: '15 Nov 2025',
      category: 'Apprendimento',
      image: '📚',
    },
    {
      id: '2',
      title: 'Le Competenze Più Richieste nel 2025',
      excerpt:
        'Analisi delle competenze tecniche e soft skills più ricercate dal mercato del lavoro.',
      author: 'Laura Bianchi',
      date: '10 Nov 2025',
      category: 'Carriera',
      image: '💼',
    },
    {
      id: '3',
      title: 'Introduzione al Machine Learning',
      excerpt:
        'Una guida per principianti al mondo del machine learning e dell\'intelligenza artificiale.',
      author: 'Giuseppe Verdi',
      date: '5 Nov 2025',
      category: 'Tecnologia',
      image: '🤖',
    },
    {
      id: '4',
      title: 'Gestire il Tempo mentre Studi Online',
      excerpt:
        'Tecniche pratiche per organizzare il tuo tempo e bilanciare studio, lavoro e vita personale.',
      author: 'Anna Neri',
      date: '1 Nov 2025',
      category: 'Produttività',
      image: '⏰',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600">
            Articoli, guide e risorse per il tuo percorso di apprendimento
          </p>
        </div>

        {/* Featured Post */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12 max-w-4xl mx-auto">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-9xl">
              {posts[0].image}
            </div>
            <div className="md:w-2/3 p-8">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                {posts[0].category}
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-3">
                {posts[0].title}
              </h2>
              <p className="text-gray-600 mb-4">{posts[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{posts[0].author}</span> •{' '}
                  {posts[0].date}
                </div>
                <Link
                  href={`/blog/${posts[0].id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Leggi di più →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl">
                {post.image}
              </div>
              <div className="p-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
