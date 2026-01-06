'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-700 to-accent py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-accent/30">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {t('privacy.title')}
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-white/90">
            <p className="text-lg text-white/80">
              {t('privacy.last_updated')}: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('privacy.section1.title')}</h2>
              <p>{t('privacy.section1.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('privacy.section2.title')}</h2>
              <p>{t('privacy.section2.content')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>{t('privacy.section2.item1')}</li>
                <li>{t('privacy.section2.item2')}</li>
                <li>{t('privacy.section2.item3')}</li>
                <li>{t('privacy.section2.item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('privacy.section3.title')}</h2>
              <p>{t('privacy.section3.content')}</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>{t('privacy.section3.item1')}</li>
                <li>{t('privacy.section3.item2')}</li>
                <li>{t('privacy.section3.item3')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('privacy.section4.title')}</h2>
              <p>{t('privacy.section4.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('privacy.section5.title')}</h2>
              <p>{t('privacy.section5.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">{t('privacy.contact.title')}</h2>
              <p>{t('privacy.contact.content')}</p>
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
