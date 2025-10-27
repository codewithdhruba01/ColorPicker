"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { InstantColorPicker } from "@/components/instant-color-picker"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-background dark:bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-background via-background to-background dark:from-orange-900/40 dark:via-slate-900 dark:to-cyan-900/40"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <Navbar />

      <main className="relative z-10 flex-1">
        {/* Increased top padding to push content below navbar */}
        <div className="container mx-auto px-4 pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 md:pb-20">
          <div className="text-center space-y-6 sm:space-y-8 animate-fade-in-up max-w-5xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/50 backdrop-blur-sm border border-yellow-500/60 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-black dark:text-white">
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

          <div className="mb-12 sm:mb-16">
            <InstantColorPicker />
          </div>

          <div className="text-center mb-16">
            <Link href="/picker">
              <button
                className="
                  relative inline-flex items-center justify-center
                  px-8 py-4
                  bg-black text-white font-semibold text-base sm:text-lg
                  border-[3px] border-yellow-400
                  rounded-[12px]
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#facc15]
                  active:translate-y-0 active:shadow-none
                  focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
                "
              >
                Generate Color
              </button>
            </Link>
          </div>
        </div>
      </main>

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
