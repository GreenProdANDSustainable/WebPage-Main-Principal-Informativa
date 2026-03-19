import * as motion from 'motion/react-client';
import { Target, Eye, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface MissionVisionSectionProps {
    dict: any;
}

export default function MissionVisionSection({ dict }: MissionVisionSectionProps) {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gp-green/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gp-blue/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gp-green/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 text-gp-green text-sm font-bold uppercase tracking-widest mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span className="h-px w-8 bg-gp-green"></span>
                        {dict.Home.missionVision.essence_title}
                        <span className="h-px w-8 bg-gp-green"></span>
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        {dict.Home.missionVision.title}
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        {dict.Home.missionVision.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Mission Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gp-blue via-gp-blue to-blue-600 opacity-90"></div>
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMzAgMEwzMCA2MCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+CjxwYXRoIGQ9Ik0wIDMwTDYwIDMwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30"></div>
                        
                        <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                            {/* Icon */}
                            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <Target className="w-10 h-10 text-white" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6">
                                {dict.Home.missionVision.mission.title}
                            </h3>
                            
                            <p className="text-lg md:text-xl leading-relaxed text-white/90">
                                {dict.Home.missionVision.mission.text}
                            </p>

                            {/* Decorative corner */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
                                <div className="absolute bottom-0 right-0 w-full h-full border-b-4 border-r-4 border-white rounded-tl-3xl"></div>
                            </div>
                        </div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gp-blue opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    </motion.div>

                    {/* Vision Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gp-green via-gp-green to-emerald-600 opacity-90"></div>
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMzAgMEwzMCA2MCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+CjxwYXRoIGQ9Ik0wIDMwTDYwIDMwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30"></div>
                        
                        <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                            {/* Icon */}
                            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                                <Eye className="w-10 h-10 text-white" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6">
                                {dict.Home.missionVision.vision.title}
                            </h3>
                            
                            <p className="text-lg md:text-xl leading-relaxed text-white/90">
                                {dict.Home.missionVision.vision.text}
                            </p>

                            {/* Decorative corner */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
                                <div className="absolute bottom-0 right-0 w-full h-full border-b-4 border-r-4 border-white rounded-tl-3xl"></div>
                            </div>
                        </div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gp-green opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
