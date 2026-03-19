interface PartnersSectionProps {
    dict: any;
}

export default function PartnersSection({ dict }: PartnersSectionProps) {
    return (
        <section className="py-20 bg-white border-y border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-3 rounded-full border-2 border-dashed border-slate-300 px-8 py-4 text-slate-400">
                    <span className="text-2xl">🤝</span>
                    <span className="font-semibold text-sm uppercase tracking-wider">{dict.Partners.title}</span>
                </div>
            </div>
        </section>
    );
}
