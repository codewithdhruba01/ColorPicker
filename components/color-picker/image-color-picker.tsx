"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Copy, Check } from "lucide-react"
import { extractColorsFromImage, rgbToHex } from "@/lib/color-utils"
import { toast } from "sonner"

interface ImageColorPickerProps {
  onColorSelect: (color: string) => void
}

export default function ImageColorPicker({ onColorSelect }: ImageColorPickerProps) {
  const [image, setImage] = useState<string | null>(null)
  const [extractedColors, setExtractedColors] = useState<string[]>([])
  const [hoveredColor, setHoveredColor] = useState<string | null>(null)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (image && imageRef.current && canvasRef.current) {
      const img = imageRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)

        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
        if (imageData) {
          const colors = extractColorsFromImage(imageData, 8)
          setExtractedColors(colors)
          if (colors.length > 0) {
            onColorSelect(colors[0])
          }
        }
      }
    }
  }, [image, onColorSelect])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    const pixel = ctx.getImageData(x, y, 1, 1).data
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2])
    onColorSelect(hex)
    toast.success(`Color ${hex} selected`)
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
    onColorSelect(hex)
    toast.success(`Color ${hex} selected`)
  }

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    toast.success(`Copied ${color}`)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              size="lg"
              className="gap-2"
            >
              <Upload className="w-5 h-5" />
              {image ? "Change Image" : "Upload Image"}
            </Button>
          </div>

          {image && (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border bg-muted/50">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="max-w-full h-auto cursor-crosshair"
                  style={{ display: "none" }}
                />
                <img
                  ref={imageRef}
                  src={image}
                  alt="Uploaded"
                  className="max-w-full h-auto cursor-crosshair"
                  onClick={handleImageClick}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Extracted Color Palette</h3>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                  {extractedColors.map((color, index) => (
                    <div
                      key={index}
                      className="space-y-2"
                      onMouseEnter={() => setHoveredColor(color)}
                      onMouseLeave={() => setHoveredColor(null)}
                    >
                      <button
                        onClick={() => {
                          onColorSelect(color)
                          toast.success(`Color ${color} selected`)
                        }}
                        className="w-full aspect-square rounded-lg border-2 border-border hover:border-primary transition-all duration-200 hover:scale-110 color-preview-shadow"
                        style={{ backgroundColor: color }}
                      />
                      <div className="text-center space-y-1">
                        <p className="text-xs font-mono">{color}</p>
                        <button
                          onClick={() => copyToClipboard(color)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedColor === color ? (
                            <Check className="w-3 h-3 mx-auto" />
                          ) : (
                            <Copy className="w-3 h-3 mx-auto" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!image && (
            <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
              <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Upload an image to extract colors</p>
              <p className="text-sm mt-2">Click on the image to pick specific colors</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
