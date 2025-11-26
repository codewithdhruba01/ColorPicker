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
      <Navbar />

      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-cyan-900/10 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950/20"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl top-[20%] left-[60%] animate-pulse"></div>

      <main className="relative z-10 flex-1 container mx-auto px-6 pt-32 pb-32 sm:pt-40">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-5 mb-24"
        >
    
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

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r text-black dark:text-white bg-clip-text">
            About ColorKit
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground dark:text-white/70 text-sm sm:text-base leading-relaxed">
            A simple yet powerful platform that helps you explore, extract, and
            analyze colors from images or palettes — designed for creators,
            developers, and artists.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <FeatureCard
            icon={<Palette className="w-7 h-7 text-cyan-500" />}
            title="Pick from Image"
            description="Upload an image and automatically extract its dominant, complementary, and accent colors."
          />
          <FeatureCard
            icon={<PaintBucket className="w-7 h-7 text-pink-500" />}
            title="Analyze Colors"
            description="View detailed HEX, RGB, HSL, and CMYK values, along with lightness and saturation info."
          />
          <FeatureCard
            icon={<Cpu className="w-7 h-7 text-violet-500" />}
            title="AI-Powered Insights"
            description="Smart detection for mood, warmth, and context-based color suggestions for better design."
          />
          <FeatureCard
            icon={<Eye className="w-7 h-7 text-emerald-500" />}
            title="Accessibility Ready"
            description="Simulate color blindness and check contrast ratios to ensure inclusive design."
          />
          <FeatureCard
            icon={<Sparkles className="w-7 h-7 text-yellow-500" />}
            title="Dynamic Variations"
            description="Explore color variations, tints, shades, and harmonious combinations with one click."
          />
          <FeatureCard
            icon={
              <Github className="w-7 h-7 text-gray-600 dark:text-gray-300" />
            }
            title="Open Source"
            description="Built with Next.js, TailwindCSS, and Shadcn/UI — completely open and community-driven."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-muted/30 border border-muted/50">
            <CardContent className="p-10 text-center space-y-4">
              <h2 className="text-2xl font-semibold text-foreground dark:text-white">
                Our Mission
              </h2>
              <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                We aim to make color exploration effortless, beautiful, and
                intelligent. Whether you’re designing a website, building a
                brand, or experimenting with palettes,
                <strong> Color Picker & Analyzer </strong> is your creative
                partner — helping you visualize, analyze, and perfect your color
                choices with clarity.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-muted/30 border border-muted/50">
            <CardContent className="p-10 text-center space-y-5">
              <h3 className="text-2xl font-semibold text-foreground dark:text-white">
                Join the Community
              </h3>
              <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                Want to contribute, improve features, or report bugs? <br />
                We welcome open-source contributors and creative minds like you!
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 bg-muted/40 backdrop-blur-sm border border-muted/50">
        <div className="flex items-center gap-3 mb-3">
          {icon}
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground dark:text-white/60 leading-relaxed">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}
