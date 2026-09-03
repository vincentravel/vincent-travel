import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, description, light = false, align = 'center' }) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col gap-3 ${alignment}`}
    >
      {eyebrow && (
        <span
          className={`font-heading text-sm font-semibold uppercase tracking-[0.2em] ${
            light ? 'text-brand-magentaLight' : 'text-brand-magenta'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-heading text-3xl sm:text-4xl font-bold ${
          light ? 'text-white' : 'text-brand-black'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl text-base sm:text-lg ${light ? 'text-white/75' : 'text-brand-black/70'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
