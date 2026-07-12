interface NewsSectionProps {
  dict: any;
}

export default function NewsSection({ dict }: NewsSectionProps) {
  return (
    <section className="bg-gp-neutral py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 font-serif text-4xl font-bold text-slate-400">{dict.News.title}</h2>
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-dashed border-slate-300 px-8 py-4 text-slate-400">
          <span className="text-2xl">📰</span>
          <span className="text-sm font-semibold tracking-wider uppercase">
            {dict.News.subtitle}
          </span>
        </div>
      </div>
    </section>
  );
}
