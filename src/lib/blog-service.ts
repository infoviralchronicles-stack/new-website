import { db, Category, Post, SiteSettings, Subscriber } from './db';


export function getAllCategories(): Category[] {
  return db.prepare('SELECT * FROM categories ORDER BY name ASC').all() as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return db.prepare('SELECT * FROM categories WHERE slug = ?').get(slug) as Category | undefined;
}


export function getPublishedPosts(limit = 20, offset = 0, categorySlug?: string, searchQuery?: string): { posts: Post[]; total: number } {
  let query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug, c.color as category_color
    FROM posts p
    JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published' AND (p.published_at IS NULL OR p.published_at <= CURRENT_TIMESTAMP)
  `;
  const params: any[] = [];

  if (categorySlug) {
    query += ' AND c.slug = ?';
    params.push(categorySlug);
  }


  if (searchQuery && searchQuery.trim() !== '') {
    query += ' AND (p.title LIKE ? OR p.excerpt LIKE ? OR p.content LIKE ? OR p.tags LIKE ?)';
    const term = `%${searchQuery.trim()}%`;
    params.push(term, term, term, term);
  }

  const countQuery = `SELECT COUNT(*) as count FROM (${query})`;
  const total = (db.prepare(countQuery).get(...params) as { count: number })?.count || 0;

  query += ' ORDER BY p.published_at DESC LIMIT ? OFFSET ?';
  const posts = db.prepare(query).all(...params, limit, offset) as Post[];
  return { posts, total };
}

export function getFeaturedPosts(limit = 4): Post[] {
  const query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug, c.color as category_color
    FROM posts p
    JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published' AND p.featured = 1
    ORDER BY p.published_at DESC LIMIT ?
  `;
  let posts = db.prepare(query).all(limit) as Post[];
  if (posts.length === 0) {
    posts = db.prepare(`
      SELECT p.*, c.name as category_name, c.slug as category_slug, c.color as category_color
      FROM posts p
      JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'published'
      ORDER BY p.published_at DESC LIMIT ?
    `).all(limit) as Post[];
  }
  return posts;
}

export function getTrendingPosts(limit = 5): Post[] {
  const query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug, c.color as category_color
    FROM posts p
    JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published'
    ORDER BY p.trending DESC, p.views DESC, p.published_at DESC LIMIT ?
  `;
  return db.prepare(query).all(limit) as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  const query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug, c.color as category_color
    FROM posts p
    JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ?
  `;
  const post = db.prepare(query).get(slug) as Post | undefined;
  if (post) {
    try {
      db.prepare('UPDATE posts SET views = views + 1 WHERE id = ?').run(post.id);
    } catch (e) {}
  }
  return post;
}

export function getRelatedPosts(categoryId: string, currentPostId: string, limit = 4): Post[] {
  const query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug, c.color as category_color
    FROM posts p
    JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published' AND p.category_id = ? AND p.id != ?
    ORDER BY p.published_at DESC LIMIT ?
  `;
  return db.prepare(query).all(categoryId, currentPostId, limit) as Post[];
}


export function getAllPostsAdmin(): Post[] {
  const query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug, c.color as category_color
    FROM posts p
    JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC

  `;
  return db.prepare(query).all() as Post[];
}

export function createPost(post: Partial<Post>): string {
  const id = post.id || 'post_' + Math.random().toString(36).substring(2, 9);
  const stmt = db.prepare(`
    INSERT INTO posts (
      id, title, slug, excerpt, content, category_id, tags, cover_image,
      author, author_avatar, status, featured, trending, views, reading_time,
      seo_title, seo_description, published_at, scheduled_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `);
  stmt.run(
    id,
    post.title,
    post.slug,
    post.excerpt,
    post.content,
    post.category_id,
    post.tags || '',
    post.cover_image || '',
    post.author || 'Nexus Editorial',
    post.author_avatar || '',
    post.status || 'published',
    post.featured ? 1 : 0,
    post.trending ? 1 : 0,
    post.views || 0,
    post.reading_time || 4,
    post.seo_title || post.title,
    post.seo_description || post.excerpt,
    post.published_at || new Date().toISOString(),
    post.scheduled_at || null
  );
  return id;
}

export function updatePost(id: string, post: Partial<Post>): void {
  const fields: string[] = [];
  const params: any[] = [];

  const allowed = [
    'title', 'slug', 'excerpt', 'content', 'category_id', 'tags',
    'cover_image', 'author', 'status', 'featured', 'trending',
    'reading_time', 'seo_title', 'seo_description', 'published_at', 'scheduled_at'
  ];

  for (const key of allowed) {
    if ((post as any)[key] !== undefined) {
      fields.push(`${key} = ?`);
      params.push((post as any)[key]);
    }
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  params.push(id);

  const query = `UPDATE posts SET ${fields.join(', ')} WHERE id = ?`;
  db.prepare(query).run(...params);
}

export function deletePost(id: string): void {
  db.prepare('DELETE FROM posts WHERE id = ?').run(id);
}


export function addSubscriber(email: string): { success: boolean; error?: string } {
  try {
    const id = 'sub_' + Math.random().toString(36).substring(2, 9);
    db.prepare('INSERT INTO subscribers (id, email) VALUES (?, ?)').run(id, email.toLowerCase().trim());
    return { success: true };
  } catch (err: any) {
    if (err.message && err.message.includes('UNIQUE')) {
      return { success: false, error: 'Already subscribed' };
    }
    return { success: false, error: err.message };
  }
}

export function getAllSubscribers(): Subscriber[] {
  return db.prepare('SELECT * FROM subscribers ORDER BY created_at DESC').all() as Subscriber[];
}


export function getSettings(): Record<string, string> {
  const rows = db.prepare('SELECT key, value FROM settings').all() as { key: string; value: string }[];
  const res: Record<string, string> = {};
  for (const row of rows) {
    res[row.key] = row.value;
  }
  return res;
}

export function updateSetting(key: string, value: string): void {
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run(key, value);
}


export function logAiAction(action: string, topic: string, niche: string, status: string, details?: string): void {
  const id = 'log_' + Math.random().toString(36).substring(2, 9);
  db.prepare('INSERT INTO ai_logs (id, action, topic, niche, status, details) VALUES (?, ?, ?, ?, ?, ?)').run(
    id, action, topic, niche, status, details || null
  );
}

export function getAiLogs(limit = 20): any[] {
  return db.prepare('SELECT * FROM ai_logs ORDER BY created_at DESC LIMIT ?').all(limit);
}
