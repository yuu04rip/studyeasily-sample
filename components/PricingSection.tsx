import PricingCard from "./PricingCard";

interface Plan {
    id: string;
    title: string;
    price: number;
    period: string;
    features: string[];
}

interface PricingSectionProps {
    plans?: Plan[];
}

const defaultPlans: Plan[] = [
    {
        id: "freemium",
        title: "Freemium",
        price: 0,
        period: "m",
        features: ["Accesso limitato ai corsi", "Community", "Risorse base"],
    },
    {
        id: "premium",
        title: "Premium",
        price: 9.99,
        period: "m",
        features: ["Accesso completo ai corsi", "Certificati", "Supporto prioritario"],
    },
    {
        id: "premium-plus",
        title: "Premium Plus",
        price: 19.99,
        period: "m",
        features: ["Tutto in Premium", "Coaching 1:1", "Materiali esclusivi"],
    },
];

export default function PricingSection({ plans = defaultPlans }: PricingSectionProps) {
    return (
        <section className="bg-gradient-to-b from-primary via-purple-800 to-accent py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12 uppercase tracking-wide">
                    I Nostri Piani
                </h2>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.id}>
                            <PricingCard
                                title={plan.title}
                                price={plan.price}
                                period={plan.period}
                                features={plan.features}
                                highlighted={plan.id === "premium-plus"}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
