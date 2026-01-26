"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/picker", text: "Color Picker" },
    { href: "/gradients", text: "Gradients" },
    { href: "/contrast-checker", text: "Contrast" },
    { href: "/palettes", text: "Palettes" },
  ];

  return (
    <nav
      className="fixed top-0 z-50 w-full bg-white/70 dark:bg-stone-950 backdrop-blur-md dark:border-white/10 transition-colors duration-300"
      style={{ paddingRight: "var(--removed-body-scroll-bar-size)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/colorkit.png"
              alt="ColorKit"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="font-bold text-lg text-foreground dark:text-white font-clash-grotesk">
              ColorKit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive
                      ? "bg-[#df7709]/10 text-[#df7709]"
                      : "text-gray-600 dark:text-gray-300 hover:bg-[#f07f08]/10 hover:text-[#00DC82]"
                    }`}
                >
                  {link.text}
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm" className="hidden sm:flex rounded-full">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="rounded-full bg-[#df7709] hover:bg-[#c66a08] text-white border-0">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />
            </SignedIn>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-600 dark:text-gray-200 hover:text-[#00DC82] dark:hover:text-[#00DC82] transition"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="space-y-1 pb-4 pt-2 bg-white/70 dark:bg-black/70 backdrop-blur-md">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-md px-4 py-2 text-sm font-medium transition-all duration-300
                  ${pathname === link.href
                    ? "bg-[#00DC82]/10 text-[#00DC82]"
                    : "text-gray-600 dark:text-gray-300 hover:bg-[#00DC82]/10 hover:text-[#00DC82]"
                  }`}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                {link.text}
              </Link>
            ))}
            {/* Mobile Auth Buttons */}
            <div className="px-4 py-2 flex flex-col gap-2 sm:hidden">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full justify-center rounded-full">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
