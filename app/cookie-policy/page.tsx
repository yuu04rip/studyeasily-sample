'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function CookiePolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-700 to-accent py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-accent/30">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {t('cookies.title')}
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-white/90">
            <p className="text-lg text-white/80">
              {t('cookies.last_updated')}: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('cookies.section1.title')}</h2>
              <p>{t('cookies.section1.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('cookies.section2.title')}</h2>
              <p>{t('cookies.section2.content')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>{t('cookies.section2.type1.name')}:</strong> {t('cookies.section2.type1.desc')}</li>
                <li><strong>{t('cookies.section2.type2.name')}:</strong> {t('cookies.section2.type2.desc')}</li>
                <li><strong>{t('cookies.section2.type3.name')}:</strong> {t('cookies.section2.type3.desc')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('cookies.section3.title')}</h2>
              <p>{t('cookies.section3.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('cookies.section4.title')}</h2>
              <p>{t('cookies.section4.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('cookies.contact.title')}</h2>
              <p>{t('cookies.contact.content')}</p>
              <p className="mt-4">
                Email: <a href="mailto:privacy@studyeasily.com" className="text-accent hover:underline">privacy@studyeasily.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
