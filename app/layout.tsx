import type { Metadata } from "next";
import localFont from "next/font/local";

// importa il CSS globale PODA dalla cartella appstyles
import '../app/styles/poda.css';
import './globals.css';

import MSWProvider from "./msw-provider";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "StudyEasily - Learn at Your Own Pace",
    description: "Quality online education platform with courses in web development, data science, and more",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MSWProvider>
            <LanguageProvider>
                <ConditionalLayout>
                    {children}
                </ConditionalLayout>
            </LanguageProvider>
        </MSWProvider>
        </body>
        </html>
    );
}