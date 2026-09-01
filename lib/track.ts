/**
 * Medición de eventos de negocio (clic a WhatsApp, pedido de cotización).
 *
 * Hoy el sitio todavía no tiene GA4 ni Google Ads instalados. Este ayudante
 * está hecho para ese momento: cuando se agregue el script de medición y
 * defina `window.gtag` (o un `window.dataLayer`), estos eventos empiezan a
 * registrarse solos. Mientras tanto no hace nada y no rompe nada.
 *
 * Cuando entre GA4:
 *  1. Cargar el script de gtag en el layout, detrás del consentimiento de
 *     cookies de medición (ya existe el CookieBanner).
 *  2. En Google Ads, crear una conversión "Enviar formulario de contacto" y
 *     otra "Clic a WhatsApp", e importarlas o dispararlas con estos eventos.
 *
 * No enviar por acá datos personales (nombre, teléfono, correo): solo el tipo
 * de acción y datos de contexto no identificables (cultivo, zona, origen).
 */

type LeadEvento =
  | 'whatsapp_click' // tocó cualquier botón de WhatsApp del sitio
  | 'cotizacion_enviada' // completó y envió el formulario de /cotiza
  | 'enlace_bio_click'; // tocó un botón de la página /enlaces

type LeadDatos = Record<string, string | number | boolean | undefined>;

interface GtagWindow {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Record<string, unknown>[];
}

/**
 * Registra un evento de intención comercial. Seguro de llamar en cualquier
 * momento: si no hay medición cargada, simplemente no ocurre nada.
 */
export function trackLead(evento: LeadEvento, datos: LeadDatos = {}): void {
  if (typeof window === 'undefined') return;

  const w = window as unknown as GtagWindow;
  const carga = { evento, ...limpiar(datos) };

  try {
    if (typeof w.gtag === 'function') {
      w.gtag('event', evento, limpiar(datos));
    } else if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: `lead_${evento}`, ...carga });
    }
  } catch {
    // La medición nunca debe interrumpir la navegación.
  }
}

/** Quita las claves sin valor para no ensuciar el reporte. */
function limpiar(datos: LeadDatos): LeadDatos {
  return Object.fromEntries(
    Object.entries(datos).filter(([, valor]) => valor !== undefined && valor !== '')
  );
}

/**
 * Lee los parámetros UTM de la URL actual. Sirve para adjuntar el origen
 * (Instagram, Facebook, Google Ads) al mensaje que llega al asesor.
 */
export function leerUtm(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};

  for (const clave of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const valor = params.get(clave);
    if (valor) utm[clave] = valor;
  }

  return utm;
}
