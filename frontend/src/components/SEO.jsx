import { Helmet } from 'react-helmet-async';

export const SITE = {
  name:          'Axentralab',
  url:           'https://axentralab.com',
  defaultImage:  '/og-default.png',
  twitterHandle: '@axentralab',
  locale:        'en_US',
};

/**
 * SEO component — drop into any page as the first child.
 *
 * Props:
 *  title       — page title (appended with "| Axentralab")
 *  description — meta description (keep 120–160 chars)
 *  canonical   — pathname, e.g. "/blog"  (full URL built automatically)
 *  noindex     — true for private/auth pages
 *  image       — absolute URL or root-relative path for OG image
 *  type        — og:type, default "website"
 *  schema      — JSON-LD object or array of objects
 */
export default function SEO({
  title,
  description,
  canonical,
  noindex = false,
  image,
  type = 'website',
  schema,
}) {
  const fullTitle    = title ? `${title} | ${SITE.name}` : SITE.name;
  const ogImage      = image || SITE.defaultImage;
  const ogImageFull  = ogImage.startsWith('http') ? ogImage : `${SITE.url}${ogImage}`;
  const canonicalUrl = canonical ? `${SITE.url}${canonical}` : null;

  const schemas = schema
    ? (Array.isArray(schema) ? schema : [schema])
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>

      {description && <meta name="description" content={description} />}

      {noindex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      }

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* ── Open Graph ── */}
      <meta property="og:site_name"   content={SITE.name} />
      <meta property="og:locale"      content={SITE.locale} />
      <meta property="og:type"        content={type} />
      <meta property="og:title"       content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image"       content={ogImageFull} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* ── Twitter Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={SITE.twitterHandle} />
      <meta name="twitter:title"       content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image"       content={ogImageFull} />

      {/* ── JSON-LD structured data ── */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}