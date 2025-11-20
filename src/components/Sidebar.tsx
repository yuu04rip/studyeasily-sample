'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  href: string;
  label: string;
  icon: string;
}

const sidebarItems: SidebarItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/corsi', label: 'I Miei Corsi', icon: '📚' },
  { href: '/data-analytics', label: 'Analytics', icon: '📈' },
  { href: '/piani', label: 'Piani', icon: '💳' },
  { href: '/contatti', label: 'Supporto', icon: '💬' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white shadow-md w-64 min-h-screen p-6">
      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
