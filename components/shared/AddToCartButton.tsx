'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface AddToCartButtonProps {
  id: string;
  name: string;
  href: string;
  addLabel: string;
  addedLabel: string;
  className?: string;
}

export default function AddToCartButton({
  id,
  name,
  href,
  addLabel,
  addedLabel,
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
      className={`group bg-gp-green text-ink hover:bg-husk inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors duration-300 ${className}`}
    >
      {justAdded ? (
        <>
          <Check className="h-4 w-4" /> {addedLabel}
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />{' '}
          {addLabel}
        </>
      )}
    </button>
  );
}
