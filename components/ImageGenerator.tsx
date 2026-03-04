'use client';

import { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Loader2, Image as ImageIcon, Download, Settings2 } from 'lucide-react';
import Image from 'next/image';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    // Check if the user has selected an API key
    const checkKey = async () => {
      if (typeof window !== 'undefined' && window.aistudio) {
        const hasSelected = await window.aistudio.hasSelectedApiKey();
        setHasKey(hasSelected);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (typeof window !== 'undefined' && window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success to mitigate race condition
      setHasKey(true);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Create a new instance right before making the call to ensure the latest key is used
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
            imageSize: imageSize,
          },
        },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const imageUrl = `data:${part.inlineData.mimeType};base64,${base64EncodeString}`;
          setGeneratedImage(imageUrl);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        setError('El modelo no devolvió una imagen. Intenta con otro prompt.');
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('Requested entity was not found')) {
        setError('Error de API Key. Por favor, selecciona tu API Key nuevamente.');
        setHasKey(false);
      } else {
        setError(err.message || 'Ocurrió un error al generar la imagen.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center">
        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <Settings2 className="h-8 w-8 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Configuración Requerida</h3>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Para utilizar la generación de imágenes de alta calidad con Gemini 3 Pro, necesitas seleccionar tu API Key de Google Cloud.
        </p>
        <button
          onClick={handleSelectKey}
          className="rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Seleccionar API Key
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
      <div className="flex flex-col gap-8">
        {/* Controles */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Prompt (Descripción)</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                placeholder="Ej. Un envase de bioinsumo verde en un campo..."
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Aspecto</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                >
                  <option value="1:1">1:1</option>
                  <option value="4:3">4:3</option>
                  <option value="3:4">3:4</option>
                  <option value="16:9">16:9</option>
                  <option value="9:16">9:16</option>
                  <option value="21:9">21:9</option>
                  <option value="3:2">3:2</option>
                  <option value="2:3">2:3</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Calidad</label>
                <select
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                >
                  <option value="1K">1K</option>
                  <option value="2K">2K</option>
                  <option value="4K">4K</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <ImageIcon className="h-5 w-5" />
                  Generar Imagen
                </>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Resultado */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden p-4">
          {isGenerating ? (
            <div className="flex flex-col items-center text-slate-400">
              <Loader2 className="h-10 w-10 animate-spin mb-4 text-blue-500" />
              <p className="text-sm font-medium">Creando tu imagen con IA...</p>
            </div>
          ) : generatedImage ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center group">
              <img
                src={generatedImage}
                alt="Imagen generada"
                className="max-w-full max-h-[400px] object-contain rounded-xl shadow-md"
              />
              <a
                href={generatedImage}
                download="greenprod-ai-image.png"
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                title="Descargar"
              >
                <Download className="h-5 w-5" />
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400">
              <ImageIcon className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-sm font-medium text-center">La imagen generada aparecerá aquí</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
