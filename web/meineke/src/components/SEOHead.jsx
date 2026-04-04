import React from 'react';

const seoData = {
  title: 'Auto Repair, Car Mechanics & Maintenance Services | Meineke',
  description: 'Meineke Car Care Centers — Trusted auto repair since 1972. Expert technicians, 900+ locations, rewards program & e-Inspection technology. Book your service today.',
  canonical: 'https://www.meineke.com/',
  ogImage: 'https://www.meineke.com/og-image.jpg',
};

const schemaAutoRepair = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'Meineke Car Care Centers',
  description: seoData.description,
  url: seoData.canonical,
  telephone: '1-800-MEINEKE',
  email: 'info@meineke.com',
  foundingDate: '1972',
  numberOfLocations: '900+',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '07:30',
    closes: '18:00',
  },
  sameAs: [
    'https://www.facebook.com/meinekecarcareusa',
    'https://www.instagram.com/meinekecarcare/',
    'https://www.youtube.com/user/MeinekeCorp',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Auto Repair Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Oil Change' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brake Service' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tires & Wheels' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exhaust & Mufflers' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'A/C Service' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Steering & Suspension' } },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    reviewCount: '12500',
    bestRating: '5',
  },
};

const schemaOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Meineke Car Care Centers',
  url: seoData.canonical,
  logo: 'https://www.meineke.com/logo.png',
  foundingDate: '1972',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Driven Brands',
  },
};

const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How often should I change my oil?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For conventional oil, every 3,000-5,000 miles. For synthetic, 7,500-10,000 miles.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my brakes need replacing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common signs include squealing or grinding noises, vibration in steering wheel or brake pedal, and longer stopping distances.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Meineke e-Inspection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our digital inspection system sends real-time photos and videos of your vehicle inspection directly to your phone for full transparency.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer financing for repairs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer special financing options that let you pre-qualify with no impact on your credit score.',
      },
    },
  ],
};

export default function SEOHead() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaAutoRepair) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
    </>
  );
}
