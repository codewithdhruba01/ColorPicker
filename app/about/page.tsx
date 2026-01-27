"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Palette, Cpu, Sparkles, PaintBucket, Github, Eye, ArrowRight, CheckCircle2, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
      <Navbar />

      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="relative z-10 flex-1 container mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-6 mb-16"
        >
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
            <p className="text-lg sm:text-xl text-muted-foreground font-satoshi leading-relaxed max-w-2xl mx-auto">
              A simple yet powerful platform that helps you explore, extract, and analyze colors from images or palettes.
            </p>
          </div>
        </motion.div>

        {/* Main Unified Card */}
        <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
          <Card className="p-8 sm:p-12 bg-background/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] shadow-xl space-y-12">

            {/* Intro Story */}
            <section className="text-center max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-clash-grotesk ">
                More Than Just a Picker
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-display">
                ColorKit was born from the need for a modern, fast, and privacy-focused color tool.
                We noticed that most color pickers were either cluttered with ads or lacked precision.
                So, we built something better—a tool designed for creators, developers, and artists who care about aesthetics and accessibility.
              </p>
            </section>

            <Separator className="bg-white/10" />

            {/* Features List (Clean Layout) */}
            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-clash-grotesk  mb-2">Whats Inside</h2>
                <p className="text-muted-foreground">Everything you need to master your color palette.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-6">
                  <FeatureRow
                    icon={<Palette className="w-5 h-5 text-blue-500" />}
                    title="Smart Extraction"
                    description="Upload an image and automatically extract its dominant, complementary, and accent colors."
                  />
                  <FeatureRow
                    icon={<PaintBucket className="w-5 h-5 text-purple-500" />}
                    title="Detailed Analysis"
                    description="View HEX, RGB, HSL, and CMYK values instantly."
                  />
                  <FeatureRow
                    icon={<Cpu className="w-5 h-5 text-orange-500" />}
                    title="AI-Powered Insights"
                    description="Get context-based color suggestions and mood analysis."
                  />
                </div>
                <div className="space-y-6">
                  <FeatureRow
                    icon={<Eye className="w-5 h-5 text-green-500" />}
                    title="Accessibility Checks"
                    description="Simulate color blindness and check contrast ratios (WCAG)."
                  />
                  <FeatureRow
                    icon={<Sparkles className="w-5 h-5 text-yellow-500" />}
                    title="Dynamic Variations"
                    description="Explore tints, shades, and harmonious combinations."
                  />
                  <FeatureRow
                    icon={<Github className="w-5 h-5 text-foreground" />}
                    title="Open Source"
                    description="Transparent, community-driven, and free forever."
                  />
                </div>
              </div>
            </section>

            <Separator className="bg-white/10" />

            {/* Mission & Community Combined */}
            <div className="grid md:grid-cols-2 gap-12 pt-4">
              <section className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Heart className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold font-clash-grotesk">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To make color exploration effortless and intelligent. We believe that the right tools should get out of your way and let your creativity flow.
                  <span className="text-foreground font-semibold"> ColorKit</span> empowers you to visualize and perfect every shade with confidence.
                </p>
              </section>

              <section className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground mb-2">
                  <Github className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold font-clash-grotesk">Join the Community</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We welcome contributors! Whether its reporting a bug, suggesting a feature, or fixing a typo, your help makes ColorKit better for everyone.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/10 hover:bg-foreground/5"
                >
                  <Link
                    href="https://github.com/codewithdhruba01/ColorPicker"
                    target="_blank"
                    className="gap-2"
                  >
                    <Github className="w-4 h-4" /> View on GitHub <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </section>
            </div>

          </Card>
        </motion.div>

      </motion.main>

      <Footer />
    </div>
  );
}

function FeatureRow({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex gap-4 items-start group">
      <div className="mt-1 p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
