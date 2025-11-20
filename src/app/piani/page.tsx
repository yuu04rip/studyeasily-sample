import Link from 'next/link';

export default function PianiPage() {
  const plans = [
    {
      name: 'Base',
      price: '9.99',
      period: 'mese',
      features: [
        'Accesso a 50+ corsi',
        'Certificati di completamento',
        'Supporto via email',
        'Contenuti base',
      ],
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '19.99',
      period: 'mese',
      features: [
        'Accesso a 500+ corsi',
        'Certificati verificati',
        'Supporto prioritario',
        'Tutti i contenuti premium',
        'Download offline',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Personalizzato',
      period: '',
      features: [
        'Accesso illimitato',
        'Analytics avanzate',
        'Team management',
        'Supporto dedicato',
        'Formazione personalizzata',
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Scegli il Piano Perfetto per Te
          </h1>
          <p className="text-xl text-gray-600">
            Accedi a contenuti premium e porta il tuo apprendimento al livello successivo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-md p-8 ${
                plan.highlighted
                  ? 'border-4 border-blue-600 transform scale-105'
                  : 'border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="text-center mb-4">
                  <span className="px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                    Più Popolare
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price.includes('€') ? plan.price : `€${plan.price}`}
                </span>
                {plan.period && (
                  <span className="text-gray-600">/{plan.period}</span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`block w-full text-center py-3 rounded-lg font-semibold transition ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Inizia Ora
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
