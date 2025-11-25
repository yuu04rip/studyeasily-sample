import Link from "next/link";

export default function ContactSection() {
    return (
        <section className="bg-gradient-to-b from-primary to-darkPurple py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-white">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-wide">Contatti</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-white/70 mb-1">Email:</p>
                                <p className="text-xl">study.easilyhm@gmail.com</p>
                            </div>
                            <div>
                                <p className="text-white/70 mb-1">Telefono:</p>
                                <p className="text-xl">xxxxxx-xxxx</p>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center gap-4">
                            <span className="text-white/70">social</span>
                            <div className="flex gap-3">
                                <a href="#" aria-label="Facebook" className="text-white hover:text-accent transition text-xl">f</a>
                                <a href="#" aria-label="Twitter" className="text-white hover:text-accent transition text-xl">@</a>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Link 
                                href="/contatti" 
                                className="inline-flex items-center text-accent hover:text-accent/80 font-semibold text-lg transition group"
                            >
                                Vai alla pagina contatti
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
                    <div className="flex justify-center">
                        <div className="text-accent/30">
                            <svg className="w-48 h-48 md:w-64 md:h-64" viewBox="0 0 200 200" fill="none">
                                {/* Graduation cap icon */}
                                <path d="M100 50 L180 80 L100 110 L20 80 Z" fill="currentColor" />
                                <path d="M180 80 L180 120 L100 150 L20 120 L20 80" stroke="currentColor" strokeWidth="3" fill="none" />
                                <circle cx="100" cy="130" r="40" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
