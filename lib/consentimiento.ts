/**
 * La decisión de la persona sobre las cookies.
 *
 * Se guarda en localStorage, no en una cookie, para no escribir nada en el
 * navegador antes de que la persona diga que sí — que es justo lo que exige
 * la Ley 29733 de Protección de Datos Personales.
 *
 * Alcance de lo que hay acá: **solo este sitio**. Una cookie no puede leer
 * el correo de nadie ni alcanzar sus otras cuentas; para mandar correos hace
 * falta que la persona los deje ella misma y acepte recibirlos, que es lo
 * que hace `NewsletterForm`, aparte y con su propia casilla.
 *
 * Se lee como sistema externo (`useSyncExternalStore`), igual que el carrito:
 * así el componente no necesita un efecto que sincronice estado.
 */
export const CLAVE_CONSENTIMIENTO = 'greenprod-cookies';

export interface Consentimiento {
  /** Carrito e idioma. Siempre activas: sin ellas el sitio no funciona. */
  necesarias: true;
  /** Cuántas personas entran y qué ven, en forma agregada. */
  medicion: boolean;
  /** Cuándo se decidió, en ISO. Sirve para volver a preguntar si caduca. */
  fecha: string;
}

/** Un año: pasado ese plazo se vuelve a preguntar. */
const VIGENCIA_MESES = 12;

type Escucha = () => void;
let escuchas: Escucha[] = [];
let decidido: boolean | null = null;

export function leerConsentimiento(): Consentimiento | null {
  try {
    const crudo = window.localStorage.getItem(CLAVE_CONSENTIMIENTO);
    if (!crudo) return null;

    const guardado = JSON.parse(crudo) as Consentimiento;
    const vence = new Date(guardado.fecha);
    vence.setMonth(vence.getMonth() + VIGENCIA_MESES);

    return vence > new Date() ? guardado : null;
  } catch {
    return null;
  }
}

export function suscribirConsentimiento(escucha: Escucha) {
  escuchas.push(escucha);
  return () => {
    escuchas = escuchas.filter((e) => e !== escucha);
  };
}

/**
 * ¿Ya hay una decisión vigente? El valor se guarda en memoria para que las
 * llamadas repetidas devuelvan siempre lo mismo: `useSyncExternalStore`
 * compara el resultado con `Object.is` en cada render.
 */
export function hayDecision(): boolean {
  if (decidido === null) decidido = leerConsentimiento() !== null;
  return decidido;
}

/**
 * En el servidor se responde que sí para que el aviso no salga en el HTML
 * inicial: si saliera, parpadearía en la cara de quien ya decidió.
 */
export function hayDecisionEnServidor(): boolean {
  return true;
}

export function guardarConsentimiento(medicion: boolean): Consentimiento {
  const decision: Consentimiento = {
    necesarias: true,
    medicion,
    fecha: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(CLAVE_CONSENTIMIENTO, JSON.stringify(decision));
  } catch {
    // Almacenamiento no disponible: la decisión vale para esta visita.
  }

  decidido = true;
  escuchas.forEach((e) => e());
  return decision;
}
