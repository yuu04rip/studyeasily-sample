'use client';

import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Come posso iscrivermi a un corso?',
      answer:
        'Puoi iscriverti a un corso semplicemente creando un account gratuito su StudyEasily, navigando nella sezione corsi, selezionando il corso che ti interessa e cliccando sul pulsante "Iscriviti ora".',
    },
    {
      question: 'Quanto costano i corsi?',
      answer:
        'I nostri corsi hanno prezzi variabili in base alla complessità e alla durata. Offriamo anche piani di abbonamento mensili che ti danno accesso illimitato a tutti i corsi.',
    },
    {
      question: 'Posso accedere ai corsi da mobile?',
      answer:
        'Sì, la nostra piattaforma è completamente responsive e ottimizzata per dispositivi mobili. Puoi accedere ai tuoi corsi da qualsiasi dispositivo.',
    },
    {
      question: 'Riceverò un certificato al completamento?',
      answer:
        'Sì, tutti i nostri corsi offrono certificati di completamento verificati che puoi condividere sul tuo profilo LinkedIn o aggiungere al tuo CV.',
    },
    {
      question: 'Posso ottenere un rimborso?',
      answer:
        'Offriamo una garanzia di rimborso di 30 giorni su tutti i corsi. Se non sei soddisfatto, puoi richiedere un rimborso completo entro 30 giorni dall\'acquisto.',
    },
    {
      question: 'Come funziona il supporto?',
      answer:
        'Il nostro team di supporto è disponibile via email 24/7. Gli abbonati Pro hanno accesso al supporto prioritario con tempi di risposta più rapidi.',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Domande Frequenti
          </h1>
          <p className="text-xl text-gray-600">
            Trova le risposte alle domande più comuni
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-gray-600 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Non hai trovato la risposta?
          </h2>
          <p className="text-gray-600 mb-6">
            Il nostro team di supporto è pronto ad aiutarti
          </p>
          <a
            href="/contatti"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Contattaci
          </a>
        </div>
      </div>
    </div>
  );
}
