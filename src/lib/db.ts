import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const isVercel = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production' && !fs.existsSync(path.join(process.cwd(), 'data', 'blog.db'));

let dbPath = path.join(process.cwd(), 'data', 'blog.db');

// In Vercel serverless environment, the bundled filesystem is read-only.
// If writable copy is needed, copy to /tmp or open with readonly: false if writable, or copy database to /tmp/blog.db
if (process.env.VERCEL === '1') {
  const tmpPath = '/tmp/blog.db';
  if (!fs.existsSync(tmpPath) && fs.existsSync(dbPath)) {
    try {
      fs.copyFileSync(dbPath, tmpPath);
    } catch (e) {}
  }
  if (fs.existsSync(tmpPath)) {
    dbPath = tmpPath;
  }
}

let db: any;
try {
  db = new Database(dbPath);
  try {
    db.pragma('journal_mode = WAL');
  } catch (e) {}
} catch (err) {
  // If still fails with readonly, open in readonly mode
  db = new Database(dbPath, { readonly: true });
}

try {
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
} catch (e) {
  // Ignored if table already exists or read-only filesystem
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string;
  category_name?: string;
  category_slug?: string;
  category_color?: string;
  tags: string;
  cover_image: string;
  author: string;
  author_avatar?: string;
  status: 'draft' | 'published' | 'scheduled';
  featured: number;
  trending: number;
  views: number;
  reading_time: number;
  seo_title?: string;
  seo_description?: string;
  published_at: string;
  scheduled_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  created_at: string;
  active: number;
}

export interface SiteSettings {
  site_name: string;
  site_description: string;
  site_url: string;
  gemini_api_key: string;
  auto_generate_enabled: boolean;
  auto_publish: boolean;
  generation_interval_hours: number;
  ad_header_enabled: boolean;
  ad_sidebar_enabled: boolean;
  ad_inarticle_enabled: boolean;
  ad_footer_enabled: boolean;
}

const defaultSettings: Record<string, string> = {
  site_name: 'NexusSphere Magazine',
  site_description: 'The definitive pulse on Technology, Business, Health, Modern Lifestyle, Entertainment, Travel, and Global Sports.',
  site_url: 'http://localhost:3000',
  gemini_api_key: '',
  auto_generate_enabled: '1',
  auto_publish: '1',
  generation_interval_hours: '4',
  ad_header_enabled: '1',
  ad_sidebar_enabled: '1',
  ad_inarticle_enabled: '1',
  ad_footer_enabled: '1'
};

try {
  const insertSettingStmt = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
  for (const [key, value] of Object.entries(defaultSettings)) {
    insertSettingStmt.run(key, value);
  }
} catch (e) {
  // Readonly in Vercel lambda
}

export { db };

