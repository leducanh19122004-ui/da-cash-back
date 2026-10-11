import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/ecosystem';

/** Public routes. No lastModified: we don't publish dates we can't vouch for. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/terms', '/privacy', '/risk-disclaimer'].map((path) => ({ url: `${SITE_URL}${path === '/' ? '/' : path}` }));
}
