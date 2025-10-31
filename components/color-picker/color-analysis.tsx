"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-6 bg-card/60 backdrop-blur-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab List */}
          <TabsList className="w-full overflow-x-auto flex justify-start sm:justify-center gap-2 rounded-xl bg-muted/40 p-1">
            {[
              { value: "formats", label: "Formats" },
              { value: "variations", label: "Variations" },
              { value: "combinations", label: "Combos" },
              { value: "contrast", label: "Contrast" },
              { value: "analysis", label: "Analysis" },
              { value: "blindness", label: "Blindness" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`text-xs sm:text-sm rounded-lg px-3 py-2 font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted"
                }`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6 relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-6"
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
        </Tabs>
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
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Technical Formats</h3>
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

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Practical Formats</h3>
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
    <div className="space-y-6">
      <PaletteSection
        title="Shades (Add Black)"
        colors={shades}
        copiedValue={copiedValue}
        copyToClipboard={copyToClipboard}
      />
      <PaletteSection
        title="Tints (Add White)"
        colors={tints}
        copiedValue={copiedValue}
        copyToClipboard={copyToClipboard}
      />
      <PaletteSection
        title="Tones (Add Gray)"
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
    <div className="space-y-6">
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
    <div className="grid md:grid-cols-2 gap-6">
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
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 space-y-3">
        <h3 className="font-semibold text-lg">Color Properties</h3>
        <PropertyRow label="Color Name" value={colorName} />
        <PropertyRow label="Hue" value={`${hsl.h}°`} />
        <PropertyRow label="Saturation" value={`${hsl.s}%`} />
        <PropertyRow label="Lightness" value={`${hsl.l}%`} />
        <PropertyRow label="Brightness" value={`${hsv.v}%`} />
      </Card>

      <Card className="p-6 space-y-3">
        <h3 className="font-semibold text-lg">Creative Aspects</h3>
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
      </Card>
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
    <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs font-mono text-muted-foreground break-all">
          {value}
        </p>
      </div>
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );
}

function PaletteSection({ title, colors, copiedValue, copyToClipboard }: any) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-3">
        {colors.map((c: string, i: number) => (
          <div key={i} className="space-y-1">
            <button
              onClick={() => copyToClipboard(c, c)}
              className="w-full aspect-square rounded-lg border hover:border-primary transition-transform hover:scale-105"
              style={{ backgroundColor: c }}
            />
            <p className="text-[10px] sm:text-xs font-mono text-center truncate">
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
    <Card className="p-6 space-y-3">
      <div
        className="p-8 rounded-lg text-center font-semibold"
        style={{ backgroundColor, color: textColor }}
      >
        <p className="text-2xl">Sample Text</p>
        <p className="text-sm mt-2">{label}</p>
      </div>
      <p className="text-sm">
        <b>Contrast:</b> {ratio.toFixed(2)}:1
      </p>
      <p className={`text-sm ${passesAA ? "text-green-600" : "text-red-600"}`}>
        WCAG AA: {passesAA ? "Pass ✓" : "Fail ✗"}
      </p>
      <p className={`text-sm ${passesAAA ? "text-green-600" : "text-red-600"}`}>
        WCAG AAA: {passesAAA ? "Pass ✓" : "Fail ✗"}
      </p>
    </Card>
  );
}

function PropertyRow({ label, value }: any) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function BlindnessCard({ label, color }: any) {
  return (
    <Card className="p-4 space-y-2">
      <div
        className="w-full aspect-square rounded-lg border"
        style={{ backgroundColor: color }}
      />
      <div className="text-center">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs font-mono text-muted-foreground">{color}</p>
      </div>
    </Card>
  );
}
