import SidebarDashboard from '@/components/SidebarDashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary to-darkPurple">
      <SidebarDashboard />
      <div className="flex-1">{children}</div>
    </div>
  );
}
