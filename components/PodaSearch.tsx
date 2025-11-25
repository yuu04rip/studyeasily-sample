'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    placeholder?: string;
    redirectToDashboard?: boolean;
    initial?: string;
    inline?: boolean;
};

export default function PodaSearch({
                                       placeholder = 'Search...',
                                       redirectToDashboard = false,
                                       initial = '',
                                       inline = true,
                                   }: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (initial && inputRef.current) {
            inputRef.current.value = initial;
        }
    }, [initial]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        const q = inputRef.current?.value.trim() ?? '';
        if (!q) return;
        if (redirectToDashboard) {
            router.push(`/contatti?q=${encodeURIComponent(q)}`);
        } else {
            router.push(`/corsi?search=${encodeURIComponent(q)}`);
        }
    };

    const wrapperClass = inline ? 'poda-root poda-inline' : 'poda-root poda-standalone';

    return (
        <div className={wrapperClass} role="search" aria-label="Futuristic search">
            <div className="glow" aria-hidden="true" />
            <div className="darkBorderBg" aria-hidden="true" />
            <div className="darkBorderBg" aria-hidden="true" />
            <div className="darkBorderBg" aria-hidden="true" />
            <div className="white" aria-hidden="true" />
            <div className="border" aria-hidden="true" />

            <form id="main" onSubmit={handleSubmit} className="poda-main" aria-label="Search form">
                <label htmlFor="poda-search-input" className="visually-hidden">
                    Search
                </label>

                <input
                    id="poda-search-input"
                    ref={inputRef}
                    className="input"
                    type="text"
                    name="text"
                    placeholder={placeholder}
                    aria-label="Search"
                    autoComplete="off"
                />

                <div id="input-mask" aria-hidden="true" />
                <div id="pink-mask" aria-hidden="true" />

                <div className="filterBorder" aria-hidden="true" />

                <button
                    id="filter-icon"
                    type="button"
                    aria-label="Open filters"
                    title="Open filters"
                    onClick={() => {
                        /* TODO: open filter panel */
                    }}
                >
                    <svg preserveAspectRatio="none" height="27" width="27" viewBox="4.8 4.56 14.832 15.408" fill="none" aria-hidden="true">
                        <path
                            d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                            stroke="#d6d6e6"
                            strokeWidth={1}
                            strokeMiterlimit={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <button id="search-icon" type="submit" aria-hidden="false" title="Search">
                    <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" className="feather-search" aria-hidden="true">
                        <defs>
                            <linearGradient id="poda-search" gradientTransform="rotate(50)">
                                <stop stopColor="#f8e7f8" offset="0%" />
                                <stop stopColor="#b6a9b7" offset="50%" />
                            </linearGradient>
                            <linearGradient id="poda-searchl">
                                <stop stopColor="#b6a9b7" offset="0%" />
                                <stop stopColor="#837484" offset="50%" />
                            </linearGradient>
                        </defs>
                        <circle stroke="url(#poda-search)" r="8" cy="11" cx="11"></circle>
                        <line stroke="url(#poda-searchl)" y2="16.65" y1="22" x2="16.65" x1="22"></line>
                    </svg>
                </button>
            </form>
        </div>
    );
}