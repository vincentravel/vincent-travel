import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import Button from '../ui/Button';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { CATEGORY_LABELS, buildWhatsAppLink, WHATSAPP_MESSAGES } from '../../lib/constants';

export default function PackageModal({ pkg, onClose }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [pkg]);

  useEffect(() => {
    if (!pkg) return;
    const onKeyDown = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [pkg, onClose]);

  if (!pkg) return null;

  const images = pkg.images?.length ? pkg.images : [null];

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white"
        >
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-black shadow-md transition-colors hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
            <div>
              <div className="flex max-h-[65vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-white">
                {images[activeImage] ? (
                  <img
                    src={images[activeImage].url}
                    alt={pkg.title}
                    className="max-h-[65vh] w-full object-contain"
                  />
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center">
                    <span className="font-heading text-6xl font-extrabold text-brand-violet/15">V</span>
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={img?.publicId || i}
                      onClick={() => setActiveImage(i)}
                      className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                        activeImage === i ? 'border-brand-magenta' : 'border-transparent'
                      }`}
                    >
                      <img src={img.url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {pkg.categories?.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-brand-violet/8 px-3 py-1 text-xs font-medium text-brand-violet"
                  >
                    {CATEGORY_LABELS[c] || c}
                  </span>
                ))}
              </div>

              <h2 className="font-heading text-2xl font-bold text-brand-black sm:text-3xl">
                {pkg.title}
              </h2>

              <p className="flex items-center gap-2 text-brand-black/60">
                <MapPin className="h-5 w-5 text-brand-magenta" />
                {pkg.destination}
              </p>

              <div>
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-black/50">
                  Qué incluye
                </h3>
                <p className="mt-1 whitespace-pre-line text-brand-black/75">{pkg.description}</p>
              </div>

              {pkg.details && (
                <div className="rounded-xl bg-brand-violet/5 p-4 text-sm text-brand-black/70">
                  {pkg.details}
                </div>
              )}

              <p className="font-heading text-xl font-bold text-brand-magenta">
                {pkg.price?.onRequest || !pkg.price?.amount
                  ? 'Precio a consultar'
                  : `$${pkg.price.amount.toLocaleString('es-AR')}`}
              </p>

              <Button
                as="a"
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.package(pkg.title))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-fit"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Consultar por este paquete
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
