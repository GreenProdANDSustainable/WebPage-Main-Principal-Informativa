'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

type Tamano = 'sm' | 'md';

interface AddToCartButtonProps {
  id: string;
  name: string;
  href: string;
  addLabel: string;
  addedLabel: string;
  /** `sm` para las listas del catálogo; `md` para las páginas de servicio. */
  size?: Tamano;
  className?: string;
}

const tamanos: Record<Tamano, string> = {
  sm: 'gap-1.5 px-3.5 py-1.5 text-xs',
  md: 'gap-2 px-6 py-3 text-sm',
};

const iconos: Record<Tamano, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
};

export default function AddToCartButton({
  id,
  name,
  href,
  addLabel,
  addedLabel,
  size = 'md',
  className = '',
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = () => {
    addItem({ id, name, href });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`${addLabel}: ${name}`}
      className={`group bg-gp-green hover:bg-husk hover:text-ink inline-flex items-center justify-center rounded-full font-bold text-white transition-colors duration-300 ${tamanos[size]} ${className}`}
    >
      {justAdded ? (
        <>
          <Check className={iconos[size]} /> {addedLabel}
        </>
      ) : (
        <>
          <ShoppingCart
            className={`${iconos[size]} transition-transform duration-300 group-hover:scale-110`}
          />{' '}
          {addLabel}
        </>
      )}
    </button>
  );
}
