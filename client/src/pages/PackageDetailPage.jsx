import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import api from '../lib/api';
import Button from '../components/ui/Button';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { CATEGORY_LABELS, buildWhatsAppLink, WHATSAPP_MESSAGES } from '../lib/constants';

export default function PackageDetailPage() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    api
      .get(`/packages/${slug}`)
      .then(({ data }) => {
        setPkg(data.package);
        setActiveImage(0);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [slug]);

  if (status === 'loading') {
    return <div className="min-h-screen pt-32 text-center text-brand-black/50">Cargando...</div>;
  }

  if (status === 'error' || !pkg) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-20 text-center">
        <p className="text-lg text-brand-black/60">No encontramos ese paquete.</p>
        <Link to="/paquetes" className="text-brand-magenta font-semibold">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const images = pkg.images?.length ? pkg.images : [null];

  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-5">
        <Link
          to="/paquetes"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-violet hover:text-brand-magenta"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid gap-10 lg:grid-cols-2"
        >
          <div>
            <div className="flex max-h-[70vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-white">
              {images[activeImage] ? (
                <img
                  src={images[activeImage].url}
                  alt={pkg.title}
                  className="max-h-[70vh] w-full object-contain"
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

            <h1 className="font-heading text-3xl font-bold text-brand-black">{pkg.title}</h1>

            <p className="flex items-center gap-2 text-brand-black/60">
              <MapPin className="h-5 w-5 text-brand-magenta" />
              {pkg.destination}
            </p>

            <p className="whitespace-pre-line text-brand-black/75">{pkg.description}</p>

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
        </motion.div>
      </div>
    </div>
  );
}
