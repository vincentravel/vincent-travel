import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import { InstagramIcon, FacebookIcon, YouTubeIcon } from '../ui/SocialIcons';
import TikTokIcon from '../ui/TikTokIcon';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { usePackageStore } from '../../store/packageStore';
import {
  SOCIAL_ACCOUNTS,
  getCoverImage,
  buildWhatsAppLink,
  WHATSAPP_MESSAGES,
  whatsappNumberForCategories,
} from '../../lib/constants';

const PLATFORM_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
};

// Colores de marca de cada red, aplicados al pasar el mouse/tocar el ícono.
const PLATFORM_HOVER = {
  instagram:
    'hover:border-transparent hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5]',
  facebook: 'hover:border-transparent hover:bg-[#1877F2]',
  tiktok: 'hover:border-transparent hover:bg-[#FE2C55]',
  youtube: 'hover:border-transparent hover:bg-[#FF0000]',
  whatsapp: 'hover:border-transparent hover:bg-[#25D366]',
};

const ROTATE_MS = 4500;

const accountsForScope = (scope) => SOCIAL_ACCOUNTS.filter((s) => s.scope === scope);

// 6 sectores, 3 arriba y 3 abajo.
const SERVICES_ROW_1 = [
  {
    key: 'egresados-secundarios',
    title: 'Egresados Secundarios',
    category: 'egresados-secundarios',
    scope: 'secundarios',
    imagePosition: 'center',
  },
  {
    key: 'egresados-primarios',
    title: 'Egresados Primarios',
    category: 'egresados-primarios',
    scope: 'primarios',
  },
  {
    key: 'estudiantiles',
    title: 'Viajes Educativos',
    category: 'estudiantiles',
    scope: 'oficial',
    imagePosition: 'center',
  },
];

const SERVICES_ROW_2 = [
  {
    key: 'nacionales',
    title: 'Viajes Nacionales',
    category: 'nacionales',
    scope: 'oficial',
  },
  {
    key: 'internacionales',
    title: 'Viajes Internacionales',
    category: 'internacionales',
    scope: 'oficial',
  },
  {
    key: 'quince',
    title: 'Viajes de 15',
    category: 'quince',
    scope: 'oficial',
  },
];

function ServiceCard({ s, i, images }) {
  const accounts = accountsForScope(s.scope);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % images.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [images.length]);

  const activeImage = images[index % images.length] || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
      whileHover={{ y: -8, scale: 1.035 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-lg backdrop-blur-sm transition-colors hover:border-brand-magenta/60 hover:shadow-2xl hover:shadow-brand-magenta/20"
    >
      {activeImage && (
        <>
          <AnimatePresence>
            <motion.img
              key={activeImage}
              src={activeImage}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className={`absolute inset-0 h-full w-full object-cover brightness-90 ${
                s.imagePosition === 'center' ? 'object-center' : 'object-top'
              }`}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}

      <Link to={`/paquetes?categoria=${s.category}`} className="relative flex flex-1 flex-col justify-end p-7">
        <h3 className="font-heading text-xl font-bold text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_100%),_0_2px_10px_rgb(0_0_0_/_100%),_0_8px_24px_rgb(0_0_0_/_95%),_0_0_46px_rgb(0_0_0_/_90%)]">
          {s.title}
        </h3>
      </Link>

      <div className="relative mx-7 mb-6 mt-auto flex flex-wrap gap-2">
        <a
          href={buildWhatsAppLink(
            WHATSAPP_MESSAGES.service(s.title),
            whatsappNumberForCategories(s.category ? [s.category] : [])
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar por WhatsApp: ${s.title}`}
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-110 hover:text-white hover:shadow-lg ${PLATFORM_HOVER.whatsapp}`}
        >
          <WhatsAppIcon className="h-4 w-4" />
        </a>
        {accounts.map((acc) => {
          const Icon = PLATFORM_ICONS[acc.platform];
          return (
            <a
              key={acc.url}
              href={acc.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${acc.platform}: ${acc.handle}`}
              className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-110 hover:text-white hover:shadow-lg ${PLATFORM_HOVER[acc.platform]}`}
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { packages, fetchPackages } = usePackageStore();

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const imagesByCategory = useMemo(() => {
    const map = {};
    packages.forEach((pkg) => {
      const url = getCoverImage(pkg)?.url;
      if (!url) return;
      pkg.categories?.forEach((c) => {
        if (!map[c]) map[c] = [];
        map[c].push(url);
      });
    });
    return map;
  }, [packages]);

  return (
    <section id="servicios" className="relative overflow-hidden bg-brand-gradient py-24">
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-brand-magenta blur-3xl" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          color: '#ffffff',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Servicios"
          title="Un viaje para cada momento"
          description="Explorá nuestras categorías de viaje y seguí las redes de cada una para ver las novedades."
          light
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_ROW_1.map((s, i) => (
            <ServiceCard key={s.key} s={s} i={i} images={imagesByCategory[s.category] || []} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_ROW_2.map((s, i) => (
            <ServiceCard key={s.key} s={s} i={i} images={imagesByCategory[s.category] || []} />
          ))}
        </div>
      </div>
    </section>
  );
}
