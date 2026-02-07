"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Heart,
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  Shuffle,
} from "lucide-react";

import { motion } from "framer-motion";

import { colorPalettes, categories, type ColorPalette } from "@/lib/palettes";
import { toast } from "sonner";

export default function PalettesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("new");
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(
    null,
  );
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [likedPalettes, setLikedPalettes] = useState<Set<string>>(new Set());

  const filteredPalettes = colorPalettes.filter((palette) => {
    const matchesSearch =
      palette.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      palette.colors.some((color) =>
        color.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    if (selectedCategory === "new") return matchesSearch;
    if (selectedCategory === "popular")
      return matchesSearch && palette.likes > 300;
    if (selectedCategory === "random") return matchesSearch;
    if (selectedCategory === "collection")
      return matchesSearch && likedPalettes.has(palette.id);

    return matchesSearch && palette.category.toLowerCase() === selectedCategory;
  });

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    toast.success(`Copied ${color}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const toggleLike = (paletteId: string) => {
    setLikedPalettes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(paletteId)) {
        newSet.delete(paletteId);
        toast.success("Removed from collection");
      } else {
        newSet.add(paletteId);
        toast.success("Added to collection");
      }
      return newSet;
    });
  };

  const getCategoryIcon = (categoryId: string) => {
    if (categoryId === "new") return <Sparkles className="w-4 h-4" />;
    if (categoryId === "popular") return <TrendingUp className="w-4 h-4" />;
    if (categoryId === "random") return <Shuffle className="w-4 h-4" />;
    if (categoryId === "collection") return <Heart className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />

        <motion.main
          className="flex-1 container mx-auto px-4 pt-24 sm:pt-32 pb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto space-y-12">
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-clash-grotesk text-foreground tracking-tight">
                Color Palettes
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground font-ranade max-w-2xl mx-auto leading-relaxed">
                Explore thousands of beautiful color combinations for your next project, curated for rapid inspiration.
              </p>

              {/* Search bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="max-w-2xl mx-auto relative pt-4"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-20 group-focus-within:opacity-50 transition-opacity duration-500" />
                  {/* Input */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="palette_search"
                    placeholder=" "
                    className="
                        w-full h-14 px-6 pr-12 rounded-2xl
                        text-base bg-background/60 backdrop-blur-xl
                        text-foreground
                        border border-border/50 shadow-sm hover:shadow-md
                        transition-all duration-300
                        focus:border-primary/50 focus:ring-0
                        placeholder-transparent
                    "
                  />

                  {/* Floating Label */}
                  <label
                    htmlFor="palette_search"
                    className="
                        absolute left-6 top-1/2 -translate-y-1/2
                        text-muted-foreground
                        text-sm pointer-events-none
                        transition-all duration-300
                        font-medium

                        peer-placeholder-shown:top-1/2
                        peer-placeholder-shown:text-base
                        peer-placeholder-shown:-translate-y-1/2

                        group-focus-within:text-primary group-focus-within:text-xs
                        group-focus-within:-translate-y-4 group-focus-within:top-3.5

                        peer-focus:text-primary peer-focus:text-xs
                        peer-focus:-translate-y-4 peer-focus:top-3.5
                    "
                  >
                    Search palettes...
                  </label>

                  {/* Search Icon */}
                  <Search
                    className="
                        absolute right-5 top-1/2 -translate-y-1/2
                        w-5 h-5 
                        text-muted-foreground
                        transition-all duration-300
                        group-focus-within:text-primary
                    "
                  />

                  {/* Clear Button */}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="
                          absolute right-14 top-1/2 -translate-y-1/2
                          text-muted-foreground hover:text-destructive
                          transition-colors p-1
                        "
                    >
                      ✕
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* CATEGORY FILTERS */}
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-10">
              {/* Sidebar */}
              <aside className="hidden sm:block w-48 lg:w-64 flex-shrink-0">
                <div className="sticky top-28 space-y-6">
                  <div className="px-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 font-clash-grotesk">Categories</h3>
                  </div>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 group relative overflow-hidden ${selectedCategory === category.id
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        {selectedCategory === category.id && (
                          <motion.div
                            layoutId="activeCategory"
                            className="absolute inset-0 bg-primary z-0"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-3">
                          {getCategoryIcon(category.id)}
                          {category.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Mobile tabs */}
              <div className="sm:hidden flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar items-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedCategory === category.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background/50 backdrop-blur-md border-border/50 text-muted-foreground"
                      }`}
                  >
                    {getCategoryIcon(category.id)}
                    {category.name}
                  </button>
                ))}
              </div>

              <motion.div
                className="flex-1 min-h-[500px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {filteredPalettes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 rounded-3xl border border-dashed border-border/50 bg-muted/20">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <Search className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">
                      No palettes found matching "{searchQuery}"
                    </p>
                    <Button variant="outline" onClick={() => setSearchQuery("")}>Clear Search</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPalettes.map((palette, idx) => (
                      <motion.div
                        key={palette.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                      >
                        <div
                          className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                          onClick={() => setSelectedPalette(palette)}
                        >
                          <div className="grid grid-cols-4 h-40 group-hover:h-44 transition-all duration-300">
                            {palette.colors.map((color, index) => (
                              <div
                                key={index}
                                className="relative group/color"
                                style={{ backgroundColor: color }}
                              >
                                <div className="absolute inset-0 bg-black/0 group-hover/color:bg-black/10 transition-colors" />
                              </div>
                            ))}
                          </div>

                          <div className="p-4 space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-base font-clash-grotesk truncate pr-2 text-foreground">
                                {palette.name}
                              </h3>
                              <Badge
                                variant="secondary"
                                className="text-[10px] uppercase tracking-wider font-semibold opacity-70 bg-muted hover:bg-muted/80 text-muted-foreground"
                              >
                                {palette.category}
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground pt-1 border-t border-border/50">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLike(palette.id);
                                }}
                                className="flex items-center gap-1.5 hover:text-destructive transition-colors group/like"
                              >
                                <Heart
                                  className={`w-4 h-4 transition-transform group-hover/like:scale-110 ${likedPalettes.has(palette.id)
                                    ? "fill-red-500 text-red-500"
                                    : ""
                                    }`}
                                />
                                <span className="font-medium font-mono">
                                  {palette.likes +
                                    (likedPalettes.has(palette.id) ? 1 : 0)}
                                </span>
                              </button>

                              <span className="text-xs font-medium opacity-60">{palette.timeAgo}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.main>
        <Footer />
      </div>

      {/* DIALOG */}
      <Dialog
        open={!!selectedPalette}
        onOpenChange={() => setSelectedPalette(null)}
      >
        <DialogContent className="max-w-sm sm:max-w-2xl p-0 overflow-hidden border-none bg-background/95 backdrop-blur-2xl shadow-2xl border border-border/50">
          {selectedPalette && (
            <div className="flex flex-col">
              <div className="p-6 pb-2">
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl font-clash-grotesk flex items-center justify-between text-foreground">
                    <span>{selectedPalette.name}</span>
                    <Badge variant="outline" className="text-xs font-normal font-sans opacity-60 border-border text-muted-foreground">{selectedPalette.category}</Badge>
                  </DialogTitle>
                </DialogHeader>
              </div>

              <div className="grid grid-cols-4 h-48 sm:h-56">
                {selectedPalette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[1px]">
                      <span className="text-white font-mono font-medium text-sm tracking-widest">{color.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 space-y-6 bg-muted/30">
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
                    Full Palette
                  </h3>
                  {selectedPalette.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background transition-colors group"
                    >
                      <div
                        className="w-12 h-12 rounded-lg shadow-sm flex-shrink-0 ring-1 ring-inset ring-black/10 dark:ring-white/10"
                        style={{ backgroundColor: color }}
                      />
                      <div className="flex-1">
                        <p className="font-mono font-bold text-sm sm:text-base tracking-wide text-foreground">
                          {color.toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">
                          rgb({parseInt(color.slice(1, 3), 16)},
                          {parseInt(color.slice(3, 5), 16)},
                          {parseInt(color.slice(5, 7), 16)})
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(color)}
                        className="opacity-50 group-hover:opacity-100 hover:bg-muted"
                      >
                        {copiedColor === color ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button
                      onClick={() => toggleLike(selectedPalette.id)}
                      className="flex items-center gap-2 hover:text-destructive transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${likedPalettes.has(selectedPalette.id) ? "fill-red-500 text-red-500" : ""}`} />
                      <span className="font-medium">{selectedPalette.likes + (likedPalettes.has(selectedPalette.id) ? 1 : 0)} Likes</span>
                    </button>
                    <span>•</span>
                    <span>{selectedPalette.timeAgo}</span>
                  </div>

                  <Button
                    className="w-full sm:w-auto font-sans rounded-full px-6"
                    onClick={() => {
                      const allColors = selectedPalette.colors.join(", ");
                      navigator.clipboard.writeText(allColors);
                      toast.success("All colors copied!");
                    }}
                  >
                    Copy All Colors
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
