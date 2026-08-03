import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// La clave vive SOLO en el servidor: nunca se envía al navegador.
// Se configura como secreto del Worker (GEMINI_API_KEY) o en .env.local para
// desarrollo. El modelo es configurable con GEMINI_MODEL (por si se quiere
// cambiar a uno más reciente sin tocar el código).
const SYSTEM_INSTRUCTION =
  'Eres el asistente virtual de "Green Prod & Sustainable S.A.C", una empresa peruana de ' +
  'economía circular agroindustrial (bioinsumos, fertilizantes orgánicos, conservas premium ' +
  'y proyectos ambientales). Responde de manera profesional, cálida, concisa y en español. ' +
  'Recomienda productos o servicios de la empresa cuando sea relevante y sugiere contactar ' +
  'por WhatsApp o el formulario de contacto para cotizaciones. No inventes datos que no conozcas.';

interface IncomingMessage {
  role: 'user' | 'model';
  text: string;
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown })?.messages;
  const messages: IncomingMessage[] = Array.isArray(rawMessages)
    ? (rawMessages as IncomingMessage[]).filter(
        (m) => m && (m.role === 'user' || m.role === 'model') && typeof m.text === 'string'
      )
    : [];

  const contents = messages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }],
  }));

  // La conversación enviada al modelo debe empezar por un turno de "user".
  while (contents.length > 0 && contents[0].role === 'model') {
    contents.shift();
  }

  if (contents.length === 0) {
    return NextResponse.json({ error: 'empty' }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    return NextResponse.json({ text: response.text ?? '' });
  } catch (error) {
    console.error('AIAssistant chat error:', error);
    return NextResponse.json({ error: 'upstream' }, { status: 502 });
  }
}
