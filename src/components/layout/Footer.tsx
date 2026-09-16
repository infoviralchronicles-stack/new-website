import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink 500 flex items-center justify-center text-white font-bold">
                N
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                NEXUS<span className="text-indigo-400">SPHERE</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              The definitive digital pulse covering Technology, Business, Longevity, Modern Lifestyle, Cinema, Travel, and Global Athletics.
            </p>
            <p className="text-xs text-zinc-500">
              &copy; {new Date().getFullYear()} NexusSphere Media Inc. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100 mb-4">Editorial Coverage</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/category/technology" className="hover:text-white transition-colors">Technology & AI</Link></li>
              <li><Link href="/category/business" className="hover:text-white transition-colors">Business & Venture</Link></li>
              <li><Link href="/category/health" className="hover:text-white transition-colors">Health & Longevity</Link></li>
              <li><Link href="/category/lifestyle" className="hover:text-white transition-colors">Modern Lifestyle</Link></li>
              <li><Link href="/category/entertainment" className="hover:text-white transition-colors">Entertainment</Link></li>
              <li><Link href="/category/travel" className="hover:text-white transition-colors">Travel & Escapes</Link></li>
              <li><Link href="/category/sports" className="hover:text-white transition-colors">Global Sports</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100 mb-4">Platform & Tools</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
              <li><Link href="/admin/ai-studio" className="hover:text-white transition-colors">AI Automation Studio</Link></li>
              <li><Link href="/admin/settings" className="hover:text-white transition-colors">Ad & Site Configuration</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">XML Sitemap</Link></li>
              <li><Link href="/robots.txt" className="hover:text-white transition-colors">Robots Protocol</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100 mb-4">Essential Legal</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer & Affiliate Notice</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About NexusSphere</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Executive Team</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
          <p>Human-crafted and AI-augmented journalism. Built with Next.js, SQLite, and Tailwind CSS.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span>Compliant with CCPA, GDPR & Schema.org Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
