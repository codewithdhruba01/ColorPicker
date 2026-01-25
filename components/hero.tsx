"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

const PALETTES = [
    ["#7c5cff", "#cd76ff", "#ffc4fd", "#52f2fd", "#c9f992"], // Main Card (Purple, Pink, Light Pink, Cyan, Lime)
    ["#0055ff", "#4da3ff", "#ffff00", "#ffc0cb", "#ff1493"],
    ["#1A472A", "#478A2D", "#A2D149", "#F5EAD1", "#C53D3D"],
];

const Hero = () => {
    const [currentPaletteIndex, setCurrentPaletteIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPaletteIndex((prev) => (prev + 1) % PALETTES.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const currentColors = PALETTES[currentPaletteIndex];

    return (
        <section className="relative w-full max-w-full overflow-hidden bg-white dark:bg-stone-950">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(#000 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-48">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-10 md:gap-24 lg:gap-32 items-center">
                    {/* Left Content */}
                    <div className="flex flex-col items-start space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                            className="relative"
                        >
                            <h1 className="text-[50px] sm:text-[64px] md:text-[98px] font-[900] font-chillax tracking-[-0.07em] text-black dark:text-white leading-[0.9] md:leading-[0.82] flex flex-col gap-1 md:gap-2">
                                <span>The super fast</span>
                                <span>color palettes</span>
                                <span>generator!</span>
                            </h1>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="absolute right-[-10px] md:right-[-5px] bottom-[-20px] md:bottom-[-35px] rotate-[-12deg] z-20 origin-center scale-90 md:scale-100"
                            >
                                <span className="relative z-10 font-cabinet-grotesk font-normal text-[14px] md:text-[18px] text-black dark:text-white uppercase tracking-[0.05em] px-2 py-1 block">
                                    AND MUCH MORE
                                </span>
                                <div className="absolute inset-x-0 inset-y-0 translate-x-[-22%] translate-y-[-30%] w-[145%] h-[175%]">
                                    <svg viewBox="0 0 140 50" className="w-full h-full fill-none stroke-black dark:stroke-white stroke-[0.8]">
                                        <path d="M10,25 C10,12 40,6 80,9 C120,12 135,18 132,28 C129,38 95,43 55,41 C25,39 10,32 10,25 C10,18 30,10 75,8.5" />
                                    </svg>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
                            className="text-[17px] md:text-[20px] text-black/60 dark:text-white/60 max-w-sm md:max-w-md font-general-sans font-medium leading-[1.3] pt-6"
                        >
                            Create the perfect palette or get inspired by thousands of beautiful color schemes.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                            className="flex flex-col md:flex-row gap-3 md:gap-5 pt-0 w-full md:w-auto"
                        >
                            <Link href="/picker" className="w-full md:w-auto">
                                <Button size="lg" className="w-full md:w-auto justify-center bg-[#2D69F0] hover:bg-[#1a51c9] text-white px-5 py-3 md:px-9 md:py-7 text-[14px] md:text-[16px] font-bold rounded-[10px] md:rounded-[14px] shadow-none transition-all hover:scale-[1.03] active:scale-[0.97]">
                                    Start the Generator
                                </Button>
                            </Link>
                            <Link href="/palettes" className="w-full md:w-auto">
                                <Button variant="secondary" size="lg" className="w-full md:w-auto justify-center md:justify-start px-5 py-3 md:px-9 md:py-7 text-[14px] md:text-[16px] font-bold rounded-[10px] md:rounded-[14px] bg-[#EEF0F3] hover:bg-[#e4e6ea] text-black dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 shadow-none border-none transition-all hover:scale-[1.03] active:scale-[0.97]">
                                    Explore Palettes
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Content - Visualization */}
                    <div className="relative flex justify-center items-center h-[350px] md:h-[600px]">
                        {/* Background Grid of Palettes */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                            className="grid grid-cols-3 gap-3 md:gap-5 translate-x-6 md:translate-x-12"
                        >
                            {[
                                ["#0044cc", "#4da3ff", "#ffff00", "#ffc800", "#ff8a00"], // Row 1 Col 1
                                ["#5b8c76", "#90e090", "#e6cca6", "#d9426f", "#ff8a00"], // Row 1 Col 2
                                ["#7f7823", "#c0c691", "#ffd8bc", "#ff8a00", "#ff4400"], // Row 1 Col 3
                                ["#000b4f", "#00baca", "#ffff00", "#ffc0cb", "#ff1493"], // Row 2 Col 1
                                ["#f04e98", "#ffe4e1", "#f5e6a2", "#00ffcc", "#ffffff"], // Row 2 Col 2
                                ["#5e2a40", "#ff5c77", "#ffb8bc", "#ffe0d6", "#fff9ed"], // Row 2 Col 3
                                ["#5b9aa0", "#8cb1de", "#ff8aae", "#ffc2bf", "#ffe3a0"], // Row 3 Col 1
                                ["#705680", "#94a8b3", "#becad2", "#e3b89e", "#ff7f24"], // Row 3 Col 2
                                ["#0033cc", "#5c4dff", "#8f79ff", "#ff9ea9", "#ff5c9d"], // Row 3 Col 3
                                ["#7c5cff", "#cd76ff", "#ffc4fd", "#52f2fd", "#c9f992"], // Row 4 Col 1 (Looks like main)
                                ["#ffb300", "#ffdb5c", "#ff9ea9", "#0080ff", "#00b359"], // Row 4 Col 2
                                ["#005761", "#78c7c7", "#f0fbff", "#ffdad6", "#ed8c72"], // Row 4 Col 3
                            ].map((colors, i) => (
                                <div key={i} className="flex w-[110px] h-[80px] md:w-[140px] md:h-[100px] rounded-[14px] md:rounded-[18px] overflow-hidden shadow-none border border-black/[0.04]">
                                    {colors.map((color, j) => (
                                        <div key={j} className="flex-1" style={{ backgroundColor: color }}></div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>

                        {/* Foreground Main Palette Card (Pixel Perfect Match & Dynamic Size) */}
                        <motion.div
                            initial={{ opacity: 0, y: 120, x: -80, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
                            className="absolute bottom-[-15%] md:bottom-[-2%] left-1/2 -translate-x-1/2 md:left-[-28%] md:translate-x-0 w-[260px] h-[170px] md:w-[480px] md:h-[320px] bg-white rounded-[24px] md:rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.22)] md:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.22)] overflow-hidden flex border-none z-20"
                        >
                            {currentColors.map((color, idx) => (
                                <motion.div
                                    key={`${currentPaletteIndex}-${idx}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    className="flex-1"
                                    style={{ backgroundColor: color }}
                                ></motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
