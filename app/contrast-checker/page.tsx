"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Copy, RotateCcw } from "lucide-react"
import { hexToRgb, getContrastRatio } from "@/lib/color-utils"
import { toast } from "sonner"

export default function ContrastCheckerPage() {
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")

  const fgRgb = hexToRgb(foregroundColor) || { r: 0, g: 0, b: 0 }
  const bgRgb = hexToRgb(backgroundColor) || { r: 255, g: 255, b: 255 }
  const contrastRatio = getContrastRatio(fgRgb, bgRgb)

  const wcagAANormal = contrastRatio >= 4.5
  const wcagAALarge = contrastRatio >= 3
  const wcagAAA = contrastRatio >= 7

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`Copied ${text}`)
  }

  const swapColors = () => {
    const temp = foregroundColor
    setForegroundColor(backgroundColor)
    setBackgroundColor(temp)
  }

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-900/20"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Navbar stays static */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 container mx-auto px-4 pt-36 sm:pt-40">
          <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">

            {/* Header Section */}
            <motion.div
              className="text-center space-y-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-white">
                Contrast Checker
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground dark:text-white/60 max-w-2xl mx-auto">
                Check color contrast ratios and ensure your designs meet WCAG accessibility standards
              </p>
            </motion.div>

            {/* Color Selection + WCAG Compliance */}
            <motion.div
              className="grid lg:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              {/* Color Selection Card */}
              <Card className="p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Color Selection</h2>
                    <Button variant="outline" size="sm" onClick={swapColors} className="gap-2">
                      <RotateCcw className="w-4 h-4" /> Swap
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Foreground Color */}
                    <div className="space-y-2">
                      <Label htmlFor="foreground">Foreground Color (Text)</Label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={foregroundColor}
                          onChange={(e) => setForegroundColor(e.target.value)}
                          className="w-20 h-12 rounded-lg cursor-pointer border"
                        />
                        <Input
                          id="foreground"
                          value={foregroundColor.toUpperCase()}
                          onChange={(e) => {
                            const value = e.target.value
                            if (/^#[0-9A-F]{0,6}$/i.test(value)) setForegroundColor(value)
                          }}
                          className="flex-1 font-mono"
                        />
                        <Button variant="outline" size="icon" onClick={() => copyToClipboard(foregroundColor)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Background Color */}
                    <div className="space-y-2">
                      <Label htmlFor="background">Background Color</Label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="w-20 h-12 rounded-lg cursor-pointer border"
                        />
                        <Input
                          id="background"
                          value={backgroundColor.toUpperCase()}
                          onChange={(e) => {
                            const value = e.target.value
                            if (/^#[0-9A-F]{0,6}$/i.test(value)) setBackgroundColor(value)
                          }}
                          className="flex-1 font-mono"
                        />
                        <Button variant="outline" size="icon" onClick={() => copyToClipboard(backgroundColor)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t space-y-4">
                  <h3 className="font-semibold text-lg">Contrast Ratio</h3>
                  <div className="text-center p-8 rounded-xl bg-gradient-to-br from-cyan-500/10 to-orange-500/10 border-2">
                    <div className="text-5xl sm:text-6xl font-bold text-foreground dark:text-white mb-2">
                      {contrastRatio.toFixed(2)}:1
                    </div>
                    <div className="text-sm text-muted-foreground dark:text-white/60">Contrast Ratio</div>
                  </div>
                </div>
              </Card>

              {/* WCAG Compliance Card */}
              <Card className="p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-semibold">WCAG Compliance</h2>

                <div className="space-y-4">
                  <ComplianceCard
                    title="WCAG AA - Normal Text"
                    description="Minimum contrast ratio of 4.5:1 for small text"
                    ratio="4.5:1"
                    passes={wcagAANormal}
                    currentRatio={contrastRatio}
                  />
                  <ComplianceCard
                    title="WCAG AA - Large Text"
                    description="Minimum contrast ratio of 3:1 for large text"
                    ratio="3:1"
                    passes={wcagAALarge}
                    currentRatio={contrastRatio}
                  />
                  <ComplianceCard
                    title="WCAG AAA - Enhanced"
                    description="Minimum contrast ratio of 7:1 for enhanced readability"
                    ratio="7:1"
                    passes={wcagAAA}
                    currentRatio={contrastRatio}
                  />
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-semibold mb-3">Quick Reference</h3>
                  <div className="space-y-2 text-sm text-muted-foreground dark:text-white/60">
                    <p>• AA is the minimum requirement</p>
                    <p>• AAA provides better accessibility</p>
                    <p>• Higher ratios improve readability</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Live Preview */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Card className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold mb-6">Live Preview</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <PreviewCard bg={backgroundColor} fg={foregroundColor} title="Normal Text" size="text-base" />
                  <PreviewCard bg={backgroundColor} fg={foregroundColor} title="Large Text" size="text-2xl" />
                  <PreviewCard bg={backgroundColor} fg={foregroundColor} title="Bold Text" size="text-base font-bold" />
                  <PreviewCard bg={backgroundColor} fg={foregroundColor} title="Heading" size="text-3xl font-bold" />
                </div>
              </Card>
            </motion.div>

            {/* Accessibility Tips */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              
            </motion.div>
          </div>
        </main>

        {/* Footer stays static */}
        <Footer />
      </div>
    </div>
  )
}

function ComplianceCard({ title, description, ratio, passes, currentRatio }: any) {
  return (
    <div className="p-4 rounded-lg border bg-card space-y-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm">{title}</h4>
            <Badge variant={passes ? "default" : "secondary"} className="text-xs">
              {ratio}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {passes ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <AlertCircle className="w-6 h-6 text-orange-500" />
        )}
      </div>
      {!passes && (
        <p className="text-xs text-orange-600 dark:text-orange-400">
          Need {(parseFloat(ratio) - currentRatio).toFixed(2)} more contrast to pass
        </p>
      )}
    </div>
  )
}

function PreviewCard({ bg, fg, title, size }: any) {
  return (
    <div
      className="p-6 rounded-lg border min-h-[120px] flex items-center justify-center"
      style={{ backgroundColor: bg }}
    >
      <p className={`${size} text-center`} style={{ color: fg }}>
        {title}
      </p>
    </div>
  )
}
