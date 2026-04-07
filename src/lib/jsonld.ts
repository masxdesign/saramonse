import contact from '../data/contact.json';
import { FACEBOOK_URL, FRESHA_BOOKING_URL, INSTAGRAM_URL, TIKTOK_URL } from '../data/site-urls.js';

const SERVICE_SEGMENTS: Record<string, string> = {
  facials: 'Facials',
  body: 'Body treatments',
  eyes: 'Eye treatments',
  injectables: 'Injectables',
  nails: 'Nails',
};

export function normalizeSiteUrl(site: string | undefined): string {
  return (site ?? 'https://saramonsebeauty.co.uk').replace(/\/$/, '');
}

/** Stable canonical URL for the current path (trailing slash, no query). */
export function canonicalFromPath(site: string, pathname: string): string {
  const base = site.replace(/\/$/, '');
  let path = pathname || '/';
  if (path !== '/' && !path.endsWith('/')) path += '/';
  return `${base}${path === '/' ? '/' : path}`;
}

function openingHoursSpecification() {
  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '18:00',
    },
  ];
}

function breadcrumbList(site: string, pathname: string) {
  const items: { name: string; path: string }[] = [{ name: 'Home', path: '/' }];
  const parts = pathname.split('/').filter(Boolean);

  if (parts[0] === 'services' && parts[1] && SERVICE_SEGMENTS[parts[1]]) {
    items.push({
      name: SERVICE_SEGMENTS[parts[1]],
      path: `/services/${parts[1]}/`,
    });
  } else if (parts[0] === 'about') {
    items.push({ name: 'About', path: '/about/' });
  } else if (parts[0] === 'contact') {
    items.push({ name: 'Contact', path: '/contact/' });
  } else if (parts[0] === 'faq') {
    items.push({ name: 'FAQ', path: '/faq/' });
  } else if (parts[0] === 'privacy-policy') {
    items.push({ name: 'Privacy policy', path: '/privacy-policy/' });
  }

  if (items.length < 2) return null;

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: canonicalFromPath(site, crumb.path),
    })),
  };
}

export interface JsonLdGraphOptions {
  site: string;
  pathname: string;
  pageTitle: string;
  pageDescription: string;
}

export function buildJsonLdGraph(opts: JsonLdGraphOptions): Record<string, unknown>[] {
  const { site, pathname, pageTitle, pageDescription } = opts;
  const { businessName, phone, email, location, map } = contact;

  const salonId = `${site}/#salon`;
  const websiteId = `${site}/#website`;
  const pageUrl = canonicalFromPath(site, pathname);
  const pageId = `${pageUrl}#webpage`;

  const sameAs = [INSTAGRAM_URL, FACEBOOK_URL, TIKTOK_URL].filter(Boolean);

  const beautySalon: Record<string, unknown> = {
    '@type': 'BeautySalon',
    '@id': salonId,
    name: businessName,
    description: location.coverTagline,
    url: `${site}/`,
    telephone: phone.telHref,
    email,
    image: `${site}/assets/logo_256.png`,
    logo: `${site}/assets/logo_256.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bermondsey',
      addressRegion: 'Greater London',
      postalCode: 'SE1',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: map.lat,
      longitude: map.lng,
    },
    openingHoursSpecification: openingHoursSpecification(),
    sameAs,
    priceRange: '££',
  };

  if (FRESHA_BOOKING_URL) {
    beautySalon.potentialAction = {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: FRESHA_BOOKING_URL,
        actionPlatform: 'http://schema.org/DesktopWebPlatform',
      },
    };
  }

  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': pageId,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { '@id': websiteId },
    about: { '@id': salonId },
    inLanguage: 'en-GB',
  };

  const webSite: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${site}/`,
    name: businessName,
    description: location.coverTagline,
    publisher: { '@id': salonId },
    inLanguage: 'en-GB',
  };

  const graph: Record<string, unknown>[] = [beautySalon, webSite, webPage];

  const crumbs = breadcrumbList(site, pathname);
  if (crumbs) graph.push(crumbs);

  return graph;
}
