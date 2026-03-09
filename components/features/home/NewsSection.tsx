// TODO: En construcción - Agregar novedades, proyectos y casos de éxito
export default function NewsSection() {
    return (
        <section className="py-24 bg-gp-neutral">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-serif text-4xl font-bold text-slate-400 mb-4">Últimas Novedades</h2>
                <div className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-dashed border-slate-300 px-8 py-4 text-slate-400">
                    <span className="text-2xl">📰</span>
                    <span className="font-semibold text-sm uppercase tracking-wider">Casos de Éxito — Próximamente</span>
                </div>
            </div>
        </section>
    );
}
