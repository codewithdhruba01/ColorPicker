"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Heart, Copy, Check, Sparkles, TrendingUp, Shuffle } from "lucide-react"
import { colorPalettes, categories, type ColorPalette } from "@/lib/palettes"
import { toast } from "sonner"

export default function PalettesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("new")
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [likedPalettes, setLikedPalettes] = useState<Set<string>>(new Set())

  const filteredPalettes = colorPalettes.filter((palette) => {
    const matchesSearch = palette.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      palette.colors.some(color => color.toLowerCase().includes(searchQuery.toLowerCase()))

    if (selectedCategory === "new") return matchesSearch
    if (selectedCategory === "popular") return matchesSearch && palette.likes > 300
    if (selectedCategory === "random") return matchesSearch
    if (selectedCategory === "collection") return matchesSearch && likedPalettes.has(palette.id)

    return matchesSearch && palette.category.toLowerCase() === selectedCategory
  })

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    toast.success(`Copied ${color}`)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const toggleLike = (paletteId: string) => {
    setLikedPalettes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(paletteId)) {
        newSet.delete(paletteId)
        toast.success("Removed from collection")
      } else {
        newSet.add(paletteId)
        toast.success("Added to collection")
      }
      return newSet
    })
  }

  const getCategoryIcon = (categoryId: string) => {
    if (categoryId === "new") return <Sparkles className="w-4 h-4" />
    if (categoryId === "popular") return <TrendingUp className="w-4 h-4" />
    if (categoryId === "random") return <Shuffle className="w-4 h-4" />
    if (categoryId === "collection") return <Heart className="w-4 h-4" />
    return null
  }

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-900/20"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-white">
                Color Palettes
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground dark:text-white/60 max-w-2xl mx-auto">
                Explore thousands of beautiful color combinations for your next project
              </p>

              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search palettes by name or color..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            <div className="flex gap-4 lg:gap-6">
              <aside className="hidden sm:block w-48 lg:w-56 flex-shrink-0">
                <Card className="p-4 sticky top-24">
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                          selectedCategory === category.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {getCategoryIcon(category.id)}
                        {category.name}
                      </button>
                    ))}
                  </div>
                </Card>
              </aside>

              <div className="sm:hidden flex gap-2 overflow-x-auto pb-4">
                {categories.slice(0, 6).map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex-shrink-0 gap-2"
                  >
                    {getCategoryIcon(category.id)}
                    {category.name}
                  </Button>
                ))}
              </div>

              <div className="flex-1">
                {filteredPalettes.length === 0 ? (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">No palettes found matching your search</p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {filteredPalettes.map((palette) => (
                      <Card
                        key={palette.id}
                        className="group overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02]"
                        onClick={() => setSelectedPalette(palette)}
                      >
                        <div className="grid grid-cols-4 h-32 sm:h-40">
                          {palette.colors.map((color, index) => (
                            <div
                              key={index}
                              className="transition-all group-hover:scale-105"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-sm sm:text-base">{palette.name}</h3>
                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                              {palette.category}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleLike(palette.id)
                              }}
                              className="flex items-center gap-1 hover:text-red-500 transition-colors"
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  likedPalettes.has(palette.id) ? "fill-red-500 text-red-500" : ""
                                }`}
                              />
                              <span>{palette.likes + (likedPalettes.has(palette.id) ? 1 : 0)}</span>
                            </button>
                            <span className="text-xs">{palette.timeAgo}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <Dialog open={!!selectedPalette} onOpenChange={() => setSelectedPalette(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedPalette?.name}</DialogTitle>
          </DialogHeader>

          {selectedPalette && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 h-48 rounded-lg overflow-hidden">
                {selectedPalette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="transition-all hover:scale-105"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Color Codes</h3>
                {selectedPalette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-border flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1">
                      <p className="font-mono font-semibold">{color.toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground">
                        RGB: {parseInt(color.slice(1, 3), 16)}, {parseInt(color.slice(3, 5), 16)},{" "}
                        {parseInt(color.slice(5, 7), 16)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(color)}
                    >
                      {copiedColor === color ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {selectedPalette.likes}
                  </span>
                  <span>{selectedPalette.timeAgo}</span>
                  <Badge variant="secondary">{selectedPalette.category}</Badge>
                </div>
                <Button
                  onClick={() => {
                    const allColors = selectedPalette.colors.join(", ")
                    navigator.clipboard.writeText(allColors)
                    toast.success("All colors copied!")
                  }}
                >
                  Copy All Colors
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
