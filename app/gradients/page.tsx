"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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
import { Maximize2, X, Copy, Check, Shuffle, ChevronDown } from "lucide-react";
import { gradients } from "@/lib/gradients";
import { toast } from "sonner";
import Link from "next/link";

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
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-900/20"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />

        <motion.main
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 container mx-auto pt-36 sm:pt-40 pb-10 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl sm:text-4xl md:text-5xl font-extrabold text-foreground dark:text-white">
                Gradient Maker
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground dark:text-white/60 pt-1">
                Create and export beautiful gradients
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start pt-5">
              {/* Left Panel */}
              <Card className="p-5 sm:p-8 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Colors</h2>
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center gap-3"
                    >
                      <Label className="text-sm w-full sm:w-20">
                        Color {index + 1}
                      </Label>
                      <div className="flex items-center gap-3 w-full">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => updateColor(index, e.target.value)}
                          className="w-12 h-10 rounded-lg cursor-pointer border shrink-0"
                        />
                        <Input
                          value={color.toUpperCase()}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^#[0-9A-F]{0,6}$/i.test(value))
                              updateColor(index, value);
                          }}
                          className="font-mono flex-1"
                        />
                        {colors.length > 2 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeColor(index)}
                            className="hidden sm:flex"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      {colors.length > 2 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeColor(index)}
                          className="sm:hidden w-full"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {colors.length < 5 && (
                    <Button
                      variant="outline"
                      onClick={addColor}
                      className="w-full"
                    >
                      Add Color
                    </Button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rotation</Label>
                    <Select value={rotation} onValueChange={setRotation}>
                      <SelectTrigger>
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

                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={gradientType}
                      onValueChange={setGradientType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Linear" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={randomizeGradient}
                    className="flex-1 gap-2 justify-center"
                  >
                    <Shuffle className="w-4 h-4" />
                    Random
                  </Button>
                  <Button
                    onClick={copyCSS}
                    className="flex-1 gap-2 justify-center"
                  >
                    {copiedCss ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    Copy CSS
                  </Button>
                </div>
              </Card>

              {/* Right Gradient Preview */}
              <div className="flex flex-col gap-4">
                <Card
                  className="h-56 sm:h-72 md:h-80 rounded-2xl shadow-2xl relative overflow-hidden"
                  style={{ background: gradientCSS }}
                >
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                      onClick={() => setExpanded(true)}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs sm:text-sm text-muted-foreground">
                      CSS Code
                    </Label>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyCSS}
                      className="flex items-center gap-2"
                    >
                      {copiedCss ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <code className="text-xs sm:text-sm font-mono block mt-2 p-3 bg-muted rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
                    background: {gradientCSS};
                  </code>
                </Card>
              </div>
            </div>

            {/* Example Gradients */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold">
                  Example Gradients
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {gradients.slice(0, 12).map((gradient) => (
                  <button
                    key={gradient.id}
                    onClick={() => {
                      setColors(gradient.colors);
                      toast.success(`Applied ${gradient.name}`);
                    }}
                    className="group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                    style={{ background: gradient.css }}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end p-3">
                      <p className="text-white text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        {gradient.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link href="/gradients/all">
                  <Button size="lg" className="gap-2">
                    View All Gradients
                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-[90%] h-[70%] sm:w-[80%] sm:h-[75%] rounded-3xl shadow-2xl overflow-hidden"
              style={{ background: gradientCSS }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-4 right-4 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50"
                onClick={() => setExpanded(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
