import PricingCard from '@/components/PricingCard';

export default function PianiPage() {
  const plans = [
    {
      title: 'Basic',
      price: 0,
      period: 'month',
      features: [
        'Access to free courses',
        'Basic community support',
        'Course completion certificates',
        'Mobile access',
      ],
    },
    {
      title: 'Pro',
      price: 29,
      period: 'month',
      highlighted: true,
      features: [
        'Access to all courses',
        'Priority support',
        'Downloadable resources',
        'Offline viewing',
        'Certificate of completion',
        'Career guidance',
      ],
    },
    {
      title: 'Enterprise',
      price: 99,
      period: 'month',
      features: [
        'Everything in Pro',
        'Custom learning paths',
        'Team management',
        'Advanced analytics',
        'Dedicated account manager',
        'API access',
        'Custom integrations',
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600">
          Start learning today with a plan that fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <PricingCard key={plan.title} {...plan} />
        ))}
      </div>

      <div className="mt-16 bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Can I switch plans later?</h3>
            <p className="text-gray-600">
              Yes! You can upgrade or downgrade your plan at any time from your account settings.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is there a free trial?</h3>
            <p className="text-gray-600">
              Yes, we offer a 14-day free trial for all paid plans. No credit card required.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">
              We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
