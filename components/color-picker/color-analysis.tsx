"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
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
} from "@/lib/color-utils"
import { toast } from "sonner"

interface ColorAnalysisProps {
  color: string
}

export default function ColorAnalysis({ color }: ColorAnalysisProps) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null)

  const rgb = hexToRgb(color) || { r: 0, g: 0, b: 0 }
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)

  const shades = generateShades(color)
  const tints = generateTints(color)
  const tones = generateTones(color)

  const complementary = generateComplementary(color)
  const analogous = generateAnalogous(color)
  const triadic = generateTriadic(color)
  const tetradic = generateTetradic(color)

  const whiteContrast = getContrastRatio(rgb, { r: 255, g: 255, b: 255 })
  const blackContrast = getContrastRatio(rgb, { r: 0, g: 0, b: 0 })

  const protanopia = simulateColorBlindness(color, "protanopia")
  const deuteranopia = simulateColorBlindness(color, "deuteranopia")
  const tritanopia = simulateColorBlindness(color, "tritanopia")

  const colorName = getColorName(color)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedValue(text)
    toast.success(`Copied ${label}`)
    setTimeout(() => setCopiedValue(null), 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-6">
        <Tabs defaultValue="formats" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
            <TabsTrigger value="formats" className="text-xs sm:text-sm">Formats</TabsTrigger>
            <TabsTrigger value="variations" className="text-xs sm:text-sm">Variations</TabsTrigger>
            <TabsTrigger value="combinations" className="text-xs sm:text-sm">Combos</TabsTrigger>
            <TabsTrigger value="contrast" className="text-xs sm:text-sm">Contrast</TabsTrigger>
            <TabsTrigger value="analysis" className="text-xs sm:text-sm">Analysis</TabsTrigger>
            <TabsTrigger value="blindness" className="text-xs sm:text-sm">Blindness</TabsTrigger>
          </TabsList>

          <TabsContent value="formats" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Technical Formats</h3>
                <FormatCard
                  label="HEX"
                  value={color.toUpperCase()}
                  onCopy={() => copyToClipboard(color.toUpperCase(), "HEX")}
                  copied={copiedValue === color.toUpperCase()}
                />
                <FormatCard
                  label="RGB"
                  value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                  onCopy={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
                  copied={copiedValue === `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                />
                <FormatCard
                  label="HSL"
                  value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                  onCopy={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
                  copied={copiedValue === `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                />
                <FormatCard
                  label="HSV"
                  value={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`}
                  onCopy={() => copyToClipboard(`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`, "HSV")}
                  copied={copiedValue === `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Practical Formats</h3>
                <FormatCard
                  label="CSS RGB"
                  value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                  onCopy={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "CSS RGB")}
                  copied={copiedValue === `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                />
                <FormatCard
                  label="CMYK"
                  value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
                  onCopy={() => copyToClipboard(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, "CMYK")}
                  copied={copiedValue === `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
                />
                <FormatCard
                  label="Android"
                  value={`#${color.slice(1).toUpperCase()}`}
                  onCopy={() => copyToClipboard(`#${color.slice(1).toUpperCase()}`, "Android")}
                  copied={copiedValue === `#${color.slice(1).toUpperCase()}`}
                />
                <FormatCard
                  label="Swift"
                  value={`UIColor(red: ${(rgb.r/255).toFixed(2)}, green: ${(rgb.g/255).toFixed(2)}, blue: ${(rgb.b/255).toFixed(2)}, alpha: 1.0)`}
                  onCopy={() => copyToClipboard(`UIColor(red: ${(rgb.r/255).toFixed(2)}, green: ${(rgb.g/255).toFixed(2)}, blue: ${(rgb.b/255).toFixed(2)}, alpha: 1.0)`, "Swift")}
                  copied={copiedValue === `UIColor(red: ${(rgb.r/255).toFixed(2)}, green: ${(rgb.g/255).toFixed(2)}, blue: ${(rgb.b/255).toFixed(2)}, alpha: 1.0)`}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="variations" className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Shades (Add Black)</h3>
                <ColorPaletteRow colors={shades} onCopy={copyToClipboard} copiedValue={copiedValue} />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Tints (Add White)</h3>
                <ColorPaletteRow colors={tints} onCopy={copyToClipboard} copiedValue={copiedValue} />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Tones (Add Gray)</h3>
                <ColorPaletteRow colors={tones} onCopy={copyToClipboard} copiedValue={copiedValue} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="combinations" className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Complementary</h3>
                <p className="text-sm text-muted-foreground">Colors opposite on the color wheel</p>
                <ColorPaletteRow colors={[color, complementary]} onCopy={copyToClipboard} copiedValue={copiedValue} />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Analogous</h3>
                <p className="text-sm text-muted-foreground">Colors adjacent on the color wheel</p>
                <ColorPaletteRow colors={analogous} onCopy={copyToClipboard} copiedValue={copiedValue} />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Triadic</h3>
                <p className="text-sm text-muted-foreground">Three colors evenly spaced on the color wheel</p>
                <ColorPaletteRow colors={triadic} onCopy={copyToClipboard} copiedValue={copiedValue} />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Tetradic (Square)</h3>
                <p className="text-sm text-muted-foreground">Four colors evenly spaced on the color wheel</p>
                <ColorPaletteRow colors={tetradic} onCopy={copyToClipboard} copiedValue={copiedValue} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contrast" className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Contrast Checker</h3>
                <p className="text-sm text-muted-foreground">
                  WCAG recommends a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <ContrastCard
                  backgroundColor={color}
                  textColor="#FFFFFF"
                  ratio={whiteContrast}
                  label="White Text"
                />
                <ContrastCard
                  backgroundColor={color}
                  textColor="#000000"
                  ratio={blackContrast}
                  label="Black Text"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Color Properties</h3>
                <div className="space-y-3">
                  <PropertyRow label="Color Name" value={colorName} />
                  <PropertyRow label="Hue" value={`${hsl.h}°`} />
                  <PropertyRow label="Saturation" value={`${hsl.s}%`} />
                  <PropertyRow label="Lightness" value={`${hsl.l}%`} />
                  <PropertyRow label="Brightness" value={`${hsv.v}%`} />
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Creative Aspects</h3>
                <div className="space-y-3">
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
                  <PropertyRow
                    label="Best Use"
                    value={
                      hsl.s > 60 && hsl.l > 40 && hsl.l < 70
                        ? "Accent Colors"
                        : hsl.s < 20
                        ? "Backgrounds"
                        : "General Use"
                    }
                  />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blindness" className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Color Blindness Simulator</h3>
              <p className="text-sm text-muted-foreground">
                See how your color appears to people with different types of color blindness
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <BlindnessCard label="Normal Vision" color={color} />
              <BlindnessCard label="Protanopia (Red-Blind)" color={protanopia} />
              <BlindnessCard label="Deuteranopia (Green-Blind)" color={deuteranopia} />
              <BlindnessCard label="Tritanopia (Blue-Blind)" color={tritanopia} />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

function FormatCard({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string
  value: string
  onCopy: () => void
  copied: boolean
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm font-mono text-muted-foreground">{value}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  )
}

function ColorPaletteRow({
  colors,
  onCopy,
  copiedValue,
}: {
  colors: string[]
  onCopy: (text: string, label: string) => void
  copiedValue: string | null
}) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
      {colors.map((c, i) => (
        <div key={i} className="space-y-2">
          <button
            onClick={() => onCopy(c, c)}
            className="w-full aspect-square rounded-lg border hover:border-primary transition-all duration-200 hover:scale-105 color-preview-shadow"
            style={{ backgroundColor: c }}
          />
          <p className="text-xs font-mono text-center">{c}</p>
        </div>
      ))}
    </div>
  )
}

function ContrastCard({
  backgroundColor,
  textColor,
  ratio,
  label,
}: {
  backgroundColor: string
  textColor: string
  ratio: number
  label: string
}) {
  const passesAA = ratio >= 4.5
  const passesAAA = ratio >= 7

  return (
    <Card className="p-6 space-y-4">
      <div
        className="p-8 rounded-lg text-center font-semibold"
        style={{ backgroundColor, color: textColor }}
      >
        <p className="text-2xl">Sample Text</p>
        <p className="text-sm mt-2">{label}</p>
      </div>
      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-semibold">Contrast Ratio:</span> {ratio.toFixed(2)}:1
        </p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-semibold">WCAG AA:</span>{" "}
            <span className={passesAA ? "text-green-600" : "text-red-600"}>
              {passesAA ? "Pass ✓" : "Fail ✗"}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">WCAG AAA:</span>{" "}
            <span className={passesAAA ? "text-green-600" : "text-red-600"}>
              {passesAAA ? "Pass ✓" : "Fail ✗"}
            </span>
          </p>
        </div>
      </div>
    </Card>
  )
}

function PropertyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  )
}

function BlindnessCard({ label, color }: { label: string; color: string }) {
  return (
    <Card className="p-4 space-y-3">
      <div
        className="w-full aspect-square rounded-lg color-preview-shadow"
        style={{ backgroundColor: color }}
      />
      <div className="text-center">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs font-mono text-muted-foreground">{color}</p>
      </div>
    </Card>
  )
}
