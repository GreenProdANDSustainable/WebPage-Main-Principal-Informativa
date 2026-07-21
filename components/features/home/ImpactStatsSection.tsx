import AnimatedStat from '@/components/shared/AnimatedStat';
import * as motion from 'motion/react-client';

interface ImpactStatsSectionProps {
  dict: any;
  stats: any[];
}

export default function ImpactStatsSection({ dict, stats }: ImpactStatsSectionProps) {
  return (
    <section className="border-line-warm/10 bg-ink-soft border-t py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-paper mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {dict.Home.stats.title}
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <AnimatedStat value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
