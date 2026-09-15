import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getAllCategories } from '@/lib/blog-service';

export default async function PrivacyPage() {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header categories={categories} />

      <main className="flex-1 max-w-4le w-full mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: September 2026</p>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            At NexusSphere Magazine, we respect your privacy and are committed to protecting your personal data in full compliance with Global Data Protection Regulations (GDPR) and the California Consumer Privacy Act (CCPA).
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">1. Information We Collect</h3>
          <p>
            We may collect voluntarily provided information such as your email address when you subscribe to our newsletter, submit a contact inquiry, or interact with our services. We also automatically collect anonymized analytics data (page views, referral sources, device types) to improve site performance.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">2. Use of Information</h3>
          <p>
            Your information is used solely to deliver our newsletter, respond to your inquiries, and ensure our servers remain secure and efficient. We never sell, rent, or exchange your personal data with third-party brokers.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">3. Cookies and Advertising</h3>
          <p>
            We may partner with revenue partners and advertising networks that use standard cookies to serve contextual advertisements. You can disable cookies via your browser settings at any time.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">4. Your Rights</h3>
          <p>
            You have the right to request access to, modification of, or deletion of any personal data we hold. To exercise these rights, contact us at privacy@nexussphere.magazine.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
