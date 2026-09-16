import { MetadataRoute } from 'next';
import { getPublishedPosts, getAllCategories } from '@/lib/blog-service';
import { SITE_CONFIG } from '@/lib/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.siteUrl;

  const staticPaths = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/disclaimer',
    '/search'
  ];

  const staticRoutes = staticPaths.map((path) => ({
    url: baseUrl + path,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: path === '' ? 1.0 : 0.5
  }));

  const categories = getAllCategories();
  const categoryRoutes = categories.map((cat) => ({
    url: baseUrl + '/category/' + cat.slug,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.8
  }));

  const { posts } = getPublishedPosts(100, 0);
  const postRoutes = posts.map((post) => ({
    url: baseUrl + '/post/' + post.slug,
    lastModified: new Date(post.updated_at || post.published_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));


  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
