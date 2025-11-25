'use client';

import Link from 'next/link';

export default function BusinessPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-accent via-purple-700 to-darkPurple py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* LEFT: title + GIF graphic */}
                    <div className="text-left">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-fuchsia-200 mb-8">
                            DATA ANALYTICS
                        </h1>

                        <div className="max-w-[520px]">
                            {/* Sostituisci analytics-arc.gif con il nome della tua GIF in public/images */}
                            <img
                                src="/images/analytics-arc.gif"
                                alt="Visualizzazione animata dei dati di analytics"
                                className="w-full h-auto rounded-2xl shadow-xl"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* RIGHT: descriptive text */}
                    <div className="text-white text-base md:text-lg leading-relaxed">
                        <p className="mb-4">
                            Il sistema di data analytics raccoglie e analizza in modo automatico e
                            organizzato i dati provenienti dagli studenti (materiali usati, progressi,
                            difficoltà, risorse online consultate). L'algoritmo elabora queste
                            informazioni per generare report, individuare pattern, prevedere i bisogni
                            formativi e suggerire contenuti personalizzati.
                        </p>

                        <p className="mb-4">
                            Tutto avviene in modo anonimo e aggregato: il sistema migliora continuamente
                            l'apprendimento e supporta scuole e tutor con analisi chiare e utili.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}