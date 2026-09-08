import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import { buildWhatsAppLink, WHATSAPP_MESSAGES, HERO_VIDEO_URL } from '../../lib/constants';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          // el navegador puede rechazar el autoplay hasta que termine de cargar; reintenta con los eventos de abajo
        });
      }
    };

    tryPlay();
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    document.addEventListener('visibilitychange', tryPlay);

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      document.removeEventListener('visibilitychange', tryPlay);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-brand-violet pt-28 pb-20">
      <motion.video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-violet/80 via-brand-violet/60 to-brand-black/90" />
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-magenta blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          <motion.span
            variants={item}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur"
          >
            <MapPin className="h-4 w-4 text-brand-magentaLight" />
            San Miguel de Tucumán · +17 años de trayectoria
          </motion.span>

          <motion.h1
            variants={item}
            className="font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Tu próximo viaje empieza con{' '}
            <span className="whitespace-nowrap text-brand-magentaLight">Vincent Travel</span>
          </motion.h1>

          <motion.p variants={item} className="max-w-xl text-lg text-white/85">
            Egresados, viajes estudiantiles, escapadas a medida, destinos nacionales e
            internacionales y mucho más. Te acompañamos en cada paso, como lo venimos
            haciendo hace más de 17 años.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as="a"
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultanos por WhatsApp
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button as="a" href="#paquetes" variant="outline">
                Ver paquetes
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#nosotros"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1 }, y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white"
        aria-label="Ir a la siguiente sección"
      >
        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </section>
  );
}
