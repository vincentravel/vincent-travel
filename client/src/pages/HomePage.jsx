import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import PackagesPreview from '../components/home/PackagesPreview';
import Contact from '../components/home/Contact';

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
      <Hero />
      <About />
      <Services />
      <PackagesPreview />
      <Contact />
    </>
  );
}
