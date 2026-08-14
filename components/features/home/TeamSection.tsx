import Image from 'next/image';
import Reveal from '@/components/shared/Reveal';

interface TeamSectionProps {
  dict: any;
}

// Foto temporal de relleno (Unsplash) hasta que se reemplace por la foto
// real del equipo de Green Prod.
const TEAM_PHOTO_SRC =
  'https://images.unsplash.com/photo-1758599543116-4fdb887911a5?w=2400&q=80&auto=format&fit=crop';

export default function TeamSection({ dict }: TeamSectionProps) {
  const d = dict.Home.team;

  return (
    <section id="equipo" className="bg-ink relative overflow-hidden">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image src={TEAM_PHOTO_SRC} alt={d.imageAlt} fill sizes="100vw" className="object-cover" />
        <div className="from-ink via-ink/25 absolute inset-0 bg-gradient-to-t to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-8 text-center sm:pb-14 md:pb-20">
          <Reveal preset="growUp">
            <h2 className="font-display text-paper max-w-3xl text-xl font-semibold tracking-tight sm:text-3xl md:text-5xl">
              {d.title}
            </h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
