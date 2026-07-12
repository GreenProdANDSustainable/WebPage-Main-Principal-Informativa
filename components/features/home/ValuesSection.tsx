interface ValuesSectionProps {
  dict: any;
  values: any[];
}

export default function ValuesSection({ dict, values }: ValuesSectionProps) {
  return (
    <section className="bg-[#1a4430] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 text-[11px] leading-[12px] font-bold tracking-[2px] text-[#e8e4db] uppercase md:text-[12px]">
            {dict.Home.values.label}
          </div>
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#beede0] md:text-5xl">
            {dict.Home.values.title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-[#e8e4db]/90">{dict.Home.values.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.id}
                className="group flex flex-col items-center rounded-2xl border border-[#1a4430]/30 bg-[#112a1f] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
              >
                <div className="mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 transition-colors duration-300 group-hover:bg-[#beede0]/10">
                    <Icon className="h-10 w-10 text-[#beede0]" />
                  </div>
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-[#beede0]">{v.title}</h3>
                <p className="text-sm leading-relaxed text-[#e8e4db]/80">{v.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
