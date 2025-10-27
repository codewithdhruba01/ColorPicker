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
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label>Color Preview</Label>
              <div
                className="w-full h-48 rounded-lg border color-preview-shadow"
                style={{ backgroundColor: color }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hex-input">HEX</Label>
              <Input
                id="hex-input"
                value={hexValue}
                onChange={(e) => handleHexChange(e.target.value)}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color-input">Native Color Picker</Label>
              <input
                id="color-input"
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer border"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold">RGB</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>R</Label>
                    <span className="text-sm text-muted-foreground">{rgb.r}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => handleRgbChange("r", parseInt(e.target.value))}
                    className="w-full"
                    style={{
                      background: `linear-gradient(to right, rgb(0,${rgb.g},${rgb.b}), rgb(255,${rgb.g},${rgb.b}))`
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>G</Label>
                    <span className="text-sm text-muted-foreground">{rgb.g}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => handleRgbChange("g", parseInt(e.target.value))}
                    className="w-full"
                    style={{
                      background: `linear-gradient(to right, rgb(${rgb.r},0,${rgb.b}), rgb(${rgb.r},255,${rgb.b}))`
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>B</Label>
                    <span className="text-sm text-muted-foreground">{rgb.b}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => handleRgbChange("b", parseInt(e.target.value))}
                    className="w-full"
                    style={{
                      background: `linear-gradient(to right, rgb(${rgb.r},${rgb.g},0), rgb(${rgb.r},${rgb.g},255))`
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">HSL</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>H</Label>
                    <span className="text-sm text-muted-foreground">{hsl.h}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={hsl.h}
                    onChange={(e) => handleHslChange("h", parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>S</Label>
                    <span className="text-sm text-muted-foreground">{hsl.s}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={hsl.s}
                    onChange={(e) => handleHslChange("s", parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>L</Label>
                    <span className="text-sm text-muted-foreground">{hsl.l}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={hsl.l}
                    onChange={(e) => handleHslChange("l", parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
