'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  href: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'greenprod-cart';

// El carrito vive en localStorage, un sistema externo a React: se lee y
// escribe fuera del ciclo de render (mismo patrón que VideoBackdrop usa
// para leer el estado de la red), así se evita el "setState en un efecto"
// y el parpadeo servidor/cliente en la primera carga.
type Listener = () => void;
let cartState: CartItem[] = [];
let hydrated = false;
let listeners: Listener[] = [];

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Almacenamiento no disponible (modo privado, cuota llena): el carrito
    // sigue funcionando en memoria durante la sesión.
  }
}

function setCartState(next: CartItem[]) {
  cartState = next;
  writeStorage(next);
  listeners.forEach((l) => l());
}

const cartStore = {
  subscribe(listener: Listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot(): CartItem[] {
    if (!hydrated) {
      cartState = readStorage();
      hydrated = true;
    }
    return cartState;
  },
  getServerSnapshot(): CartItem[] {
    return [];
  },
};

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    const current = cartStore.getSnapshot();
    const existing = current.find((i) => i.id === item.id);
    const next = existing
      ? current.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      : [...current, { ...item, quantity: 1 }];
    setCartState(next);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartState(cartStore.getSnapshot().filter((i) => i.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    const current = cartStore.getSnapshot();
    const next =
      quantity <= 0
        ? current.filter((i) => i.id !== id)
        : current.map((i) => (i.id === id ? { ...i, quantity } : i));
    setCartState(next);
  }, []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      setQuantity,
      count,
    }),
    [items, isOpen, addItem, removeItem, setQuantity, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
