import AnimatedStat from '@/components/shared/AnimatedStat';

interface ImpactStatsSectionProps {
  dict: any;
  stats: any[];
}

export default function ImpactStatsSection({ dict, stats }: ImpactStatsSectionProps) {
  return (
    <section className="border-t border-white/5 bg-[#1a4430] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#beede0] md:text-5xl">
            {dict.Home.stats.title}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStat
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
