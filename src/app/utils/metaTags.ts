interface MetaTags {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  category?: string;
  tags?: string[];
}

export const updateMetaTags = (meta: MetaTags) => {
  // Update basic meta tags
  if (meta.title) {
    document.title = meta.title;
    updateMetaTag('og:title', meta.title);
    updateMetaTag('twitter:title', meta.title);
  }

  if (meta.description) {
    updateMetaTag('description', meta.description);
    updateMetaTag('og:description', meta.description);
    updateMetaTag('twitter:description', meta.description);
  }

  if (meta.image) {
    updateMetaTag('og:image', meta.image);
    updateMetaTag('twitter:image', meta.image);
    updateMetaTag('twitter:card', 'summary_large_image');
  }

  if (meta.url) {
    updateMetaTag('og:url', meta.url);
    updateMetaTag('twitter:url', meta.url);
    updateMetaTag('canonical', meta.url, 'rel');
  }

  if (meta.type) {
    updateMetaTag('og:type', meta.type);
  }

  if (meta.siteName) {
    updateMetaTag('og:site_name', meta.siteName);
  }

  if (meta.locale) {
    updateMetaTag('og:locale', meta.locale);
  }

  if (meta.author) {
    updateMetaTag('article:author', meta.author);
  }

  if (meta.publishedTime) {
    updateMetaTag('article:published_time', meta.publishedTime);
  }

  if (meta.modifiedTime) {
    updateMetaTag('article:modified_time', meta.modifiedTime);
  }

  if (meta.category) {
    updateMetaTag('article:section', meta.category);
  }

  if (meta.tags && meta.tags.length > 0) {
    updateMetaTag('article:tag', meta.tags.join(','));
  }

  // Twitter specific
  updateMetaTag('twitter:site', '@AlGhalabaNews');
  updateMetaTag('twitter:creator', '@AlGhalabaNews');
};

const updateMetaTag = (property: string, content: string, attribute: string = 'property') => {
  // Remove existing meta tag with the same property
  const existing = document.querySelector(`meta[${attribute}="${property}"]`);
  if (existing) {
    existing.remove();
  }

  // Create new meta tag
  const meta = document.createElement('meta');
  meta.setAttribute(attribute, property);
  meta.content = content;
  document.head.appendChild(meta);
};

export const updateCanonicalUrl = (url: string) => {
  // Remove existing canonical link
  const existing = document.querySelector('link[rel="canonical"]');
  if (existing) {
    existing.remove();
  }

  // Add new canonical link
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = url;
  document.head.appendChild(link);
};

export const addStructuredData = (data: object) => {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};
