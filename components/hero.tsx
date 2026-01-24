"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const PALETTES = [
    ["#00008F", "#2D3BA4", "#6A82FB", "#92B4B8", "#CDEAC0"], // Latest Screenshot Blue/Green
    ["#8A3FFC", "#D84BEF", "#FF7EB6", "#FFF0F3", "#FFE11B"], // Previous Purple/Yellow
    ["#1A472A", "#478A2D", "#A2D149", "#F5EAD1", "#C53D3D"], // Forest Green/Red
    ["#000B4F", "#00BACA", "#FFFF00", "#FFC0CB", "#FF1493"], // High Contrast Pink/Blue
    ["#4C1D3A", "#F43F5E", "#FECDD3", "#FEE2E2", "#FFF9C4"], // Warm Pastel Pink
    ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"], // Deep Ocean Blues
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
        <section className="relative w-full max-w-full overflow-hidden bg-white dark:bg-slate-950">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(#000 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-40 md:pb-48">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-24 lg:gap-32 items-center">
                    {/* Left Content */}
                    <div className="flex flex-col items-start space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                            className="relative"
                        >
                            <h1 className="text-[64px] md:text-[98px] font-[900] font-satoshi tracking-[-0.07em] text-black dark:text-white leading-[0.82] flex flex-col">
                                <span>The super fast</span>
                                <span>color palettes</span>
                                <span>generator!</span>
                            </h1>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="absolute left-[30px] md:left-[50px] bottom-[-20px] md:bottom-[-25px] rotate-[10deg] z-20"
                            >
                                <span className="relative z-10 font-telma font-normal text-[14px] md:text-[18px] text-black dark:text-white uppercase tracking-[0.12em] px-2 py-1 block">
                                    AND MUCH MORE
                                </span>
                                <div className="absolute inset-x-0 inset-y-0 translate-x-[-10%] translate-y-[-20%] w-[120%] h-[140%]">
                                    <svg viewBox="0 0 140 50" className="w-full h-full fill-none stroke-black/70 dark:stroke-white/70 stroke-[1.2]">
                                        <path d="M10,25 C10,12 40,6 80,9 C120,12 135,18 132,28 C129,38 95,43 55,41 C25,39 10,32 10,25 C10,18 30,10 75,8.5" />
                                    </svg>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
                            className="text-[17px] md:text-[20px] text-black/60 dark:text-white/60 max-w-sm md:max-w-md font-medium leading-[1.3] pt-6"
                        >
                            Create the perfect palette or get inspired by thousands of beautiful color schemes.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                            className="flex flex-wrap gap-5 pt-6"
                        >
                            <Button size="lg" className="bg-[#2D69F0] hover:bg-[#1a51c9] text-white px-9 py-7 text-[16px] font-bold rounded-[14px] shadow-none transition-all hover:scale-[1.03] active:scale-[0.97]">
                                Start the Generator
                            </Button>
                            <Button variant="secondary" size="lg" className="px-9 py-7 text-[16px] font-bold rounded-[14px] bg-[#EEF0F3] hover:bg-[#e4e6ea] text-black dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 shadow-none border-none transition-all hover:scale-[1.03] active:scale-[0.97]">
                                Explore 10M+ Palettes
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Content - Visualization */}
                    <div className="relative flex justify-center items-center h-[500px] md:h-[600px]">
                        {/* Background Grid of Palettes */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                            className="grid grid-cols-3 gap-4 md:gap-5 translate-x-12"
                        >
                            {[
                                ["#000B4F", "#00BACA", "#FFFF00", "#FFC0CB", "#FF1493"],
                                ["#FFC0CB", "#FFD700", "#A5F3FC", "#FDE68A", "#0066FF"],
                                ["#4C1D3A", "#F43F5E", "#FECDD3", "#FEE2E2", "#FFF1F2"],
                                ["#5ca2b1", "#96d1e4", "#ff6b9a", "#ffc2bf", "#ffe291"],
                                ["#5e427d", "#8cb1a0", "#c2cad1", "#dfbc9f", "#ff8119"],
                                ["#0028aa", "#4232ec", "#7c68e3", "#ff9ea3", "#ff69b2"],
                                ["#cc034c", "#8d861d", "#c1c790", "#ffdfc3", "#ff7f02"],
                                ["#24336b", "#4b647c", "#6b969c", "#b1ad8e", "#ffce8e"],
                                ["#ffa500", "#ffd700", "#ffa0c5", "#017cb2", "#00ae57"],
                                ["#014da2", "#8ec6ff", "#fdf1f3", "#ff8bad", "#ff4b6b"],
                                ["#cc034c", "#8d861d", "#c1c790", "#ffdfc3", "#ff7f02"],
                                ["#00f3c3", "#5c2a49", "#ff4b6b", "#ffb7ab", "#ffdfc3"],
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
                            className="absolute bottom-[8%] left-[-10%] md:left-[-20%] w-[360px] h-[250px] md:w-[480px] md:h-[320px] bg-white rounded-[28px] md:rounded-[40px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.22)] overflow-hidden flex border-none z-20"
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
