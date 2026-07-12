interface VideoSectionProps {
  dict: any;
}

export default function VideoSection({ dict }: VideoSectionProps) {
  return (
    <section className="bg-gp-white py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 font-serif text-4xl font-bold text-slate-900">{dict.Video.title}</h2>
        <p className="mb-10 text-slate-600">{dict.Video.subtitle}</p>
        {/* Video Placeholder */}
        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-800">
          <div className="flex flex-col items-center gap-4 text-slate-500">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-slate-600">
              <span className="text-4xl">▶</span>
            </div>
            <span className="text-sm font-semibold tracking-wider uppercase">
              {dict.Video.placeholder}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
