/**
 * El lado comercial del sitio: cuánto cuesta cada cosa y cómo se puede pagar.
 *
 * Hoy la empresa todavía no fijó la lista de precios ni contrató pasarela,
 * así que el carrito muestra "a cotizar" y el pedido se cierra por WhatsApp
 * con todos los datos del comprador. Cuando eso cambie, son dos pasos
 * independientes:
 *
 * 1. Precios: cargar la tabla `PRECIOS` de abajo. El carrito, la página de
 *    pago y el total se encienden solos.
 * 2. Cobro en línea: contratar Culqi o Izipay (ambas cubren tarjeta, Yape y
 *    Plin en un solo contrato), guardar la llave secreta como secreto de
 *    Cloudflare —nunca en el repositorio— y reemplazar el envío por WhatsApp
 *    de `CheckoutForm` por la llamada a la pasarela.
 */

/**
 * Precio de venta por producto, en soles y con IGV incluido. La clave es el
 * mismo `id` con el que el producto entra al carrito (ver `AddToCartButton`).
 *
 * Vacía a propósito: poner un precio inventado es peor que no mostrar
 * ninguno. Se carga así:
 *
 *     export const PRECIOS: Record<string, number> = {
 *       'gp-trich': 45,
 *       'gp-bauver': 52.5,
 *     };
 */
export const PRECIOS: Record<string, number> = {};

/**
 * El id con el que un producto del catálogo entra al carrito: su nombre en
 * minúsculas. "GP-Trich" → "gp-trich". Es también la clave de `PRECIOS`.
 */
export function idDeProducto(nombre: string): string {
  return nombre.trim().toLowerCase();
}

/** Precio de un producto, o `null` si todavía no tiene. */
export function precioDe(id: string): number | null {
  return PRECIOS[id] ?? null;
}

/** Monto en soles, con el formato que usa el Perú: S/ 1,234.50 */
export function formatearSoles(monto: number): string {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  }).format(monto);
}

export interface LineaPedido {
  id: string;
  quantity: number;
}

/**
 * Total del pedido. `completo` avisa si a alguna línea le falta precio: en
 * ese caso el total que se muestre es parcial y no sirve para cobrar.
 */
export function totalPedido(lineas: LineaPedido[]): { total: number; completo: boolean } {
  let total = 0;
  let completo = true;

  for (const linea of lineas) {
    const precio = precioDe(linea.id);
    if (precio === null) completo = false;
    else total += precio * linea.quantity;
  }

  return { total, completo };
}

export type MetodoPagoId = 'tarjeta' | 'yape' | 'plin' | 'transferencia';

/**
 * Los medios con los que se puede pagar. Tarjeta, Yape y Plin son los tres
 * que cualquiera de las pasarelas peruanas cubre en un mismo contrato; la
 * transferencia no necesita pasarela y por eso funciona desde ya.
 */
export const METODOS_PAGO: MetodoPagoId[] = ['tarjeta', 'yape', 'plin', 'transferencia'];

export type TipoComprobante = 'boleta' | 'factura';
