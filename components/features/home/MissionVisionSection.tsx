import * as motion from 'motion/react-client';
import { Target, Eye, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface MissionVisionSectionProps {
  dict: any;
}

export default function MissionVisionSection({ dict }: MissionVisionSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 md:py-24">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="bg-gp-green/10 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl"></div>
        <div className="bg-gp-blue/10 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"></div>
        <div className="bg-gp-green/5 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="text-gp-green mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
            <Sparkles className="h-4 w-4" />
            <span className="bg-gp-green h-px w-8"></span>
            {dict.Home.missionVision.essence_title}
            <span className="bg-gp-green h-px w-8"></span>
            <Sparkles className="h-4 w-4" />
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold text-slate-900 md:text-5xl">
            {dict.Home.missionVision.title}
          </h2>
          <p className="mx-auto max-w-2xl text-slate-500">{dict.Home.missionVision.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
          >
            {/* Gradient overlay */}
            <div className="from-gp-blue via-gp-blue absolute inset-0 bg-gradient-to-br to-blue-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMzAgMEwzMCA2MCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+CjxwYXRoIGQ9Ik0wIDMwTDYwIDMwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30"></div>

            <div className="relative z-10 flex h-full flex-col p-8 md:p-12">
              {/* Icon */}
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Target className="h-10 w-10 text-white" />
              </div>

              <h3 className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">
                {dict.Home.missionVision.mission.title}
              </h3>

              <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                {dict.Home.missionVision.mission.text}
              </p>

              {/* Decorative corner */}
              <div className="absolute right-0 bottom-0 h-32 w-32 opacity-20">
                <div className="absolute right-0 bottom-0 h-full w-full rounded-tl-3xl border-r-4 border-b-4 border-white"></div>
              </div>
            </div>

            {/* Hover glow effect */}
            <div className="bg-gp-blue absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"></div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
          >
            {/* Gradient overlay */}
            <div className="from-gp-green via-gp-green absolute inset-0 bg-gradient-to-br to-emerald-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMzAgMEwzMCA2MCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+CjxwYXRoIGQ9Ik0wIDMwTDYwIDMwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30"></div>

            <div className="relative z-10 flex h-full flex-col p-8 md:p-12">
              {/* Icon */}
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <Eye className="h-10 w-10 text-white" />
              </div>

              <h3 className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">
                {dict.Home.missionVision.vision.title}
              </h3>

              <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                {dict.Home.missionVision.vision.text}
              </p>

              {/* Decorative corner */}
              <div className="absolute right-0 bottom-0 h-32 w-32 opacity-20">
                <div className="absolute right-0 bottom-0 h-full w-full rounded-tl-3xl border-r-4 border-b-4 border-white"></div>
              </div>
            </div>

            {/* Hover glow effect */}
            <div className="bg-gp-green absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
