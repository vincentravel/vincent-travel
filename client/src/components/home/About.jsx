import { motion } from 'framer-motion';
import { Award, HeartHandshake, MapPin, Users, Clock } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { BRANCHES } from '../../lib/constants';

const VALUES = [
  {
    icon: Award,
    title: '+17 años de trayectoria',
    text: 'Experiencia consolidada organizando viajes memorables en todo el país y el exterior.',
  },
  {
    icon: HeartHandshake,
    title: 'Atención personalizada',
    text: 'Cada viaje se arma a medida de quien lo vive, con acompañamiento en todo momento.',
  },
  {
    icon: Users,
    title: 'Grupos y familias',
    text: 'Egresados, estudiantiles, viajes de 15 y experiencias en familia o individuales.',
  },
];

export default function About() {
  return (
    <section id="nosotros" className="relative bg-white py-24">
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[auto,1fr] lg:items-end">
          <SectionHeading
            eyebrow="Nosotros"
            title="Una agencia con historia, pensada para tu próximo viaje"
            description="Desde San Miguel de Tucumán, ayudamos a cientos de familias, grupos de egresados y viajeros a vivir experiencias únicas, con la tranquilidad de una agencia consolidada."
            align="left"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="hidden items-center gap-4 lg:flex lg:justify-end"
          >
            <div className="flex flex-col items-center rounded-3xl bg-brand-gradient px-8 py-6 text-center shadow-lg shadow-brand-violet/20">
              <span className="font-heading text-5xl font-extrabold text-white">+17</span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-white/80">
                Años de trayectoria
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-brand-violet/10 p-8 transition-all hover:border-transparent hover:shadow-xl hover:shadow-brand-violet/15"
            >
              <div className="pointer-events-none absolute inset-0 bg-brand-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]" />
              <motion.div
                whileHover={{ scale: 1.12, rotate: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-violet text-white shadow-md shadow-brand-violet/20 transition-colors group-hover:bg-brand-magenta"
              >
                <v.icon className="h-6 w-6" />
              </motion.div>
              <h3 className="relative mt-5 font-heading text-lg font-semibold text-brand-black">
                {v.title}
              </h3>
              <p className="relative mt-2 text-sm text-brand-black/65">{v.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {BRANCHES.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group flex items-start gap-4 rounded-2xl bg-brand-gradient p-6 shadow-md shadow-brand-violet/10 transition-shadow hover:shadow-lg hover:shadow-brand-magenta/20"
            >
              <motion.span
                whileHover={{ rotate: -8, scale: 1.1 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white"
              >
                <MapPin className="h-5 w-5" />
              </motion.span>
              <div className="text-white">
                <p className="font-heading font-semibold">{b.name}</p>
                <p className="text-sm text-white/75">{b.address}</p>
                <p className="mt-1 flex items-start gap-1.5 text-xs text-white/50">
                  <Clock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  {b.hours}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
