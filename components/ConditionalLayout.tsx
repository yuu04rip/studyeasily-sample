'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't show header/footer on dashboard routes and instructor routes
  const hiddenRoutes = pathname.startsWith('/dashboard') || pathname.startsWith('/instructor');
  
  return (
    <>
      {!hiddenRoutes && <Header />}
      <main className="min-h-screen">{children}</main>
      {!hiddenRoutes && <Footer />}
    </>
  );
}
