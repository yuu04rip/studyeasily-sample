import SidebarDashboard from '@/components/SidebarDashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarDashboard />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
