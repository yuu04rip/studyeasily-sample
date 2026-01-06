'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  image: string;
  category: string;
}

export default function BlogPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-darkPurple via-primary to-purple-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-accent uppercase tracking-wide">
            {t('blog.title')}
          </h1>
          
          {/* Search Bar */}
          <div className="hidden md:block w-96">
            <div className="bg-white rounded-full px-6 py-3 flex items-center shadow-lg">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none text-gray-800"
              />
              <button className="text-gray-500 hover:text-primary transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Still in working message */}
        <div className="text-center py-20">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 max-w-2xl mx-auto border-2 border-accent/30">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{t('blog.working')}</h2>
            <p className="text-xl text-white/80 mb-6">
              {t('blog.working.desc')}
            </p>
            <p className="text-lg text-white/70">
              {t('blog.working.check')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
