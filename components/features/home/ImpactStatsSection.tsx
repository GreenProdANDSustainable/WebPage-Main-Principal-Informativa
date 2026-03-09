import AnimatedStat from '@/components/shared/AnimatedStat';

interface ImpactStatsSectionProps {
    dict: any;
    stats: any[];
}

export default function ImpactStatsSection({ dict, stats }: ImpactStatsSectionProps) {
    return (
        <section className="py-16 md:py-24 bg-[#1a4430] border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-[#beede0]">
                        {dict.Home.stats.title}
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <AnimatedStat key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
                    ))}
                </div>
            </div>
        </section>
    );
}
