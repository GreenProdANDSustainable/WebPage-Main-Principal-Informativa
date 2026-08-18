'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatearSoles, precioDe, totalPedido } from '@/lib/tienda';

interface CartDrawerProps {
  dict: {
    cart_title: string;
    cart_empty: string;
    cart_empty_hint: string;
    cart_checkout: string;
    cart_remove: string;
    cart_pending_price: string;
    cart_note: string;
    cart_close: string;
    cart_quantity: string;
    cart_total: string;
  };
  lang: string;
}

export default function CartDrawer({ dict, lang }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, setQuantity } = useCart();

  // El total solo se muestra si todas las líneas tienen precio: uno parcial
  // engañaría sobre lo que hay que pagar.
  const { total, completo } = totalPedido(items);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-ink/50 fixed inset-0 z-[60] backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-paper fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col shadow-2xl"
          >
            <div className="border-line-warm/40 flex items-center justify-between border-b px-6 py-5">
              <h2 className="font-display text-ink flex items-center gap-2 text-lg font-bold">
                <ShoppingCart className="h-5 w-5" />
                {dict.cart_title}
                {items.length > 0 && (
                  <span className="text-ink/50 text-sm font-normal">
                    ({items.reduce((sum, i) => sum + i.quantity, 0)})
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                aria-label={dict.cart_close}
                className="hover:bg-husk/50 text-ink/60 rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="text-ink/50 flex h-full flex-col items-center justify-center text-center">
                  <ShoppingCart className="mb-4 h-10 w-10 opacity-30" />
                  <p className="font-semibold">{dict.cart_empty}</p>
                  <p className="mt-1 text-sm">{dict.cart_empty_hint}</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="border-line-warm/40 flex items-start justify-between gap-3 border-b pb-4"
                    >
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/${lang}${item.href}`}
                          onClick={closeCart}
                          className="text-ink hover:text-gp-green line-clamp-2 text-sm font-bold transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-ink/50 mt-1 text-xs font-semibold">
                          {precioDe(item.id) === null
                            ? dict.cart_pending_price
                            : formatearSoles(precioDe(item.id)! * item.quantity)}
                        </p>
                        <div className="border-line-warm/50 mt-3 inline-flex items-center rounded-full border">
                          <button
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            aria-label={`${dict.cart_quantity} -1`}
                            className="hover:text-gp-green text-ink/60 flex h-7 w-7 items-center justify-center transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-ink w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            aria-label={`${dict.cart_quantity} +1`}
                            className="hover:text-gp-green text-ink/60 flex h-7 w-7 items-center justify-center transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={dict.cart_remove}
                        className="text-ink/30 hover:text-gp-blue shrink-0 p-1 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-line-warm/40 bg-husk/20 border-t px-6 py-5">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="font-display text-ink font-bold">{dict.cart_total}</span>
                  <span className="font-display text-ink font-bold">
                    {completo ? formatearSoles(total) : dict.cart_pending_price}
                  </span>
                </div>
                <p className="text-ink/50 mb-4 text-xs">{dict.cart_note}</p>
                <Link
                  href={`/${lang}/pago`}
                  onClick={closeCart}
                  className="bg-gp-green hover:bg-husk hover:text-ink flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-bold text-white transition-colors"
                >
                  {dict.cart_checkout}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
