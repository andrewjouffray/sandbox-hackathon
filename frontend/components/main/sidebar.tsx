import type React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

function SidebarItem({ href, children, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center px-4 py-3 text-sm font-medium text-white hover:bg-blue-800 transition-colors',
        active && 'bg-blue-800'
      )}
    >
      {children}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className="w-56 bg-[#3F51B5] flex flex-col h-screen sticky top-0">
      <div className="p-4">
        <h1 className="text-xl font-bold text-white">
          <span className="text-green-400">Blue</span>Magma
        </h1>
      </div>
      <nav className="flex-1 flex flex-col">
        <SidebarItem href="/dashboard">Dashboard</SidebarItem>
        <SidebarItem href="/deployments" active>
          Deployments
        </SidebarItem>
        <SidebarItem href="/releases">Releases</SidebarItem>
        <SidebarItem href="/devices">Devices</SidebarItem>
        <SidebarItem href="/actions">Actions</SidebarItem>
        <SidebarItem href="/audits">Audits</SidebarItem>
      </nav>
    </div>
  );
}
