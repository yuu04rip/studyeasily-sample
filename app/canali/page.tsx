'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function CanaliPage() {
    const { t } = useLanguage();

    const channels = [
        { icon: 'icons8-google-meet.svg', title: 'Google Meet', descriptionKey: 'channels.googlemeet.desc' },
        { icon: 'icons8-zoom.svg', title: 'Zoom', descriptionKey: 'channels.zoom.desc' },
        { icon: 'discord-icon-svgrepo-com.svg', title: 'Discord', descriptionKey: 'channels.discord.desc' },
        { icon: 'icons8-youtube.svg', title: 'YouTube', descriptionKey: 'channels.youtube.desc' },
        { icon: 'icons8-telegram.svg', title: 'Telegram', descriptionKey: 'channels.telegram.desc' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-accent via-purple-600 to-accent py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white uppercase tracking-wide">{t('channels.title')}</h1>
                    <p className="text-xl text-white/90">{t('channels.subtitle')}</p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-5xl mx-auto">
                    {channels.map((platform) => (
                        <div key={platform.title} className="flex flex-col items-center group cursor-pointer">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center shadow-2xl transform transition group-hover:scale-110 mb-4 overflow-hidden">
                                <img
                                    src={`/icons/${platform.icon}`}
                                    alt={`${platform.title} icon`}
                                    width={56}
                                    height={56}
                                    className="object-contain"
                                    loading="lazy"
                                />
                            </div>

                            <p className="text-white text-base md:text-lg font-semibold text-center">{platform.title}</p>
                            <p className="text-white/70 text-sm text-center max-w-xs mt-1">{t(platform.descriptionKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}