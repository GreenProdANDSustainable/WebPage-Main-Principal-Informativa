'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/51930287875"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gp-green hover:bg-gp-blue focus:ring-gp-green fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1 }}
    >
      <MessageCircle className="h-7 w-7" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </motion.a>
  );
}
