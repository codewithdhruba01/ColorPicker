"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "@/lib/color-utils"

interface ManualColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export default function ManualColorPicker({ color, onChange }: ManualColorPickerProps) {
  const [hexValue, setHexValue] = useState(color)
  const rgb = hexToRgb(color) || { r: 0, g: 0, b: 0 }
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  useEffect(() => {
    setHexValue(color)
  }, [color])

  const handleHexChange = (value: string) => {
    setHexValue(value)
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value)
    }
  }

  const handleRgbChange = (channel: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [channel]: Math.max(0, Math.min(255, value)) }
    onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  const handleHslChange = (channel: "h" | "s" | "l", value: number) => {
    let newHsl = { ...hsl, [channel]: value }
    if (channel === "h") newHsl.h = ((value % 360) + 360) % 360
    if (channel === "s") newHsl.s = Math.max(0, Math.min(100, value))
    if (channel === "l") newHsl.l = Math.max(0, Math.min(100, value))

    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  return (
    <Card className="p-1.5 border-none bg-background/50 backdrop-blur-3xl shadow-2xl rounded-[2rem] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-card/40 border border-white/10 dark:border-white/5 rounded-[1.7rem] p-6 sm:p-8 space-y-8">

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column: Preview & Inputs */}
          <div className="flex-1 space-y-8">
            <div className="space-y-3">
              <Label className="text-base font-medium text-muted-foreground">Preview</Label>
              <div
                className="w-full h-64 rounded-2xl border border-white/10 shadow-2xl transition-colors duration-200 relative overflow-hidden group"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-mono border border-white/10">
                    {color}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* HEX Input */}
              <div className="space-y-2">
                <Label htmlFor="hex-input" className="text-sm font-medium text-muted-foreground">HEX Code</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-border" style={{ backgroundColor: color }} />
                  <Input
                    id="hex-input"
                    value={hexValue}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="font-mono pl-10 h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-all font-medium tracking-wide"
                  />
                </div>
              </div>

              {/* Native Picker */}
              <div className="space-y-2">
                <Label htmlFor="color-input" className="text-sm font-medium text-muted-foreground">Native Picker</Label>
                <div className="relative h-11 w-full rounded-md overflow-hidden border border-border/50 shadow-sm cursor-pointer hover:ring-2 ring-primary/20 transition-all">
                  <input
                    id="color-input"
                    type="color"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] cursor-pointer p-0 m-0 opacity-0 z-10"
                  />
                  <div className="w-full h-full flex items-center justify-center gap-2 bg-background/50 backdrop-blur-sm">
                    <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: color }} />
                    <span className="text-sm font-medium">Open System Picker</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sliders */}
          <div className="flex-1 space-y-8">

            {/* RGB Section */}
            <div className="space-y-5 p-5 rounded-2xl bg-background/30 border border-white/5 shadow-inner">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                RGB Channels
              </h3>
              <div className="space-y-5">
                {[
                  { label: 'R', channel: 'r', val: rgb.r, max: 255, gradient: `linear-gradient(to right, rgb(0,${rgb.g},${rgb.b}), rgb(255,${rgb.g},${rgb.b}))` },
                  { label: 'G', channel: 'g', val: rgb.g, max: 255, gradient: `linear-gradient(to right, rgb(${rgb.r},0,${rgb.b}), rgb(${rgb.r},255,${rgb.b}))` },
                  { label: 'B', channel: 'b', val: rgb.b, max: 255, gradient: `linear-gradient(to right, rgb(${rgb.r},${rgb.g},0), rgb(${rgb.r},${rgb.g},255))` }
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-muted-foreground w-4">{item.label}</span>
                      <span className="font-mono text-xs bg-background/50 px-2 py-0.5 rounded-md border border-border/20">{item.val}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={item.val}
                      onChange={(e) => handleRgbChange(item.channel as any, parseInt(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer hover:opacity-90 transition-opacity"
                      style={{ background: item.gradient }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* HSL Section */}
            <div className="space-y-5 p-5 rounded-2xl bg-background/30 border border-white/5 shadow-inner">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="text-muted-foreground text-xs font-normal bg-muted px-1.5 rounded">HSL</span>
                Model Control
              </h3>
              <div className="space-y-5">
                {[
                  { label: 'Hue', channel: 'h', val: hsl.h, max: 360, unit: '°', bg: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' },
                  { label: 'Saturation', channel: 's', val: hsl.s, max: 100, unit: '%', bg: 'linear-gradient(to right, gray, disabled)' }, // Custom bg for S needed 
                  { label: 'Lightness', channel: 'l', val: hsl.l, max: 100, unit: '%', bg: 'linear-gradient(to right, black, white)' }
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-muted-foreground">{item.label}</span>
                      <span className="font-mono text-xs bg-background/50 px-2 py-0.5 rounded-md border border-border/20">{item.val}{item.unit}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={item.max}
                      value={item.val}
                      onChange={(e) => handleHslChange(item.channel as any, parseInt(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted"
                      style={item.channel === 'h' ? { background: item.bg } : undefined}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Card>
  )
}
