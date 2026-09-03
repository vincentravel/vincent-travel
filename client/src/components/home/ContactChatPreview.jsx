import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WhatsAppIcon from '../ui/WhatsAppIcon';

const STEPS = ['idle', 'typing', 'reply'];
const STEP_DURATIONS = { idle: 900, typing: 1400, reply: 3200 };

export default function ContactChatPreview() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const current = STEPS[step % STEPS.length];
    const t = setTimeout(() => setStep((s) => s + 1), STEP_DURATIONS[current]);
    return () => clearTimeout(t);
  }, [step]);

  const phase = STEPS[step % STEPS.length];

  return (
    <div className="flex w-full max-w-[220px] flex-col gap-2">
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-white/90 px-3 py-2 text-xs font-medium text-brand-black shadow-md"
      >
        Hola! Quiero armar un viaje ✈️
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === 'typing' && (
          <motion.div
            key="typing"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-sm bg-[#25D366] px-3 py-2.5 shadow-md"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                className="h-1.5 w-1.5 rounded-full bg-white/90"
              />
            ))}
          </motion.div>
        )}

        {phase === 'reply' && (
          <motion.div
            key="reply"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex max-w-[85%] items-start gap-1.5 rounded-2xl rounded-tl-sm bg-[#25D366] px-3 py-2 text-xs font-medium text-white shadow-md"
          >
            <WhatsAppIcon className="mt-0.5 h-3 w-3 shrink-0" />
            ¡Hola! Contanos qué estás buscando y te ayudamos 🙌
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
