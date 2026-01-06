import PricingCard from '@/components/PricingCard';

export default function PianiPage() {
  const plans = [
    {
      title: 'Freemium',
      price: 0,
      period: 'month',
      features: [
        'Accesso a corsi gratuiti',
        'Supporto community di base',
        'Certificati di completamento',
        'Accesso mobile',
      ],
    },
    {
      title: 'Premium',
      price: 9.99,
      period: 'month',
      highlighted: true,
      features: [
        'Accesso a tutti i corsi',
        'Supporto prioritario',
        'Risorse scaricabili',
        'Visualizzazione offline',
        'Certificato di completamento',
        'Guida alla carriera',
      ],
    },
    {
      title: 'Premium Plus',
      price: 19.99,
      period: 'month',
      features: [
        'Tutto in Premium',
        'Percorsi di apprendimento personalizzati',
        'Gestione team',
        'Analisi avanzate',
        'Account manager dedicato',
        'Accesso API',
        'Integrazioni personalizzate',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-purple-700 to-accent py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white uppercase tracking-wide">
            I Nostri Piani
          </h1>
          <p className="text-xl text-white/90">
            Inizia a imparare oggi con un piano adatto alle tue esigenze
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>

        <div className="mt-16 bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-4xl mx-auto border border-accent/30">
          <h2 className="text-3xl font-bold mb-6 text-white">Domande Frequenti</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 text-white text-lg">Posso cambiare piano più tardi?</h3>
              <p className="text-white/80">
                Sì! Puoi aggiornare o ridurre il tuo piano in qualsiasi momento dalle impostazioni del tuo account.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-white text-lg">C&apos;è una prova gratuita?</h3>
              <p className="text-white/80">
                Sì, offriamo una prova gratuita di 14 giorni per tutti i piani a pagamento. Nessuna carta di credito richiesta.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-white text-lg">Quali metodi di pagamento accettate?</h3>
              <p className="text-white/80">
                Accettiamo tutte le principali carte di credito, PayPal e bonifici bancari per i piani enterprise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
