import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/ecosystem';

/** Same effective behaviour as before (everything indexable) plus a sitemap pointer. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
