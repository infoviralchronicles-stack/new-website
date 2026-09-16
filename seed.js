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
    id: 'post_laptop_guide_1',
    title: 'The Comprehensive Guide to Buying a Laptop in 2026: Architectures, Display Standards, and Performance Benchmarks',
    slug: 'buy-laptop-ultimate-guide-2026-architectures-performance-benchmarks',
    excerpt: 'An exhaustive, empirical guide on how to buy a laptop in 2026. Comparing ARM vs. x86 silicon, OLED vs. Mini-LED displays, unified memory thresholds, and battery longevity.',
    content: `Finding the ideal laptop in today's hardware ecosystem has transformed from a straightforward specification comparison into a strategic, long-term investment in your daily productivity. With the rapid democratization of on-device neural processing units (NPUs), ARM-based silicon battery revolutions, tandem OLED display breakthroughs, and sophisticated thermal engineering, prospective buyers are confronted with a staggering array of choices across vastly different price tiers.

Whether you are an enterprise professional demanding uninterrupted eighteen-hour battery longevity during international transit, an engineering specialist compiling dense codebases, or a digital creator executing multi-stream timeline rendering, understanding how contemporary hardware components integrate is imperative. This comprehensive, expert-level handbook deconstructs every critical architectural consideration, silicon benchmark, and practical buying decision to ensure you buy a laptop that effortlessly meets your demands for years to come.

---

## 1. Workload Categorization: Diagnosing Your True Operational Profile

Before analyzing raw clock speeds, unified memory bandwidth, or graphic compute units, the foundational step in any laptop acquisition is establishing an accurate diagnosis of your daily workflow. Modern portable computers fall into four distinct operational classifications:

### A. Ultraportables and Executive Productivity Notebooks
Tailored specifically for remote executives, analysts, writers, and knowledge workers. These notebooks prioritize sub-1.3kg lightweight chassis construction, silent or fanless cooling solutions, instant-wake capabilities, and high-efficiency panels that deliver true all-day battery performance under typical office multitasking conditions.

### B. Creator and High-Throughput Workstations
Engineered for digital artists, architectural designers, colorists, and video editors working in heavy applications like DaVinci Resolve, Blender, Premiere Pro, and AutoCAD. These laptops feature calibrated wide-gamut displays (100% DCI-P3 or AdobeRGB), substantial memory headroom (32GB to 64GB+), and potent graphics subsystems equipped with dedicated hardware encoders.

### C. Gaming Rigs and Graphic Computing Engines
Built to push demanding frame rates across modern gaming titles and local artificial intelligence models. Primary engineering focal points include Total Graphics Power (TGP) allocations, high-refresh displays (165Hz to 240Hz+), advanced multi-phase power delivery, and vapor chamber cooling loops engineered to handle sustained heat dissipation.

### D. 2-in-1 Convertibles and Touchscreen Hybrids
Ideal for students, educators, and field consultants who require digital stylus precision, rapid document annotation, and flexible hinge articulation without sacrificing full operating system capability.

---

## 2. Silicon Architecture: The x86 vs. ARM Battlefield

The heart of every modern laptop is its central processor. Over recent years, the computing market has undergone its most dramatic architectural transformation in over two decades, giving buyers three primary paths:

### Apple Silicon (M-Series)
For creators and professionals integrated into the Apple ecosystem, Apple's custom ARM-based architecture remains a gold standard in energy efficiency. Because unified memory is integrated directly beside the CPU and GPU cores on the same substrate package, memory bandwidth reaches astronomical speeds while power draw remains exceptionally modest. Performance remains consistent whether plugged into wall power or running on battery power.

### Qualcomm Snapdragon X Series (Windows on ARM)
Windows on ARM has matured into a competitive reality. Delivering exceptional efficiency, silent thermal operation, and dedicated 45+ TOPS Neural Processing Units (NPUs) designed for local Copilot+ workflows, these machines excel at web browsing, enterprise productivity, media consumption, and general office tasks with multi-day battery endurance.

### Intel Core Ultra and AMD Ryzen AI (x86 Powerhouses)
For users requiring uncompromised legacy enterprise compatibility, virtualization, complex software engineering toolchains, or high-end PC gaming, x86 processors remain indispensable. Intel's hybrid architecture combining Performance, Efficient, and Low-Power Island cores pairs with AMD's Zen-based high-IPC cores to offer blistering peak performance across intensive multithreaded jobs.

---

## 3. Memory (RAM) and High-Speed NVMe Storage Thresholds

One of the most frequent and costly mistakes consumers make when buying a laptop is under-provisioning system memory. Because modern ultraportables increasingly utilize soldered, low-power LPDDR5X memory to maximize data transfer rates and preserve battery life, post-purchase physical upgrades are often impossible:

- **16 Gigabytes (The Non-Negotiable Baseline):** In an era where modern browsers, communication suites (Slack, Teams, Zoom), and background services consume significant memory, 16GB is the absolute minimum requirement for fluid multitasking.
- **32 Gigabytes (The Professional Sweet Spot):** Ideal for software engineers, data science practitioners, audio engineers, and creative professionals handling multi-layered projects without encountering virtual memory paging lag.
- **64 Gigabytes or More (The Workstation Tier):** Reserved for complex 3D simulations, local large language model (LLM) fine-tuning, 8K video processing, and heavy virtual machine orchestration.

### Solid-State Drive (SSD) Dynamics
Never settle for less than 512GB of PCIe 4.0 NVMe storage. For creative professionals and technical specialists, 1TB to 2TB represents the sensible operational standard. High-speed drives operating above 5,000 MB/s sequential read and write speeds dramatically accelerate application load times, operating system boot sequences, and large asset transfers.

---

## 4. Visual Ergonomics: Display Tech, Color Accuracy, and Ratios

The display is the physical interface your eyes engage with for thousands of hours each year. Choosing an inferior display causes eye fatigue and undermines color-critical evaluation:

- **OLED vs. Mini-LED vs. IPS LCD:** OLED technology provides individual pixel illumination, creating infinite contrast ratios and pitch blacks alongside imperceptible response times. Mini-LED displays deliver blinding sustained peak brightness exceeding 1,000 nits, perfect for high-dynamic-range (HDR) mastering and sunny outdoor environments. High-quality IPS panels remain durable, power-efficient, and budget-friendly alternatives.
- **The 16:10 Aspect Ratio Standard:** The older 16:9 widescreen format has been overwhelmingly replaced by 16:10 and 3:2 aspect ratios. The added vertical screen real estate significantly expands viewable document text, timeline layers, code rows, and spreadsheet cells without requiring perpetual scrolling.
- **Dynamic Refresh Rates (VRR):** Displays supporting 90Hz or 120Hz dynamic refresh rates substantially reduce motion blur and perceptual eye strain during reading and navigation.

---

## 5. Thermal Management, Build Quality, and Port Selection

Flagship silicon is only as effective as the thermal architecture surrounding it. Inadequate cooling leads to aggressive thermal throttling, which can degrade real-world computing throughput by upwards of 30% within minutes of sustained execution:

- **Chassis Rigidity:** Look for precision CNC-machined aluminum or magnesium-alloy chassis that resist deck flex and hinge wobble. A rigid structural frame protects internal motherboard solder joints from micro-fractures over years of daily transit.
- **Essential Physical Ports:** While USB-C is universal, relying exclusively on dongles is inefficient. Look for at least two Thunderbolt 4 or USB4 ports with Power Delivery (PD) support, an HDMI 2.1 port, an SD card reader, and a reliable 3.5mm audio jack.
- **Battery Capacity and GaN Charging:** Look for battery capacities between 70Wh and the legal aviation ceiling of 99.9Wh. Compact Gallium Nitride (GaN) chargers allow rapid power delivery without adding unnecessary weight to your travel backpack.

---

## 6. Pre-Purchase Verification Checklist

Before completing your laptop purchase, verify these final operational elements:
1. **Keyboard Ergonomics:** Ensure key travel measures between 1.3mm and 1.5mm with crisp tactile actuation and stable keycaps.
2. **Glass Precision Touchpad:** Prioritize smooth glass surfaces with customizable multi-finger gesture recognition or modern haptic response motors.
3. **Webcam and Microphone Clarity:** Verify a 1080p FHD sensor with hardware temporal noise reduction and physical privacy shutters.
4. **Wireless Connectivity Standards:** Look for Wi-Fi 6E or Wi-Fi 7 and Bluetooth 5.3+ to guarantee maximum wireless throughput and reliable peripheral pairing.

---

## Conclusion: Making a Confident, High-Value Investment

Buying a laptop is fundamentally about aligning your authentic daily habits with balanced hardware capabilities. Do not overspend on excessive graphical compute units if your hours are spent primarily inside web documents, and never sacrifice display quality or memory bandwidth just to save a minor sum upfront. By prioritizing architectural efficiency, sufficient memory buffers, and visual ergonomics, your new machine will serve as a dependable, high-leverage asset for years to come.`,
    category_id: 'tech',
    tags: 'Buy Laptop, Laptops, Hardware, Technology, Buying Guide, PC, Apple, Intel, AMD',
    cover_image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    author: 'Nexus Tech Editorial',
    author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    status: 'published',
    featured: 1,
    trending: 1,
    views: 1420,
    reading_time: 7,
    seo_title: 'The Comprehensive Guide to Buying a Laptop in 2026: Architectures & Standards',
    seo_description: 'An exhaustive, empirical guide on how to buy a laptop in 2026. Comparing ARM vs. x86 silicon, OLED vs. Mini-LED displays, unified memory thresholds, and battery longevity.',
    published_at: new Date().toISOString()
  },
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
    featured: 1,
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
