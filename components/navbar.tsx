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
    { name: "Gradient Maker", href: "/gradients" },
    { name: "Contrast", href: "/contrast-checker" },
    { name: "Palettes", href: "/palettes" },
  ];

  const activeLink = navLinks.find((link) => pathname === link.href);

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%]"
      style={{ left: 'calc(50% + 3px)', top: 'calc(1rem - 2px)' }}
    >
      <div
        className="relative flex items-center justify-center px-3 py-2.5 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full 
        bg-background/60 backdrop-blur-xl border border-border/40 shadow-lg 
        dark:border-white/10 transition-all duration-300"
      >
        <div className="flex items-center justify-between w-full gap-2 sm:gap-3 md:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <Image
              src="/colorkit.png"
              alt="ColorKit Logo"
              width={44}
              height={44}
              className="rounded-md w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12"
              priority
            />
            <span className="font-bold text-sm sm:text-base md:text-lg text-foreground dark:text-white tracking-tight whitespace-nowrap">
              ColorKit
            </span>
          </Link>

          {/* Centered Links with sliding active capsule */}
          <div className="relative hidden md:flex items-center justify-center gap-0.5 lg:gap-1 mx-auto flex-1 max-w-[500px]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hovered === link.href;

              return (
                <div
                  key={link.href}
                  className="relative flex-1"
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
                    className={`relative text-xs lg:text-sm font-medium px-2 lg:px-4 py-1.5 rounded-full z-10 transition-colors duration-300 block text-center
                      ${isActive
                        ? "text-foreground dark:text-white"
                        : "text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white"
                      }`}
                  >
                    <span className="whitespace-nowrap">{link.name}</span>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Theme toggle + mobile button */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-foreground dark:text-white focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 sm:mt-3 w-full bg-background/90 backdrop-blur-lg 
          border border-border/30 rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 space-y-2 sm:space-y-3 md:hidden z-50"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-300
                ${pathname === link.href
                  ? "bg-foreground/10 text-foreground dark:text-white font-medium"
                  : "text-foreground/80 dark:text-white/80 hover:bg-foreground/10 dark:hover:bg-white/10"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
