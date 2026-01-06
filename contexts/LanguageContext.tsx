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
    
    // Hero
    'hero.quote.line1': 'L\'UOMO COLTO È COLUI',
    'hero.quote.line2': 'CHE SA DOVE TROVARE',
    'hero.quote.line3': 'CIÒ CHE NON SA.',
    'hero.quote.author': '— Georg Simmel',
    
    // Channels
    'channels.title': 'Canali di connessione',
    'channels.subtitle': 'Scegli la lezione o qualsiasi community di studio',
    'channels.googlemeet.desc': 'Videoconferenze e lezioni live',
    'channels.zoom.desc': 'Riunioni virtuali e webinar',
    'channels.discord.desc': 'Community e discussioni di gruppo',
    'channels.youtube.desc': 'Video lezioni e tutorial',
    'channels.telegram.desc': 'Messaggistica e aggiornamenti rapidi',
    
    // Pricing
    'pricing.title': 'I Nostri Piani',
    'pricing.freemium': 'Freemium',
    'pricing.premium': 'Premium',
    'pricing.premium-plus': 'Premium Plus',
    'pricing.free': 'Gratuito',
    'pricing.cta': 'Inizia Ora',
    
    // Blog
    'blog.title': 'BLOGS!',
    'blog.working': 'Work in Progress',
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
    
    // Hero
    'hero.quote.line1': 'THE EDUCATED MAN IS ONE',
    'hero.quote.line2': 'WHO KNOWS WHERE TO FIND',
    'hero.quote.line3': 'WHAT HE DOES NOT KNOW.',
    'hero.quote.author': '— Georg Simmel',
    
    // Channels
    'channels.title': 'Connection Channels',
    'channels.subtitle': 'Choose your lesson or any study community',
    'channels.googlemeet.desc': 'Video conferences and live lessons',
    'channels.zoom.desc': 'Virtual meetings and webinars',
    'channels.discord.desc': 'Community and group discussions',
    'channels.youtube.desc': 'Video lessons and tutorials',
    'channels.telegram.desc': 'Messaging and quick updates',
    
    // Pricing
    'pricing.title': 'Our Plans',
    'pricing.freemium': 'Freemium',
    'pricing.premium': 'Premium',
    'pricing.premium-plus': 'Premium Plus',
    'pricing.free': 'Free',
    'pricing.cta': 'Start Now',
    
    // Blog
    'blog.title': 'BLOGS!',
    'blog.working': 'Work in Progress',
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
    
    // Hero
    'hero.quote.line1': 'DER GEBILDETE MENSCH IST JENER',
    'hero.quote.line2': 'DER WEISS WO ER FINDET',
    'hero.quote.line3': 'WAS ER NICHT WEISS.',
    'hero.quote.author': '— Georg Simmel',
    
    // Channels
    'channels.title': 'Verbindungskanäle',
    'channels.subtitle': 'Wählen Sie Ihre Lektion oder eine beliebige Studiengemeinschaft',
    'channels.googlemeet.desc': 'Videokonferenzen und Live-Unterricht',
    'channels.zoom.desc': 'Virtuelle Meetings und Webinare',
    'channels.discord.desc': 'Community und Gruppendiskussionen',
    'channels.youtube.desc': 'Video-Lektionen und Tutorials',
    'channels.telegram.desc': 'Messaging und schnelle Updates',
    
    // Pricing
    'pricing.title': 'Unsere Pläne',
    'pricing.freemium': 'Freemium',
    'pricing.premium': 'Premium',
    'pricing.premium-plus': 'Premium Plus',
    'pricing.free': 'Kostenlos',
    'pricing.cta': 'Jetzt Starten',
    
    // Blog
    'blog.title': 'BLOGS!',
    'blog.working': 'In Entwicklung',
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
    
    // Hero
    'hero.quote.line1': 'EL HOMBRE EDUCADO ES AQUEL',
    'hero.quote.line2': 'QUE SABE DÓNDE ENCONTRAR',
    'hero.quote.line3': 'LO QUE NO SABE.',
    'hero.quote.author': '— Georg Simmel',
    
    // Channels
    'channels.title': 'Canales de Conexión',
    'channels.subtitle': 'Elige tu lección o cualquier comunidad de estudio',
    'channels.googlemeet.desc': 'Videoconferencias y lecciones en vivo',
    'channels.zoom.desc': 'Reuniones virtuales y seminarios web',
    'channels.discord.desc': 'Comunidad y discusiones de grupo',
    'channels.youtube.desc': 'Video lecciones y tutoriales',
    'channels.telegram.desc': 'Mensajería y actualizaciones rápidas',
    
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
    // Load language from localStorage (only on client side)
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && ['it', 'en', 'de', 'es'].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
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
