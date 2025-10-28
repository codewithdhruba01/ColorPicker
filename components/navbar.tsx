"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  const navLinks = [
    { name: "Color Picker", href: "/picker" },
    { name: "Contrast", href: "/contrast-checker" },
    { name: "Palettes", href: "/palettes" },
  ];

  const activeLink = navLinks.find((link) => pathname === link.href);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-[80%] md:w-[40%] lg:w-[40%]">
      <div
        className="relative flex items-center justify-center px-5 py-3 rounded-full 
        bg-background/60 backdrop-blur-xl border border-border/40 shadow-lg 
        dark:border-white/10 transition-all duration-300"
      >
        <div className="flex items-center justify-between w-full">
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

          {/* Centered Links with sliding active capsule */}
          <div className="relative hidden sm:flex items-center justify-center gap-6 mx-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hovered === link.href;

              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setHovered(link.href)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {(isActive || isHovered) && (
                    <motion.div
                      layoutId="activeLinkBackground"
                      className="absolute inset-0 rounded-full bg-foreground/10 dark:bg-white/10 border border-border/30"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <Link
                    href={link.href}
                    className={`relative text-sm font-medium px-4 py-1.5 rounded-full z-10 transition-colors duration-300
                      ${
                        isActive
                          ? "text-foreground dark:text-white"
                          : "text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white"
                      }`}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Theme toggle + mobile button */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden text-foreground dark:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-full bg-background/70 backdrop-blur-lg 
          border border-border/30 rounded-2xl shadow-lg p-4 space-y-3 sm:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block text-sm px-3 py-2 rounded-lg transition-all duration-300
                ${
                  pathname === link.href
                    ? "bg-foreground/10 text-foreground dark:text-white"
                    : "text-foreground/80 dark:text-white/80 hover:bg-foreground/10 dark:hover:bg-white/10"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
