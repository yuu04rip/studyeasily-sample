'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SidebarDashboard from '@/components/SidebarDashboard';
import { ChatPanel, ToastProvider } from '@/components/dashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Don't render dashboard until authentication is verified
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-neon-dashboard">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-gradient-neon-dashboard">
        <SidebarDashboard onChatOpen={() => setIsChatOpen(true)} />
        <div className="flex-1 relative">{children}</div>
        <ChatPanel 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)}
          currentUserId="student_42"
          currentUserName="Marco Rossi"
        />
      </div>
    </ToastProvider>
  );
}
