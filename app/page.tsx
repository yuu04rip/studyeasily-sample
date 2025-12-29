import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Hero";
import PricingSection from "@/components/PricingSection";
import BusinessSection from "@/components/BusinessSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

type Channel = { icon: string; title: string };

export default function Home() {
    const channels: Channel[] = [
        { icon: "icons8-google-meet.svg", title: "Google Meet" },
        { icon: "icons8-zoom.svg", title: "Zoom" },
        { icon: "discord-icon-svgrepo-com.svg", title: "Discord" },
        { icon: "icons8-youtube.svg", title: "YouTube" },
        { icon: "icons8-telegram.svg", title: "Telegram" },
    ];

    return (
        <div className="bg-gradient-main min-h-screen">
            {/* Hero Section with custom fonts and animated spheres */}
            <Hero />

            {/* Search Section */}
            <section className="bg-gradient-to-b from-primary to-darkPurple py-12">
                <div className="container mx-auto px-4">
                    <div className="w-full">
                        {/* Qui usiamo il tuo componente SearchBar */}
                        <SearchBar />
                    </div>
                </div>
            </section>

            {/* Course Cards Section */}
            <section className="bg-gradient-to-b from-darkPurple to-primary py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[1, 2, 3].map((i) => (
                            <Link key={i} href={`/corsi/${i}`} className="group">
                                <div className="relative rounded-3xl overflow-hidden shadow-xl transform transition hover:scale-105">
                                    <div className="aspect-square bg-gradient-to-br from-accent to-primary">
                                        {/* Placeholder for course image */}
                                        <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                                            {i}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/80 to-transparent" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Plans Section */}
            <PricingSection />

            {/* Channels Section */}
            <section className="bg-gradient-to-b from-accent via-purple-600 to-accent py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
                        Canali di connessione
                    </h2>
                    <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
                        Scegli la lezione o qualsiasi community di studio
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        {channels.map((platform) => (
                            <Link key={platform.title} href="/canali" className="flex flex-col items-center group cursor-pointer">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-lg social-icon-glow mb-3 overflow-hidden">
                                    {typeof platform.icon === "string" && platform.icon.endsWith(".svg") ? (
                                        <img src={`/icons/${platform.icon}`} alt={platform.title} className="w-10 h-10 object-contain" />
                                    ) : (
                                        <span className="text-3xl md:text-4xl">{platform.icon}</span>
                                    )}
                                </div>
                                <p className="text-white text-sm md:text-base font-medium">{platform.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Business Section */}
            <BusinessSection />

            {/* FAQ Section */}
            <FAQSection />

            {/* Contact Section */}
            <ContactSection />
        </div>
    );
}