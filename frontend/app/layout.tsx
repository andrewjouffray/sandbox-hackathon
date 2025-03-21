import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/main/header';
import Sidebar from '@/components/main/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlueMagma Dashboard',
  description: 'BlueMagma deployment and compliance management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Define default breadcrumb items - these can be overridden in page components
  const defaultBreadcrumbItems = [{ label: 'deployments', href: '/' }];

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full overflow-hidden`}>
        <div className="h-screen flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-auto">
            <Header
              breadcrumbItems={defaultBreadcrumbItems}
              userInitials="JP"
            />
            <main className="flex-1 bg-[#f5f6fa]">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
