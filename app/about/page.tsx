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
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl top-[20%] left-[60%] animate-pulse"></div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 container mx-auto px-6 pt-32 pb-32 sm:pt-40">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-5 mb-24"
        >
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="/colorkit.png"
              alt="ColorKit Logo"
              width={95}
              height={95}
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white bg-clip-text">
            About ColorKit
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground dark:text-white/70 text-sm sm:text-base leading-relaxed">
            A simple yet powerful platform that helps you explore, extract, and
            analyze colors from images or palettes — designed for creators,
            developers, and artists.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          <FeatureCard
            icon={<Palette className="w-10 h-10" />}
            title="Pick from Image"
            description="Upload an image and automatically extract its dominant and accent colors."
            gradient="bg-gradient-to-br from-cyan-500 to-blue-600"
            layer1="bg-cyan-200"
            layer2="bg-cyan-100"
          />

          <FeatureCard
            icon={<PaintBucket className="w-10 h-10" />}
            title="Analyze Colors"
            description="View detailed HEX, RGB, HSL, and CMYK values."
            gradient="bg-gradient-to-br from-pink-500 to-purple-600"
            layer1="bg-pink-200"
            layer2="bg-pink-100"
          />

          <FeatureCard
            icon={<Cpu className="w-10 h-10" />}
            title="AI-Powered Insights"
            description="Smart mood and warmth-based color suggestions."
            gradient="bg-gradient-to-br from-violet-600 to-indigo-700"
            layer1="bg-violet-200"
            layer2="bg-violet-100"
          />

          <FeatureCard
            icon={<Eye className="w-10 h-10" />}
            title="Accessibility Ready"
            description="Simulate color blindness & check contrast ratios."
            gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
            layer1="bg-emerald-200"
            layer2="bg-emerald-100"
          />

          <FeatureCard
            icon={<Sparkles className="w-10 h-10" />}
            title="Dynamic Variations"
            description="Explore shades, tints, and harmonious combos."
            gradient="bg-gradient-to-br from-yellow-400 to-orange-500"
            layer1="bg-yellow-200"
            layer2="bg-yellow-100"
          />

          <FeatureCard
            icon={<Github className="w-10 h-10" />}
            title="Open Source"
            description="Built with Next.js, Tailwind and Shadcn/UI."
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
          className="mb-24"
        >
          <div className="relative max-w-4xl mx-auto group">
            <div
              className="
        absolute inset-0 
        -top-[4%] left-1/2 -translate-x-1/2 
        w-[92%] h-[92%]
        rounded-3xl 
        transition-all duration-500
        opacity-80 blur-xl

        bg-gradient-to-br 
        from-cyan-300/60 to-blue-400/60       /* Light Mode */
        dark:from-cyan-600/40 dark:to-blue-800/40 /* Dark Mode */
        
        group-hover:translate-y-1
      "
            />

            <div
              className="
        absolute inset-0 
        -top-[8%] left-1/2 -translate-x-1/2 
        w-[85%] h-[85%]
        rounded-3xl 
        transition-all duration-500
        blur-md opacity-70

        bg-gradient-to-br 
        from-blue-100/60 to-cyan-100/60          /* Light Mode */
        dark:from-slate-800/50 dark:to-slate-900/50 /* Dark Mode */
      "
            />

            <div
              className="
        relative p-12 rounded-3xl
        transition-all duration-500 
        group-hover:-translate-y-2

        backdrop-blur-xl
        border 
        shadow-xl

        /* Light Mode Surface */
        bg-white/30 border-white/40 shadow-blue-200

        /* Dark Mode Surface */
        dark:bg-slate-900/40 dark:border-white/10 dark:shadow-xl dark:shadow-blue-900/20
      "
            >
              <h2 className="text-3xl font-bold text-foreground dark:text-white">
                Our Mission
              </h2>

              <p className="text-muted-foreground dark:text-white/70 leading-relaxed text-lg mt-4">
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
          className="mt-24"
        >
          <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-muted/30 border border-muted/50">
            <CardContent className="p-10 text-center space-y-6">
              <h3 className="text-2xl font-semibold text-foreground dark:text-white">
                Join the Community
              </h3>
              <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                Want to contribute, improve features, or report bugs? We welcome
                open-source contributors and creative minds like you!
              </p>

              <Link
                href="https://github.com/codewithdhruba01/ColorPicker"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 text-white font-medium hover:bg-cyan-700 transition-all duration-200"
              >
                <Github className="w-5 h-5" /> View on GitHub
              </Link>
            </CardContent>
          </Card>
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
    >
      <div className="relative group max-w-sm cursor-pointer">
        {/* Layer 1 */}
        <div
          className={`absolute inset-0 rounded-2xl 
                      -top-[4%] left-1/2 -translate-x-1/2
                      w-[90%] h-[90%] 
                      group-hover:rotate-[-8deg] group-hover:top-0
                      group-hover:w-full group-hover:h-full
                      transition-all duration-500 ease-[cubic-bezier(.23,1,.32,1)]
                      ${layer1}`}
        />

        {/* Layer 2 */}
        <div
          className={`absolute inset-0 rounded-2xl 
                      -top-[8%] left-1/2 -translate-x-1/2
                      w-[80%] h-[80%] 
                      group-hover:rotate-[8deg] group-hover:top-0
                      group-hover:w-full group-hover:h-full
                      transition-all duration-500 ease-[cubic-bezier(.23,1,.32,1)]
                      ${layer2}`}
        />

        {/* Main Layer */}
        <div
          className={`relative p-8 rounded-2xl text-white
                      flex flex-col gap-5 font-medium
                      transition-all duration-500 ease-[cubic-bezier(.23,1,.32,1)]
                      group-hover:-translate-y-4
                      ${gradient}`}
        >
          <div>{icon}</div>

          <h3 className="text-xl font-semibold">{title}</h3>

          <p className="text-sm leading-relaxed opacity-90">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
