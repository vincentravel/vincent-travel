import { motion } from 'framer-motion';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from '../../lib/constants';

export default function WhatsAppFloatButton() {
  return (
    <motion.a
      href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-brand-magenta text-white shadow-xl shadow-brand-magenta/30"
      aria-label="Escribinos por WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-brand-magenta animate-ping opacity-40" />
      <WhatsAppIcon className="relative w-8 h-8" />
    </motion.a>
  );
}
