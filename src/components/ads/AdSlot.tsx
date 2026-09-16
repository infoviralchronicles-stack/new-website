import React from 'react';

interface AdSlotProps {
  type: 'header' | 'sidebar' | 'inarticle' | 'footer';
  className?: string;
}

export default function AdSlot({ type, className = '' }: AdSlotProps) {
  // Ads disabled / removed as requested
  return null;
}
