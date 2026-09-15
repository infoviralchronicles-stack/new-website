'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Sparkles, Settings, Globe, ArrowLeft } from 'lucide-react';

export default function AdminNav() {
  const pathname = usePathname();

  const items = [
    { name: 'Posts Manager', href: '/admin', icon: LayoutDashboard },
    { name: 'AIStudio & Automation', href: '/admin/ai-studio', icon: Sparkles },
    { name: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              Nx
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight">NexusSphere</div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Editorial Control Center</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition ${
                    active
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>


        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2 transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>View Live Blog</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
