'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  image: string;
  category: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`/api/blogs/${params.slug}`);
      const data = await response.json();
      setBlog(data.blog);
      setLoading(false);
    };

    fetchBlog();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog post not found</h1>
        <Link href="/blog" className="text-primary hover:underline">
          Back to blog
        </Link>
      </div>
    );
  }

  // Special layout for FAQ detailed blog (matching site4.jpg)
  const isFAQDetailed = params.slug === 'faq-detailed';

  if (isFAQDetailed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-pink-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-accent text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link href="/faq" className="text-white/80 hover:text-white inline-flex items-center mb-6 transition">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to FAQ
              </Link>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Domande Frequenti Dettagliate
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Tutto quello che devi sapere sulla piattaforma StudyEasily
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Article Cards */}
            <div className="grid gap-8 mb-12">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-accent">
                <h2 className="text-3xl font-bold mb-4 text-primary">Come funziona la piattaforma?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  StudyEasily è progettata per rendere l'apprendimento online semplice ed efficace. 
                  La nostra piattaforma offre video lezioni di alta qualità, quiz interattivi e progetti pratici 
                  che ti permettono di applicare immediatamente ciò che impari.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Ogni corso è strutturato in moduli progressivi, con obiettivi chiari e milestone verificabili. 
                  Puoi imparare al tuo ritmo, con accesso illimitato ai contenuti 24/7.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-purple-500">
                <h2 className="text-3xl font-bold mb-4 text-primary">Quali sono i requisiti tecnici?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Per utilizzare StudyEasily hai bisogno solamente di:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Una connessione internet stabile (consigliata 5 Mbps o superiore)</li>
                  <li>Un browser moderno (Chrome, Firefox, Safari, Edge)</li>
                  <li>Altoparlanti o cuffie per le lezioni video</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  La piattaforma è ottimizzata per funzionare su desktop, tablet e smartphone.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-pink-500">
                <h2 className="text-3xl font-bold mb-4 text-primary">Posso ottenere un certificato?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sì! Al completamento di ogni corso riceverai un certificato digitale verificabile che 
                  attesta le tue competenze acquisite. I nostri certificati sono riconosciuti da molte aziende 
                  nel settore tech.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Puoi condividere il tuo certificato su LinkedIn, includerlo nel tuo CV o portfolio, 
                  e utilizzarlo per dimostrare le tue capacità ai potenziali datori di lavoro.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500">
                <h2 className="text-3xl font-bold mb-4 text-primary">Come funziona il supporto?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Offriamo diversi canali di supporto per garantirti la migliore esperienza:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Forum della comunità dove puoi interagire con altri studenti e istruttori</li>
                  <li>Supporto via email con risposta entro 24 ore</li>
                  <li>Chat live disponibile durante l'orario lavorativo</li>
                  <li>Sessioni Q&A dal vivo con gli istruttori ogni settimana</li>
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Hai altre domande?</h3>
              <p className="text-xl mb-8 text-white/90">
                Il nostro team è qui per aiutarti. Contattaci in qualsiasi momento!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contatti">
                  <button className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-lg font-semibold transition shadow-xl text-lg">
                    Contattaci
                  </button>
                </Link>
                <Link href="/corsi">
                  <button className="bg-accent/20 hover:bg-accent/30 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold transition text-lg">
                    Esplora i Corsi
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default blog layout
  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <Link href="/blog" className="text-primary hover:underline inline-flex items-center mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <div className="mb-6">
          <span className="text-primary font-semibold">{blog.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">{blog.title}</h1>
          <div className="flex items-center text-gray-600">
            <span>By {blog.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </div>

        <div className="h-96 bg-gradient-to-br from-gradientStart to-gradientEnd rounded-lg mb-8 flex items-center justify-center">
          <span className="text-white text-9xl font-bold opacity-20">
            {blog.category.charAt(0)}
          </span>
        </div>

        <div className="prose max-w-none">
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">{blog.excerpt}</p>
          <div className="text-gray-700 leading-relaxed space-y-4">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">About the Author</h3>
            <p className="text-gray-600">
              {blog.author} is a contributor to the StudyEasily blog, sharing insights and expertise
              on education and learning.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
