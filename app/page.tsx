"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { InstantColorPicker } from "@/components/instant-color-picker"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-background dark:bg-slate-950">
      {/* Gradient background layers */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-background via-background to-background dark:from-orange-900/40 dark:via-slate-900 dark:to-cyan-900/40"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 flex-1 pt-28 sm:pt-32 md:pt-36">
        <div className="container mx-auto px-4 pb-16">
          {/* Hero Section */}
          <div className="text-center space-y-6 sm:space-y-8 animate-fade-in-up max-w-5xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-cyan-400 dark:text-cyan-400">
                100% Free & Instant
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground dark:text-white leading-tight px-4">
              Pick colors from any image:
              <br />
              <span className="text-foreground dark:text-white">
                instantly and 100% free.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground dark:text-white/60 max-w-3xl mx-auto leading-relaxed px-4">
              Upload, paste, or enter a URL to extract colors with HEX, RGB, and more.
            </p>
          </div>

          {/* Instant Color Picker Section */}
          <div className="mb-12 sm:mb-16">
            <InstantColorPicker />
          </div>

          {/* CTA Button */}
          <div className="text-center mb-12">
            <Link href="/picker">
              <Button
                size="lg"
                className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 bg-gradient-to-r from-orange-500 to-cyan-500 hover:from-orange-600 hover:to-cyan-600 dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-full font-semibold shadow-2xl transition-all duration-300"
              >
                Explore All Color Tools
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            <StatCard number="100%" label="Free Forever" />
            <StatCard number="∞" label="Unlimited Colors" />
            <StatCard number="8+" label="Color Formats" />
            <StatCard number="24/7" label="Available" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-muted/50 dark:bg-white/5 backdrop-blur-sm border border-border dark:border-white/10 hover:border-primary dark:hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-2">{number}</div>
      <div className="text-xs sm:text-sm text-muted-foreground dark:text-white/60">{label}</div>
    </div>
  )
}
