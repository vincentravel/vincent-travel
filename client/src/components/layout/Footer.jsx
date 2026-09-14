import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YouTubeIcon } from '../ui/SocialIcons';
import TikTokIcon from '../ui/TikTokIcon';
import { SOCIAL_LINKS, BRANCHES, LOGO_URL } from '../../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white/70">
      <div className="mx-auto max-w-6xl px-5 py-12 grid gap-10 text-center sm:grid-cols-3 sm:text-left">
        <div className="flex flex-col items-center sm:items-start">
          <Link to="/" className="flex items-center gap-2.5 font-heading text-xl font-extrabold text-white">
            <img src={LOGO_URL} alt="Vincent Travel" className="h-11 w-11 shrink-0" />
            Vincent Travel
          </Link>
          <p className="mt-3 text-sm">
            Más de 17 años haciendo realidad viajes inolvidables en San Miguel de Tucumán.
          </p>
        </div>

        <div className="hidden flex-col items-center sm:flex sm:items-start">
          <h3 className="font-heading font-semibold text-white mb-3">Sucursales</h3>
          <ul className="space-y-3 text-sm">
            {BRANCHES.map((b) => (
              <li key={b.name} className="flex items-start gap-2 text-left">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-magentaLight" />
                <span>
                  <strong className="text-white/90">{b.name}:</strong> {b.address}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-heading font-semibold text-white mb-3">Seguinos</h3>
          <div className="flex gap-3">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-transform hover:scale-110 hover:bg-brand-magenta"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-transform hover:scale-110 hover:bg-brand-magenta"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-transform hover:scale-110 hover:bg-brand-magenta"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-transform hover:scale-110 hover:bg-brand-magenta"
            >
              <YouTubeIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Vincent Travel. Todos los derechos reservados.
      </div>
    </footer>
  );
}
