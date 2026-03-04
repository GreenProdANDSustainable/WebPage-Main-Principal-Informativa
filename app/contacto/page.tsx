import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contacto() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Contáctanos
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Estamos listos para ayudarte a implementar soluciones sostenibles en tu empresa. Escríbenos y un asesor se pondrá en contacto contigo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Información de Contacto */}
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Información de Contacto</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Oficina Principal</h3>
                    <p className="text-slate-600 mt-1">Av. Sostenibilidad 123, Distrito Verde<br />Lima, Perú</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Teléfono</h3>
                    <p className="text-slate-600 mt-1">+51 987 654 321<br />Atención de Lunes a Viernes, 9am - 6pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Correo Electrónico</h3>
                    <p className="text-slate-600 mt-1">contacto@greenprod.pe<br />ventas@greenprod.pe</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa (Placeholder) */}
            <div className="h-64 bg-slate-200 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-medium">
                [Mapa Interactivo]
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8">Envíanos un Mensaje</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-sm font-medium text-slate-700">Nombre Completo</label>
                  <input
                    type="text"
                    id="nombre"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="empresa" className="text-sm font-medium text-slate-700">Empresa</label>
                  <input
                    type="text"
                    id="empresa"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    placeholder="Ej. AgroIndustrias S.A."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="juan@empresa.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="asunto" className="text-sm font-medium text-slate-700">Asunto</label>
                <select
                  id="asunto"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white"
                >
                  <option>Consulta sobre Bioinsumos</option>
                  <option>Consulta sobre Conservas</option>
                  <option>Proyectos Ambientales</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-sm font-medium text-slate-700">Mensaje</label>
                <textarea
                  id="mensaje"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full rounded-xl bg-green-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-green-700 shadow-lg shadow-green-600/30"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
