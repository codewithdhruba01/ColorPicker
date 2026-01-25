"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-[14px] w-10 h-10 border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-stone-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-gray-50 dark:hover:bg-stone-800 transition-all duration-300"
    >
      {theme === "dark" ? (
        <Sun className="h-[22px] w-[22px] text-gray-500 dark:text-gray-400" />
      ) : (
        <Moon className="h-[22px] w-[22px] text-gray-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
