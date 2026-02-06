"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check, Copy } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import InteractiveHoverText from "@/components/ui/interactive-hover-text";

interface HeroCardProps {
    index: number;
    activeIndex: number;
    basePalettes: string[][];
    isMobile: boolean;
    collapseFactor: MotionValue<number>;
    onPrev: (e: React.MouseEvent) => void;
    onNext: (e: React.MouseEvent) => void;
    setActiveIndex: (index: number) => void;
}

const HeroCard = ({ index, activeIndex, basePalettes, isMobile, collapseFactor, onPrev, onNext, setActiveIndex }: HeroCardProps) => {
    const offset = index - 2; // -2, -1, 0, 1, 2
    const isCenterCard = offset === 0;

    // Calculate dynamic palettes
    const cardPalettes = Array.from({ length: 4 }).map((_, idx) => {
        const paletteIdx = (index + activeIndex + idx) % basePalettes.length;
        return basePalettes[paletteIdx];
    });


    const targetX = offset * (isMobile ? 35 : 60);
    const targetRotate = offset * (isMobile ? 8 : 12);
    const targetY = Math.abs(offset) * (isMobile ? 8 : 15);

    const x = useTransform(collapseFactor, (v) => targetX * v);
    const rotate = useTransform(collapseFactor, (v) => targetRotate * v);
    const y = useTransform(collapseFactor, (v) => targetY * v);

    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            animate={{
                opacity: 1,
                scale: isCenterCard ? 1.05 : 1,
                zIndex: 10 - Math.abs(offset),
            }}
            style={{
                x,
                rotate,
                y,
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'subpixel-antialiased'
            }}
            transition={{
                duration: 0.6,
                delay: 0.05 + (Math.abs(offset) * 0.05),
                ease: [0.22, 1, 0.36, 1]
            }}
            className={`absolute w-[160px] h-[240px] md:w-[240px] md:h-[360px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-xl md:rounded-2xl shadow-2xl origin-bottom overflow-hidden flex flex-col will-change-transform backface-visibility-hidden ${isCenterCard ? 'pointer-events-auto cursor-default' : ''}`}
        >
            {/* Card Header */}
            <div className="h-8 border-b border-neutral-100 dark:border-white/5 bg-neutral-50 dark:bg-white/5 flex items-center px-3 gap-1.5 z-20 relative">
                <button
                    onClick={(e) => { e.stopPropagation(); onPrev(e); }}
                    className="w-2.5 h-2.5 rounded-full bg-red-500/80 dark:bg-red-500/90 hover:scale-125 transition-transform active:scale-90 cursor-pointer"
                    aria-label="Previous Card"
                />
                <button
                    onClick={(e) => { e.stopPropagation(); onNext(e); }}
                    className="w-2.5 h-2.5 rounded-full bg-green-500/80 dark:bg-green-500/90 hover:scale-125 transition-transform active:scale-90 cursor-pointer"
                    aria-label="Next Card"
                />
            </div>

            {/* Multiple Mini Palettes inside the card */}
            <div className="p-3 space-y-3 flex-1 overflow-hidden">
                {cardPalettes.map((colors, pIdx) => (
                    <div key={pIdx} className="space-y-1.5">
                        {/* Mini Palette Strip */}
                        <div className="h-10 w-full rounded-lg flex overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
                            {colors.map((c, cIdx) => (
                                <div
                                    key={cIdx}
                                    className="h-full flex-1 relative group"
                                    style={{ backgroundColor: c }}
                                >
                                    {isCenterCard && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 backdrop-blur-[1px]">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider drop-shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-200">
                                                {c}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* Fake Text Lines */}
                        <div className="flex gap-2 px-1">
                            <div className="h-1.5 w-1/3 rounded-full bg-neutral-100 dark:bg-white/10" />
                            <div className="h-1.5 w-1/4 rounded-full bg-neutral-100 dark:bg-white/10" />
                        </div>
                    </div>
                ))}
                {/* Fade out at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white dark:from-neutral-900 to-transparent pointer-events-none" />
            </div>
        </motion.div>
    );
};

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const collapseFactor = useTransform(scrollY, [0, 700], [1, 0]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Define base palettes (moved from inside loop)
    const basePalettes = [
        ["#FF5733", "#FFC300", "#DAF7A6", "#C70039"], // Warm
        ["#900C3F", "#581845", "#FFC300", "#FF5733"], // Rich
        ["#33FF57", "#33FFBD", "#3375FF", "#7D33FF"], // Cool
        ["#FF33A8", "#FF3361", "#FF3333", "#FF8633"], // Pink/Orange
        ["#005761", "#00baca", "#f0fbff", "#ffdad6"], // Teal/Cyan
    ];

    const handlePrev = (e: React.MouseEvent) => {
        // e.stopPropagation(); is handled in HeroCard
        setActiveIndex((prev) => (prev - 1 + 5) % 5);
    };

    const handleNext = (e: React.MouseEvent) => {
        // e.stopPropagation(); is handled in HeroCard
        setActiveIndex((prev) => (prev + 1) % 5);
    };

    return (
        <section ref={containerRef} className="relative w-full overflow-hidden bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col items-center pt-24 md:pt-32 pb-20 transition-colors duration-300">
            {/* Background Gradients/Glows - Adjusted for both modes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[20%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-500/10 dark:bg-purple-900/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob will-change-transform" style={{ transform: 'translate3d(0,0,0)' }} />
                <div className="absolute bottom-[-10%] right-[10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-blue-500/10 dark:bg-blue-900/10 rounded-full blur-[60px] md:blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000 will-change-transform" style={{ transform: 'translate3d(0,0,0)' }} />
            </div>

            <div className="container relative z-10 px-4 flex flex-col items-center text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mb-6 md:mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-default">
                        New version v2.6.0
                        <span className="text-orange-500 dark:text-orange-400">🔥</span>
                        <ArrowRight className="w-3 h-3 text-black/50 dark:text-white/50" />
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="mb-6 max-w-4xl mx-auto"
                >
                    <InteractiveHoverText
                        text="Make beautiful websites regardless of your color experience"
                        className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-neutral-950 dark:text-white"
                    />
                </motion.div>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-base md:text-xl text-neutral-600 dark:text-white/60 max-w-2xl mx-auto mb-10 px-4"
                >
                    Design the perfect color palette or discover endless inspiration from thousands of curated color schemes.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center gap-4 mb-20 md:mb-24"
                >
                    <Link href="/picker">
                        <Button
                            className="h-12 px-16 sm:h-12 sm:px-8 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 font-medium text-sm sm:text-base transition-all active:scale-95 shadow-lg shadow-black/20 dark:shadow-white/5"
                        >
                            Get Started <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>

                    <Link href="/palettes">
                        <Button
                            className="h-12 px-12 sm:h-12 sm:px-8 rounded-full bg-white dark:bg-black text-black dark:text-white border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 font-medium text-sm sm:text-base transition-all active:scale-95"
                        >
                            Explore Palettes
                        </Button>
                    </Link>
                </motion.div>

                {/* Hero Visual - Fanned Cards */}
                <div className="relative w-full h-[320px] md:h-[400px] mt-4 md:mt-20 flex flex-col justify-center items-center select-none perspective-1000">
                    <div className="relative w-full h-full flex justify-center items-center">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <HeroCard
                                key={i}
                                index={i}
                                activeIndex={activeIndex}
                                basePalettes={basePalettes}
                                isMobile={isMobile}
                                collapseFactor={collapseFactor}
                                onPrev={handlePrev}
                                onNext={handleNext}
                                setActiveIndex={setActiveIndex}
                            />
                        ))}
                    </div>

                    {/* Navigation Dots - New Feature */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="relative z-20 mt-24 flex items-center justify-center gap-3 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md"
                    >
                        {[0, 1, 2, 3, 4].map((index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === index
                                    ? "bg-black dark:bg-white scale-125"
                                    : "bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
