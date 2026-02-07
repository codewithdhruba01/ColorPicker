"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Maximize2, X, Copy, Check, Shuffle, ChevronDown, Plus, Trash2, Github } from "lucide-react";
import { gradients } from "@/lib/gradients";
import { toast } from "sonner";
import Link from "next/link";
import { PopoverPicker } from "@/components/color-picker/popover-picker";

export default function GradientsPage() {
  const [colors, setColors] = useState(["#EEDDFF", "#9966FF"]);
  const [rotation, setRotation] = useState("135");
  const [gradientType, setGradientType] = useState("linear");
  const [copiedCss, setCopiedCss] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const generateGradientCSS = () => {
    const colorStops = colors
      .map((color, index) => {
        const position = (index / (colors.length - 1)) * 100;
        return `${color} ${position}%`;
      })
      .join(", ");

    if (gradientType === "radial") {
      return `radial-gradient(circle, ${colorStops})`;
    }
    return `linear-gradient(${rotation}deg, ${colorStops})`;
  };

  const gradientCSS = generateGradientCSS();

  const addColor = () => {
    if (colors.length < 5) setColors([...colors, "#FF00FF"]);
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) setColors(colors.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const randomizeGradient = () => {
    const randomGradient =
      gradients[Math.floor(Math.random() * gradients.length)];
    setColors(randomGradient.colors);
    toast.success("Random gradient applied!");
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(`background: ${gradientCSS};`);
    setCopiedCss(true);
    toast.success("CSS copied to clipboard!");
    setTimeout(() => setCopiedCss(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-stone-950 flex flex-col overflow-hidden font-sans selection:bg-primary/20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 container mx-auto pt-24 sm:pt-32 pb-10 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Title */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-clash-grotesk text-foreground dark:text-white tracking-tight">
                Gradient Maker
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground font-ranade dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
                Create multiple color commands and export beautiful gradients for your next project.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-8 items-start lg:grid lg:grid-cols-2">
              {/* Left Panel: Controls */}
              <Card className="w-full p-1.5 border-none bg-background/50 backdrop-blur-3xl shadow-2xl rounded-[2rem] overflow-hidden">
                <div className="bg-card/40 border border-white/10 dark:border-white/5 rounded-[1.7rem] p-6 sm:p-8 space-y-8 h-full">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold font-clash-grotesk tracking-wide flex items-center gap-2">
                      <span className="w-2 h-6 bg-primary rounded-full inline-block" />
                      Configuration
                    </h2>
                    <Button variant="ghost" size="sm" onClick={randomizeGradient} className="gap-2 hover:bg-auto text-muted-foreground hover:text-primary">
                      <Shuffle className="w-4 h-4" /> Randomize
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Colors</Label>
                        <span className="text-xs text-muted-foreground">{colors.length}/5</span>
                      </div>

                      <div className="space-y-3">
                        {colors.map((color, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-2 rounded-xl bg-background/40 border border-white/5 hover:border-white/10 transition-colors group"
                          >
                            <div className="flex items-center gap-3 flex-1 overflow-hidden">
                              <span className="text-xs font-mono text-muted-foreground w-4 text-center">{index + 1}</span>
                              <div className="h-8 w-px bg-white/10 flex-shrink-0" />

                              <PopoverPicker
                                color={color}
                                onChange={(val) => updateColor(index, val)}
                                trigger={
                                  <button className="w-10 h-10 rounded-lg border border-white/10 shadow-sm cursor-pointer hover:scale-105 transition-transform flex-shrink-0" style={{ backgroundColor: color }} />
                                }
                              />

                              <Input
                                value={color.toUpperCase()}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^#[0-9A-F]{0,6}$/i.test(value))
                                    updateColor(index, value);
                                }}
                                className="font-mono bg-transparent border-none min-w-0 w-full focus-visible:ring-0 px-0"
                              />
                            </div>

                            {colors.length > 2 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeColor(index)}
                                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      {colors.length < 5 && (
                        <Button
                          variant="outline"
                          onClick={addColor}
                          className="w-full border-dashed border-white/20 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all rounded-xl h-12"
                        >
                          <Plus className="w-4 h-4 mr-2" /> Add Color Stop
                        </Button>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                        <Select
                          value={gradientType}
                          onValueChange={setGradientType}
                        >
                          <SelectTrigger className="h-11 bg-background/40 border-white/10 rounded-xl">
                            <SelectValue placeholder="Linear" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="linear">Linear</SelectItem>
                            <SelectItem value="radial">Radial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-muted-foreground">Rotation ({rotation}°)</Label>
                        <Select value={rotation} onValueChange={setRotation} disabled={gradientType === "radial"}>
                          <SelectTrigger className="h-11 bg-background/40 border-white/10 rounded-xl">
                            <SelectValue placeholder="135°" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                              <SelectItem key={deg} value={deg.toString()}>
                                {deg}°
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Right Panel: Preview */}
              <div className="flex flex-col gap-6 w-full lg:sticky lg:top-32">
                <Card
                  className="h-64 sm:h-80 md:h-96 rounded-[2rem] shadow-2xl relative overflow-hidden group border-white/10 cursor-pointer w-full"
                  style={{ background: gradientCSS }}
                  onClick={() => setExpanded(true)}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white border border-white/10"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>

                <Card className="p-1.5 border-none bg-background/50 backdrop-blur-3xl shadow-lg rounded-[1.5rem] overflow-hidden w-full">
                  <div className="bg-card/40 border border-white/10 dark:border-white/5 rounded-[1.3rem] p-5 flex items-center justify-between gap-4">
                    <div className="flex-1 font-mono text-xs sm:text-sm text-muted-foreground truncate px-2">
                      background: {gradientCSS};
                    </div>
                    <Button
                      size="sm"
                      onClick={copyCSS}
                      className={`rounded-full px-6 transition-all shrink-0 ${copiedCss ? "bg-green-500 hover:bg-green-600 text-white" : ""
                        }`}
                    >
                      {copiedCss ? (
                        <>
                          <Check className="w-4 h-4 mr-2" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" /> Copy CSS
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Example Gradients */}
            <div className="space-y-8 pt-12 border-t border-white/5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl font-bold font-clash-grotesk">
                  Curated Presets
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
                {gradients.slice(0, 12).map((gradient) => (
                  <motion.button
                    key={gradient.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setColors(gradient.colors);
                      toast.success(`Applied ${gradient.name}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow"
                    style={{ background: gradient.css }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-medium font-clash-grotesk tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {gradient.name}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="text-center pt-8">
                <Link href="/gradients/all">
                  <Button size="lg" className="rounded-full px-8 h-12 gap-2 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                    View Library <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.main>

        <Footer />
      </div>

      {/* Fullscreen Gradient Popup */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setExpanded(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video rounded-[2rem] shadow-2xl overflow-hidden border border-white/10"
              style={{ background: gradientCSS }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-6 right-6 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white border border-white/10"
                onClick={() => setExpanded(false)}
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity">
                <Button onClick={copyCSS} className="rounded-full shadow-lg bg-black/30 backdrop-blur-md border border-white/10 hover:bg-black/50">
                  {copiedCss ? "Copied!" : "Copy CSS"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
