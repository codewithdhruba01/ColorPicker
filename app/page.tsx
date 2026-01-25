"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { InstantColorPicker } from "@/components/instant-color-picker";
import Hero from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

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
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen relative overflow-hidden flex flex-col bg-background dark:bg-stone-950"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      <Navbar />

      <main className="relative z-10 flex-1">
        <Hero />
        <SocialProof />

        <div className="container mx-auto px-4 pt-12 md:pt-20 pb-20">
          {/* Instant Color Picker */}
          <motion.div className="mb-12 sm:mb-16" variants={itemVariants}>
            <InstantColorPicker />
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
              <p className="text-sm md:text-base text-neutral-700 dark:text-white font-clash-grotesk font-medium">
                Do you like{" "}
                <span className="font-clash-grotesk font-medium text-neutral-500 dark:text-white">
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
                <h2 className="text-3xl md:text-4xl font-bold font-clash-grotesk text-black dark:text-white mb-4">
                  Color Kit
                </h2>
                <h3 className="text-lg text-gray-300 font-ranade font-medium mb-3">
                  Click on the image to pick a color...
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base font-ranade">
                  ColorKit is a powerful, easy-to-use color palette generator built for designers, developers, and creative minds. Create stunning color combinations in seconds with a single click, or explore curated palettes crafted for perfect visual balance. Generate colors from images, test contrast and accessibility, and preview palettes on real UI layouts. Save, organize, and manage your palettes effortlessly, then export them in multiple formats for web, mobile apps, and design tools.
                  Smart. Fast. Creative — now enhanced with AI.
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
                  className="object-contain animate-[spin_25s_linear_infinite]"
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
