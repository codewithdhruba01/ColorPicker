"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Pipette, Copy, Check } from "lucide-react"
import { hexToRgb, rgbToHex, extractColorsFromImage } from "@/lib/color-utils"
import { toast } from "sonner"

export function InstantColorPicker() {
  const [selectedColor, setSelectedColor] = useState("#2596be")
  const [image, setImage] = useState<string | null>(null)
  const [extractedColors, setExtractedColors] = useState<string[]>([])
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const rgb = hexToRgb(selectedColor) || { r: 0, g: 0, b: 0 }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imgSrc = event.target?.result as string
        setImage(imgSrc)

        const img = new Image()
        img.onload = () => {
          const canvas = canvasRef.current
          if (!canvas) return
          const ctx = canvas.getContext("2d")
          if (!ctx) return

          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const colors = extractColorsFromImage(imageData, 6)
          setExtractedColors(colors)
          if (colors.length > 0) {
            setSelectedColor(colors[0])
          }
        }
        img.src = imgSrc
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    const img = imageRef.current
    if (!canvas || !ctx || !img) return

    const rect = img.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    const pixel = ctx.getImageData(x, y, 1, 1).data
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2])
    setSelectedColor(hex)
    toast.success(`Color ${hex} selected`)
  }

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    toast.success(`Copied ${color}`)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    <Card className="w-full max-w-5xl mx-auto bg-background/80 dark:bg-black/40 backdrop-blur-xl border-border dark:border-white/10 shadow-2xl">
      <div className="p-4 sm:p-6 md:p-8">
        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="image" className="gap-2">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Pick from Image</span>
              <span className="sm:hidden">Image</span>
            </TabsTrigger>
            <TabsTrigger value="picker" className="gap-2">
              <Pipette className="w-4 h-4" />
              <span className="hidden sm:inline">Color Picker</span>
              <span className="sm:hidden">Picker</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-4">
            <div className="space-y-4">
              <div className="text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {image ? "Change Image" : "Upload Image"}
                </Button>
              </div>

              {image ? (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border bg-muted/50">
                    <canvas
                      ref={canvasRef}
                      className="hidden"
                    />
                    <img
                      ref={imageRef}
                      src={image}
                      alt="Uploaded"
                      className="max-w-full h-auto cursor-crosshair mx-auto"
                      style={{ maxHeight: "300px" }}
                      onClick={handleImageClick}
                    />
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {extractedColors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedColor(color)
                          toast.success(`Color ${color} selected`)
                        }}
                        className="aspect-square rounded-lg border-2 hover:border-primary transition-all duration-200 hover:scale-105"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 sm:p-12 text-center text-muted-foreground">
                  <Upload className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm sm:text-base">Upload an image to extract colors</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="picker" className="space-y-4">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full h-32 sm:h-40 rounded-lg cursor-pointer border"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <Input
                    value={selectedColor.toUpperCase()}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^#[0-9A-F]{0,6}$/i.test(value)) {
                        setSelectedColor(value)
                      }
                    }}
                    className="font-mono text-lg"
                  />
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">RGB:</span>
                      <span className="font-mono">{`${rgb.r}, ${rgb.g}, ${rgb.b}`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm sm:text-base">Selected Color</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(selectedColor)}
            >
              {copiedColor === selectedColor ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              <span className="hidden sm:inline">
                {copiedColor === selectedColor ? "Copied!" : "Copy HEX"}
              </span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="h-24 sm:h-32 rounded-lg border shadow-lg"
              style={{ backgroundColor: selectedColor }}
            />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-muted/50">
                <span className="text-muted-foreground">HEX:</span>
                <span className="font-mono font-semibold">{selectedColor.toUpperCase()}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-muted/50">
                <span className="text-muted-foreground">RGB:</span>
                <span className="font-mono">{`${rgb.r}, ${rgb.g}, ${rgb.b}`}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-muted/50">
                <span className="text-muted-foreground">HSL:</span>
                <span className="font-mono text-xs sm:text-sm">{`hsl(${Math.round((Math.atan2(Math.sqrt(3) * (rgb.g - rgb.b), 2 * rgb.r - rgb.g - rgb.b) * 180) / Math.PI)}, 50%, 50%)`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
