"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Copy, Check, Shuffle, ChevronDown } from "lucide-react"
import { gradients } from "@/lib/gradients"
import { toast } from "sonner"
import Link from "next/link"

export default function GradientsPage() {
  const [colors, setColors] = useState(["#EEDDFF", "#9966FF"])
  const [rotation, setRotation] = useState("135")
  const [gradientType, setGradientType] = useState("linear")
  const [copiedCss, setCopiedCss] = useState(false)

  const generateGradientCSS = () => {
    const colorStops = colors.map((color, index) => {
      const position = (index / (colors.length - 1)) * 100
      return `${color} ${position}%`
    }).join(", ")

    if (gradientType === "radial") {
      return `radial-gradient(circle, ${colorStops})`
    }
    return `linear-gradient(${rotation}deg, ${colorStops})`
  }

  const gradientCSS = generateGradientCSS()

  const addColor = () => {
    if (colors.length < 5) {
      setColors([...colors, "#FF00FF"])
    }
  }

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index))
    }
  }

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors]
    newColors[index] = color
    setColors(newColors)
  }

  const randomizeGradient = () => {
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)]
    setColors(randomGradient.colors)
    toast.success("Random gradient applied!")
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(`background: ${gradientCSS};`)
    setCopiedCss(true)
    toast.success("CSS copied to clipboard!")
    setTimeout(() => setCopiedCss(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-900/20"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto pt-36 sm:pt-40 pb-10">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-white">
                Gradient Maker
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground dark:text-white/60">
                Create and export beautiful gradients
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Colors</h2>
                  {colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Label className="w-16 text-sm">Color {index + 1}</Label>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => updateColor(index, e.target.value)}
                        className="w-16 h-10 rounded-lg cursor-pointer border"
                      />
                      <Input
                        value={color.toUpperCase()}
                        onChange={(e) => {
                          const value = e.target.value
                          if (/^#[0-9A-F]{0,6}$/i.test(value)) {
                            updateColor(index, value)
                          }
                        }}
                        className="flex-1 font-mono"
                      />
                      {colors.length > 2 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeColor(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {colors.length < 5 && (
                    <Button variant="outline" onClick={addColor} className="w-full">
                      Add Color
                    </Button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rotation</Label>
                    <Select value={rotation} onValueChange={setRotation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0°</SelectItem>
                        <SelectItem value="45">45°</SelectItem>
                        <SelectItem value="90">90°</SelectItem>
                        <SelectItem value="135">135°</SelectItem>
                        <SelectItem value="180">180°</SelectItem>
                        <SelectItem value="225">225°</SelectItem>
                        <SelectItem value="270">270°</SelectItem>
                        <SelectItem value="315">315°</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={gradientType} onValueChange={setGradientType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={randomizeGradient} className="flex-1 gap-2">
                    <Shuffle className="w-4 h-4" />
                    Random
                  </Button>
                  <Button onClick={copyCSS} className="flex-1 gap-2">
                    {copiedCss ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    Copy CSS
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </Card>

              <div className="space-y-4">
                <Card
                  className="h-64 sm:h-80 lg:h-full min-h-[320px] rounded-2xl shadow-2xl relative overflow-hidden"
                  style={{ background: gradientCSS }}
                >
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
                <Card className="p-4">
                  <Label className="text-xs text-muted-foreground">CSS Code</Label>
                  <code className="text-xs sm:text-sm font-mono block mt-2 p-3 bg-muted rounded-lg overflow-x-auto">
                    background: {gradientCSS};
                  </code>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Example Gradients</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                {gradients.slice(0, 12).map((gradient) => (
                  <button
                    key={gradient.id}
                    onClick={() => {
                      setColors(gradient.colors)
                      toast.success(`Applied ${gradient.name}`)
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
        </main>

        <Footer />
      </div>
    </div>
  )
}
