import * as motion from 'motion/react-client';

interface ValuesSectionProps {
  dict: any;
  values: any[];
}

export default function ValuesSection({ dict, values }: ValuesSectionProps) {
  return (
    <section className="bg-ink-soft py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div
            className="text-gp-green mb-4 text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-plex-mono)' }}
          >
            {dict.Home.values.label}
          </div>
          <h2 className="font-display text-paper mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {dict.Home.values.title}
          </h2>
          <p className="text-husk/70 mx-auto max-w-3xl text-lg">{dict.Home.values.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="border-line-warm/15 bg-ink hover:border-gp-green/40 group flex flex-col items-center rounded-3xl border p-8 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 transition-colors duration-300 group-hover:bg-white/10">
                  <Icon className="text-gp-green h-10 w-10" />
                </div>
                <h3 className="font-display text-paper mb-3 text-xl font-semibold">{v.title}</h3>
                <p className="text-husk/70 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
