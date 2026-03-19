interface ValuesSectionProps {
    dict: any;
    values: any[];
}

export default function ValuesSection({ dict, values }: ValuesSectionProps) {
    return (
        <section className="py-16 md:py-24 bg-[#1a4430]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="text-[11px] md:text-[12px] leading-[12px] tracking-[2px] font-bold uppercase mb-4 text-[#e8e4db]">
                        {dict.Home.values.label}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#beede0] mb-4">
                        {dict.Home.values.title}
                    </h2>
                    <p className="text-lg text-[#e8e4db]/90 max-w-3xl mx-auto">
                        {dict.Home.values.subtitle}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((v) => {
                        const Icon = v.icon;
                        return (
                            <div key={v.id} className="flex flex-col items-center text-center group p-8 rounded-2xl bg-[#112a1f] border border-[#1a4430]/30 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300">
                                <div className="mb-6">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#beede0]/10 transition-colors duration-300">
                                        <Icon className="w-10 h-10 text-[#beede0]" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-serif font-bold text-[#beede0] mb-3">
                                    {v.title}
                                </h3>
                                <p className="text-[#e8e4db]/80 leading-relaxed text-sm">
                                    {v.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
