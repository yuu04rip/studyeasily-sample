'use client';

import { useEffect, useState } from 'react';
import FAQAccordion from '@/components/FAQAccordion';
import Link from 'next/link';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      const response = await fetch('/api/faqs');
      const data = await response.json();
      setFaqs(data.faqs);
      setLoading(false);
    };

    fetchFAQs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-darkPurple to-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-darkPurple to-primary py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* FAQ Content */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-accent mb-8 uppercase">FAQ</h1>
            <FAQAccordion faqs={faqs} />
            
            {/* Read more link */}
            <div className="mt-8">
              <Link 
                href="/blog/faq-detailed" 
                className="inline-flex items-center text-accent hover:text-accent/80 font-semibold text-lg transition group"
              >
                Read more in our blog
                <svg 
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Document Visual */}
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full">
              <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Document icon/visual */}
                <div className="text-9xl opacity-30">📄</div>
                <div className="absolute inset-0 p-8">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="mb-3 flex space-x-2">
                      <div className="w-full h-2 bg-gray-300/40 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
