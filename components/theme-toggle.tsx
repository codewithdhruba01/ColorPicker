"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-[14px] w-10 h-10 border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-stone-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <Sun className="h-5 w-5 opacity-0" />
      </Button>
    )
  }

  return (
    <AnimatedThemeToggler
      className="flex items-center justify-center rounded-[14px] w-10 h-10 border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-stone-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-gray-50 dark:hover:bg-stone-800 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    />
  )
}
