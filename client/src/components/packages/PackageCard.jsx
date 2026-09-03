import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { CATEGORY_LABELS } from '../../lib/constants';

export default function PackageCard({ pkg, index = 0, onOpen }) {
  const cover = pkg.images?.[0]?.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <button
        type="button"
        onClick={() => onOpen(pkg)}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-violet/10 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-violet/10"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
          {cover ? (
            <img
              src={cover}
              alt={pkg.title}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-heading text-5xl font-extrabold text-brand-violet/15">V</span>
            </div>
          )}
          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-violet opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap gap-1.5">
            {pkg.categories?.slice(0, 2).map((c) => (
              <span
                key={c}
                className="rounded-full bg-brand-violet/8 px-2.5 py-1 text-[11px] font-medium text-brand-violet"
              >
                {CATEGORY_LABELS[c] || c}
              </span>
            ))}
          </div>

          <h3 className="font-heading text-lg font-semibold text-brand-black">{pkg.title}</h3>

          <p className="flex items-center gap-1.5 text-sm text-brand-black/60">
            <MapPin className="h-4 w-4 text-brand-magenta" />
            {pkg.destination}
          </p>

          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="font-heading text-sm font-semibold text-brand-magenta">
              {pkg.price?.onRequest || !pkg.price?.amount
                ? 'Precio a consultar'
                : `$${pkg.price.amount.toLocaleString('es-AR')}`}
            </span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
