'use client';

import { useState } from 'react';
import SidebarDashboard from '@/components/SidebarDashboard';
import { ChatPanel, ToastProvider } from '@/components/dashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);

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
