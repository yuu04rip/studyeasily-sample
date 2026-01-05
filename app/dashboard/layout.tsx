'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SidebarDashboard from '@/components/SidebarDashboard';
import { ChatPanel, ToastProvider } from '@/components/dashboard';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
      const userData = JSON.parse(user);
      setCurrentUserId(userData.id || 'student_42');
      setCurrentUserName(userData.name || 'User');
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
    <ThemeProvider>
      <ToastProvider>
        <div className="flex min-h-screen bg-gradient-theme">
          <SidebarDashboard onChatOpen={() => setIsChatOpen(true)} />
          <div className="flex-1 relative">{children}</div>
          <ChatPanel 
            isOpen={isChatOpen} 
            onClose={() => setIsChatOpen(false)}
            currentUserId={currentUserId}
            currentUserName={currentUserName}
          />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}
