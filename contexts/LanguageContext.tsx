'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'it' | 'en' | 'de' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  it: {
    // Header
    'nav.courses': 'Corsi',
    'nav.plans': 'Piani',
    'nav.channels': 'Canali',
    'nav.business': 'Business',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.contacts': 'Contatti',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.dashboard': 'Dashboard',
    'nav.settings': 'Impostazioni',
    'nav.logout': 'Logout',
    
    // Pricing
    'pricing.title': 'I Nostri Piani',
    'pricing.freemium': 'Freemium',
    'pricing.premium': 'Premium',
    'pricing.premium-plus': 'Premium Plus',
    'pricing.free': 'Gratuito',
    'pricing.cta': 'Inizia Ora',
    
    // Blog
    'blog.title': 'BLOGS!',
    'blog.working': 'Still in Working',
    'blog.working.desc': 'Stiamo attualmente sviluppando questa sezione per portarvi contenuti straordinari.',
    'blog.working.check': 'Torna presto per gli aggiornamenti!',
  },
  en: {
    // Header
    'nav.courses': 'Courses',
    'nav.plans': 'Plans',
    'nav.channels': 'Channels',
    'nav.business': 'Business',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.contacts': 'Contacts',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.dashboard': 'Dashboard',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Pricing
    'pricing.title': 'Our Plans',
    'pricing.freemium': 'Freemium',
    'pricing.premium': 'Premium',
    'pricing.premium-plus': 'Premium Plus',
    'pricing.free': 'Free',
    'pricing.cta': 'Start Now',
    
    // Blog
    'blog.title': 'BLOGS!',
    'blog.working': 'Still in Working',
    'blog.working.desc': 'We\'re currently developing this section to bring you amazing content.',
    'blog.working.check': 'Check back soon for updates!',
  },
  de: {
    // Header
    'nav.courses': 'Kurse',
    'nav.plans': 'Pläne',
    'nav.channels': 'Kanäle',
    'nav.business': 'Business',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.contacts': 'Kontakte',
    'nav.login': 'Anmelden',
    'nav.signup': 'Registrieren',
    'nav.dashboard': 'Dashboard',
    'nav.settings': 'Einstellungen',
    'nav.logout': 'Abmelden',
    
    // Pricing
    'pricing.title': 'Unsere Pläne',
    'pricing.freemium': 'Freemium',
    'pricing.premium': 'Premium',
    'pricing.premium-plus': 'Premium Plus',
    'pricing.free': 'Kostenlos',
    'pricing.cta': 'Jetzt Starten',
    
    // Blog
    'blog.title': 'BLOGS!',
    'blog.working': 'In Arbeit',
    'blog.working.desc': 'Wir entwickeln derzeit diesen Bereich, um Ihnen erstaunliche Inhalte zu bieten.',
    'blog.working.check': 'Schauen Sie bald wieder vorbei!',
  },
  es: {
    // Header
    'nav.courses': 'Cursos',
    'nav.plans': 'Planes',
    'nav.channels': 'Canales',
    'nav.business': 'Negocios',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.contacts': 'Contactos',
    'nav.login': 'Iniciar Sesión',
    'nav.signup': 'Registrarse',
    'nav.dashboard': 'Panel',
    'nav.settings': 'Configuración',
    'nav.logout': 'Cerrar Sesión',
    
    // Pricing
    'pricing.title': 'Nuestros Planes',
    'pricing.freemium': 'Freemium',
    'pricing.premium': 'Premium',
    'pricing.premium-plus': 'Premium Plus',
    'pricing.free': 'Gratis',
    'pricing.cta': 'Comenzar Ahora',
    
    // Blog
    'blog.title': 'BLOGS!',
    'blog.working': 'En Desarrollo',
    'blog.working.desc': 'Actualmente estamos desarrollando esta sección para traerle contenido increíble.',
    'blog.working.check': '¡Vuelva pronto para actualizaciones!',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('it');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['it', 'en', 'de', 'es'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
