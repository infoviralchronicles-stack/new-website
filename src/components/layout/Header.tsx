'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, Sparkles } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon?: string;
}

interface HeaderProps {
  categories: CategoryItem[];
}

export default function Header({ categories }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="w-full bg-zinc-900 text-zinc-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-1.5 animate-pulse"></span>
              LIVE EDITION
            </span>
            <span className="hidden sm:inline text-zinc-400">
              Tech, Business, Health, Lifestyle, Entertainment, Travel & Sports
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center space-x-1 hover:text-white transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium">Admin & AI Studio</span>
            </Link>
            <Link href="/about" className="hidden md:inline hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="hidden md:inline hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 text-lg">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-none">
                NEXeS</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500 mt-0.5">
                Global Journal
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-1">
          <Link href="/" className="px-3 py-1.5 rounded-lg text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all">
            Home
          </Link>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className="px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all">
              {cat.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center relative">
                <input type="text" placeholder="Search articles, topics..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus className="w-48 sm:w-64 pl-9 pr-8 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
                <button type="button" onClick={() => setSearchOpen(false)} className="absolute right-2.5 text-zinc-400 hover:text-zinc-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          <Link href="/#newsletter" className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm transition-all">
            Subscribe
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-4 space-y-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-semibold text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800">
            Home
          </Link>
          <div className="pt-2 pb-1 text-xs font-bold uppercase tracking-wider text-zinc-400 px-3">Categories</div>
          <div className="grid grid-cols-2 gap-1">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: cat.color }} />
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-3">
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Admin Studio
            </Link>
            <Link href="/#newsletter" onClick={() => setMobileMenuOpen(false)} className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              Join Newsletter &rquo;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
