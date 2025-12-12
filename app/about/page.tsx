"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Cpu, Sparkles, PaintBucket, Github, Eye } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-slate-950 text-foreground relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-cyan-900/10 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950/20"></div>
      <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-cyan-500/20 blur-3xl top-[10%] sm:top-[15%] md:top-[20%] left-[50%] sm:left-[55%] md:left-[60%] -translate-x-1/2 md:translate-x-0 animate-pulse"></div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 container mx-auto px-4 sm:px-6 md:px-8 lg:px-6 pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 sm:space-y-5 mb-12 sm:mb-16 md:mb-20 lg:mb-24"
        >
          {/* Logo */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <Image
              src="/colorkit.png"
              alt="ColorKit Logo"
              width={95}
              height={95}
              className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[95px] lg:h-[95px]"
              priority
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white bg-clip-text px-2">
            About ColorKit
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground dark:text-white/70 text-xs sm:text-sm md:text-base leading-relaxed px-2">
            A simple yet powerful platform that helps you explore, extract, and
            analyze colors from images or palettes — designed for creators,
            developers, and artists.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <FeatureCard
            icon={<Palette className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />}
            title="Pick from Image"
            description="Upload an image and automatically extract its dominant, complementary, and accent colors."
            gradient="bg-gradient-to-br from-cyan-500 to-blue-600"
            layer1="bg-cyan-200"
            layer2="bg-cyan-100"
          />

          <FeatureCard
            icon={<PaintBucket className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />}
            title="Analyze Colors"
            description="View detailed HEX, RGB, HSL, and CMYK values, along with lightness and saturation info."
            gradient="bg-gradient-to-br from-pink-500 to-purple-600"
            layer1="bg-pink-200"
            layer2="bg-pink-100"
          />

          <FeatureCard
            icon={<Cpu className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />}
            title="AI-Powered Insights"
            description="Smart detection for mood, warmth, and context-based color suggestions for better design."
            gradient="bg-gradient-to-br from-violet-600 to-indigo-700"
            layer1="bg-violet-200"
            layer2="bg-violet-100"
          />

          <FeatureCard
            icon={<Eye className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />}
            title="Accessibility Ready"
            description="Simulate color blindness and check contrast ratios to ensure inclusive design."
            gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
            layer1="bg-emerald-200"
            layer2="bg-emerald-100"
          />

          <FeatureCard
            icon={<Sparkles className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />}
            title="Dynamic Variations"
            description="Explore color variations, tints, shades, and harmonious combinations with one click."
            gradient="bg-gradient-to-br from-yellow-400 to-orange-500"
            layer1="bg-yellow-200"
            layer2="bg-yellow-100"
          />

          <FeatureCard
            icon={<Github className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />}
            title="Open Source"
            description="Built with Next.js, TailwindCSS, and Shadcn/UI — completely open and community-driven."
            gradient="bg-gradient-to-br from-slate-600 to-gray-700"
            layer1="bg-gray-300"
            layer2="bg-gray-200"
          />
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-2 sm:px-0"
        >
          <div className="relative max-w-4xl mx-auto group">
            <div
              className="
        absolute inset-0 
        -top-[4%] left-1/2 -translate-x-1/2 
        w-[92%] h-[92%]
        rounded-2xl sm:rounded-3xl
        transition-all duration-500
        opacity-80 blur-xl

        bg-gradient-to-br 
        from-cyan-300/60 to-blue-400/60
        dark:from-cyan-600/40 dark:to-blue-800/40
        
        group-hover:translate-y-1
      "
            />

            <div
              className="
        absolute inset-0 
        -top-[8%] left-1/2 -translate-x-1/2 
        w-[85%] h-[85%]
        rounded-2xl sm:rounded-3xl
        transition-all duration-500
        blur-md opacity-70

        bg-gradient-to-br 
        from-blue-100/60 to-cyan-100/60
        dark:from-slate-800/50 dark:to-slate-900/50
      "
            />

            <div
              className="
        relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl
        transition-all duration-500 
        group-hover:-translate-y-2

        backdrop-blur-xl
        border 
        shadow-xl

        bg-white/30 border-white/40 shadow-blue-200
        dark:bg-slate-900/40 dark:border-white/10 dark:shadow-xl dark:shadow-blue-900/20
      "
            >
              <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-foreground dark:text-white">
                Our Mission
              </h2>

              <p className="text-muted-foreground dark:text-white/70 leading-relaxed text-sm sm:text-base md:text-lg mt-3 sm:mt-4">
                Our mission is to make color exploration effortless, beautiful,
                and intelligent. Whether you're working on UI, graphics,
                branding, or visual experiments,
                <span className="text-cyan-600 dark:text-cyan-300 font-semibold">
                  {" "}
                  ColorKit{" "}
                </span>
                empowers you to visualize, analyze, and perfect every shade with
                clarity and confidence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Join Community */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-2 sm:px-0"
        >
          <div className="relative max-w-4xl mx-auto group">
            {/* --- Layer 1 (Glow L --- */}
            <div
              className="
        absolute inset-0 -top-[4%] left-1/2 -translate-x-1/2
        w-[92%] h-[92%] rounded-2xl sm:rounded-3xl
        blur-xl opacity-80
        transition-all duration-500
        bg-gradient-to-br 
        from-purple-300/60 to-cyan-400/60 
        dark:from-purple-700/40 dark:to-cyan-800/40
        group-hover:translate-y-1
      "
            />

            {/* --- Layer 2 (Soft Panel) --- */}
            <div
              className="
        absolute inset-0 -top-[8%] left-1/2 -translate-x-1/2
        w-[85%] h-[85%] rounded-2xl sm:rounded-3xl
        blur-md opacity-70
        transition-all duration-500
        bg-gradient-to-br 
        from-purple-100/50 to-cyan-100/50 
        dark:from-slate-800/40 dark:to-slate-900/40
      "
            />

            {/* --- Main Card --- */}
            <div
              className="
        relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl text-center space-y-4 sm:space-y-5 md:space-y-6
        backdrop-blur-xl border shadow-xl
        transition-all duration-500 
        group-hover:-translate-y-2

        bg-white/30 border-white/40 shadow-purple-200
        dark:bg-slate-900/40 dark:border-white/10 
        dark:shadow-xl dark:shadow-purple-900/20
      "
            >
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-foreground dark:text-white px-2">
                Join the Community
              </h3>

              <p className="text-muted-foreground dark:text-white/70 leading-relaxed text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
                Want to contribute, improve features, or report bugs? We welcome
                open-source contributors, designers, and creative minds like
                you. Be a part of the project and help shape the future of
                ColorKit.
              </p>

              {/* Button */}
              <Link
                href="https://github.com/codewithdhruba01/ColorPicker"
                target="_blank"
                className="
    relative inline-flex items-center gap-2 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
    font-medium text-sm sm:text-base text-white overflow-hidden group
    transition-all duration-500

    bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500
    dark:from-purple-600 dark:via-cyan-600 dark:to-blue-700

    hover:-translate-y-1 hover:shadow-2xl 
    hover:shadow-purple-500/30 dark:hover:shadow-purple-800/30
  "
              >
                <span
                  className="
      absolute inset-0 rounded-lg sm:rounded-xl
      opacity-0 group-hover:opacity-100 
      transition-opacity duration-500
      bg-gradient-to-r from-white/40 to-transparent
      blur-md
    "
                />

                <span
                  className="
      absolute inset-0 -translate-x-full 
      bg-gradient-to-r from-transparent via-white/60 to-transparent
      group-hover:translate-x-full 
      transition-transform duration-700 ease-out
    "
                />
                <Github className="w-4 h-4 sm:w-5 sm:h-5 relative z-[2]" />
                <span className="relative z-[2]">View on GitHub</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ===================== NEW LAYERED CARD COMPONENT ===================== */

function FeatureCard({
  icon,
  title,
  description,
  gradient,
  layer1,
  layer2,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  layer1: string;
  layer2: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="relative group max-w-sm mx-auto sm:mx-0 cursor-pointer">
        {/* Layer 1 */}
        <div
          className={`absolute inset-0 rounded-xl sm:rounded-2xl
                      -top-[4%] left-1/2 -translate-x-1/2
                      w-[90%] h-[90%] 
                      group-hover:rotate-[-8deg] group-hover:top-0
                      group-hover:w-full group-hover:h-full
                      transition-all duration-500 ease-[cubic-bezier(.23,1,.32,1)]
                      ${layer1}`}
        />

        {/* Layer 2 */}
        <div
          className={`absolute inset-0 rounded-xl sm:rounded-2xl
                      -top-[8%] left-1/2 -translate-x-1/2
                      w-[80%] h-[80%] 
                      group-hover:rotate-[8deg] group-hover:top-0
                      group-hover:w-full group-hover:h-full
                      transition-all duration-500 ease-[cubic-bezier(.23,1,.32,1)]
                      ${layer2}`}
        />

        {/* Main Layer */}
        <div
          className={`relative p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl text-white
                      flex flex-col gap-3 sm:gap-4 md:gap-5 font-medium
                      transition-all duration-500 ease-[cubic-bezier(.23,1,.32,1)]
                      group-hover:-translate-y-2 sm:group-hover:-translate-y-3 md:group-hover:-translate-y-4
                      ${gradient}`}
        >
          <div className="flex items-center">{icon}</div>

          <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>

          <p className="text-xs sm:text-sm leading-relaxed opacity-90">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
