"use client"

import { Palette, Github, Twitter, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border dark:border-white/5 backdrop-blur-sm bg-background/50 dark:bg-background/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-6 h-6 text-cyan-400" />
              <span className="font-bold text-lg text-foreground dark:text-white">ColorKit</span>
            </div>
            <p className="text-sm text-muted-foreground dark:text-white/60">
              Professional color tools for designers, developers, and creatives.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground dark:text-white">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-white/60">
              <li>
                <Link href="/picker" className="hover:text-foreground dark:hover:text-white transition-colors">
                  Color Picker
                </Link>
              </li>
              <li>
                <Link href="/picker" className="hover:text-foreground dark:hover:text-white transition-colors">
                  Palette Generator
                </Link>
              </li>
              <li>
                <Link href="/picker" className="hover:text-foreground dark:hover:text-white transition-colors">
                  Contrast Checker
                </Link>
              </li>
              <li>
                <Link href="/picker" className="hover:text-foreground dark:hover:text-white transition-colors">
                  Color Converter
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground dark:text-white">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-white/60">
              <li>
                <Link href="/picker" className="hover:text-foreground dark:hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/picker" className="hover:text-foreground dark:hover:text-white transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/picker" className="hover:text-foreground dark:hover:text-white transition-colors">
                  Color Theory
                </Link>
              </li>
              <li>
                <Link href="/picker" className="hover:text-foreground dark:hover:text-white transition-colors">
                  Accessibility Guide
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground dark:text-white">Connect</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted dark:bg-white/5 hover:bg-muted/80 dark:hover:bg-white/10 border border-border dark:border-white/10 flex items-center justify-center transition-all hover:scale-110"
              >
                <Github className="w-5 h-5 text-muted-foreground dark:text-white/60" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted dark:bg-white/5 hover:bg-muted/80 dark:hover:bg-white/10 border border-border dark:border-white/10 flex items-center justify-center transition-all hover:scale-110"
              >
                <Twitter className="w-5 h-5 text-muted-foreground dark:text-white/60" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted dark:bg-white/5 hover:bg-muted/80 dark:hover:bg-white/10 border border-border dark:border-white/10 flex items-center justify-center transition-all hover:scale-110"
              >
                <Mail className="w-5 h-5 text-muted-foreground dark:text-white/60" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border dark:border-white/5 mt-12 pt-8 text-center text-sm text-muted-foreground dark:text-white/40">
          <p>© 2025 ColorKit. All rights reserved. Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
