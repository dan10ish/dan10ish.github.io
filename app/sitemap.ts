import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dan10ish.github.io',
      lastModified: new Date(),
    },
  ];
} 