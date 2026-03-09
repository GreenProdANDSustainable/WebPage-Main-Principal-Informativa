// TODO: En construcción - Insertar la URL del video corporativo aquí
export default function VideoSection() {
    return (
        <section className="py-24 bg-slate-900">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-serif text-4xl font-bold text-white mb-4">Nuestra Esencia</h2>
                <p className="text-slate-400 mb-10">Descubre quiénes somos en un minuto.</p>
                {/* Video Placeholder */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-800 flex items-center justify-center border border-white/10">
                    <div className="flex flex-col items-center gap-4 text-slate-500">
                        <div className="h-20 w-20 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center">
                            <span className="text-4xl">▶</span>
                        </div>
                        <span className="font-semibold text-sm uppercase tracking-wider">Video Corporativo — Próximamente</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
