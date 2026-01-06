import Link from "next/link";
import {FaFacebookF, FaInstagram} from "react-icons/fa";

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
                            <div className="flex gap-4">
                                <a
                                    href="https://www.facebook.com/share/17Q4zCmjpu/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-accent transition text-2xl font-bold"
                                >
                                    <FaFacebookF />
                                </a>
                                <a
                                    href="https://www.instagram.com/study.easily_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-accent transition text-2xl font-bold"
                                >
                                    <FaInstagram />
                                </a>
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
                        <img
                            src="/icons/1000127298.png" // Inserisci il percorso della tua immagine qui
                            alt="Icona geometrica"
                            className="w-auto h-auto md:w-96 md:h-72 object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
