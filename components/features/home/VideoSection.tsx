interface VideoSectionProps {
    dict: any;
}

export default function VideoSection({ dict }: VideoSectionProps) {
    return (
        <section className="py-24 bg-gp-white">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">{dict.Video.title}</h2>
                <p className="text-slate-600 mb-10">{dict.Video.subtitle}</p>
                {/* Video Placeholder */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-800 flex items-center justify-center border border-white/10">
                    <div className="flex flex-col items-center gap-4 text-slate-500">
                        <div className="h-20 w-20 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center">
                            <span className="text-4xl">▶</span>
                        </div>
                        <span className="font-semibold text-sm uppercase tracking-wider">{dict.Video.placeholder}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
