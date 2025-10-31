"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { InstantColorPicker } from "@/components/instant-color-picker";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

// ✅ Animation Variants (Type-safe)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors = [
    "#e11d48",
    "#f472b6",
    "#fb923c",
    "#facc15",
    "#84cc16",
    "#10b981",
    "#0ea5e9",
    "#3b82f6",
    "#8b5cf6",
    "#a78bfa",
  ];

  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1200);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen relative overflow-hidden flex flex-col bg-background dark:bg-slate-950"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <Navbar />

      <main className="relative z-10 flex-1">
        <div className="container mx-auto px-4 pt-44 sm:pt-52 md:pt-60 pb-20">
          {/* Hero Section */}
          <motion.div
            className="text-center space-y-6 sm:space-y-8 max-w-5xl mx-auto mb-12 sm:mb-16"
            variants={itemVariants}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground dark:text-white leading-tight">
              Pick colors from any image:
              <br />
              <span className="text-foreground dark:text-white">
                instantly and 100% free.
              </span>
            </h1>

            {/* Sun + Stars Animation */}
            <div className="relative flex justify-center items-center mt-10 mb-14">
              <div className="sun" />
              <div className="absolute w-full h-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-[3px] h-[3px] bg-white rounded-full animate-twinkle"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.8}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <motion.div
              className="flex justify-center gap-1 mt-6 flex-wrap"
              variants={containerVariants}
            >
              {colors.map((color, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="relative group">
                    <button
                      onClick={() => handleCopy(color)}
                      className="w-8 h-8 sm:w-11 sm:h-11 rounded-md transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.1)] hover:scale-150 hover:z-[50]"
                      style={{ backgroundColor: color }}
                    />
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 bottom-12 px-2 py-1 rounded-md text-[10px] bg-white dark:bg-slate-800 text-black dark:text-white shadow-md transition-all duration-300 ${
                        copiedColor === color
                          ? "opacity-100 visible"
                          : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                      }`}
                    >
                      {copiedColor === color ? "✅ Copied" : color}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Instant Color Picker */}
          <motion.div className="mb-12 sm:mb-16" variants={itemVariants}>
            <InstantColorPicker />
          </motion.div>

          {/* Button */}
          <motion.div
            className="flex justify-center mb-10"
            variants={itemVariants}
          >
            <Link href="/about">
              <button className="relative inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-base sm:text-lg border-[3px] border-yellow-400 rounded-[12px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#facc15] focus:outline-none focus:ring-2 focus:ring-yellow-400">
                About ColorKit
                <ArrowRight className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>

          {/* Review + Info Section */}
          <motion.section
            className="w-full bg-transparent py-16 md:py-10 px-6 md:px-16 relative z-10"
            variants={itemVariants}
          >
            <div className="max-w-md mx-auto border border-gray-700 rounded-xl py-4 px-6 flex items-center justify-center space-x-3 text-gray-300 mb-14">
              <div className="flex space-x-0.3 text-yellow-400">
                {"⭐"
                  .repeat(5)
                  .split("")
                  .map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
              </div>
              <p className="text-sm md:text-base text-neutral-700 dark:text-white">
                Do you like{" "}
                <span className="font-medium text-neutral-500 dark:text-white">
                  colorkit Website ?
                </span>
              </p>
            </div>

            {/* Text + Image */}
            <motion.div
              className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between md:gap-0"
              variants={containerVariants}
            >
              <motion.div
                className="max-w-2xl text-left md:pr-0 md:mr-0"
                variants={itemVariants}
              >
                <h2 className="text-3xl md:text-4xl font-semibold text-black dark:text-white mb-4">
                  Color Kit
                </h2>
                <h3 className="text-lg text-gray-300 font-medium mb-3">
                  Click on the image to pick a color...
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Use the ColorKit image color picker below to explore and
                  extract beautiful colors from any image in seconds. Instantly
                  get accurate <strong>HEX</strong>, <strong>RGB</strong>, and{" "}
                  <strong>HSL</strong> color codes for every pixel you select —
                  perfect for designers, developers, and digital artists.
                  Upload, paste, or link an image and start picking colors
                  instantly.
                </p>
              </motion.div>

              <motion.div
                className="md:ml-0 md:pl-0 flex-shrink-0 flex justify-center md:justify-end"
                variants={itemVariants}
              >
                <Image
                  src="/colorkit.png"
                  alt="ColorKit Logo"
                  width={335}
                  height={235}
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
