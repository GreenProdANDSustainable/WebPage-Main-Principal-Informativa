'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Info, Landmark, ShoppingCart, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import {
  METODOS_PAGO,
  formatearSoles,
  precioDe,
  totalPedido,
  type MetodoPagoId,
  type TipoComprobante,
} from '@/lib/tienda';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';

const WHATSAPP_NUMBER = '51919514085';

const ICONO_METODO: Record<MetodoPagoId, LucideIcon> = {
  tarjeta: CreditCard,
  yape: Smartphone,
  plin: Smartphone,
  transferencia: Landmark,
};

/** Los campos que el comprador llena. Todo texto plano, sin datos de tarjeta. */
interface Formulario {
  nombre: string;
  documento: string;
  correo: string;
  telefono: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  referencia: string;
  nota: string;
}

const VACIO: Formulario = {
  nombre: '',
  documento: '',
  correo: '',
  telefono: '',
  departamento: '',
  ciudad: '',
  direccion: '',
  referencia: '',
  nota: '',
};

const OBLIGATORIOS: (keyof Formulario)[] = [
  'nombre',
  'documento',
  'correo',
  'telefono',
  'departamento',
  'ciudad',
  'direccion',
];

interface CheckoutFormProps {
  dict: any;
  lang: string;
}

/**
 * El último paso de la compra: resumen del pedido, datos de quien compra y
 * elección del medio de pago.
 *
 * El cobro en línea todavía no existe (falta contratar la pasarela), así que
 * el botón manda el pedido completo por WhatsApp en vez de cobrar, y lo dice
 * con todas sus letras arriba del botón. Nunca se piden datos de tarjeta
 * acá: cuando entre la pasarela, esos datos se tecleen en su formulario, no
 * en el nuestro.
 */
export default function CheckoutForm({ dict, lang }: CheckoutFormProps) {
  const c = dict.Checkout;
  const { items, removeItem } = useCart();

  const [comprobante, setComprobante] = useState<TipoComprobante>('boleta');
  const [metodo, setMetodo] = useState<MetodoPagoId | null>(null);
  const [datos, setDatos] = useState<Formulario>(VACIO);
  const [errores, setErrores] = useState<Partial<Record<keyof Formulario | 'metodo', string>>>({});
  const [intentado, setIntentado] = useState(false);

  const { total, completo } = useMemo(() => totalPedido(items), [items]);

  const set = (campo: keyof Formulario) => (valor: string) => {
    setDatos((d) => ({ ...d, [campo]: valor }));
    if (intentado) setErrores((e) => ({ ...e, [campo]: undefined }));
  };

  const validar = () => {
    const e: Partial<Record<keyof Formulario | 'metodo', string>> = {};

    for (const campo of OBLIGATORIOS) {
      if (!datos[campo].trim()) e[campo] = c.errorRequired;
    }

    const documento = datos.documento.replace(/\D/g, '');
    if (datos.documento.trim()) {
      if (comprobante === 'boleta' && documento.length !== 8) e.documento = c.errorDni;
      if (comprobante === 'factura' && documento.length !== 11) e.documento = c.errorRuc;
    }

    if (datos.correo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.correo.trim())) {
      e.correo = c.errorEmail;
    }

    if (datos.telefono.trim() && datos.telefono.replace(/\D/g, '').length !== 9) {
      e.telefono = c.errorPhone;
    }

    if (!metodo) e.metodo = c.errorMethod;

    return e;
  };

  /** El pedido tal cual le llega al asesor por WhatsApp. */
  const armarMensaje = () => {
    const lineas = items.map((i) => {
      const precio = precioDe(i.id);
      const importe = precio === null ? c.pendingPrice : formatearSoles(precio * i.quantity);
      return `• ${i.name} x${i.quantity} — ${importe}`;
    });

    const etiquetaMetodo = metodo ? c.methods[metodo].name : '';
    const etiquetaComprobante =
      comprobante === 'boleta'
        ? `${c.receiptBoleta} (${c.documentDni} ${datos.documento})`
        : `${c.receiptFactura} (${c.documentRuc} ${datos.documento})`;

    // `null` es la línea que no corresponde en este pedido; la cadena vacía
    // es un renglón en blanco a propósito, y tiene que sobrevivir al filtro.
    const partes: (string | null)[] = [
      `*${c.orderTitle}*`,
      '',
      ...lineas,
      completo ? `*${c.total}: ${formatearSoles(total)}*` : `*${c.total}: ${c.totalPending}*`,
      '',
      `${comprobante === 'factura' ? c.businessName : c.name}: ${datos.nombre}`,
      `${c.orderReceipt}: ${etiquetaComprobante}`,
      `${c.email}: ${datos.correo}`,
      `${c.phone}: ${datos.telefono}`,
      `${c.orderDelivery}: ${datos.direccion}, ${datos.ciudad}, ${datos.departamento}`,
      datos.referencia.trim() ? `${c.reference}: ${datos.referencia}` : null,
      '',
      `*${c.orderPayment}: ${etiquetaMetodo}*`,
      datos.nota.trim() ? `${c.notes}: ${datos.nota}` : null,
    ];

    return partes.filter((linea) => linea !== null).join('\n');
  };

  const enviar = (evento: React.FormEvent) => {
    evento.preventDefault();
    setIntentado(true);

    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) {
      document.querySelector('[data-error="true"]')?.scrollIntoView({ block: 'center' });
      return;
    }

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(armarMensaje())}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  if (items.length === 0) {
    return (
      <div className="text-ink/60 flex flex-col items-center gap-4 py-24 text-center">
        <ShoppingCart className="h-12 w-12 opacity-25" />
        <p className="font-display text-ink text-xl font-semibold">{c.emptyTitle}</p>
        <p className="max-w-sm text-sm">{c.emptyHint}</p>
        <Link
          href={`/${lang}/catalogo`}
          className="bg-gp-green hover:bg-husk hover:text-ink mt-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors"
        >
          {c.goToCatalog}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
      <div className="order-2 space-y-10 lg:order-1">
        <section>
          <h2 className="font-display text-ink mb-5 text-xl font-semibold">{c.buyerTitle}</h2>

          {/* Boleta o factura: cambia el documento que se pide y a nombre de
              quién sale el comprobante. */}
          <fieldset className="mb-6">
            <legend className="text-ink/70 mb-2 text-sm font-semibold">{c.receiptTitle}</legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(
                [
                  ['boleta', c.receiptBoleta, c.receiptBoletaHint],
                  ['factura', c.receiptFactura, c.receiptFacturaHint],
                ] as [TipoComprobante, string, string][]
              ).map(([valor, titulo, ayuda]) => (
                <label
                  key={valor}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-colors ${
                    comprobante === valor
                      ? 'border-gp-green bg-gp-green/5'
                      : 'border-line-warm/50 hover:border-gp-green/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="comprobante"
                    value={valor}
                    checked={comprobante === valor}
                    onChange={() => setComprobante(valor)}
                    className="accent-gp-green mt-0.5"
                  />
                  <span>
                    <span className="text-ink block text-sm font-bold">{titulo}</span>
                    <span className="text-ink/50 block text-xs">{ayuda}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Campo
              id="nombre"
              etiqueta={comprobante === 'factura' ? c.businessName : c.name}
              valor={datos.nombre}
              onChange={set('nombre')}
              error={errores.nombre}
              autoComplete="name"
            />
            <Campo
              id="documento"
              etiqueta={comprobante === 'factura' ? c.documentRuc : c.documentDni}
              valor={datos.documento}
              onChange={set('documento')}
              error={errores.documento}
              inputMode="numeric"
              maxLength={11}
            />
            <Campo
              id="correo"
              etiqueta={c.email}
              tipo="email"
              valor={datos.correo}
              onChange={set('correo')}
              error={errores.correo}
              autoComplete="email"
            />
            <Campo
              id="telefono"
              etiqueta={c.phone}
              tipo="tel"
              valor={datos.telefono}
              onChange={set('telefono')}
              error={errores.telefono}
              inputMode="tel"
              autoComplete="tel"
              maxLength={12}
            />
            <Campo
              id="departamento"
              etiqueta={c.region}
              valor={datos.departamento}
              onChange={set('departamento')}
              error={errores.departamento}
            />
            <Campo
              id="ciudad"
              etiqueta={c.city}
              valor={datos.ciudad}
              onChange={set('ciudad')}
              error={errores.ciudad}
            />
            <Campo
              id="direccion"
              etiqueta={c.address}
              valor={datos.direccion}
              onChange={set('direccion')}
              error={errores.direccion}
              autoComplete="street-address"
              className="sm:col-span-2"
            />
            <Campo
              id="referencia"
              etiqueta={`${c.reference} (${c.optional})`}
              valor={datos.referencia}
              onChange={set('referencia')}
              className="sm:col-span-2"
            />
            <Campo
              id="nota"
              etiqueta={`${c.notes} (${c.optional})`}
              valor={datos.nota}
              onChange={set('nota')}
              multilinea
              className="sm:col-span-2"
            />
          </div>
        </section>

        <section>
          <h2 className="font-display text-ink mb-5 text-xl font-semibold">{c.paymentTitle}</h2>
          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            data-error={errores.metodo ? 'true' : undefined}
          >
            {METODOS_PAGO.map((id) => {
              const Icono = ICONO_METODO[id];
              const elegido = metodo === id;
              return (
                <label
                  key={id}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-colors ${
                    elegido
                      ? 'border-gp-green bg-gp-green/5'
                      : 'border-line-warm/50 hover:border-gp-green/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="metodo"
                    value={id}
                    checked={elegido}
                    onChange={() => {
                      setMetodo(id);
                      setErrores((e) => ({ ...e, metodo: undefined }));
                    }}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors ${
                      elegido ? 'bg-gp-green text-white' : 'bg-husk/60 text-ink/60'
                    }`}
                  >
                    <Icono className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="text-ink block text-sm font-bold">{c.methods[id].name}</span>
                    <span className="text-ink/50 block text-xs">{c.methods[id].desc}</span>
                  </span>
                </label>
              );
            })}
          </div>
          {errores.metodo && (
            <p className="text-gp-blue mt-2 text-sm font-semibold">{errores.metodo}</p>
          )}
        </section>
      </div>

      {/* Resumen: se queda a la vista mientras se llena el formulario. */}
      <aside className="order-1 lg:order-2">
        <div className="border-line-warm/40 bg-husk/20 sticky top-28 space-y-5 rounded-2xl border p-6">
          <h2 className="font-display text-ink text-lg font-semibold">{c.summaryTitle}</h2>

          <ul className="space-y-3">
            {items.map((item) => {
              const precio = precioDe(item.id);
              return (
                <li key={item.id} className="flex items-start justify-between gap-3 text-sm">
                  <span className="min-w-0">
                    <span className="text-ink block font-semibold">{item.name}</span>
                    <span className="text-ink/50 block text-xs">
                      {c.quantity}: {item.quantity}
                    </span>
                  </span>
                  <span className="text-ink/70 shrink-0 text-right text-xs font-semibold">
                    {precio === null ? c.pendingPrice : formatearSoles(precio * item.quantity)}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-ink/30 hover:text-gp-blue mt-1 block w-full text-right text-[11px] font-normal underline transition-colors"
                    >
                      {dict.Navbar.cart_remove}
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="border-line-warm/40 flex items-baseline justify-between border-t pt-4">
            <span className="font-display text-ink font-bold">{c.total}</span>
            <span className="font-display text-ink font-bold">
              {completo ? formatearSoles(total) : c.totalPending}
            </span>
          </div>

          <p className="text-ink/50 text-xs">{c.shippingNote}</p>

          {/* Sin pasarela contratada no se cobra nada acá: decirlo antes del
              botón evita que alguien crea que ya pagó. */}
          <p className="border-gp-blue/30 bg-gp-blue/5 text-ink/70 flex gap-2 rounded-xl border p-3 text-xs">
            <Info className="text-gp-blue h-4 w-4 shrink-0" />
            <span>{c.pendingGatewayNotice}</span>
          </p>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#1ebe5b]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {c.submit}
          </button>

          {intentado && Object.keys(errores).length > 0 && (
            <p className="text-gp-blue text-center text-sm font-semibold">{c.errorSummary}</p>
          )}

          <Link
            href={`/${lang}/catalogo`}
            className="text-ink/50 hover:text-gp-green flex items-center justify-center gap-2 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {c.keepShopping}
          </Link>
        </div>
      </aside>
    </form>
  );
}

interface CampoProps {
  id: string;
  etiqueta: string;
  valor: string;
  onChange: (valor: string) => void;
  error?: string;
  tipo?: string;
  multilinea?: boolean;
  className?: string;
  inputMode?: 'numeric' | 'tel';
  autoComplete?: string;
  maxLength?: number;
}

/** Un campo del formulario, con su etiqueta y su aviso de error. */
function Campo({
  id,
  etiqueta,
  valor,
  onChange,
  error,
  tipo = 'text',
  multilinea = false,
  className = '',
  ...resto
}: CampoProps) {
  const clases = `w-full rounded-xl border-2 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-gp-green ${
    error ? 'border-gp-blue' : 'border-line-warm/50'
  }`;

  return (
    <div className={`space-y-1.5 ${className}`} data-error={error ? 'true' : undefined}>
      <label htmlFor={id} className="text-ink/70 block text-sm font-semibold">
        {etiqueta}
      </label>
      {multilinea ? (
        <textarea
          id={id}
          rows={3}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          className={`${clases} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={tipo}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          className={clases}
          {...resto}
        />
      )}
      {error && <p className="text-gp-blue text-xs font-semibold">{error}</p>}
    </div>
  );
}
