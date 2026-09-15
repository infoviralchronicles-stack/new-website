import React from 'react';

interface AdSlotProps {
  type: 'header' | 'sidebar' | 'inarticle' | 'footer';
  className?: string;
}

export default function AdSlot({ type, className = '' }: AdSlotProps) {
  let dimensions = 'w-full h-24';
  let label = 'SPONSORED ADVERTISEMENT - LEADERBOARD (728x90)';
  let desc = 'Responsive Header Ad Space - Available for Direct & Programmatic Buys';

  if (type === 'sidebar') {
    dimensions = 'w-full h-80';
    label = 'RECTANGLE AD - 300x250 / 300x600';
    desc = 'Premium Sidebar Placement - High CTR & Engagement';
  } else if (type === 'inarticle') {
    dimensions = 'w-full h-32 my-6';
    label = 'IN-ARTICLE NEAR THE TOP CONTENT AD';
    desc = 'Contextually Matched Sponsored Feature';
  } else if (type === 'footer') {
    dimensions = 'w-full h-28 my-8';
    label = 'BOTTOM LEADERBOARD - 728x90';
    desc = 'Grow Your Brand with NexusSphere Readership';
  }

  return (
    <aside
      aria-label="advertisement"
      className={`relative overflow-hidden rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 flex flex-col items-center justify-center text-center p-4 transition-all hover:border-indigo-400 ${dimensions} ${className}`}
    >
      <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
        [{label}]
      </span>
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {desc}
      </p>
      <span className="mt-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold underline cursor-pointer">
        Contact for Rates & Placement →
      </span>
    </aside>
  );
}
