interface PartnersSectionProps {
  dict: any;
}

export default function PartnersSection({ dict }: PartnersSectionProps) {
  return (
    <section className="border-y border-slate-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-3 rounded-full border-2 border-dashed border-slate-300 px-8 py-4 text-slate-400">
          <span className="text-2xl">🤝</span>
          <span className="text-sm font-semibold tracking-wider uppercase">
            {dict.Partners.title}
          </span>
        </div>
      </div>
    </section>
  );
}
