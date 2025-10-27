"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-[80%] md:w-[40%] lg:w-[40%]">
      <div
        className="relative flex items-center justify-between px-5 py-3 rounded-full 
        bg-background/60 backdrop-blur-xl border border-border/40 shadow-lg 
        dark:border-white/10 transition-all duration-300"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/colorkit.png"
            alt="ColorKit Logo"
            width={34}
            height={34}
            className="rounded-md"
            priority
          />
          <span className="font-bold text-lg text-foreground dark:text-white tracking-tight">
            ColorKit
          </span>
        </Link>

        {/* Desktop + Mobile Icons */}
        <div className="flex items-center gap-4">
          {/* Desktop Links */}
          <div className="hidden sm:flex items-center gap-6">
            <Link
              href="/picker"
              className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white transition-colors"
            >
              Color Picker
            </Link>
            <Link
              href="/about"
              className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white transition-colors"
            >
              About
            </Link>
          </div>

          {/* Theme Toggle - Always Visible */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-foreground dark:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-full bg-background/70 backdrop-blur-lg 
          border border-border/30 rounded-2xl shadow-lg p-4 space-y-3 sm:hidden"
        >
          <Link
            href="/picker"
            className="block text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Color Picker
          </Link>
          <Link
            href="/about"
            className="block text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  )
}
