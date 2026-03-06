// AUN EN DESARROLLO E IMPLEMENTACION, NO IMPLEMENTADO, IMPLEMENTAR
'use client';

import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! Soy el asistente virtual de Green Prod & Sustainable. ¿En qué puedo ayudarte hoy? (Ej. "Recomiéndame un bioinsumo para tomates" o "Explícame los beneficios del compostaje")' }
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
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'Eres un asistente experto en agricultura sostenible, bioinsumos, conservas premium y proyectos ambientales. Trabajas para la empresa "Green Prod & Sustainable". Responde de manera profesional, concisa y persuasiva. Recomienda productos del catálogo cuando sea relevante.',
        },
      });

      // Replay history
      for (let i = 1; i < messages.length; i++) {
        // Note: The SDK manages chat history automatically if we use the same chat instance,
        // but since we create a new instance per request (for simplicity in this stateless component),
        // we should ideally pass history. For this simple demo, we'll just send the latest message.
        // A more robust implementation would maintain the chat instance or pass history.
      }

      // We'll just send the current message for simplicity, but ideally we'd use the chat instance properly.
      // To keep it simple and avoid history formatting issues, let's just use generateContent with the full context.

      const promptContext = messages.map(m => `${m.role === 'user' ? 'Cliente' : 'Asistente'}: ${m.text}`).join('\n') + `\nCliente: ${userMessage}\nAsistente:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: promptContext,
        config: {
          systemInstruction: 'Eres un asistente experto en agricultura sostenible, bioinsumos, conservas premium y proyectos ambientales. Trabajas para la empresa "Green Prod & Sustainable". Responde de manera profesional, concisa y persuasiva. Recomienda productos del catálogo cuando sea relevante.',
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Lo siento, no pude procesar tu solicitud.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Ocurrió un error al conectar con el servidor. Por favor, intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
      <div className="bg-green-600 p-4 text-white flex items-center gap-3">
        <Bot className="h-6 w-6" />
        <div>
          <h3 className="font-bold">Asistente Green Prod</h3>
          <p className="text-xs text-green-100">Desarrollado con Gemini 3 Flash</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user'
                ? 'bg-green-600 text-white rounded-tr-none'
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
              }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2 text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Escribiendo...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu consulta aquí..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="rounded-xl bg-green-600 px-4 py-3 text-white transition-all hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
