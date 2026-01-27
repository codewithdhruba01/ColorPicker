"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Copy, RotateCcw } from "lucide-react";
import { hexToRgb, getContrastRatio } from "@/lib/color-utils";
import { toast } from "sonner";

export default function ContrastCheckerPage() {
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const fgRgb = hexToRgb(foregroundColor) || { r: 0, g: 0, b: 0 };
  const bgRgb = hexToRgb(backgroundColor) || { r: 255, g: 255, b: 255 };
  const contrastRatio = getContrastRatio(fgRgb, bgRgb);

  const wcagAANormal = contrastRatio >= 4.5;
  const wcagAALarge = contrastRatio >= 3;
  const wcagAAA = contrastRatio >= 7;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${text}`);
  };

  const swapColors = () => {
    const temp = foregroundColor;
    setForegroundColor(backgroundColor);
    setBackgroundColor(temp);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-stone-950 flex flex-col font-sans selection:bg-primary/20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Navbar stays static */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 container mx-auto px-4 pt-24 sm:pt-32 pb-20">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Header Section */}
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-clash-grotesk text-foreground dark:text-white tracking-tight">
                Contrast Checker
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground font-ranade dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
                Check color contrast ratios and ensure your designs meet WCAG accessibility standards with our real-time analyzer.
              </p>
            </motion.div>

            {/* Color Selection + WCAG Compliance */}
            <motion.div
              className="grid lg:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              {/* Color Selection Card */}
              <Card className="p-1.5 border-none bg-background/50 backdrop-blur-3xl shadow-2xl rounded-[2rem] overflow-hidden order-1 lg:order-none">
                <div className="bg-card/40 border border-white/10 dark:border-white/5 rounded-[1.7rem] p-6 sm:p-8 space-y-8 h-full flex flex-col">

                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold font-clash-grotesk tracking-wide flex items-center gap-2">
                      <span className="w-2 h-6 bg-primary rounded-full inline-block" />
                      Color Selection
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={swapColors}
                      className="gap-2 rounded-full border-border/50 hover:bg-muted/50 transition-all hover:rotate-180"
                    >
                      <RotateCcw className="w-4 h-4" /> Swap
                    </Button>
                  </div>

                  <div className="space-y-6 flex-1">
                    {/* Foreground Color */}
                    <div className="space-y-3">
                      <Label htmlFor="foreground" className="text-muted-foreground font-medium pl-1">
                        Foreground Color (Text)
                      </Label>
                      <div className="flex items-center gap-3 bg-background/30 p-2 rounded-xl border border-white/5 shadow-sm">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10 shadow-inner group">
                          <input
                            type="color"
                            value={foregroundColor}
                            onChange={(e) => setForegroundColor(e.target.value)}
                            className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] cursor-pointer p-0 m-0 opacity-0 z-10"
                          />
                          <div className="w-full h-full" style={{ backgroundColor: foregroundColor }} />
                        </div>

                        <Input
                          id="foreground"
                          value={foregroundColor.toUpperCase()}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^#[0-9A-F]{0,6}$/i.test(value))
                              setForegroundColor(value);
                          }}
                          className="flex-1 font-mono bg-transparent border-none focus-visible:ring-0 text-lg font-medium px-2"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(foregroundColor)}
                          className="hover:bg-muted/20"
                        >
                          <Copy className="w-4 h-4 opacity-50" />
                        </Button>
                      </div>
                    </div>

                    {/* Background Color */}
                    <div className="space-y-3">
                      <Label htmlFor="background" className="text-muted-foreground font-medium pl-1">Background Color</Label>
                      <div className="flex items-center gap-3 bg-background/30 p-2 rounded-xl border border-white/5 shadow-sm">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10 shadow-inner group">
                          <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] cursor-pointer p-0 m-0 opacity-0 z-10"
                          />
                          <div className="w-full h-full" style={{ backgroundColor: backgroundColor }} />
                        </div>

                        <Input
                          id="background"
                          value={backgroundColor.toUpperCase()}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^#[0-9A-F]{0,6}$/i.test(value))
                              setBackgroundColor(value);
                          }}
                          className="flex-1 font-mono bg-transparent border-none focus-visible:ring-0 text-lg font-medium px-2"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(backgroundColor)}
                          className="hover:bg-muted/20"
                        >
                          <Copy className="w-4 h-4 opacity-50" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border/10 space-y-4">
                    <h3 className="font-semibold text-lg font-clash-grotesk">Contrast Ratio</h3>
                    <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-background/20 to-primary/5 border border-primary/10 shadow-inner backdrop-blur-sm relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <div className="text-5xl sm:text-7xl font-bold text-foreground dark:text-white mb-2 font-clash-grotesk tracking-tight">
                        {contrastRatio.toFixed(2)}:1
                      </div>
                      <div className={`text-sm font-medium px-3 py-1 rounded-full border inline-block ${contrastRatio >= 4.5 ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                        {contrastRatio >= 7 ? "Excellent" : contrastRatio >= 4.5 ? "Good" : "Poor"}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* WCAG Compliance Card */}
              <Card className="p-1.5 border-none bg-background/50 backdrop-blur-3xl shadow-2xl rounded-[2rem] overflow-hidden order-2 lg:order-none">
                <div className="bg-card/40 border border-white/10 dark:border-white/5 rounded-[1.7rem] p-6 sm:p-8 space-y-8 h-full">
                  <h2 className="text-xl font-semibold font-clash-grotesk tracking-wide flex items-center gap-2">
                    <span className="w-2 h-6 bg-primary rounded-full inline-block" />
                    WCAG Compliance
                  </h2>

                  <div className="space-y-4">
                    <ComplianceCard
                      title="WCAG AA - Normal Text"
                      description="Minimum contrast ratio of 4.5:1 for regular text size (~16px)."
                      ratio="4.5:1"
                      passes={wcagAANormal}
                      currentRatio={contrastRatio}
                    />
                    <ComplianceCard
                      title="WCAG AA - Large Text"
                      description="Minimum contrast ratio of 3:1 for large text (>18pt or >14pt bold)."
                      ratio="3:1"
                      passes={wcagAALarge}
                      currentRatio={contrastRatio}
                    />
                    <ComplianceCard
                      title="WCAG AAA - Enhanced"
                      description="Strict standard. Minimum contrast ratio of 7:1 for enhanced accessibility."
                      ratio="7:1"
                      passes={wcagAAA}
                      currentRatio={contrastRatio}
                    />
                  </div>

                  <div className="pt-6 border-t border-border/10">
                    <h3 className="font-semibold mb-3 font-clash-grotesk">Quick Reference</h3>
                    <div className="space-y-2 text-sm text-muted-foreground dark:text-white/60 font-ranade">
                      <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/50" />AA is the industry standard for most accessibility requirements.</p>
                      <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/50" />AAA provides the highest level of accessibility.</p>
                      <p className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/50" />Higher ratios generally improve readability for everyone.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Live Preview */}
            <motion.div
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Card className="p-1.5 border-none bg-background/50 backdrop-blur-3xl shadow-2xl rounded-[2rem] overflow-hidden">
                <div className="bg-card/40 border border-white/10 dark:border-white/5 rounded-[1.7rem] p-6 sm:p-8">
                  <h2 className="text-xl font-semibold mb-8 font-clash-grotesk tracking-wide flex items-center gap-2">
                    <span className="w-2 h-6 bg-primary rounded-full inline-block" />
                    Live Preview
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <PreviewCard
                      bg={backgroundColor}
                      fg={foregroundColor}
                      title="Normal Text"
                      subtitle="Standard body text size"
                      size="text-base"
                    />
                    <PreviewCard
                      bg={backgroundColor}
                      fg={foregroundColor}
                      title="Large Text"
                      subtitle="Subheadings and highlights"
                      size="text-2xl"
                    />
                    <PreviewCard
                      bg={backgroundColor}
                      fg={foregroundColor}
                      title="Bold Text"
                      subtitle="Emphasized content"
                      size="text-base font-bold"
                    />
                    <PreviewCard
                      bg={backgroundColor}
                      fg={foregroundColor}
                      title="Heading"
                      subtitle="Main page titles"
                      size="text-3xl font-bold"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Accessibility Tips */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            ></motion.div>
          </div>
        </main>

        {/* Footer stays static */}
        <Footer />
      </div>
    </div>
  );
}

function ComplianceCard({
  title,
  description,
  ratio,
  passes,
  currentRatio,
}: any) {
  return (
    <div className={`p-4 rounded-xl border transition-all duration-300 ${passes ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <h4 className="font-semibold text-sm font-clash-grotesk">{title}</h4>
            <Badge
              variant={passes ? "default" : "destructive"}
              className="text-[10px] px-1.5 py-0 h-5"
            >
              Goal: {ratio}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed font-ranade opacity-80">{description}</p>
        </div>
        {passes ? (
          <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
        ) : (
          <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
        )}
      </div>
      {!passes && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium bg-red-500/10 inline-block px-2 py-0.5 rounded-md">
          Need +{(parseFloat(ratio) - currentRatio).toFixed(2)} more contrast
        </p>
      )}
    </div>
  );
}

function PreviewCard({ bg, fg, title, subtitle, size }: any) {
  return (
    <div
      className="p-6 rounded-2xl border min-h-[160px] flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:scale-[1.02] duration-300"
      style={{ backgroundColor: bg, borderColor: 'transparent' }}
    >
      <p className={`${size} mb-2`} style={{ color: fg }}>
        {title}
      </p>
      <p className="text-xs opacity-70" style={{ color: fg }}>
        {subtitle}
      </p>
    </div>
  );
}
