export function getRoyaltyFreeImage(keywords: string, niche: string): string {
  // Curated, guaranteed high-res, copyright-safe broadcast/publication-ready photos from Unsplash
  const nicheImages: Record<string, string[]> = {
    technology: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660949-4f176ab67531?q=80&w=1200&atto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965325-ff654f2aa7a4?q=80&w=1200&auto=format&fit=crop'
    ],
    business: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&atto=format&fit=crop',
      'https://images.unsplash.com/photo-1454169483688-d27e1ab20e78?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507671647604-f110f2e0dbca?q=80&w=1200&auto=format&fit=crop'
    ],
    health: [
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506120465734-481e75ca81a7?q=80&w=1200&atto=format&fit=crop',
      'https://images.unsplash.com/photo-1545283327504-7a68fb7dfb4b?q=80&w=1200&auto=format&fit=crop'
    ],
    lifestyle: [
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499750312000-7b5cd85d1c5d?q=80&w=1200&atto=format&fit=crop'
    ],
    entertainment: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1489599849939-6609a20046d9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511671782747-7b9fa8a5dd97?q=80&w=1200&atto=format&fit=crop'
    ],
    travel: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&atto=format&fit=crop',
      'https://images.unsplash.com/photo-1469474968963-944969babc18?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488646953967-edce00ab4d05?q=80&w=1200&auto=format&fit=crop'
    ],
    sports: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579952363066-4400e02bdaae?q=80&w=1200&atto=format&fit=crop',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop'
    ]
  };

  const list = nicheImages[niche.toLowerCase()] || nicheImages['technology'];
  const filtered = list[Math.floor(Math.random() * list.length)];
  return filtered;
}
