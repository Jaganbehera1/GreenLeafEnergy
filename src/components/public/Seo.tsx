import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://greenleafenergy.co.in';
const DEFAULT_IMAGE = 'https://hrsvpsjpnuozadvjdyks.supabase.co/storage/v1/object/public/profile-pictures/icon.jpg';

type PageSeo = {
  title: string;
  description: string;
  name: string;
};

const pageMetadata: Record<string, PageSeo> = {
  '/': {
    title: 'Green Leaf Energy | Solar Panel Installation in Odisha',
    description: 'Green Leaf Energy delivers reliable rooftop solar panel installation, solar subsidy guidance, and energy solutions for homes and businesses in Odisha.',
    name: 'Home',
  },
  '/about': {
    title: 'About Green Leaf Energy | Solar Company in Odisha',
    description: 'Learn about Green Leaf Energy, a trusted solar company providing dependable solar energy solutions, installation, and support across Odisha.',
    name: 'About Us',
  },
  '/services': {
    title: 'Solar Installation & Maintenance Services in Odisha | Green Leaf Energy',
    description: 'Explore rooftop solar installation, panel cleaning, system upgrades, maintenance, irrigation pumping, and solar street-lighting services in Odisha.',
    name: 'Solar Services',
  },
  '/gallery': {
    title: 'Solar Installation Projects in Odisha | Green Leaf Energy',
    description: 'View Green Leaf Energy solar panel installation projects and rooftop solar systems completed for homes and businesses in Odisha.',
    name: 'Solar Projects Gallery',
  },
  '/contact': {
    title: 'Contact Green Leaf Energy | Solar Consultation in Odisha',
    description: 'Contact Green Leaf Energy for a solar panel installation consultation, rooftop solar quote, and subsidy guidance in Odisha.',
    name: 'Contact Us',
  },
  '/quotation': {
    title: 'Get a Solar Panel Quote in Odisha | Green Leaf Energy',
    description: 'Request a tailored quotation from Green Leaf Energy for residential, commercial, or agricultural solar panel installation in Odisha.',
    name: 'Solar Quotation',
  },
  '/learning': {
    title: 'Solar Energy Learning Centre | Panels, Subsidy & Systems',
    description: 'Understand solar panels, rooftop solar systems, inverters, and available solar subsidy options with Green Leaf Energy learning resources.',
    name: 'Solar Energy Learning Centre',
  },
  '/franchise': {
    title: 'Solar Business Franchise Opportunity in Odisha | Green Leaf Energy',
    description: 'Explore a Green Leaf Energy franchise opportunity and help deliver trusted rooftop solar solutions to communities in Odisha.',
    name: 'Solar Franchise',
  },
};

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

export function Seo() {
  const { pathname } = useLocation();
  const normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const page = pageMetadata[normalizedPathname] ?? pageMetadata['/'];
  const canonicalUrl = `${SITE_URL}${normalizedPathname === '/' ? '/' : normalizedPathname}`;

  useEffect(() => {
    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', DEFAULT_IMAGE);
    setMeta('property', 'og:site_name', 'Green Leaf Energy');
    setMeta('property', 'og:locale', 'en_IN');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', DEFAULT_IMAGE);
    setLink('canonical', canonicalUrl);

    const verificationCode = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
    if (verificationCode) setMeta('name', 'google-site-verification', verificationCode);

    const breadcrumbItems = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      ...(normalizedPathname === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.name, item: canonicalUrl }]),
    ];
    const schemas: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.name,
        description: page.description,
        url: canonicalUrl,
        isPartOf: { '@type': 'WebSite', name: 'Green Leaf Energy', url: `${SITE_URL}/` },
      },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbItems },
    ];

    if (normalizedPathname === '/') {
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Green Leaf Energy',
          url: `${SITE_URL}/`,
          inLanguage: 'en-IN',
        },
        {
          '@context': 'https://schema.org',
          '@type': ['Organization', 'LocalBusiness'],
          name: 'Green Leaf Energy',
          url: `${SITE_URL}/`,
          logo: DEFAULT_IMAGE,
          image: DEFAULT_IMAGE,
          telephone: '+918260660327',
          email: 'info@greenleafenergy.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Sahajpur, Pipili',
            addressLocality: 'Puri',
            addressRegion: 'Odisha',
            addressCountry: 'IN',
          },
          areaServed: ['Odisha', 'Puri District', 'Bhubaneswar', 'Cuttack', 'Khordha District'],
        },
      );
    }

    if (normalizedPathname === '/services') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Solar installation and maintenance services',
        serviceType: 'Rooftop solar panel installation, maintenance, cleaning, and system upgrades',
        provider: { '@type': 'Organization', name: 'Green Leaf Energy', url: `${SITE_URL}/` },
        areaServed: 'Odisha',
        url: canonicalUrl,
      });
    }

    let schemaElement = document.head.querySelector<HTMLScriptElement>('script[data-green-leaf-seo-schema]');
    if (!schemaElement) {
      schemaElement = document.createElement('script');
      schemaElement.type = 'application/ld+json';
      schemaElement.dataset.greenLeafSeoSchema = 'true';
      document.head.appendChild(schemaElement);
    }
    schemaElement.text = JSON.stringify(schemas).replace(/</g, '\\u003c');
  }, [canonicalUrl, normalizedPathname, page]);

  return null;
}
