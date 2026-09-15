const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'blog.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    color TEXT DEFAULT '#3b82f6',
    icon TEXT DEFAULT 'Layers'
  );

  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category_id TEXT NOT NULL,
    tags TEXT,
    cover_image TEXT,
    author TEXT DEFAULT 'Editorial Team',
    author_avatar TEXT,
    status TEXT DEFAULT 'published',
    featured INTEGER DEFAULT 0,
    trending INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    reading_time INTEGER DEFAULT 4,
    seo_title TEXT,
    seo_description TEXT,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    scheduled_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (id)
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS ai_logs (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    topic TEXT,
    niche TEXT,
    status TEXT NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const categories = [
  { id: 'tech', name: 'Technology', slug: 'technology', description: 'Artificial Intelligence, Quantum Computing, Gadgets, and Cybersecurity breakthroughs.', color: '#3b82f6', icon: 'Cpu' },
  { id: 'biz', name: 'Business', slug: 'business', description: 'Global markets, venture capital, fintech innovations, and modern corporate strategies.', color: '#10b981', icon: 'TrendingUp' },
  { id: 'health', name: 'Health', slug: 'health', description: 'Longevity science, mental wellness, biohacking, nutrition, and modern medicine.', color: '#ef4444', icon: 'Activity' },
  { id: 'lifestyle', name: 'Lifestyle', slug: 'lifestyle', description: 'Design philosophies, high performance habits, minimal living, and cultural trends.', color: '#8b5cf6', icon: 'Compass' },
  { id: 'entertainment', name: 'Entertainment', slug: 'entertainment', description: 'Cinema, gaming universes, streaming epics, pop culture, and digital art.', color: '#f59e0b', icon: 'Film' },
  { id: 'travel', name: 'Travel', slug: 'travel', description: 'Remote frontiers, luxury retreats, digital nomad hubs, and hidden cultural escapes.', color: '#06b6d4', icon: 'Plane' },
  { id: 'sports', name: 'Sports', slug: 'sports', description: 'Athletic endurance, global championships, sports tech, and peak athletic performance.', color: '#f97316', icon: 'Award' }
];

const catStmt = db.prepare('INSERT OR REPLACE INTO categories (id, name, slug, description, color, icon) VALUES (?, ?, ?, ?, ?, ?)');
for (const c of categories) {
  catStmt.run(c.id, c.name, c.slug, c.description, c.color, c.icon);
}

const posts = [
  {
    id: 'post_tech_1',
    title: 'The Agentic AI Revolution: How Autonomous Systems are Transforming Everyday Software',
    slug: 'the-agentic-ai-revolution-how-autonomous-systems-transform-software',
    excerpt: 'Beyond simple prompt chatbots, autonomous agent workflows are executing multi-step workflows, self-correcting errors, and reinventing enterprise productivity.',
    content: '### The Next Frontier in Computational Intelligence\n\nIn the past two years, conversational AI captivated the world. Millions interacted with large language models to draft emails, summarize articles, and write code snippets. However, we are witnessing a rapid paradigm shift from passive assistive models to goal-directed autonomous agentic systems.\n\nFrom software development to cybersecurity, autonomous agents plan, use tools, and self-correct to deliver exponential productivity gains.',
    category_id: 'tech',
    tags: 'AI, Technology, Autonomous Agents, Software',
    cover_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    author: 'Dr. Elena Rostova',
    author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    status: 'published',
    featured: 1,
    trending: 1,
    views: 3420,
    reading_time: 6,
    seo_title: 'The Agentic AI Revolution: Autonomous Systems Transforming Software',
    seo_description: 'An in-depth analysis of autonomous AI agents and enterprise software.',
    published_at: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'post_biz_1',
    title: 'Venture Capital in the Age of High Efficiency: The Return of Sustainable Cash Flow',
    slug: 'venture-capital-age-of-high-efficiency-sustainable-cash-flow',
    excerpt: 'How founders and top-tier funds are abandoning growth-at-all-costs to champion capital efficiency, positive unit economics, and durable margins.',
    content: '### The Great Recalibration of Global Startups\nin preceding years, hyper-liquidity rewarded vanity growth. Today, disciplined capital allocation, Net Revenue Retention, and unit economics command premium multiples.',
    category_id: 'biz',
    tags: 'Business, Venture Capital, Startups, Finance',
    cover_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    author: 'Marcus Vance',
    author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    status: 'published',
    featured: 1,
    trending: 1,
    views: 2810,
    reading_time: 5,
    seo_title: 'Venture Capital in the Age of Efficiency: The Return of Cash Flow',
    seo_description: 'Discover why top VC funds are prioritizing capital efficiency and cash flow.',
    published_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'post_health_1',
    title: 'Circadian Biology & Deep Sleep Architecture: Evidence-Based Protocols for Peak Recovery',
    slug: 'circadian-biology-deep-sleep-architecture-peak-recovery',
    excerpt: 'Scientific protocols on light spectrum management, core body temperature thermoregulation, and non-REM restorative sleep cycles.',
    content: '### Decoding the Master Circadian Pacemaker\n\nOptimizing sleep architecture is the single highest leverage lever for cognitive longevity and metabolic vitality. Morning photon loading, cooling your core body temperature, and safeguarding melatonin synthesis are essential.',
    category_id: 'health',
    tags: 'Health, Longevity, Biohacking, Sleep',
    cover_image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1200&auto=format&fit=crop',
    author: 'Sophia Chen, M.D.',
    author_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    status: 'published',
    featured: 1,
    trending: 0,
    views: 1940,
    reading_time: 4,
    seo_title: 'Circadian Biology & Deep Sleep Architecture',
    seo_description: 'Scientifically validated protocols for optimizing deep sleep and circadian health.',
    published_at: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    id: 'post_lifestyle_1',
    title: 'The Art of Essentialism: Designing a High-Leverage Life in an Era of Cognitive Overload',
    slug: 'art-of-essentialism-designing-high-leverage-life-cognitive-overload',
    excerpt: 'Practical systems for ruthless priority management, digital decluttering, and curating an environment built for deep creative flow.',
    content: '### Escaping the Busywork Paradox\n\nEssentialism is the disciplined pursuit of less, but better. By ruthlessly eliminating the non-vital trivialities, you protect cognitive bandwidth for what truly matters.',
    category_id: 'lifestyle',
    tags: 'Lifestyle, Productivity, Mindfulness, Focus',
    cover_image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop',
    author: 'Julian Thorne',
    author_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    status: 'published',
    featured: 0,
    trending: 1,
    views: 1650,
    reading_time: 4,
    seo_title: 'The Art of Essentialism: Designing a High-Leverage Life',
    seo_description: 'Curate a minimalist, high-leverage lifestyle with ruthless prioritization.',
    published_at: new Date(Date.now() - 3600000 * 28).toISOString()
  },
  {
    id: 'post_travel_1',
    title: 'The Remote Frontier: Exploring the Fjords and Coastal Wilderness of Western Norway',
    slug: 'remote-frontier-exploring-fjords-coastal-wilderness-western-norway',
    excerpt: 'An expedition through towering glacier-carved valleys, off-grid eco-lodges, and the majestic Atlantic ocean road.',
    content: '### Where Primordial Elements Meet Modern Design\n\nCarved by ancient ice sheets, the fjords of Western Norway represent one of the planets most humbling landscapes. UNESCO World Heritage fjords and 5G cellular networks make this the ultimate nomad frontier.',
    category_id: 'travel',
    tags: 'Travel, Norway, Fjords, Adventure, Nomad',
    cover_image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    author: 'Astrid Lindholm',
    author_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    status: 'published',
    featured: 0,
    trending: 1,
    views: 2280,
    reading_time: 5,
    seo_title: 'Exploring Western Norway: Remote Fjords Guide',
    seo_description: 'Discover Western Norways majestic fjords, scenic routes, and travel tips.',
    published_at: new Date(Date.now() - 3600000 * 35).toISOString()
  },
  {
    id: 'post_ent_1',
    title: 'The Renaissance of Interactive Cinema: How Unreal Engine 5 is Blurring Movies and Games',
    slug: 'renaissance-interactive-cinema-unreal-engine-5-blurring-movies-games',
    excerpt: 'Real-time rendering, virtual production stages, and branching storytelling are merging high-budget Hollywood cinema with immersive interactive worlds.',
    content: '### A Historic Convergence of Storytelling Mediums\n\nWith Unreal Engine 5, Nanite, and Lumen, directors and game developers share the exact same asset pipelines. Virtual production LED Volumes are reinventing cinema.',
    category_id: 'entertainment',
    tags: 'Entertainment, Cinema, Gaming, Unreal Engine',
    cover_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    author: 'Leo Sterling',
    author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    status: 'published',
    featured: 0,
    trending: 0,
    views: 1480,
    reading_time: 4,
    seo_title: 'Interactive Cinema: Unreal Engine 5 Merges Movies and Gaming',
    seo_description: 'Explore virtual production, LED volumes, and interactive cinema.',
    published_at: new Date(Date.now() - 3600000 * 42).toISOString()
  },
  {
    id: 'post_sports_1',
    title: 'Biomechanics and Sensor Analytics: How Data Science is Engineering the Next-Gen Athlete',
    slug: 'biomechanics-sensor-analytics-data-science-engineering-next-gen-athlete',
    excerpt: 'From computer vision kinematic tracking to wearable lactate monitors, modern athletic performance has entered an unprecedented empirical era.',
    content: '### The Empirical Revolution in World-Class Athletics\n\nElectrolyte micro-fluidics, force plate kinetics, and markerless motion capture are higher than ever. The future of sports belongs to data-driven resilience.',
    category_id: 'sports',
    tags: 'Sports, Athletics, Data Science, Biomechanics',
    cover_image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop',
    author: 'Coach David Miller',
    author_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    status: 'published',
    featured: 0,
    trending: 1,
    views: 2130,
    reading_time: 5,
    seo_title: 'Biomechanics & Sensor Analytics: Engineering the Next-Gen Athlete',
    seo_description: 'How motion capture and biomarkers elevate athletic performance.',
    published_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

const postStmt = db.prepare(`
  INSERT OR REPLACE INTO posts (
    id, title, slug, excerpt, content, category_id, tags, cover_image,
    author, author_avatar, status, featured, trending, views, reading_time,
    seo_title, seo_description, published_at
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?
  )
`);

for (const p of posts) {
  postStmt.run(
    p.id, p.title, p.slug, p.excerpt, p.content, p.category_id, p.tags, p.cover_image,
    p.author, p.author_avatar, p.status, p.featured, p.trending, p.views, p.reading_time,
    p.seo_title, p.seo_description, p.published_at
  );
}


fs.writeFileSync('seed_done.txt', 'SEEDED_OK\n');
console.log('DB SEEDED SUCCESSFULLY WITH 7 CATEGORIES AND 7 RICH POSTS!');
