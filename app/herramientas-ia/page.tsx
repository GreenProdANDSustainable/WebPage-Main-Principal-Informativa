import ImageGenerator from '@/components/ImageGenerator';
import AIAssistant from '@/components/AIAssistant';
import { Sparkles, Bot } from 'lucide-react';

export default function HerramientasIA() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
            <Sparkles className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Herramientas de Inteligencia Artificial
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Potencia tu estrategia de marketing y visualización de productos con nuestras herramientas impulsadas por Gemini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Generador de Imágenes */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">Generador Visual Pro</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Crea mockups de productos, conceptos de empaques o imágenes para campañas de marketing utilizando el modelo Gemini 3 Pro Image.
            </p>
            <ImageGenerator />
          </div>

          {/* Asistente Virtual */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bot className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">Asistente Experto</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Consulta sobre nuestros productos, obtén recomendaciones personalizadas para tus cultivos o resuelve dudas sobre proyectos ambientales.
            </p>
            <AIAssistant />
          </div>
        </div>
      </div>
    </div>
  );
}
