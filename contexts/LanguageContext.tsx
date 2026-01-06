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
    
    // Work in Progress
    'wip.title': 'Work in Progress',
    'wip.description': 'Stiamo configurando il sistema di pagamento per offrirti la migliore esperienza.',
    'wip.payment_notice': 'Torna presto per iniziare il tuo percorso di apprendimento!',
    'wip.back_home': 'Torna alla Home',
    
    // Privacy Policy
    'privacy.title': 'Informativa sulla Privacy',
    'privacy.last_updated': 'Ultimo aggiornamento',
    'privacy.section1.title': 'Introduzione',
    'privacy.section1.content': 'StudyEasily si impegna a proteggere la tua privacy. Questa informativa descrive come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.',
    'privacy.section2.title': 'Dati che Raccogliamo',
    'privacy.section2.content': 'Raccogliamo le seguenti informazioni quando utilizzi i nostri servizi:',
    'privacy.section2.item1': 'Informazioni di registrazione (nome, email, password)',
    'privacy.section2.item2': 'Dati di utilizzo della piattaforma',
    'privacy.section2.item3': 'Informazioni sui corsi e progressi',
    'privacy.section2.item4': 'Dati di comunicazione',
    'privacy.section3.title': 'Come Utilizziamo i Tuoi Dati',
    'privacy.section3.content': 'Utilizziamo i tuoi dati per:',
    'privacy.section3.item1': 'Fornire e migliorare i nostri servizi',
    'privacy.section3.item2': 'Personalizzare la tua esperienza di apprendimento',
    'privacy.section3.item3': 'Comunicare con te riguardo ai nostri servizi',
    'privacy.section4.title': 'Protezione dei Dati',
    'privacy.section4.content': 'Implementiamo misure di sicurezza tecniche e organizzative per proteggere i tuoi dati personali da accessi non autorizzati, perdita o alterazione.',
    'privacy.section5.title': 'I Tuoi Diritti',
    'privacy.section5.content': 'Hai il diritto di accedere, rettificare o cancellare i tuoi dati personali in qualsiasi momento. Puoi anche richiedere la portabilità dei tuoi dati.',
    'privacy.contact.title': 'Contattaci',
    'privacy.contact.content': 'Per qualsiasi domanda riguardante la privacy, contattaci:',
    
    // Terms of Service
    'terms.title': 'Termini di Servizio',
    'terms.last_updated': 'Ultimo aggiornamento',
    'terms.section1.title': 'Accettazione dei Termini',
    'terms.section1.content': 'Utilizzando StudyEasily, accetti di essere vincolato da questi Termini di Servizio. Se non accetti questi termini, ti preghiamo di non utilizzare i nostri servizi.',
    'terms.section2.title': 'Utilizzo del Servizio',
    'terms.section2.content': 'Ti impegni a utilizzare i nostri servizi in modo responsabile e a:',
    'terms.section2.item1': 'Non condividere le tue credenziali di accesso',
    'terms.section2.item2': 'Non copiare o distribuire i contenuti dei corsi',
    'terms.section2.item3': 'Rispettare gli altri utenti della piattaforma',
    'terms.section3.title': 'Account Utente',
    'terms.section3.content': 'Sei responsabile del mantenimento della sicurezza del tuo account e di tutte le attività che si verificano sotto il tuo account.',
    'terms.section4.title': 'Proprietà Intellettuale',
    'terms.section4.content': 'Tutti i contenuti presenti su StudyEasily, inclusi corsi, video e materiali, sono protetti da diritti d\'autore e non possono essere riprodotti senza autorizzazione.',
    'terms.section5.title': 'Limitazione di Responsabilità',
    'terms.section5.content': 'StudyEasily non è responsabile per eventuali danni indiretti, incidentali o consequenziali derivanti dall\'utilizzo dei nostri servizi.',
    'terms.section6.title': 'Modifiche ai Termini',
    'terms.section6.content': 'Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno comunicate attraverso la piattaforma.',
    'terms.contact.title': 'Contattaci',
    'terms.contact.content': 'Per domande sui Termini di Servizio:',
    
    // Cookie Policy
    'cookies.title': 'Cookie Policy',
    'cookies.last_updated': 'Ultimo aggiornamento',
    'cookies.section1.title': 'Cosa sono i Cookie',
    'cookies.section1.content': 'I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti il nostro sito web. Ci aiutano a migliorare la tua esperienza di navigazione.',
    'cookies.section2.title': 'Tipi di Cookie Utilizzati',
    'cookies.section2.content': 'Utilizziamo i seguenti tipi di cookie:',
    'cookies.section2.type1.name': 'Cookie Essenziali',
    'cookies.section2.type1.desc': 'Necessari per il funzionamento del sito',
    'cookies.section2.type2.name': 'Cookie di Preferenza',
    'cookies.section2.type2.desc': 'Memorizzano le tue preferenze (lingua, tema)',
    'cookies.section2.type3.name': 'Cookie Analitici',
    'cookies.section2.type3.desc': 'Ci aiutano a capire come utilizzi il sito',
    'cookies.section3.title': 'Gestione dei Cookie',
    'cookies.section3.content': 'Puoi gestire le tue preferenze sui cookie attraverso le impostazioni del tuo browser. Tieni presente che disabilitare alcuni cookie potrebbe influire sulla funzionalità del sito.',
    'cookies.section4.title': 'Aggiornamenti',
    'cookies.section4.content': 'Potremmo aggiornare questa Cookie Policy di tanto in tanto. Ti consigliamo di controllare periodicamente questa pagina per eventuali modifiche.',
    'cookies.contact.title': 'Contattaci',
    'cookies.contact.content': 'Per domande sulla Cookie Policy:',
    
    // Dashboard
    'dashboard.title': 'DASHBOARD',
    'dashboard.welcome': 'Benvenuto',
    'dashboard.home': 'HOME',
    'dashboard.schedule': 'ORARIO',
    'dashboard.courses': 'CORSI',
    'dashboard.my_courses': 'I MIEI CORSI',
    'dashboard.create_course': 'CREA CORSO',
    'dashboard.grades': 'VOTI',
    'dashboard.settings': 'IMPOSTAZIONI',
    'dashboard.chats': 'CHAT',
    'dashboard.active_courses': 'Corsi Attivi',
    'dashboard.completed_exercises': 'Esercizi Completati',
    'dashboard.progress': 'Progresso',
    
    // Settings
    'settings.title': 'IMPOSTAZIONI PROFILO',
    'settings.subtitle': 'Configura il tuo profilo e le tue preferenze',
    'settings.profile_image': 'Immagine Profilo',
    'settings.first_name': 'Nome',
    'settings.last_name': 'Cognome',
    'settings.email': 'Email',
    'settings.birth_date': 'Data di Nascita',
    'settings.description': 'Descrizione',
    'settings.online_status': 'Stato Online',
    'settings.online': 'Online',
    'settings.offline': 'Offline',
    'settings.do_not_disturb': 'Non Disturbare',
    'settings.theme': 'Tema Dashboard',
    'settings.theme_subtitle': 'Seleziona il colore del tema che preferisci',
    'settings.language': 'Lingua',
    'settings.language_subtitle': 'Seleziona la lingua dell\'interfaccia',
    'settings.change_password': 'Cambia Password',
    'settings.current_password': 'Password Attuale',
    'settings.new_password': 'Nuova Password',
    'settings.confirm_password': 'Conferma Nuova Password',
    'settings.save': 'Salva Modifiche',
    'settings.saving': 'Salvataggio...',
    'settings.account_actions': 'Azioni Account',
    'settings.logout': 'Logout',
    'settings.delete_account': 'Elimina Account',
    
    // Course Creation
    'course.create_title': 'Crea Nuovo Corso',
    'course.create_subtitle': 'Compila i dettagli per creare il tuo corso',
    'course.title': 'Titolo del Corso',
    'course.description': 'Descrizione',
    'course.category': 'Categoria',
    'course.level': 'Livello',
    'course.duration': 'Durata',
    'course.visibility': 'Visibilità',
    'course.public': 'Pubblico',
    'course.private': 'Privato',
    'course.visibility_public_desc': 'Tutti possono vedere e iscriversi a questo corso',
    'course.visibility_private_desc': 'Solo gli utenti invitati possono accedere',
    'course.collaborators': 'Collaboratori',
    'course.add_collaborator': 'Aggiungi Collaboratore',
    'course.collaborator_email': 'Email del collaboratore',
    'course.create_button': 'Crea Corso',
    'course.creating': 'Creazione in corso...',
    'course.cancel': 'Annulla',
    
    // Footer
    'footer.quick_links': 'Link Rapidi',
    'footer.support': 'Supporto',
    'footer.legal': 'Legale',
    'footer.privacy_policy': 'Informativa sulla Privacy',
    'footer.terms_of_service': 'Termini di Servizio',
    'footer.cookie_policy': 'Cookie Policy',
    'footer.rights': 'Tutti i diritti riservati.',
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
    
    // Work in Progress
    'wip.title': 'Work in Progress',
    'wip.description': 'We are setting up the payment system to offer you the best experience.',
    'wip.payment_notice': 'Come back soon to start your learning journey!',
    'wip.back_home': 'Back to Home',
    
    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.last_updated': 'Last updated',
    'privacy.section1.title': 'Introduction',
    'privacy.section1.content': 'StudyEasily is committed to protecting your privacy. This policy describes how we collect, use, and protect your personal data.',
    'privacy.section2.title': 'Data We Collect',
    'privacy.section2.content': 'We collect the following information when you use our services:',
    'privacy.section2.item1': 'Registration information (name, email, password)',
    'privacy.section2.item2': 'Platform usage data',
    'privacy.section2.item3': 'Course information and progress',
    'privacy.section2.item4': 'Communication data',
    'privacy.section3.title': 'How We Use Your Data',
    'privacy.section3.content': 'We use your data to:',
    'privacy.section3.item1': 'Provide and improve our services',
    'privacy.section3.item2': 'Personalize your learning experience',
    'privacy.section3.item3': 'Communicate with you about our services',
    'privacy.section4.title': 'Data Protection',
    'privacy.section4.content': 'We implement technical and organizational security measures to protect your personal data from unauthorized access, loss, or alteration.',
    'privacy.section5.title': 'Your Rights',
    'privacy.section5.content': 'You have the right to access, rectify, or delete your personal data at any time. You can also request the portability of your data.',
    'privacy.contact.title': 'Contact Us',
    'privacy.contact.content': 'For any privacy-related questions, contact us:',
    
    // Terms of Service
    'terms.title': 'Terms of Service',
    'terms.last_updated': 'Last updated',
    'terms.section1.title': 'Acceptance of Terms',
    'terms.section1.content': 'By using StudyEasily, you agree to be bound by these Terms of Service. If you do not accept these terms, please do not use our services.',
    'terms.section2.title': 'Use of Service',
    'terms.section2.content': 'You agree to use our services responsibly and to:',
    'terms.section2.item1': 'Not share your login credentials',
    'terms.section2.item2': 'Not copy or distribute course content',
    'terms.section2.item3': 'Respect other users of the platform',
    'terms.section3.title': 'User Account',
    'terms.section3.content': 'You are responsible for maintaining the security of your account and all activities that occur under your account.',
    'terms.section4.title': 'Intellectual Property',
    'terms.section4.content': 'All content on StudyEasily, including courses, videos, and materials, is protected by copyright and may not be reproduced without authorization.',
    'terms.section5.title': 'Limitation of Liability',
    'terms.section5.content': 'StudyEasily is not liable for any indirect, incidental, or consequential damages arising from the use of our services.',
    'terms.section6.title': 'Changes to Terms',
    'terms.section6.content': 'We reserve the right to modify these terms at any time. Changes will be communicated through the platform.',
    'terms.contact.title': 'Contact Us',
    'terms.contact.content': 'For questions about the Terms of Service:',
    
    // Cookie Policy
    'cookies.title': 'Cookie Policy',
    'cookies.last_updated': 'Last updated',
    'cookies.section1.title': 'What are Cookies',
    'cookies.section1.content': 'Cookies are small text files that are stored on your device when you visit our website. They help us improve your browsing experience.',
    'cookies.section2.title': 'Types of Cookies Used',
    'cookies.section2.content': 'We use the following types of cookies:',
    'cookies.section2.type1.name': 'Essential Cookies',
    'cookies.section2.type1.desc': 'Necessary for the site to function',
    'cookies.section2.type2.name': 'Preference Cookies',
    'cookies.section2.type2.desc': 'Store your preferences (language, theme)',
    'cookies.section2.type3.name': 'Analytics Cookies',
    'cookies.section2.type3.desc': 'Help us understand how you use the site',
    'cookies.section3.title': 'Managing Cookies',
    'cookies.section3.content': 'You can manage your cookie preferences through your browser settings. Note that disabling some cookies may affect site functionality.',
    'cookies.section4.title': 'Updates',
    'cookies.section4.content': 'We may update this Cookie Policy from time to time. We recommend checking this page periodically for any changes.',
    'cookies.contact.title': 'Contact Us',
    'cookies.contact.content': 'For questions about the Cookie Policy:',
    
    // Dashboard
    'dashboard.title': 'DASHBOARD',
    'dashboard.welcome': 'Welcome',
    'dashboard.home': 'HOME',
    'dashboard.schedule': 'SCHEDULE',
    'dashboard.courses': 'COURSES',
    'dashboard.my_courses': 'MY COURSES',
    'dashboard.create_course': 'CREATE COURSE',
    'dashboard.grades': 'GRADES',
    'dashboard.settings': 'SETTINGS',
    'dashboard.chats': 'CHATS',
    'dashboard.active_courses': 'Active Courses',
    'dashboard.completed_exercises': 'Completed Exercises',
    'dashboard.progress': 'Progress',
    
    // Settings
    'settings.title': 'PROFILE SETTINGS',
    'settings.subtitle': 'Configure your profile and preferences',
    'settings.profile_image': 'Profile Image',
    'settings.first_name': 'First Name',
    'settings.last_name': 'Last Name',
    'settings.email': 'Email',
    'settings.birth_date': 'Birth Date',
    'settings.description': 'Description',
    'settings.online_status': 'Online Status',
    'settings.online': 'Online',
    'settings.offline': 'Offline',
    'settings.do_not_disturb': 'Do Not Disturb',
    'settings.theme': 'Dashboard Theme',
    'settings.theme_subtitle': 'Select your preferred theme color',
    'settings.language': 'Language',
    'settings.language_subtitle': 'Select interface language',
    'settings.change_password': 'Change Password',
    'settings.current_password': 'Current Password',
    'settings.new_password': 'New Password',
    'settings.confirm_password': 'Confirm New Password',
    'settings.save': 'Save Changes',
    'settings.saving': 'Saving...',
    'settings.account_actions': 'Account Actions',
    'settings.logout': 'Logout',
    'settings.delete_account': 'Delete Account',
    
    // Course Creation
    'course.create_title': 'Create New Course',
    'course.create_subtitle': 'Fill in the details to create your course',
    'course.title': 'Course Title',
    'course.description': 'Description',
    'course.category': 'Category',
    'course.level': 'Level',
    'course.duration': 'Duration',
    'course.visibility': 'Visibility',
    'course.public': 'Public',
    'course.private': 'Private',
    'course.visibility_public_desc': 'Everyone can see and enroll in this course',
    'course.visibility_private_desc': 'Only invited users can access',
    'course.collaborators': 'Collaborators',
    'course.add_collaborator': 'Add Collaborator',
    'course.collaborator_email': 'Collaborator email',
    'course.create_button': 'Create Course',
    'course.creating': 'Creating...',
    'course.cancel': 'Cancel',
    
    // Footer
    'footer.quick_links': 'Quick Links',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
    'footer.privacy_policy': 'Privacy Policy',
    'footer.terms_of_service': 'Terms of Service',
    'footer.cookie_policy': 'Cookie Policy',
    'footer.rights': 'All rights reserved.',
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
    
    // Work in Progress
    'wip.title': 'In Entwicklung',
    'wip.description': 'Wir richten das Zahlungssystem ein, um Ihnen das beste Erlebnis zu bieten.',
    'wip.payment_notice': 'Kommen Sie bald zurück, um Ihre Lernreise zu beginnen!',
    'wip.back_home': 'Zurück zur Startseite',
    
    // Privacy Policy
    'privacy.title': 'Datenschutzerklärung',
    'privacy.last_updated': 'Letzte Aktualisierung',
    'privacy.section1.title': 'Einführung',
    'privacy.section1.content': 'StudyEasily verpflichtet sich, Ihre Privatsphäre zu schützen. Diese Richtlinie beschreibt, wie wir Ihre personenbezogenen Daten sammeln, verwenden und schützen.',
    'privacy.section2.title': 'Daten, die wir sammeln',
    'privacy.section2.content': 'Wir sammeln folgende Informationen, wenn Sie unsere Dienste nutzen:',
    'privacy.section2.item1': 'Registrierungsinformationen (Name, E-Mail, Passwort)',
    'privacy.section2.item2': 'Plattformnutzungsdaten',
    'privacy.section2.item3': 'Kursinformationen und Fortschritt',
    'privacy.section2.item4': 'Kommunikationsdaten',
    'privacy.section3.title': 'Wie wir Ihre Daten verwenden',
    'privacy.section3.content': 'Wir verwenden Ihre Daten, um:',
    'privacy.section3.item1': 'Unsere Dienste bereitzustellen und zu verbessern',
    'privacy.section3.item2': 'Ihre Lernerfahrung zu personalisieren',
    'privacy.section3.item3': 'Mit Ihnen über unsere Dienste zu kommunizieren',
    'privacy.section4.title': 'Datenschutz',
    'privacy.section4.content': 'Wir implementieren technische und organisatorische Sicherheitsmaßnahmen, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Verlust oder Änderung zu schützen.',
    'privacy.section5.title': 'Ihre Rechte',
    'privacy.section5.content': 'Sie haben das Recht, jederzeit auf Ihre personenbezogenen Daten zuzugreifen, sie zu berichtigen oder zu löschen. Sie können auch die Übertragbarkeit Ihrer Daten anfordern.',
    'privacy.contact.title': 'Kontaktieren Sie uns',
    'privacy.contact.content': 'Bei Fragen zum Datenschutz kontaktieren Sie uns:',
    
    // Terms of Service
    'terms.title': 'Nutzungsbedingungen',
    'terms.last_updated': 'Letzte Aktualisierung',
    'terms.section1.title': 'Akzeptanz der Bedingungen',
    'terms.section1.content': 'Durch die Nutzung von StudyEasily erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie diese Bedingungen nicht akzeptieren, nutzen Sie bitte unsere Dienste nicht.',
    'terms.section2.title': 'Nutzung des Dienstes',
    'terms.section2.content': 'Sie verpflichten sich, unsere Dienste verantwortungsvoll zu nutzen und:',
    'terms.section2.item1': 'Ihre Zugangsdaten nicht weiterzugeben',
    'terms.section2.item2': 'Kursinhalte nicht zu kopieren oder zu verbreiten',
    'terms.section2.item3': 'Andere Nutzer der Plattform zu respektieren',
    'terms.section3.title': 'Benutzerkonto',
    'terms.section3.content': 'Sie sind für die Sicherheit Ihres Kontos und alle Aktivitäten, die unter Ihrem Konto stattfinden, verantwortlich.',
    'terms.section4.title': 'Geistiges Eigentum',
    'terms.section4.content': 'Alle Inhalte auf StudyEasily, einschließlich Kurse, Videos und Materialien, sind urheberrechtlich geschützt und dürfen ohne Genehmigung nicht reproduziert werden.',
    'terms.section5.title': 'Haftungsbeschränkung',
    'terms.section5.content': 'StudyEasily haftet nicht für indirekte, zufällige oder Folgeschäden, die aus der Nutzung unserer Dienste entstehen.',
    'terms.section6.title': 'Änderungen der Bedingungen',
    'terms.section6.content': 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Änderungen werden über die Plattform mitgeteilt.',
    'terms.contact.title': 'Kontaktieren Sie uns',
    'terms.contact.content': 'Bei Fragen zu den Nutzungsbedingungen:',
    
    // Cookie Policy
    'cookies.title': 'Cookie-Richtlinie',
    'cookies.last_updated': 'Letzte Aktualisierung',
    'cookies.section1.title': 'Was sind Cookies',
    'cookies.section1.content': 'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie unsere Website besuchen. Sie helfen uns, Ihr Surferlebnis zu verbessern.',
    'cookies.section2.title': 'Verwendete Cookie-Typen',
    'cookies.section2.content': 'Wir verwenden folgende Cookie-Typen:',
    'cookies.section2.type1.name': 'Wesentliche Cookies',
    'cookies.section2.type1.desc': 'Notwendig für die Funktion der Website',
    'cookies.section2.type2.name': 'Präferenz-Cookies',
    'cookies.section2.type2.desc': 'Speichern Ihre Einstellungen (Sprache, Theme)',
    'cookies.section2.type3.name': 'Analyse-Cookies',
    'cookies.section2.type3.desc': 'Helfen uns zu verstehen, wie Sie die Website nutzen',
    'cookies.section3.title': 'Cookie-Verwaltung',
    'cookies.section3.content': 'Sie können Ihre Cookie-Einstellungen über Ihre Browsereinstellungen verwalten. Beachten Sie, dass das Deaktivieren einiger Cookies die Funktionalität der Website beeinträchtigen kann.',
    'cookies.section4.title': 'Aktualisierungen',
    'cookies.section4.content': 'Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren. Wir empfehlen, diese Seite regelmäßig auf Änderungen zu überprüfen.',
    'cookies.contact.title': 'Kontaktieren Sie uns',
    'cookies.contact.content': 'Bei Fragen zur Cookie-Richtlinie:',
    
    // Dashboard
    'dashboard.title': 'DASHBOARD',
    'dashboard.welcome': 'Willkommen',
    'dashboard.home': 'STARTSEITE',
    'dashboard.schedule': 'ZEITPLAN',
    'dashboard.courses': 'KURSE',
    'dashboard.my_courses': 'MEINE KURSE',
    'dashboard.create_course': 'KURS ERSTELLEN',
    'dashboard.grades': 'NOTEN',
    'dashboard.settings': 'EINSTELLUNGEN',
    'dashboard.chats': 'CHATS',
    'dashboard.active_courses': 'Aktive Kurse',
    'dashboard.completed_exercises': 'Abgeschlossene Übungen',
    'dashboard.progress': 'Fortschritt',
    
    // Settings
    'settings.title': 'PROFILEINSTELLUNGEN',
    'settings.subtitle': 'Konfigurieren Sie Ihr Profil und Ihre Einstellungen',
    'settings.profile_image': 'Profilbild',
    'settings.first_name': 'Vorname',
    'settings.last_name': 'Nachname',
    'settings.email': 'E-Mail',
    'settings.birth_date': 'Geburtsdatum',
    'settings.description': 'Beschreibung',
    'settings.online_status': 'Online-Status',
    'settings.online': 'Online',
    'settings.offline': 'Offline',
    'settings.do_not_disturb': 'Nicht stören',
    'settings.theme': 'Dashboard-Theme',
    'settings.theme_subtitle': 'Wählen Sie Ihre bevorzugte Themenfarbe',
    'settings.language': 'Sprache',
    'settings.language_subtitle': 'Schnittstellensprache auswählen',
    'settings.change_password': 'Passwort ändern',
    'settings.current_password': 'Aktuelles Passwort',
    'settings.new_password': 'Neues Passwort',
    'settings.confirm_password': 'Neues Passwort bestätigen',
    'settings.save': 'Änderungen speichern',
    'settings.saving': 'Speichern...',
    'settings.account_actions': 'Kontoaktionen',
    'settings.logout': 'Abmelden',
    'settings.delete_account': 'Konto löschen',
    
    // Course Creation
    'course.create_title': 'Neuen Kurs erstellen',
    'course.create_subtitle': 'Füllen Sie die Details aus, um Ihren Kurs zu erstellen',
    'course.title': 'Kurstitel',
    'course.description': 'Beschreibung',
    'course.category': 'Kategorie',
    'course.level': 'Stufe',
    'course.duration': 'Dauer',
    'course.visibility': 'Sichtbarkeit',
    'course.public': 'Öffentlich',
    'course.private': 'Privat',
    'course.visibility_public_desc': 'Jeder kann diesen Kurs sehen und sich einschreiben',
    'course.visibility_private_desc': 'Nur eingeladene Benutzer können darauf zugreifen',
    'course.collaborators': 'Mitarbeiter',
    'course.add_collaborator': 'Mitarbeiter hinzufügen',
    'course.collaborator_email': 'Mitarbeiter-E-Mail',
    'course.create_button': 'Kurs erstellen',
    'course.creating': 'Wird erstellt...',
    'course.cancel': 'Abbrechen',
    
    // Footer
    'footer.quick_links': 'Schnelllinks',
    'footer.support': 'Support',
    'footer.legal': 'Rechtliches',
    'footer.privacy_policy': 'Datenschutzerklärung',
    'footer.terms_of_service': 'Nutzungsbedingungen',
    'footer.cookie_policy': 'Cookie-Richtlinie',
    'footer.rights': 'Alle Rechte vorbehalten.',
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
    
    // Work in Progress
    'wip.title': 'En Desarrollo',
    'wip.description': 'Estamos configurando el sistema de pago para ofrecerte la mejor experiencia.',
    'wip.payment_notice': '¡Vuelve pronto para comenzar tu viaje de aprendizaje!',
    'wip.back_home': 'Volver al Inicio',
    
    // Privacy Policy
    'privacy.title': 'Política de Privacidad',
    'privacy.last_updated': 'Última actualización',
    'privacy.section1.title': 'Introducción',
    'privacy.section1.content': 'StudyEasily se compromete a proteger tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tus datos personales.',
    'privacy.section2.title': 'Datos que Recopilamos',
    'privacy.section2.content': 'Recopilamos la siguiente información cuando usas nuestros servicios:',
    'privacy.section2.item1': 'Información de registro (nombre, correo electrónico, contraseña)',
    'privacy.section2.item2': 'Datos de uso de la plataforma',
    'privacy.section2.item3': 'Información del curso y progreso',
    'privacy.section2.item4': 'Datos de comunicación',
    'privacy.section3.title': 'Cómo Usamos tus Datos',
    'privacy.section3.content': 'Usamos tus datos para:',
    'privacy.section3.item1': 'Proporcionar y mejorar nuestros servicios',
    'privacy.section3.item2': 'Personalizar tu experiencia de aprendizaje',
    'privacy.section3.item3': 'Comunicarnos contigo sobre nuestros servicios',
    'privacy.section4.title': 'Protección de Datos',
    'privacy.section4.content': 'Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales del acceso no autorizado, pérdida o alteración.',
    'privacy.section5.title': 'Tus Derechos',
    'privacy.section5.content': 'Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. También puedes solicitar la portabilidad de tus datos.',
    'privacy.contact.title': 'Contáctanos',
    'privacy.contact.content': 'Para cualquier pregunta relacionada con la privacidad, contáctanos:',
    
    // Terms of Service
    'terms.title': 'Términos de Servicio',
    'terms.last_updated': 'Última actualización',
    'terms.section1.title': 'Aceptación de Términos',
    'terms.section1.content': 'Al usar StudyEasily, aceptas estar sujeto a estos Términos de Servicio. Si no aceptas estos términos, por favor no uses nuestros servicios.',
    'terms.section2.title': 'Uso del Servicio',
    'terms.section2.content': 'Te comprometes a usar nuestros servicios de manera responsable y a:',
    'terms.section2.item1': 'No compartir tus credenciales de acceso',
    'terms.section2.item2': 'No copiar ni distribuir el contenido de los cursos',
    'terms.section2.item3': 'Respetar a otros usuarios de la plataforma',
    'terms.section3.title': 'Cuenta de Usuario',
    'terms.section3.content': 'Eres responsable de mantener la seguridad de tu cuenta y de todas las actividades que ocurran bajo tu cuenta.',
    'terms.section4.title': 'Propiedad Intelectual',
    'terms.section4.content': 'Todo el contenido en StudyEasily, incluyendo cursos, videos y materiales, está protegido por derechos de autor y no puede reproducirse sin autorización.',
    'terms.section5.title': 'Limitación de Responsabilidad',
    'terms.section5.content': 'StudyEasily no es responsable de ningún daño indirecto, incidental o consecuente que surja del uso de nuestros servicios.',
    'terms.section6.title': 'Cambios en los Términos',
    'terms.section6.content': 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán comunicados a través de la plataforma.',
    'terms.contact.title': 'Contáctanos',
    'terms.contact.content': 'Para preguntas sobre los Términos de Servicio:',
    
    // Cookie Policy
    'cookies.title': 'Política de Cookies',
    'cookies.last_updated': 'Última actualización',
    'cookies.section1.title': 'Qué son las Cookies',
    'cookies.section1.content': 'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia de navegación.',
    'cookies.section2.title': 'Tipos de Cookies Utilizadas',
    'cookies.section2.content': 'Usamos los siguientes tipos de cookies:',
    'cookies.section2.type1.name': 'Cookies Esenciales',
    'cookies.section2.type1.desc': 'Necesarias para que el sitio funcione',
    'cookies.section2.type2.name': 'Cookies de Preferencia',
    'cookies.section2.type2.desc': 'Almacenan tus preferencias (idioma, tema)',
    'cookies.section2.type3.name': 'Cookies Analíticas',
    'cookies.section2.type3.desc': 'Nos ayudan a entender cómo usas el sitio',
    'cookies.section3.title': 'Gestión de Cookies',
    'cookies.section3.content': 'Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador. Ten en cuenta que desactivar algunas cookies puede afectar la funcionalidad del sitio.',
    'cookies.section4.title': 'Actualizaciones',
    'cookies.section4.content': 'Podemos actualizar esta Política de Cookies de vez en cuando. Te recomendamos revisar esta página periódicamente para cualquier cambio.',
    'cookies.contact.title': 'Contáctanos',
    'cookies.contact.content': 'Para preguntas sobre la Política de Cookies:',
    
    // Dashboard
    'dashboard.title': 'PANEL',
    'dashboard.welcome': 'Bienvenido',
    'dashboard.home': 'INICIO',
    'dashboard.schedule': 'HORARIO',
    'dashboard.courses': 'CURSOS',
    'dashboard.my_courses': 'MIS CURSOS',
    'dashboard.create_course': 'CREAR CURSO',
    'dashboard.grades': 'CALIFICACIONES',
    'dashboard.settings': 'CONFIGURACIÓN',
    'dashboard.chats': 'CHATS',
    'dashboard.active_courses': 'Cursos Activos',
    'dashboard.completed_exercises': 'Ejercicios Completados',
    'dashboard.progress': 'Progreso',
    
    // Settings
    'settings.title': 'CONFIGURACIÓN DEL PERFIL',
    'settings.subtitle': 'Configura tu perfil y preferencias',
    'settings.profile_image': 'Imagen de Perfil',
    'settings.first_name': 'Nombre',
    'settings.last_name': 'Apellido',
    'settings.email': 'Correo Electrónico',
    'settings.birth_date': 'Fecha de Nacimiento',
    'settings.description': 'Descripción',
    'settings.online_status': 'Estado en Línea',
    'settings.online': 'En Línea',
    'settings.offline': 'Desconectado',
    'settings.do_not_disturb': 'No Molestar',
    'settings.theme': 'Tema del Panel',
    'settings.theme_subtitle': 'Selecciona tu color de tema preferido',
    'settings.language': 'Idioma',
    'settings.language_subtitle': 'Seleccionar idioma de la interfaz',
    'settings.change_password': 'Cambiar Contraseña',
    'settings.current_password': 'Contraseña Actual',
    'settings.new_password': 'Nueva Contraseña',
    'settings.confirm_password': 'Confirmar Nueva Contraseña',
    'settings.save': 'Guardar Cambios',
    'settings.saving': 'Guardando...',
    'settings.account_actions': 'Acciones de Cuenta',
    'settings.logout': 'Cerrar Sesión',
    'settings.delete_account': 'Eliminar Cuenta',
    
    // Course Creation
    'course.create_title': 'Crear Nuevo Curso',
    'course.create_subtitle': 'Completa los detalles para crear tu curso',
    'course.title': 'Título del Curso',
    'course.description': 'Descripción',
    'course.category': 'Categoría',
    'course.level': 'Nivel',
    'course.duration': 'Duración',
    'course.visibility': 'Visibilidad',
    'course.public': 'Público',
    'course.private': 'Privado',
    'course.visibility_public_desc': 'Todos pueden ver e inscribirse en este curso',
    'course.visibility_private_desc': 'Solo los usuarios invitados pueden acceder',
    'course.collaborators': 'Colaboradores',
    'course.add_collaborator': 'Agregar Colaborador',
    'course.collaborator_email': 'Correo del colaborador',
    'course.create_button': 'Crear Curso',
    'course.creating': 'Creando...',
    'course.cancel': 'Cancelar',
    
    // Footer
    'footer.quick_links': 'Enlaces Rápidos',
    'footer.support': 'Soporte',
    'footer.legal': 'Legal',
    'footer.privacy_policy': 'Política de Privacidad',
    'footer.terms_of_service': 'Términos de Servicio',
    'footer.cookie_policy': 'Política de Cookies',
    'footer.rights': 'Todos los derechos reservados.',
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
