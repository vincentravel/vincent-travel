import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { MapPin, Clock, Plane } from 'lucide-react';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import ContactChatPreview from './ContactChatPreview';
import Button from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';
import { BRANCHES, buildWhatsAppLink, WHATSAPP_MESSAGES } from '../../lib/constants';

function WhatsAppHeroCard() {
  const cardRef = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 200, damping: 22 });
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${spotX}px ${spotY}px, rgba(255,255,255,0.22), transparent 60%)`;

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-magenta to-brand-violetLight shadow-2xl shadow-brand-magenta/20 transition-shadow duration-500 hover:shadow-brand-magenta/40"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <WhatsAppIcon className="pointer-events-none absolute -right-8 -bottom-12 h-56 w-56 text-white/[0.06] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110 sm:h-72 sm:w-72" />

      <div
        className="relative flex flex-col items-center gap-8 px-8 py-10 text-center sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-12 sm:text-left"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full bg-black/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Respuesta inmediata
          </motion.span>
          <h3 className="max-w-sm font-heading text-2xl font-bold text-white sm:text-3xl">
            Escribinos por WhatsApp
          </h3>
          <p className="max-w-sm text-white/85">
            Te respondemos a la brevedad para armar juntos el viaje que estás buscando.
          </p>
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} className="mt-1">
            <Button
              as="a"
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.contacto)}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              className="px-8 py-3.5 text-base"
            >
              +54 9 3812 12-3869
            </Button>
          </motion.div>
        </div>

        <div className="hidden shrink-0 sm:block">
          <ContactChatPreview />
        </div>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-brand-gradient py-24">
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-brand-magenta blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-brand-magentaLight blur-3xl"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          color: '#ffffff',
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-16 text-white/15"
        animate={{ x: [0, 40, 0], y: [0, -14, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Plane className="h-10 w-10 -rotate-45" />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos de tu próximo viaje"
          description="Estamos a un mensaje de distancia. Elegí el canal que prefieras."
          light
        />

        <WhatsAppHeroCard />

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {BRANCHES.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="group rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm transition-colors hover:border-brand-magentaLight/50 hover:bg-black/30"
            >
              <motion.div
                whileHover={{ rotate: -8, scale: 1.1 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-magenta/20 text-brand-magentaLight transition-colors group-hover:bg-brand-magenta group-hover:text-white"
              >
                <MapPin className="h-5 w-5" />
              </motion.div>
              <p className="mt-4 font-heading text-lg font-semibold text-white">{b.name}</p>
              <p className="mt-2 text-sm text-white/75">{b.address}</p>
              <p className="mt-2 flex items-start gap-1.5 text-xs text-white/50">
                <Clock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                {b.hours}
              </p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-brand-magentaLight hover:bg-brand-magenta/20 hover:text-brand-magentaLight"
              >
                <MapPin className="h-3.5 w-3.5" />
                Cómo llegar
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
