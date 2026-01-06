'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();
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

        // valori iniziali
        document.documentElement.style.setProperty('--hero-scale', '1');
        document.documentElement.style.setProperty('--hero-brightness', '1');
        document.documentElement.style.setProperty('--sphere-global-scale', '1');

        // Legge override da URL / localStorage
        const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
        const motionParam = urlParams?.get('motion') ?? null;
        const motionOverrideStore = typeof window !== 'undefined' ? localStorage.getItem('motionOverride') : null;

        // preferenza di sistema (non la applichiamo direttamente, ma la teniamo come fallback)
        const systemPrefersReduced =
            typeof window !== 'undefined' && window.matchMedia
                ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
                : false;

        // Decide se usare reduced motion; default = false (animazioni abilitate)
        let useReducedMotion = false;

        // Applica override
        if (motionParam === 'reduce') useReducedMotion = true;
        if (motionParam === 'full') useReducedMotion = false;
        if (motionOverrideStore === 'reduce') useReducedMotion = true;
        if (motionOverrideStore === 'full') useReducedMotion = false;

        // Se non ci sono override e vuoi rispettare il sistema, decommenta la riga sotto:
        // if (motionParam === null && motionOverrideStore === null) useReducedMotion = systemPrefersReduced;

        // Applica/aggiorna la classe reduced-motion su <html> così il CSS può gestirla
        if (useReducedMotion) {
            document.documentElement.classList.add('reduced-motion');
            // set neutral values ed esci
            document.documentElement.style.setProperty('--hero-scale', '1');
            document.documentElement.style.setProperty('--hero-brightness', '1');
            document.documentElement.style.setProperty('--sphere-global-scale', '1');
            return;
        } else {
            document.documentElement.classList.remove('reduced-motion');
        }

        const update = () => {
            if (!runningRef.current) {
                rafRef.current = requestAnimationFrame(update);
                return;
            }

            const scrollY = window.scrollY || window.pageYOffset || 0;
            const t = Math.min(Math.max(scrollY / maxScroll, 0), 1);

            const heroScale = startHeroScale + (endHeroScale - startHeroScale) * t;
            const heroBright = startHeroBright + (endHeroBright - startHeroBright) * t;
            const sphereScale = startSphereScale + (endSphereScale - startSphereScale) * t;

            // DEBUG: decommenta per vedere i valori in console
            // console.log('Hero update', { scrollY, t, heroScale, heroBright, sphereScale });

            document.documentElement.style.setProperty('--hero-scale', String(heroScale));
            document.documentElement.style.setProperty('--hero-brightness', String(heroBright));
            document.documentElement.style.setProperty('--sphere-global-scale', String(sphereScale));

            rafRef.current = requestAnimationFrame(update);
        };

        const onVisibility = () => {
            runningRef.current = !document.hidden;
        };
        document.addEventListener('visibilitychange', onVisibility);

        // avvia il loop RAF
        rafRef.current = requestAnimationFrame(update);

        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            document.removeEventListener('visibilitychange', onVisibility);
            // reset variabili CSS e classe
            document.documentElement.style.setProperty('--hero-scale', '1');
            document.documentElement.style.setProperty('--hero-brightness', '1');
            document.documentElement.style.setProperty('--sphere-global-scale', '1');
            document.documentElement.classList.remove('reduced-motion');
        };
    }, []);

    return (
        <section className="relative overflow-hidden">
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
                    {/* Left */}
                    <div className="w-full lg:w-1/2">
                        <h1
                            className="hero-title text-[6.25rem] md:text-[8rem] leading-none text-white select-none"
                            style={{ lineHeight: 0.9 }}
                        >
                            StudyEasily
                        </h1>

                        <div className="mt-8">
                            <p className="quote-line text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider font-futura text-white/95">
                                {t('hero.quote.line1')}
                            </p>
                            <p className="quote-line text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider font-futura text-white/95">
                                {t('hero.quote.line2')}
                            </p>
                            <p className="quote-line text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider font-futura text-white/95">
                                {t('hero.quote.line3')}
                            </p>
                            <p className="mt-6 text-lg md:text-xl font-futura text-white/80 italic">{t('hero.quote.author')}</p>
                        </div>
                    </div>

                    {/* Right: spheres */}
                    <div className="hidden lg:block lg:w-1/2 relative" aria-hidden>
                        <div
                            className="absolute right-12 top-6"
                            style={{
                                width: '520px',
                                height: '520px',
                                transform: 'scale(calc(var(--sphere-global-scale) * 1.12))',
                            }}
                        >
                            <div className="w-full h-full rounded-full hero-sphere sphere-1 shadow-2xl animate-float" />
                        </div>

                        <div
                            className="absolute right-36 top-32"
                            style={{
                                width: '340px',
                                height: '340px',
                                transform: 'scale(calc(var(--sphere-global-scale) * 0.98))',
                            }}
                        >
                            <div className="w-full h-full rounded-full hero-sphere sphere-2 shadow-xl animate-float-alt" style={{ animationDuration: '7s' }} />
                        </div>

                        <div
                            className="absolute right-24 bottom-6"
                            style={{
                                width: '420px',
                                height: '420px',
                                transform: 'scale(calc(var(--sphere-global-scale) * 1.02))',
                            }}
                        >
                            <div className="w-full h-full rounded-full hero-sphere sphere-3 shadow-2xl animate-float" style={{ animationDuration: '6.2s' }} />
                        </div>

                        <div
                            className="absolute right-48 top-8"
                            style={{
                                width: '96px',
                                height: '96px',
                                transform: 'scale(calc(var(--sphere-global-scale) * 0.72))',
                            }}
                        >
                            <div className="w-full h-full rounded-full hero-sphere sphere-4 shadow-lg animate-float-delayed" style={{ animationDuration: '5s' }} />
                        </div>

                        <div
                            className="absolute right-6 top-44"
                            style={{
                                width: '150px',
                                height: '150px',
                                transform: 'scale(calc(var(--sphere-global-scale) * 0.82))',
                            }}
                        >
                            <div className="w-full h-full rounded-full hero-sphere sphere-5 shadow-lg animate-float-alt" style={{ animationDuration: '6.8s' }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}