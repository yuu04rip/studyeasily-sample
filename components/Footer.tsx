'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gradient-to-b from-darkPurple to-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-purple-pink bg-clip-text text-transparent mb-4">
              StudyEasily
            </h3>
            <p className="text-gray-300">
              Your gateway to quality online education. Learn at your own pace, anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">{t('footer.quick_links')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/corsi" className="text-gray-300 hover:text-accent transition">
                  {t('nav.courses')}
                </Link>
              </li>
              <li>
                <Link href="/piani" className="text-gray-300 hover:text-accent transition">
                  {t('nav.plans')}
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-gray-300 hover:text-accent transition">
                  {t('nav.business')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-accent transition">
                  {t('nav.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">{t('footer.support')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-accent transition">
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="text-gray-300 hover:text-accent transition">
                  {t('nav.contacts')}
                </Link>
              </li>
              <li>
                <Link href="/canali" className="text-gray-300 hover:text-accent transition">
                  {t('nav.channels')}
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-gray-300 hover:text-accent transition">
                  {t('nav.business')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-accent transition">
                  {t('footer.privacy_policy')}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-accent transition">
                  {t('footer.terms_of_service')}
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-300 hover:text-accent transition">
                  {t('footer.cookie_policy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} StudyEasily. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
