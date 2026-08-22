import Reveal from '@/components/shared/Reveal';

interface NewsSectionProps {
  dict: any;
}

// Los dos videos mas recientes de campo. `preload="none"` para no gastar
// datos de quien solo pasa de largo: recien cargan cuando alguien le da
// play.
const VIDEOS = ['/videos/ultima-novedad-1.mp4', '/videos/ultima-novedad-2.mp4'];

export default function NewsSection({ dict }: NewsSectionProps) {
  return (
    <section id="casos-exito" className="bg-paper py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal preset="growUp">
          <h2 className="font-display text-ink mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {dict.News.title}
          </h2>
        </Reveal>
        <Reveal preset="growUp" delay={0.1}>
          <p className="text-ink/60 mb-12 text-lg">{dict.News.subtitle}</p>
        </Reveal>

        <Reveal group gap={0.12} className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {VIDEOS.map((src) => (
            <Reveal key={src} preset="child">
              <video
                src={src}
                controls
                preload="none"
                playsInline
                className="aspect-video w-full rounded-3xl bg-black object-contain shadow-xl"
              />
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
