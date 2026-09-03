import { motion } from 'framer-motion';
import { GraduationCap, Backpack, Sparkles, Home, Plane, PartyPopper } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '../../lib/constants';

const SERVICES = [
  {
    icon: GraduationCap,
    title: 'Egresados Primarios y Secundarios',
    text: 'Viajes primarios y secundarios pensados para que cada promoción viva su mejor experiencia.',
    category: 'egresados-secundarios',
  },
  {
    icon: Backpack,
    title: 'Viajes Estudiantiles',
    text: 'Programas educativos y recreativos para instituciones y grupos de estudiantes.',
    category: 'estudiantiles',
  },
  {
    icon: Sparkles,
    title: 'Viajes a Medida',
    text: 'Diseñamos tu itinerario ideal, adaptado a tus tiempos, presupuesto y estilo de viaje.',
    whatsapp: true,
  },
  {
    icon: Home,
    title: 'Viajes Nacionales',
    text: 'Los mejores destinos de Argentina, para descubrir cerca de casa.',
    category: 'nacionales',
  },
  {
    icon: Plane,
    title: 'Viajes Internacionales',
    text: 'Experiencias inolvidables en los destinos más buscados del mundo.',
    category: 'internacionales',
  },
  {
    icon: PartyPopper,
    title: 'Viajes de 15',
    text: 'Festejá tus 15 en grande, con paquetes pensados para vos y tus amigos.',
    category: 'quince',
  },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-brand-black py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Servicios"
          title="Un viaje para cada momento"
          description="Explorá nuestras categorías de viaje y encontrá la experiencia perfecta."
          light
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {s.whatsapp ? (
                <a
                  href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-7 transition-all hover:border-brand-magenta/50 hover:bg-white/10"
                >
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-magenta/20 text-brand-magentaLight transition-colors group-hover:bg-brand-magenta group-hover:text-white"
                  >
                    <s.icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold text-white">{s.title}</h3>
                  <p className="text-sm text-white/60">{s.text}</p>
                </a>
              ) : (
                <Link
                  to={`/paquetes?categoria=${s.category}`}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-7 transition-all hover:border-brand-magenta/50 hover:bg-white/10"
                >
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-magenta/20 text-brand-magentaLight transition-colors group-hover:bg-brand-magenta group-hover:text-white"
                  >
                    <s.icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold text-white">{s.title}</h3>
                  <p className="text-sm text-white/60">{s.text}</p>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
