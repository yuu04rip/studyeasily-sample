'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function WorkInProgressPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-darkPurple via-primary to-purple-900">
      <div className="container mx-auto px-4 py-16">
        {/* Still in working message */}
        <div className="text-center py-20">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 max-w-2xl mx-auto border-2 border-accent/30">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{t('wip.title')}</h2>
            <p className="text-xl text-white/80 mb-6">
              {t('wip.description')}
            </p>
            <p className="text-lg text-white/70 mb-8">
              {t('wip.payment_notice')}
            </p>
            <Link 
              href="/"
              className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
            >
              {t('wip.back_home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
