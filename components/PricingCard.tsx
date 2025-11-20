interface PricingCardProps {
  title: string;
  price: number;
  period: string;
  features: string[];
  highlighted?: boolean;
}

export default function PricingCard({
  title,
  price,
  period,
  features,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-8 ${
        highlighted
          ? 'border-4 border-primary transform scale-105'
          : 'border border-gray-200'
      }`}
    >
      {highlighted && (
        <div className="bg-gradient-to-r from-gradientStart to-gradientEnd text-white text-sm font-semibold py-1 px-4 rounded-full inline-block mb-4">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-primary">${price}</span>
        <span className="text-gray-600">/{period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-green-500 mr-2 mt-0.5"
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
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 rounded-lg font-semibold transition ${
          highlighted
            ? 'bg-gradient-to-r from-gradientStart to-gradientEnd text-white hover:opacity-90'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        Get Started
      </button>
    </div>
  );
}
