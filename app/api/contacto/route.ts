import { NextResponse } from 'next/server';

/**
 * Formulario de contacto.
 *
 * Manda el mensaje del lead a la empresa por correo con Resend, igual que
 * `/api/suscripcion`. Antes el botón "Enviar Mensaje" no hacía nada — esta
 * ruta es lo que lo conecta a algo real.
 *
 * La clave vive SOLO en el servidor. En producción va como secreto del
 * Worker (`wrangler secret put RESEND_API_KEY`) y en local en `.env.local`.
 * Sin clave configurada la ruta responde 503 y el formulario lo dice: nunca
 * finge que el mensaje salió.
 */
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/** Remitente. El dominio tiene que estar verificado en Resend. */
const REMITENTE = process.env.CONTACT_FROM ?? 'Green Prod <novedades@greenprod.pe>';
const RECIBE_A = process.env.CONTACT_NOTIFY ?? 'ventas@greenprod.pe,gerencia@greenprod.pe';

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_TEXTO = 2000;

function escapeHtml(texto: string) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function enviar(apiKey: string, to: string[], subject: string, html: string) {
  const respuesta = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: REMITENTE, to, subject, html }),
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

  const { name, company, email, subject, message } = (body ?? {}) as {
    name?: string;
    company?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  const nombre = typeof name === 'string' ? name.trim() : '';
  const empresa = typeof company === 'string' ? company.trim() : '';
  const correo = typeof email === 'string' ? email.trim() : '';
  const asunto = typeof subject === 'string' ? subject.trim() : '';
  const mensaje = typeof message === 'string' ? message.trim() : '';

  if (!nombre || !CORREO_VALIDO.test(correo) || !asunto || !mensaje) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  }
  if (nombre.length > 200 || empresa.length > 200 || mensaje.length > MAX_TEXTO) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  }

  const destinatarios = RECIBE_A.split(',')
    .map((direccion) => direccion.trim())
    .filter(Boolean);

  const html = `<p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
<p><strong>Empresa:</strong> ${escapeHtml(empresa) || '—'}</p>
<p><strong>Correo:</strong> ${escapeHtml(correo)}</p>
<p><strong>Asunto:</strong> ${escapeHtml(asunto)}</p>
<p><strong>Mensaje:</strong></p>
<p>${escapeHtml(mensaje).replace(/\n/g, '<br>')}</p>
<hr>
<p>Fecha: ${new Date().toISOString()}</p>`;

  try {
    await enviar(apiKey, destinatarios, `Contacto web: ${asunto} — ${nombre}`, html);
  } catch (error) {
    console.error('No se pudo enviar el mensaje de contacto', error);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
