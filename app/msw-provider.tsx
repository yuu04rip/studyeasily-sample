'use client';

import { useEffect } from 'react';

type Props = {
    children?: React.ReactNode;
};

/**
 * MSW Provider (client-side only)
 * - try to dynamically import ../mocks/browser in development and start the worker
 * - if mocks/browser is missing it silently does nothing
 *
 * Place this file at app/msw-provider.tsx so the import in layout.tsx works.
 */
export default function MSWProvider({ children }: Props) {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // start worker only in development to avoid interfering in prod
        if (process.env.NODE_ENV !== 'development') return;

        import('../mocks/browser')
            .then((mod) => {
                const worker = (mod as any).worker;
                if (worker && typeof worker.start === 'function') {
                    worker.start({ onUnhandledRequest: 'bypass' }).catch(() => {
                        /* ignore start errors */
                    });
                }
            })
            .catch(() => {
                // no mocks available — silent fallback
            });
    }, []);

    return <>{children}</>;
}