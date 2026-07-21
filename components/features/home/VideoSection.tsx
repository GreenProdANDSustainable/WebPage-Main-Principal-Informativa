interface VideoSectionProps {
  dict: any;
}

export default function VideoSection({ dict }: VideoSectionProps) {
  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-ink mb-4 text-4xl font-semibold tracking-tight">
          {dict.Video.title}
        </h2>
        <p className="text-ink/60 mb-10">{dict.Video.subtitle}</p>
        <div className="border-line-warm/30 bg-ink-soft relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl border">
          <div className="text-husk/50 flex flex-col items-center gap-4">
            <div className="border-line-warm/40 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed">
              <span className="text-gp-green text-4xl">▶</span>
            </div>
            <span
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {dict.Video.placeholder}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
