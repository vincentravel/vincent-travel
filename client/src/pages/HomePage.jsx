import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import PackagesPreview from '../components/home/PackagesPreview';
import Contact from '../components/home/Contact';
import SEO from '../components/seo/SEO';
import { SITE_URL, LOGO_URL, WHATSAPP_NUMBER, BRANCHES, SOCIAL_ACCOUNTS } from '../lib/constants';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Vincent Travel',
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  telephone: `+${WHATSAPP_NUMBER}`,
  priceRange: '$$',
  address: BRANCHES.map((b) => ({
    '@type': 'PostalAddress',
    name: b.name,
    streetAddress: b.address,
    addressRegion: 'Tucumán',
    addressCountry: 'AR',
  })),
  sameAs: [...new Set(SOCIAL_ACCOUNTS.map((s) => s.url))],
};

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [hash]);

  return (
    <>
      <SEO
        description="Vincent Travel: agencia de viajes en San Miguel de Tucumán con más de 17 años de trayectoria. Viajes de egresados, educativos, nacionales, internacionales y de 15. Consultá por WhatsApp."
        path="/"
        jsonLd={homeJsonLd}
      />
      <Hero />
      <About />
      <Services />
      <PackagesPreview />
      <Contact />
    </>
  );
}
