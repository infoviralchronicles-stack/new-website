'use client';

import React, { useState } from 'react';
import { Mail, Check, AlertCircle, Loader } from 'lucide-react';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'You have successfully subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="relative p-8 sm:p-10 rounded-2xl bg-zinc-900 text-white overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center wu-10 h-10 rounded-full bg
indigo-600/20 text-indigo-400 mb-4">
          <Mail className="w-5 h-5" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          The NexusSphere Dispatch
        </h3>
        <p className="mt-2 text-sm text-zinc-400">
          Join 32,000+ decision-makers. High-impact investigative insights across Tech, Business, to Lifestyle delivered weekly.
        </p>


        {status === 'success' ? (
          <div className="mt-6 p-4 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-sm flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your professional email..."
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition"
            >
              {status === 'loading' ? <Loader className="w-4 h-4 animate-spin" /> : 'Subscribe'}
            </button>
          </form>
        )}


        {status === 'error' && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
