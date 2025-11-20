'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
    const rafRef = useRef<number | null>(null);
    const runningRef = useRef(true);

    useEffect(() => {
        const maxScroll = 600;
        const startHeroScale = 1.0;
        const endHeroScale = 0.86;
        const startHeroBright = 1.0;
        const endHeroBright = 0.6;
        const startSphereScale = 1.2;
        const endSphereScale = 0.6;

        // respect reduced motion
        const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            document.documentElement.style.setProperty('--hero-scale', String(1));
            document.documentElement.style.setProperty('--hero-brightness', String(1));
            document.documentElement.style.setProperty('--sphere-global-scale', String(1));
            return;
        }

        const update = () => {
            if (!runningRef.current) {
                rafRef.current = requestAnimationFrame(update);
                return;
            }

            const scrollY = window.scrollY || window.pageYOffset || 0;
            const t = Math.min(Math.max(scrollY / maxScroll, 0), 1);

            const heroScale = startHeroScale + (endHeroScale - startHeroScale) * t;
            const heroBright = startHeroBright + (endHeroBright - startHeroBright) * t; // defensive name fix below
            // NOTE: If linter errors about startHeroStartBright, replace previous line with:
            // const heroBright = startHeroBright + (endHeroBright - startHeroBright) * t;

            const sphereScale = startSphereScale + (endSphereScale - startSphereScale) * t;

            document.documentElement.style.setProperty('--hero-scale', String(heroScale));
            document.documentElement.style.setProperty('--hero-brightness', String(heroBright));
            document.documentElement.style.setProperty('--sphere-global-scale', String(sphereScale));

            rafRef.current = requestAnimationFrame(update);
        };

        // Pause when tab hidden
        const onVisibility = () => {
            runningRef.current = !document.hidden;
        };
        document.addEventListener('visibilitychange', onVisibility);

        // Start loop
        rafRef.current = requestAnimationFrame(update);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            document.removeEventListener('visibilitychange', onVisibility);
            // reset
            document.documentElement.style.setProperty('--hero-scale', '1');
            document.documentElement.style.setProperty('--hero-brightness', '1');
            document.documentElement.style.setProperty('--sphere-global-scale', '1');
        };
    }, []);

    return (
        <section className="relative overflow-hidden">
            {/* background gradient */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-gradientStart to-gradientEnd will-change-transform"
                style={{ transform: 'translateZ(0)' }}
            />

            <div className="relative z-10 container mx-auto px-6 py-20 md:py-28">
                <div
                    className="flex items-start gap-8"
                    style={{
                        transform: 'scale(var(--hero-scale))',
                        transition: 'transform 160ms linear',
                        filter: 'brightness(var(--hero-brightness))',
                    }}
                >
                    {/* Left text column */}
                    <div className="w-full lg:w-1/2">
                        <h1
                            className="hero-title text-[6.25rem] md:text-[8rem] leading-none text-white select-none"
                            style={{ lineHeight: 0.9 }}
                        >
                            StudyEasily
                        </h1>

                        {/* Quote */}
                        <div className="mt-8">
                            <p className="quote-line text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider font-futura text-white/95">
                                L'UOMO COLTO È COLUI
                            </p>
                            <p className="quote-line text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider font-futura text-white/95">
                                CHE SA DOVE TROVARE
                            </p>
                            <p className="quote-line text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider font-futura text-white/95">
                                CIÒ CHE NON SA.
                            </p>
                            <p className="mt-6 text-lg md:text-xl font-futura text-white/80 italic">— Georg Simmel</p>
                        </div>
                    </div>

                    {/* Right side: decorative spheres */}
                    <div className="hidden lg:block lg:w-1/2 relative" aria-hidden>
                        {/* Main big sphere */}
                        <div
                            className="absolute right-12 top-6 rounded-full hero-sphere sphere-1 shadow-2xl animate-float"
                            style={{
                                width: '520px',
                                height: '520px',
                                transform: 'translate(0,0) scale(calc(var(--sphere-global-scale) * 1.12))',
                            }}
                        />

                        {/* medium sphere */}
                        <div
                            className="absolute right-36 top-32 rounded-full hero-sphere sphere-2 shadow-xl animate-float-alt"
                            style={{
                                width: '340px',
                                height: '340px',
                                transform: 'translate(0,0) scale(calc(var(--sphere-global-scale) * 0.98))',
                                animationDuration: '7s',
                            }}
                        />

                        {/* dark large bottom */}
                        <div
                            className="absolute right-24 bottom-6 rounded-full hero-sphere sphere-3 shadow-2xl animate-float"
                            style={{
                                width: '420px',
                                height: '420px',
                                transform: 'translate(0,0) scale(calc(var(--sphere-global-scale) * 1.02))',
                                animationDuration: '6.2s',
                            }}
                        />

                        {/* small accents */}
                        <div
                            className="absolute right-48 top-8 rounded-full hero-sphere sphere-4 shadow-lg animate-float-delayed"
                            style={{
                                width: '96px',
                                height: '96px',
                                transform: 'translate(0,0) scale(calc(var(--sphere-global-scale) * 0.72))',
                                animationDuration: '5s',
                            }}
                        />
                        <div
                            className="absolute right-6 top-44 rounded-full hero-sphere sphere-5 shadow-lg animate-float-alt"
                            style={{
                                width: '150px',
                                height: '150px',
                                transform: 'translate(0,0) scale(calc(var(--sphere-global-scale) * 0.82))',
                                animationDuration: '6.8s',
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}