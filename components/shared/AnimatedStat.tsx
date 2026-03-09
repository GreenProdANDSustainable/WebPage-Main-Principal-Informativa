'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion';

interface AnimatedStatProps {
    value: number;
    suffix: string;
    label: string;
}

export default function AnimatedStat({ value, suffix, label }: AnimatedStatProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        if (isInView) {
            const animation = animate(count, value, { duration: 2, ease: 'easeOut' });
            return () => animation.stop();
        }
    }, [isInView, count, value]);

    return (
        <div ref={ref} className="flex flex-col items-center text-center">
            <div className="text-5xl md:text-6xl font-serif font-bold mb-2 text-[#beede0]">
                <motion.span>{rounded}</motion.span>
                {suffix}
            </div>
            <div className="text-lg text-[#e8e4db]/80">
                {label}
            </div>
        </div>
    );
}
