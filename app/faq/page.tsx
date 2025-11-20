'use client';

import { useEffect, useState } from 'react';
import FAQAccordion from '@/components/FAQAccordion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      const response = await fetch('/api/faqs');
      const data = await response.json();
      setFaqs(data.faqs);
      setLoading(false);
    };

    fetchFAQs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about StudyEasily
          </p>
        </div>

        <FAQAccordion faqs={faqs} />

        <div className="mt-12 bg-gradient-to-br from-gradientStart to-gradientEnd text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6 text-white/90">
            Our support team is here to help you with any inquiries
          </p>
          <a
            href="/contatti"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
