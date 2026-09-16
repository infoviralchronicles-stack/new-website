'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, Send, Check, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const defaultCategories = [
    { id: 'tech', name: 'Technology', slug: 'technology', color: '#3b82f6' },
    { id: 'biz', name: 'Business', slug: 'business', color: '#10b981' },
    { id: 'health', name: 'Health', slug: 'health', color: '#ef4444' },
    { id: 'lifestyle', name: 'Lifestyle', slug: 'lifestyle', color: '#8b5cf6' },
    { id: 'entertainment', name: 'Entertainment', slug: 'entertainment', color: '#f59e0b' },
    { id: 'travel', name: 'Travel', slug: 'travel', color: '#06b6d4' },
    { id: 'sports', name: 'Sports', slug: 'sports', color: '#f97316' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header categories={defaultCategories} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Contact NexusSphere Editorial
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Have a news tip, advertising proposal, or investigative query? Our editorial desk responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6 md:col-span-1">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <Mail className="w-6 h-6 text-indigo-600 mb-2" />
              <h3 className="font-bold text-sm mb-1">Direct Inbox</h3>
              <p className="text-xs text-zinc-500">editorial@nexussphere.com</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <MapPin className="w-6 h-6 text-indigo-600 mb-2" />
              <h3 className="font-bold text-sm mb-1">Bureau HQ</h3>
              <p className="text-xs text-zinc-500">540 Silicon Parkway, Suite 800, San Francisco, CA</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <Phone className="w-6 h-6 text-indigo-600 mb-2" />
              <h3 className="font-bold text-sm mb-1">Press Desk</h3>
              <p className="text-xs text-zinc-500">+1 (415) 890-NEWS</p>
            </div>
          </div>


          <div className="md:col-span-2 p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold">Message Dispatched</h3>
                <p className="text-sm text-zinc-500 max-w-md mx-auto">
                  Thank you for reaching out. Your dispatch has been routed to our newsdesk coordinator.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="px-5 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Send Another Message
                </button>
              </div>
          ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-955 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-955 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-955 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Inquiry or tip subject"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-955 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Provide full details of your proposal or news tip..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition"
                >
                  <Send className="w-4 h-4" /> Submit Dispatch
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
