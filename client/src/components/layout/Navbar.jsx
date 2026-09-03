import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { buildWhatsAppLink, WHATSAPP_MESSAGES, LOGO_URL } from '../../lib/constants';

const NAV_LINKS = [
  { label: 'Nosotros', hash: '#nosotros' },
  { label: 'Servicios', hash: '#servicios' },
  { label: 'Paquetes', hash: '#paquetes' },
  { label: 'Contacto', hash: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (hash) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
      return;
    }
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
  };

  const transparentAtTop = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled || open || !transparentAtTop
          ? 'bg-brand-violet/95 backdrop-blur shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2.5 font-heading text-2xl font-extrabold text-white">
          <img src={LOGO_URL} alt="Vincent Travel" className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
          Vincent Travel
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.hash}
              href={link.hash}
              onClick={handleNavClick(link.hash)}
              className="font-heading text-sm font-medium text-white/85 transition-colors hover:text-brand-magentaLight"
            >
              {link.label}
            </a>
          ))}
          <Button
            as="a"
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs"
          >
            Escribinos
          </Button>
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.hash}
                  href={link.hash}
                  onClick={handleNavClick(link.hash)}
                  className="rounded-lg px-3 py-3 font-heading text-white/90 hover:bg-white/10"
                >
                  {link.label}
                </a>
              ))}
              <Button
                as="a"
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
              >
                Escribinos por WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
