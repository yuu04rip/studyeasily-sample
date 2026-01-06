import Link from "next/link";

interface PricingCardProps {
    title: string;
    price: number;
    period: string;
    features: string[];
    highlighted?: boolean;
    ctaText?: string;
    freeText?: string;
}

export default function PricingCard({
                                        title,
                                        price,
                                        period,
                                        features,
                                        highlighted = false,
                                        ctaText = "Inizia Ora",
                                        freeText = "Gratuito",
                                    }: PricingCardProps) {
    return (
        <div
            className={
                "rounded-3xl p-8 shadow-2xl transform transition hover:scale-105 flex flex-col " +
                (highlighted ? "ring-4 ring-[#9b7cff]/20 " : "") +
                " bg-gradient-to-br from-[#241827] to-[#201726] border border-white/6 text-white"
            }
        >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">{title}</h3>

            <div className="flex justify-center mb-8">
                <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
            </div>

            <div className="mb-6 text-center">
                {price > 0 ? (
                    <>
                        <span className="text-4xl font-bold">€{price}</span>
                        <span className="text-white/70">/{period}</span>
                    </>
                ) : (
                    <span className="text-4xl font-bold">{freeText}</span>
                )}
            </div>

            <ul className="space-y-3 mb-8 text-white/90 flex-grow">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <svg
                            className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                    </li>
                ))}
            </ul>

            <Link href="/signup" className="block w-full mt-auto">
                <button className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-semibold transition">
                    {ctaText}
                </button>
            </Link>
        </div>
    );
}