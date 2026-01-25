"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Copy, Maximize2, Minus, Plus, Download, Save, ChevronRight, CheckCircle2 } from "lucide-react"
import { hexToRgb, rgbToHex, rgbToHsl, extractColorsFromImage, generateTints } from "@/lib/color-utils"
import { toast } from "sonner"

export function InstantColorPicker() {
  const [selectedColor, setSelectedColor] = useState("#2596be");
  const [image, setImage] = useState<string | null>("/placeholder.jpg"); // Default to a placeholder if available, or handle null
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const rgb = hexToRgb(selectedColor) || { r: 0, g: 0, b: 0 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // Initialize with some default colors for the palette if no image (mocking the screenshot state)
  useEffect(() => {
    if (!image) {
      // Mock colors from screenshot for initial state if desirable, or keep empty
      setExtractedColors(["#2596be", "#f0f0f0", "#e89643", "#f4b962", "#89c5cc", "#3b2a1e", "#8b4122", "#a6d7e6", "#0f4c81", "#1e5c8a"]);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgSrc = event.target?.result as string;
        setImage(imgSrc);

        const img = typeof window !== "undefined" ? new window.Image() : document.createElement("img");
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const colors = extractColorsFromImage(imageData, 10);
          setExtractedColors(colors);
          if (colors.length > 0) {
            setSelectedColor(colors[0]);
          }
        };
        img.src = imgSrc;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imageRef.current;
    if (!canvas || !ctx || !img) return;

    const rect = img.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    setSelectedColor(hex);
    // toast.success(`Color ${hex} selected`) // Optional: remove toast for cleaner UI
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    toast.success(`Copied ${text}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto font-sans text-neutral-200">
      {/* Top Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-8 border-b border-white/10 pb-1">
          <button className="pb-3 text-white border-b-2 border-white font-medium">
            Pick color from image
          </button>
          <button className="pb-3 text-neutral-400 hover:text-neutral-200 transition-colors">
            Color Picker
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-[#0a0a0a] rounded-3xl border border-white/10 p-6 md:p-8 relative shadow-2xl overflow-hidden">
        {/* Resize Icon (Visual only based on screenshot) */}
        <div className="absolute top-4 right-4 md:top-6 md:-right-6 translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg cursor-pointer hover:scale-110 transition-transform hidden md:flex">
          <Maximize2 className="w-5 h-5" />
        </div>
        <div className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg cursor-pointer hover:scale-110 transition-transform md:hidden">
          <Maximize2 className="w-4 h-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Image & Palette */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-medium text-neutral-200">Image</h2>

            {/* Image Preview Area */}
            <div className="relative rounded-lg overflow-hidden bg-[#1a1a1a] aspect-video flex items-center justify-center border border-white/5 group">
              <canvas ref={canvasRef} className="hidden" />
              {image ? (
                <Image
                  ref={imageRef}
                  src={image}
                  alt="Uploaded"
                  className="max-h-full max-w-full object-contain cursor-crosshair"
                  width={800}
                  height={600}
                  onClick={handleImageClick}
                  unoptimized
                />
              ) : (
                <div className="text-neutral-500 flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 opacity-50" />
                  <span>No image uploaded</span>
                </div>
              )}
            </div>

            {/* Color Palette Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-300">Color Palette</h3>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                  <Minus className="w-4 h-4 text-neutral-400" />
                </button>
                <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                  <Plus className="w-4 h-4 text-neutral-400" />
                </button>

                <div className="flex-1 flex gap-0 overflow-hidden rounded-lg mx-2 h-12">
                  {extractedColors.map((color, index) => (
                    <div
                      key={index}
                      className="flex-1 h-full hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center group/color"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setSelectedColor(color)
                        // toast.success(`Selected ${color}`)
                      }}
                      title={color}
                    >
                    </div>
                  ))}
                  {extractedColors.length === 0 && Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex-1 h-full bg-neutral-800 border-r border-neutral-700/50 last:border-0" />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors" title="Download Palette">
                    <Download className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors" title="Save Palette">
                    <Save className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Colors & Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-neutral-200">Colors</h2>

            {/* Color Preview Box */}
            <div className="flex gap-4 mb-6">
              <div
                className="w-24 h-16 rounded-lg shadow-inner"
                style={{ backgroundColor: selectedColor }}
              />
              <div
                className="w-16 h-16 rounded-lg shadow-inner opacity-80"
                style={{ backgroundColor: generateTints(selectedColor, 2)[1] || selectedColor }}
              />
            </div>

            {/* Color Values Inputs */}
            <div className="space-y-4">
              {/* HEX */}
              <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5">
                <span className="text-neutral-500 text-sm font-medium w-8">HEX</span>
                <span className="flex-1 font-mono text-neutral-200">{selectedColor}</span>
                <button
                  onClick={() => copyToClipboard(selectedColor)}
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* RGB */}
              <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5">
                <span className="text-neutral-500 text-sm font-medium w-8">RGB</span>
                <span className="flex-1 font-mono text-neutral-200">{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</span>
                <button
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* HSL */}
              <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5">
                <span className="text-neutral-500 text-sm font-medium w-8">HSL</span>
                <span className="flex-1 font-mono text-neutral-200">{`${hsl.h}, ${hsl.s}%, ${hsl.l}%`}</span>
                <button
                  onClick={() => copyToClipboard(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`)}
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button className="text-neutral-200 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors group">
              View color details
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Use Your Own Image Section */}
            <div className="mt-8 pt-4">
              <div className="bg-[#161b22] rounded-xl p-5 border border-white/5 space-y-4">
                <h3 className="text-neutral-200 font-medium">Use your own image</h3>

                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-white text-black hover:bg-neutral-200 font-medium py-6"
                  >
                    Use your own image
                  </Button>
                </div>

                <div className="flex items-start gap-2 text-xs text-neutral-500 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <p>We think data protection is important! <span className="text-blue-400">No data is sent.</span> The magic happens in your browser.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
