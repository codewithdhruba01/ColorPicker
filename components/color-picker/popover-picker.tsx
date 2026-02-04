"use client"

import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "@/lib/color-utils"

interface PopoverPickerProps {
    color: string
    onChange: (color: string) => void
    trigger?: React.ReactNode
}

export function PopoverPicker({ color, onChange, trigger }: PopoverPickerProps) {
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
        <Popover>
            <PopoverTrigger asChild>
                {trigger}
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-none bg-transparent shadow-none" sideOffset={10}>
                <div className="bg-background/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-5 space-y-5">
                    {/* RGB Sliders */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">RGB Channels</h4>
                        {[
                            { label: 'R', channel: 'r', val: rgb.r, gradient: `linear-gradient(to right, rgb(0,${rgb.g},${rgb.b}), rgb(255,${rgb.g},${rgb.b}))` },
                            { label: 'G', channel: 'g', val: rgb.g, gradient: `linear-gradient(to right, rgb(${rgb.r},0,${rgb.b}), rgb(${rgb.r},255,${rgb.b}))` },
                            { label: 'B', channel: 'b', val: rgb.b, gradient: `linear-gradient(to right, rgb(${rgb.r},${rgb.g},0), rgb(${rgb.r},${rgb.g},255))` }
                        ].map((item) => (
                            <div key={item.label} className="space-y-1.5">
                                <div className="flex justify-between text-xs">
                                    <span className="font-medium text-foreground">{item.label}</span>
                                    <span className="font-mono text-muted-foreground">{item.val}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="255"
                                    value={item.val}
                                    onChange={(e) => handleRgbChange(item.channel as any, parseInt(e.target.value))}
                                    className="w-full h-2 rounded-full appearance-none cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    style={{ background: item.gradient }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* HSL Sliders */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">HSL Overlay</h4>
                        {[
                            { label: 'Hue', channel: 'h', val: hsl.h, max: 360, bg: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' },
                        ].map((item) => (
                            <div key={item.label} className="space-y-1.5">
                                <div className="flex justify-between text-xs">
                                    <span className="font-medium text-foreground">{item.label}</span>
                                    <span className="font-mono text-muted-foreground">{item.val}°</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max={item.max}
                                    value={item.val}
                                    onChange={(e) => handleHslChange(item.channel as any, parseInt(e.target.value))}
                                    className="w-full h-2 rounded-full appearance-none cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    style={{ background: item.bg }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="pt-2">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Hex Code</Label>
                        <Input
                            value={hexValue}
                            onChange={(e) => handleHexChange(e.target.value)}
                            className="h-9 font-mono bg-white/5 border-white/10 focus:border-primary/50"
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
