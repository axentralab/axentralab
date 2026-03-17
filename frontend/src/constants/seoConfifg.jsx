import { SITE } from '../components/SEO';

// ── Reusable schema builders ─────────────────────────────────────────────────

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type':    'Organization',
  name:       'Axentralab',
  url:        SITE.url,
  logo:       `${SITE.url}/logo.png`,
  sameAs: [
    'https://twitter.com/axentralab',
    'https://linkedin.com/company/axentralab',
    'https://github.com/axentralab',
  ],
  contactPoint: {
    '@type':             'ContactPoint',
    contactType:         'customer support',
    availableLanguage:   ['English'],
  },
};

export const websiteSchema = {
  '@context':   'https://schema.org',
  '@type':      'WebSite',
  name:         'Axentralab',
  url:          SITE.url,
  potentialAction: {
    '@type':       'SearchAction',
    target:        `${SITE.url}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const localBusinessSchema = {
  '@context':   'https://schema.org',
  '@type':      'ProfessionalService',
  name:         'Axentralab',
  url:          SITE.url,
  image:        `${SITE.url}/og-default.png`,
  description:  'Full-service software agency specialising in web development, cybersecurity, AI automation, and DevOps.',
  priceRange:   '$$',
  areaServed:   'Worldwide',
  knowsAbout:   ['Web Development', 'Cybersecurity', 'AI Automation', 'DevOps', 'SaaS Development'],
};

/**
 * Generates a BlogPosting schema from a blog post object.
 * @param {object} post  — post data from API
 * @returns JSON-LD object
 */
export function blogPostingSchema(post) {
  return {
    '@context':     'https://schema.org',
    '@type':        'BlogPosting',
    headline:       post.title,
    description:    post.excerpt,
    image:          post.image ? post.image : `${SITE.url}/og-default.png`,
    datePublished:  post.createdAt,
    dateModified:   post.updatedAt || post.createdAt,
    author: {
      '@type': 'Organization',
      name:    'Axentralab',
      url:     SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name:    'Axentralab',
      logo: {
        '@type': 'ImageObject',
        url:     `${SITE.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': '@id',
      '@id':   `${SITE.url}/blog/${post._id}`,
    },
  };
}

/**
 * Generates BreadcrumbList schema.
 * @param {Array<{name: string, path: string}>} crumbs
 */
export function breadcrumbSchema(crumbs) {
  return {
    '@context':        'https://schema.org',
    '@type':           'BreadcrumbList',
    itemListElement:   crumbs.map((c, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      c.name,
      item:      `${SITE.url}${c.path}`,
    })),
  };
}

// ── Per-page static configs ──────────────────────────────────────────────────
// Import the config you need in each page:
//   import { SEO_HOME } from '../constants/seoConfig';
//   <SEO {...SEO_HOME} />

export const SEO_HOME = {
  title:       'Custom Software Development & Cybersecurity Agency',
  description: 'Axentralab builds high-performance web apps, SaaS platforms, and AI automation tools — and secures them with enterprise-grade cybersecurity. 150+ projects delivered worldwide.',
  canonical:   '/',
  image:       '/og-home.png',
  schema:      [organizationSchema, websiteSchema],
};

export const SEO_SERVICES = {
  title:       'Services & Pricing — Web Dev, Cybersecurity, AI & DevOps',
  description: 'Transparent pricing for web development, cybersecurity audits, AI automation, SaaS development, UI/UX design, and managed hosting. No hidden fees.',
  canonical:   '/services',
  image:       '/og-services.png',
  schema: {
    '@context':  'https://schema.org',
    '@type':     'ItemList',
    name:        'Axentralab Services',
    description: 'Full-service software agency offerings',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Web Development',        url: `${SITE.url}/services` },
      { '@type': 'ListItem', position: 2, name: 'Cybersecurity',          url: `${SITE.url}/services` },
      { '@type': 'ListItem', position: 3, name: 'AI Automation',          url: `${SITE.url}/services` },
      { '@type': 'ListItem', position: 4, name: 'SaaS Development',       url: `${SITE.url}/services` },
      { '@type': 'ListItem', position: 5, name: 'Hosting & DevOps',       url: `${SITE.url}/services` },
      { '@type': 'ListItem', position: 6, name: 'UI/UX Design',           url: `${SITE.url}/services` },
      { '@type': 'ListItem', position: 7, name: 'Maintenance & Support',  url: `${SITE.url}/services` },
    ],
  },
};

export const SEO_PRODUCTS = {
  title:       'Products — Tools & Solutions by Axentralab',
  description: 'Explore ready-made products and tools built by the Axentralab team — from security scanners to SaaS starter kits.',
  canonical:   '/products',
};

export const SEO_PORTFOLIO = {
  title:       'Portfolio — 150+ Projects Delivered Worldwide',
  description: 'Case studies across web development, cybersecurity, AI automation, and DevOps. Real results: +340% performance, 0 post-audit breaches, 60% infrastructure cost cuts.',
  canonical:   '/portfolio',
  image:       '/og-portfolio.png',
  schema: {
    '@context': 'https://schema.org',
    '@type':    'CollectionPage',
    name:       'Axentralab Portfolio',
    url:        `${SITE.url}/portfolio`,
    description:'Software development and cybersecurity case studies.',
  },
};

export const SEO_BLOG = {
  title:       'Tech Blog — Cybersecurity, AI, Web Dev & DevOps',
  description: 'Expert articles on cybersecurity, AI automation, web development, SaaS, and cloud engineering written by the Axentralab team.',
  canonical:   '/blog',
  image:       '/og-blog.png',
  schema: {
    '@context': 'https://schema.org',
    '@type':    'Blog',
    name:       'Axentralab Tech Blog',
    url:        `${SITE.url}/blog`,
    description:'In-depth technical articles on cybersecurity, AI, and modern engineering.',
    publisher:  organizationSchema,
  },
};

export const SEO_TEAM = {
  title:       'Our Team — Engineers, Security Experts & Designers',
  description: 'Meet the Axentralab team — full-stack engineers, certified ethical hackers, AI specialists, and UI/UX designers working across 30+ countries.',
  canonical:   '/team',
  image:       '/og-team.png',
  schema:      [organizationSchema, {
    '@context': 'https://schema.org',
    '@type':    'AboutPage',
    name:       'Axentralab Team',
    url:        `${SITE.url}/team`,
  }],
};

export const SEO_CONTACT = {
  title:       'Contact Us — Get a Free Consultation',
  description: 'Start your project with Axentralab. Free consultation, fixed-price proposals, NDA included. Reply within 24 hours guaranteed.',
  canonical:   '/contact',
  schema:      localBusinessSchema,
};

// Private / auth pages — noindex so search engines don't crawl them
export const SEO_LOGIN = {
  title:   'Sign In',
  noindex: true,
};

export const SEO_REGISTER = {
  title:   'Create Account',
  noindex: true,
};

export const SEO_DASHBOARD = {
  title:   'Dashboard',
  noindex: true,
};

export const SEO_ADMIN = {
  title:   'Admin Panel',
  noindex: true,
};

export const SEO_CART = {
  title:   'Your Cart',
  noindex: true,
};

export const SEO_CHECKOUT = {
  title:   'Checkout',
  noindex: true,
};

export const SEO_ORDER_SUCCESS = {
  title:   'Order Confirmed',
  noindex: true,
};

export const SEO_NOT_FOUND = {
  title:   '404 — Page Not Found',
  noindex: true,
};