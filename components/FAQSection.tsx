'use client';

import { useState, useEffect } from 'react';
import FAQAccordion from './FAQAccordion';
import Link from 'next/link';

interface FAQ {
    id: string;
    question: string;
    answer: string;
}

const defaultFaqs: FAQ[] = [
    {
        id: '1',
        question: 'Come funziona StudyEasily?',
        answer: 'StudyEasily è una piattaforma di apprendimento che ti permette di accedere a corsi, community e risorse per migliorare le tue competenze.'
    },
    {
        id: '2',
        question: 'Quali sono i piani disponibili?',
        answer: 'Offriamo tre piani: Freemium (gratuito), Premium e Premium Plus con funzionalità avanzate.'
    },
    {
        id: '3',
        question: 'Come posso contattare il supporto?',
        answer: 'Puoi contattarci via email a study.easilyhm@gmail.com o attraverso i nostri canali social.'
    },
    {
        id: '4',
        question: 'Posso cambiare piano in qualsiasi momento?',
        answer: 'Sì, puoi aggiornare o modificare il tuo piano in qualsiasi momento dalla tua dashboard.'
    },
];

export default function FAQSection() {
    const [faqs, setFaqs] = useState<FAQ[]>(defaultFaqs);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await fetch('/api/faqs');
                if (response.ok) {
                    const data = await response.json();
                    if (data.faqs && data.faqs.length > 0) {
                        setFaqs(data.faqs.slice(0, 4));
                    }
                }
            } catch {
                // Use default FAQs if API fails
            }
        };

        fetchFAQs();
    }, []);

    return (
        <section className="bg-gradient-to-b from-darkPurple to-primary py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold text-accent mb-8">FAQ</h2>
                        <FAQAccordion faqs={faqs} />
                        <div className="mt-6">
                            <Link 
                                href="/faq" 
                                className="inline-flex items-center text-accent hover:text-accent/80 font-semibold text-lg transition group"
                            >
                                Vedi tutte le FAQ
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
                    <div className="flex items-center justify-center">
                        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm">
                            <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                                <span className="text-6xl">📄</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
