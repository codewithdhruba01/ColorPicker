"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Palette, Cpu, Sparkles, PaintBucket, Github, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const pageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-stone-950 text-foreground relative overflow-hidden font-sans selection:bg-primary/20">
      {/* Navbar */}
      <Navbar />

      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Main Content */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="relative z-10 flex-1 container mx-auto px-4 sm:px-6 md:px-8 lg:px-6 pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32"
      >
        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-6 mb-20 sm:mb-24 md:mb-32"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
              <Image
                src="/colorkit.png"
                alt="ColorKit Logo"
                width={100}
                height={100}
                className="relative object-contain w-20 h-20 sm:w-24 sm:h-24 animate-[spin_30s_linear_infinite]"
                priority
              />
            </div>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-clash-grotesk tracking-tight text-foreground dark:text-white">
              About <span className="text-primary">ColorKit</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-ranade leading-relaxed max-w-2xl mx-auto">
              A simple yet powerful platform that helps you explore, extract, and
              analyze colors from images or palettes — designed for creators,
              developers, and artists.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 sm:mb-24"
        >
          <FeatureCard
            icon={<Palette className="w-6 h-6" />}
            title="Pick from Image"
            description="Upload an image and automatically extract its dominant, complementary, and accent colors."
          />

          <FeatureCard
            icon={<PaintBucket className="w-6 h-6" />}
            title="Analyze Colors"
            description="View detailed HEX, RGB, HSL, and CMYK values, along with lightness and saturation info."
          />

          <FeatureCard
            icon={<Cpu className="w-6 h-6" />}
            title="AI-Powered Insights"
            description="Smart detection for mood, warmth, and context-based color suggestions for better design."
          />

          <FeatureCard
            icon={<Eye className="w-6 h-6" />}
            title="Accessibility Ready"
            description="Simulate color blindness and check contrast ratios to ensure inclusive design."
          />

          <FeatureCard
            icon={<Sparkles className="w-6 h-6" />}
            title="Dynamic Variations"
            description="Explore color variations, tints, shades, and harmonious combinations with one click."
          />

          <FeatureCard
            icon={<Github className="w-6 h-6" />}
            title="Open Source"
            description="Built with Next.js, TailwindCSS, and Shadcn/UI — completely open and community-driven."
          />
        </motion.div>

        {/* Sections Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mission Section */}
          <motion.div
            variants={itemVariants}
            className="relative group h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:from-blue-500/10 group-hover:to-cyan-500/10" />

            <div className="relative h-full p-8 sm:p-10 rounded-3xl bg-background/50 backdrop-blur-3xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500">
                <Sparkles className="w-6 h-6" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-clash-grotesk text-foreground dark:text-white mb-4">
                Our Mission
              </h2>

              <p className="text-muted-foreground font-ranade leading-relaxed text-base sm:text-lg">
                Our mission is to make color exploration effortless, beautiful,
                and intelligent. Whether you are working on UI, graphics,
                branding, or visual experiments,
                <span className="text-foreground font-semibold"> ColorKit </span>
                empowers you to visualize, analyze, and perfect every shade with
                clarity and confidence.
              </p>
            </div>
          </motion.div>

          {/* Community Section */}
          <motion.div
            variants={itemVariants}
            className="relative group h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:from-purple-500/10 group-hover:to-indigo-500/10" />

            <div className="relative h-full p-8 sm:p-10 rounded-3xl bg-background/50 backdrop-blur-3xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500">
                <Github className="w-6 h-6" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-clash-grotesk text-foreground dark:text-white mb-4">
                Join the Community
              </h3>

              <p className="text-muted-foreground font-ranade leading-relaxed text-base sm:text-lg mb-8">
                Want to contribute, improve features, or report bugs? We welcome
                open-source contributors, designers, and creative minds like
                you.
              </p>

              <Button
                asChild
                size="lg"
                className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium"
              >
                <Link
                  href="https://github.com/codewithdhruba01/ColorPicker"
                  target="_blank"
                  className="gap-2"
                >
                  <Github className="w-4 h-4" /> View on GitHub <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ===================== FEATURE CARD COMPONENT ===================== */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative p-6 sm:p-8 rounded-3xl bg-background/40 hover:bg-background/60 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
      <div className="mb-6 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <h3 className="text-xl font-semibold font-clash-grotesk mb-3 text-foreground dark:text-white">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
