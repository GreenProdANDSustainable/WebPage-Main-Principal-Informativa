'use client';

import { motion } from 'motion/react';
import { trackLead } from '@/lib/track';
import WhatsAppIcon from './WhatsAppIcon';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/51919514085"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLead('whatsapp_click', { origen: 'boton_flotante' })}
      className="focus:ring-gp-green fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-colors hover:bg-[#1ebe5b] focus:ring-2 focus:ring-offset-2 focus:outline-none"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1 }}
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </motion.a>
  );
}
