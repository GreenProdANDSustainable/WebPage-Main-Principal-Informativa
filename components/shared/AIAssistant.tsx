// Asistente conversacional con Gemini. La clave vive en el servidor
// (variable GEMINI_API_KEY); este componente solo habla con /api/chat.
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: '¡Hola! Soy el asistente virtual de Green Prod & Sustainable S.A.C. ¿En qué puedo ayudarte hoy? (Ej. "Recomiéndame un bioinsumo para tomates" o "Explícame los beneficios del compostaje")',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const history = [...messages, { role: 'user' as const, text: userMessage }];
    setInput('');
    setMessages(history);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        const fallback =
          res.status === 503
            ? 'El asistente todavía no está disponible. Por favor, escríbenos por WhatsApp o el formulario de contacto.'
            : 'Ocurrió un error al conectar con el asistente. Por favor, intenta de nuevo.';
        setMessages((prev) => [...prev, { role: 'model', text: fallback }]);
        return;
      }

      const data = (await res.json()) as { text?: string };
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: data.text || 'Lo siento, no pude procesar tu solicitud.' },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: 'Ocurrió un error al conectar con el asistente. Por favor, intenta de nuevo.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 bg-green-600 p-4 text-white">
        <Bot className="h-6 w-6" />
        <div>
          <h3 className="font-bold">Asistente Green Prod</h3>
          <p className="text-xs text-green-100">Desarrollado con IA de Google (Gemini)</p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'rounded-tr-none bg-green-600 text-white'
                  : 'rounded-tl-none border border-slate-200 bg-white text-slate-700 shadow-sm'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl rounded-tl-none border border-slate-200 bg-white p-4 text-slate-500 shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Escribiendo...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-200 bg-white p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu consulta aquí..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 transition-all outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="rounded-xl bg-green-600 px-4 py-3 text-white transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
