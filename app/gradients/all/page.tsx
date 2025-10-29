"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Copy, Check, Heart } from "lucide-react"
import { gradients, categories } from "@/lib/gradients"
import { toast } from "sonner"

export default function AllGradientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [likedGradients, setLikedGradients] = useState<Set<string>>(new Set())

  const filteredGradients = gradients.filter((gradient) => {
    const matchesSearch = gradient.name.toLowerCase().includes(searchQuery.toLowerCase())
    if (selectedCategory === "All") return matchesSearch
    return matchesSearch && gradient.category === selectedCategory
  })

  const copyGradient = (gradient: typeof gradients[0]) => {
    navigator.clipboard.writeText(`background: ${gradient.css};`)
    setCopiedId(gradient.id)
    toast.success(`Copied ${gradient.name}!`)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const toggleLike = (gradientId: string) => {
    setLikedGradients(prev => {
      const newSet = new Set(prev)
      if (newSet.has(gradientId)) newSet.delete(gradientId)
      else newSet.add(gradientId)
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-900/20"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto pt-36 sm:pt-40 pb-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">

            {/* Header Section */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white">
                Gradients
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground dark:text-white/60">
                {filteredGradients.length} beautiful gradient combinations
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search gradients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-full shadow-sm text-base"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-2 w-full px-2 sm:px-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full px-4 py-2 text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Gradients Grid */}
            <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredGradients.length === 0 ? (
                <Card className="p-12 text-center col-span-full">
                  <p className="text-muted-foreground">
                    No gradients found matching your search
                  </p>
                </Card>
              ) : (
                filteredGradients.map((gradient) => (
                  <Card
                    key={gradient.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all rounded-2xl"
                  >
                    {/* Gradient Preview */}
                    <div
                      className="relative h-44 sm:h-56 cursor-pointer"
                      style={{ background: gradient.css }}
                      onClick={() => copyGradient(gradient)}
                    >
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-3 text-center">
                          {copiedId === gradient.id ? (
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <Check className="w-6 h-6 text-white" />
                              </div>
                              <p className="text-white font-semibold">Copied!</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                <Copy className="w-6 h-6 text-white" />
                              </div>
                              <p className="text-white text-xs sm:text-sm font-medium">Click to Copy CSS</p>

                              {/* FIXED CODE BOX */}
                              <div className="px-3 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/20 w-[90%] max-w-[270px] overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                                <code className="text-white text-[10px] sm:text-xs font-mono whitespace-nowrap block">
                                  {gradient.css}
                                </code>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Like Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(gradient.id)
                        }}
                        className="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all z-10"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            likedGradients.has(gradient.id)
                              ? "fill-red-500 text-red-500"
                              : "text-white"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Gradient Info */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm sm:text-base text-left">{gradient.name}</h3>
                        <Badge variant="secondary" className="text-xs flex-shrink-0">
                          {gradient.category}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {gradient.colors.map((color, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <div
                              className="w-5 h-5 sm:w-6 sm:h-6 rounded border border-border"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-xs font-mono text-muted-foreground">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
