import { NextResponse } from 'next/server';

/**
 * Alta en la lista de novedades.
 *
 * Manda dos correos con Resend: el de bienvenida a quien se suscribe y un
 * aviso a la empresa, que es lo que hoy hace de lista de suscriptores
 * mientras no haya base de datos.
 *
 * La clave vive SOLO en el servidor. En producción va como secreto del
 * Worker (`wrangler secret put RESEND_API_KEY`) y en local en `.env.local`.
 * Sin clave configurada la ruta responde 503 y el formulario lo dice: nunca
 * finge que el correo salió.
 */
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/** Remitente. El dominio tiene que estar verificado en Resend. */
const REMITENTE = process.env.NEWSLETTER_FROM ?? 'Green Prod <novedades@greenprod.pe>';
const AVISO_A = process.env.NEWSLETTER_NOTIFY ?? 'contacto@greenprod.pe';

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function bienvenida(lang: string) {
  if (lang === 'en') {
    return {
      subject: 'Thanks for subscribing to Green Prod',
      html: `<p>Hello,</p>
<p>Thanks for subscribing to Green Prod &amp; Sustainable. From now on you will hear from us when we launch a product, run a seasonal campaign or open a promotion.</p>
<p>We only write when there is something worth telling. You can unsubscribe any time by replying to this email with the word <strong>UNSUBSCRIBE</strong>.</p>
<p>Green Prod &amp; Sustainable S.A.C.<br>Nuevo Chimbote, Áncash, Peru<br>+51 919 514 085</p>`,
    };
  }

  return {
    subject: 'Gracias por suscribirte a Green Prod',
    html: `<p>Hola,</p>
<p>Gracias por suscribirte a Green Prod &amp; Sustainable. Desde ahora te avisamos cuando lancemos un producto, abramos una promoción o arranque una campaña de temporada.</p>
<p>Solo escribimos cuando hay algo que contar. Puedes darte de baja cuando quieras respondiendo a este correo con la palabra <strong>BAJA</strong>.</p>
<p>Green Prod &amp; Sustainable S.A.C.<br>Nuevo Chimbote, Áncash, Perú<br>+51 919 514 085</p>`,
  };
}

async function enviar(apiKey: string, to: string, subject: string, html: string) {
  const respuesta = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: REMITENTE, to: [to], subject, html }),
  });

  if (!respuesta.ok) {
    throw new Error(`resend ${respuesta.status}: ${await respuesta.text()}`);
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  const { email, lang, consent } = (body ?? {}) as {
    email?: string;
    lang?: string;
    consent?: boolean;
  };

  if (typeof email !== 'string' || !CORREO_VALIDO.test(email.trim())) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }

  // Sin la casilla marcada no se manda nada: es el consentimiento que exige
  // la Ley 29733 para escribir con fines comerciales.
  if (consent !== true) {
    return NextResponse.json({ error: 'consent_required' }, { status: 400 });
  }

  const correo = email.trim().toLowerCase();
  const idioma = lang === 'en' ? 'en' : 'es';
  const { subject, html } = bienvenida(idioma);

  try {
    await enviar(apiKey, correo, subject, html);
  } catch (error) {
    console.error('No se pudo enviar la bienvenida', error);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  // El aviso a la empresa va después y no puede tumbar la suscripción: si
  // falla, la persona ya recibió su correo y eso es lo que importa.
  try {
    await enviar(
      apiKey,
      AVISO_A,
      'Nueva suscripción a novedades',
      `<p>Se suscribió <strong>${correo}</strong> desde la web (${idioma}).</p>
<p>Fecha: ${new Date().toISOString()}</p>`
    );
  } catch (error) {
    console.error('No se pudo avisar a la empresa de la nueva suscripción', error);
  }

  return NextResponse.json({ ok: true });
}
