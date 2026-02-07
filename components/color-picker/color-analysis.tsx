"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  RefreshCcw,
  Sparkles,
  ArrowLeftRight,
  Grid,
  FlaskConical,
  Eye,
  Palette
} from "lucide-react";
import {
  hexToRgb,
  rgbToHsl,
  rgbToHsv,
  rgbToCmyk,
  generateShades,
  generateTints,
  generateTones,
  generateComplementary,
  generateAnalogous,
  generateTriadic,
  generateTetradic,
  getContrastRatio,
  simulateColorBlindness,
  getColorName,
} from "@/lib/color-utils";
import { toast } from "sonner";

interface ColorAnalysisProps {
  color: string;
}

export default function ColorAnalysis({ color }: ColorAnalysisProps) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("formats");

  const rgb = hexToRgb(color) || { r: 0, g: 0, b: 0 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const shades = generateShades(color);
  const tints = generateTints(color);
  const tones = generateTones(color);

  const complementary = generateComplementary(color);
  const analogous = generateAnalogous(color);
  const triadic = generateTriadic(color);
  const tetradic = generateTetradic(color);

  const whiteContrast = getContrastRatio(rgb, { r: 255, g: 255, b: 255 });
  const blackContrast = getContrastRatio(rgb, { r: 0, g: 0, b: 0 });

  const protanopia = simulateColorBlindness(color, "protanopia");
  const deuteranopia = simulateColorBlindness(color, "deuteranopia");
  const tritanopia = simulateColorBlindness(color, "tritanopia");

  const colorName = getColorName(color);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    toast.success(`Copied ${label}`);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const tabs = [
    { value: "formats", label: "Color Conversion", icon: RefreshCcw },
    { value: "variations", label: "Variations", icon: Sparkles },
    { value: "combinations", label: "Color Combinations", icon: ArrowLeftRight },
    { value: "contrast", label: "Contrast Analysis", icon: Grid },
    { value: "analysis", label: "Color Analysis", icon: FlaskConical },
    { value: "blindness", label: "Blindness Simulator", icon: Eye },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      <Card className="p-1.5 border-none bg-background/50 backdrop-blur-3xl shadow-2xl rounded-[2rem] overflow-hidden">
        <div className="bg-card/40 border border-white/10 dark:border-white/5 rounded-[1.7rem] p-6 sm:p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
              {/* Sidebar Navigation */}
              <TabsList className="flex flex-col h-auto bg-card/60 backdrop-blur-md border border-white/5 p-2 rounded-2xl gap-1.5 w-full">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="w-full justify-start px-4 py-3.5 rounded-xl text-left font-medium text-sm transition-all flex items-center gap-3
                             data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none
                             hover:bg-white/5 text-muted-foreground data-[state=active]:font-semibold"
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Content Area */}
              <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                  >
                    {activeTab === "formats" && (
                      <FormatsTab
                        color={color}
                        rgb={rgb}
                        hsl={hsl}
                        hsv={hsv}
                        cmyk={cmyk}
                        copiedValue={copiedValue}
                        copyToClipboard={copyToClipboard}
                      />
                    )}

                    {activeTab === "variations" && (
                      <VariationsTab
                        shades={shades}
                        tints={tints}
                        tones={tones}
                        copiedValue={copiedValue}
                        copyToClipboard={copyToClipboard}
                      />
                    )}

                    {activeTab === "combinations" && (
                      <CombinationsTab
                        color={color}
                        complementary={complementary}
                        analogous={analogous}
                        triadic={triadic}
                        tetradic={tetradic}
                        copiedValue={copiedValue}
                        copyToClipboard={copyToClipboard}
                      />
                    )}

                    {activeTab === "contrast" && (
                      <ContrastTab
                        color={color}
                        whiteContrast={whiteContrast}
                        blackContrast={blackContrast}
                      />
                    )}

                    {activeTab === "analysis" && (
                      <AnalysisTab colorName={colorName} hsl={hsl} hsv={hsv} />
                    )}

                    {activeTab === "blindness" && (
                      <BlindnessTab
                        color={color}
                        protanopia={protanopia}
                        deuteranopia={deuteranopia}
                        tritanopia={tritanopia}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}

function FormatsTab({
  color,
  rgb,
  hsl,
  hsv,
  cmyk,
  copiedValue,
  copyToClipboard,
}: any) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Technical Formats
        </h3>
        <div className="space-y-3">
          <FormatCard
            label="HEX"
            value={color.toUpperCase()}
            copied={copiedValue === color.toUpperCase()}
            onCopy={() => copyToClipboard(color.toUpperCase(), "HEX")}
          />
          <FormatCard
            label="RGB"
            value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
            copied={copiedValue === `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
            onCopy={() =>
              copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")
            }
          />
          <FormatCard
            label="HSL"
            value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
            copied={copiedValue === `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
            onCopy={() =>
              copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")
            }
          />
          <FormatCard
            label="HSV"
            value={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`}
            copied={copiedValue === `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`}
            onCopy={() =>
              copyToClipboard(`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`, "HSV")
            }
          />
        </div>

      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Practical Formats
        </h3>
        <div className="space-y-3">
          <FormatCard
            label="CMYK"
            value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
            copied={
              copiedValue ===
              `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`
            }
            onCopy={() =>
              copyToClipboard(
                `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
                "CMYK"
              )
            }
          />
          <FormatCard
            label="Android"
            value={`#${color.slice(1).toUpperCase()}`}
            copied={copiedValue === `#${color.slice(1).toUpperCase()}`}
            onCopy={() =>
              copyToClipboard(`#${color.slice(1).toUpperCase()}`, "Android")
            }
          />
        </div>
      </div>
    </div>
  );
}

function VariationsTab({
  shades,
  tints,
  tones,
  copiedValue,
  copyToClipboard,
}: any) {
  return (
    <div className="space-y-8">
      <PaletteSection
        title="Shades (Darker)"
        colors={shades}
        copiedValue={copiedValue}
        copyToClipboard={copyToClipboard}
      />
      <PaletteSection
        title="Tints (Lighter)"
        colors={tints}
        copiedValue={copiedValue}
        copyToClipboard={copyToClipboard}
      />
      <PaletteSection
        title="Tones (Desaturated)"
        colors={tones}
        copiedValue={copiedValue}
        copyToClipboard={copyToClipboard}
      />
    </div>
  );
}

function CombinationsTab({
  color,
  complementary,
  analogous,
  triadic,
  tetradic,
  copiedValue,
  copyToClipboard,
}: any) {
  return (
    <div className="space-y-8">
      <PaletteSection
        title="Complementary"
        colors={[color, complementary]}
        copiedValue={copiedValue}
        copyToClipboard={copyToClipboard}
      />
      <PaletteSection
        title="Analogous"
        colors={analogous}
        copiedValue={copiedValue}
        copyToClipboard={copyToClipboard}
      />
      <PaletteSection
        title="Triadic"
        colors={triadic}
        copiedValue={copiedValue}
        copyToClipboard={copyToClipboard}
      />
      <PaletteSection
        title="Tetradic"
        colors={tetradic}
        copiedValue={copiedValue}
        copyToClipboard={copyToClipboard}
      />
    </div>
  );
}

function ContrastTab({ color, whiteContrast, blackContrast }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <ContrastCard
        label="White Text"
        backgroundColor={color}
        textColor="#FFFFFF"
        ratio={whiteContrast}
      />
      <ContrastCard
        label="Black Text"
        backgroundColor={color}
        textColor="#000000"
        ratio={blackContrast}
      />
    </div>
  );
}

function AnalysisTab({ colorName, hsl, hsv }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-background/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 space-y-4 shadow-sm">
        <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Color Properties
        </h3>
        <div className="space-y-1">
          <PropertyRow label="Color Name" value={colorName} />
          <PropertyRow label="Hue" value={`${hsl.h}°`} />
          <PropertyRow label="Saturation" value={`${hsl.s}%`} />
          <PropertyRow label="Lightness" value={`${hsl.l}%`} />
          <PropertyRow label="Brightness" value={`${hsv.v}%`} />
        </div>
      </div>

      <div className="bg-background/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 space-y-4 shadow-sm">
        <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Creative Aspects
        </h3>
        <div className="space-y-1">
          <PropertyRow
            label="Temperature"
            value={hsl.h > 180 && hsl.h < 300 ? "Cool" : "Warm"}
          />
          <PropertyRow
            label="Vibrancy"
            value={hsl.s > 70 ? "High" : hsl.s > 40 ? "Medium" : "Low"}
          />
          <PropertyRow
            label="Mood"
            value={
              hsl.l > 70
                ? "Light & Airy"
                : hsl.l < 30
                  ? "Dark & Mysterious"
                  : "Balanced"
            }
          />
        </div>
      </div>
    </div>
  );
}

function BlindnessTab({ color, protanopia, deuteranopia, tritanopia }: any) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BlindnessCard label="Normal Vision" color={color} />
      <BlindnessCard label="Protanopia (Red-Blind)" color={protanopia} />
      <BlindnessCard label="Deuteranopia (Green-Blind)" color={deuteranopia} />
      <BlindnessCard label="Tritanopia (Blue-Blind)" color={tritanopia} />
    </div>
  );
}

function FormatCard({ label, value, onCopy, copied }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background/30 hover:bg-background/50 transition-colors group">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-sm sm:text-base font-mono font-medium tracking-wide mt-0.5">
          {value}
        </p>
      </div>
      <Button variant="ghost" size="icon" onClick={onCopy} className="opacity-70 group-hover:opacity-100 hover:bg-primary/10 hover:text-primary">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );
}

function PaletteSection({ title, colors, copiedValue, copyToClipboard }: any) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-foreground/80">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {colors.map((c: string, i: number) => (
          <div key={i} className="group flex flex-col items-center gap-1.5">
            <button
              onClick={() => copyToClipboard(c, c)}
              className="w-full aspect-square rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 block ring-1 ring-black/5"
              style={{ backgroundColor: c }}
            />
            <p className="text-[10px] sm:text-xs font-mono text-muted-foreground opacity-70 group-hover:opacity-100 transition-opacity">
              {c}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContrastCard({ backgroundColor, textColor, ratio, label }: any) {
  const passesAA = ratio >= 4.5;
  const passesAAA = ratio >= 7;
  return (
    <div className="space-y-4">
      <div
        className="p-8 sm:p-10 rounded-2xl text-center font-semibold shadow-inner"
        style={{ backgroundColor, color: textColor }}
      >
        <p className="text-3xl font-bold tracking-tight">Abc</p>
        <p className="text-sm mt-2 opacity-80">{label}</p>
      </div>

      <div className="bg-background/40 backdrop-blur-sm rounded-xl p-4 border border-white/5 flex flex-col gap-2">
        <div className="flex justify-between items-center border-b border-border/50 pb-2">
          <span className="text-sm text-muted-foreground">Contrast Ratio</span>
          <span className="font-mono font-medium">{ratio.toFixed(2)}:1</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">WCAG AA</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${passesAA ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
            {passesAA ? "PASS" : "FAIL"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">WCAG AAA</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${passesAAA ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
            {passesAAA ? "PASS" : "FAIL"}
          </span>
        </div>
      </div>
    </div>
  );
}

function PropertyRow({ label, value }: any) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-border/40 last:border-0 hover:bg-white/5 px-2 -mx-2 rounded-lg transition-colors">
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function BlindnessCard({ label, color }: any) {
  return (
    <div className="space-y-3 group">
      <div
        className="w-full aspect-square rounded-2xl border border-black/5 shadow-sm group-hover:scale-105 transition-transform duration-300"
        style={{ backgroundColor: color }}
      />
      <div className="text-center">
        <p className="font-medium text-sm text-foreground">{label}</p>
        <p className="text-xs font-mono text-muted-foreground mt-0.5">{color}</p>
      </div>
    </div>
  );
}
