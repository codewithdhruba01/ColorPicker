"use client"

import { useState, useRef, useEffect, useCallback, memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload, Copy, Maximize2, Minus, Plus, Download, Save, CheckCircle2, X } from "lucide-react"
import { hexToRgb, rgbToHex, rgbToHsl, extractColorsFromImage, generateTints } from "@/lib/color-utils"
import { toast } from "sonner"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ExportPaletteDialog } from "@/components/home/export-palette-dialog"
import { useUser, useClerk } from "@clerk/nextjs"
import { motion, useScroll, useTransform } from "framer-motion"

export function InstantColorPicker() {
  const { isSignedIn } = useUser()
  const clerk = useClerk()
  const [selectedColor, setSelectedColor] = useState("#2596be");
  const [image, setImage] = useState<string | null>("/image/demo.jpg");
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 200px", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const rgb = hexToRgb(selectedColor) || { r: 0, g: 0, b: 0 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgSrc = event.target?.result as string;
        setImage(imgSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    toast.success(`Copied ${text}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleColorsExtracted = useCallback((colors: string[]) => {
    setExtractedColors(colors);
    if (colors.length > 0) {
      setSelectedColor(colors[0]);
    }
  }, []);

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto font-sans text-neutral-800 dark:text-neutral-200">
      {/* Top Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-8 border-b border-neutral-200 dark:border-white/10 pb-1">
          <button className="pb-3 text-black dark:text-white border-b-2 border-black dark:border-white font-medium">
            Pick color from image
          </button>
          <Link href="/picker">
            <button className="pb-3 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
              Color Picker
            </button>
          </Link>
        </div>
      </div>

      {/* Main Card */}
      <motion.div
        ref={containerRef}
        style={{ opacity, scale, y }}
        className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-neutral-200 dark:border-white/10 p-6 md:p-8 relative shadow-xl dark:shadow-2xl overflow-hidden"
      >
        {/* Resize Icon */}
        <button
          onClick={() => setIsFullScreen(true)}
          className="absolute top-4 right-4 md:top-6 md:-right-6 translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg cursor-pointer hover:scale-110 transition-transform hidden md:flex"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsFullScreen(true)}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg cursor-pointer hover:scale-110 transition-transform md:hidden"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Image & Palette */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-200">Image</h2>

            {/* Image Preview Area */}
            <InteractiveImageArea
              image={image}
              onColorsExtracted={handleColorsExtracted}
              onColorSelect={handleColorSelect}
            />

            {/* Color Palette Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-300">Color Palette</h3>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors">
                  <Minus className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
                <button className="w-10 h-10 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors">
                  <Plus className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
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
                  <button
                    onClick={() => {
                      if (!isSignedIn) {
                        clerk.openSignIn()
                        return
                      }
                      setIsExportOpen(true)
                    }}
                    className="w-10 h-10 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors" title="Download Palette">
                    <Download className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors" title="Save Palette">
                    <Save className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Colors & Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-200">Colors</h2>

            {/* Color Preview Box */}
            <div className="flex gap-4 mb-6">
              <div
                className="w-24 h-16 rounded-lg shadow-inner ring-1 ring-black/5 dark:ring-white/10"
                style={{ backgroundColor: selectedColor }}
              />
              <div
                className="w-16 h-16 rounded-lg shadow-inner opacity-80 ring-1 ring-black/5 dark:ring-white/10"
                style={{ backgroundColor: generateTints(selectedColor, 2)[1] || selectedColor }}
              />
            </div>

            {/* Color Values Inputs */}
            <div className="space-y-4">
              {/* HEX */}
              <div className="flex items-center gap-2 bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-lg px-3 py-2.5">
                <span className="text-neutral-500 text-sm font-medium w-8">HEX</span>
                <span className="flex-1 font-mono text-neutral-900 dark:text-neutral-200">{selectedColor}</span>
                <button
                  onClick={() => copyToClipboard(selectedColor)}
                  className="text-neutral-400 hover:text-black dark:text-neutral-500 dark:hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* RGB */}
              <div className="flex items-center gap-2 bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-lg px-3 py-2.5">
                <span className="text-neutral-500 text-sm font-medium w-8">RGB</span>
                <span className="flex-1 font-mono text-neutral-900 dark:text-neutral-200">{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</span>
                <button
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                  className="text-neutral-400 hover:text-black dark:text-neutral-500 dark:hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* HSL */}
              <div className="flex items-center gap-2 bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-lg px-3 py-2.5">
                <span className="text-neutral-500 text-sm font-medium w-8">HSL</span>
                <span className="flex-1 font-mono text-neutral-900 dark:text-neutral-200">{`${hsl.h}, ${hsl.s}%, ${hsl.l}%`}</span>
                <button
                  onClick={() => copyToClipboard(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`)}
                  className="text-neutral-400 hover:text-black dark:text-neutral-500 dark:hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>



            {/* Use Your Own Image Section */}
            <div className="mt-8 pt-4">
              <div className="bg-neutral-50 dark:bg-[#161b22] rounded-xl p-5 border border-neutral-200 dark:border-white/5 space-y-4">
                <h3 className="text-neutral-900 dark:text-neutral-200 font-medium">Use your own image</h3>

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
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-medium py-6 transition-colors"
                  >
                    Use your own image
                  </Button>
                </div>

                <div className="flex items-start gap-2 text-xs text-neutral-500 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <p>All processing happens locally in your browser.<span className="text-blue-400">Your data never leaves your device.</span> Everything securely inside your browser.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Dialog open={isFullScreen} onOpenChange={setIsFullScreen}>
        <DialogContent className="max-w-[95vw] md:max-w-5xl h-[60vh] md:h-[85vh] w-full p-0 bg-black/95 border-none rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl [&>button]:hidden duration-500 data-[state=open]:duration-500 data-[state=closed]:duration-500">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-1.5 md:p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {image && (
              <Image
                src={image}
                alt="Full screen preview"
                className="max-w-full max-h-full object-contain pointer-events-none select-none"
                width={1920}
                height={1080}
                unoptimized
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ExportPaletteDialog
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        colors={extractedColors}
      />
    </div >
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

interface InteractiveImageAreaProps {
  image: string | null;
  onColorsExtracted: (colors: string[]) => void;
  onColorSelect: (color: string) => void;
}

const InteractiveImageArea = memo(function InteractiveImageArea({
  image,
  onColorsExtracted,
  onColorSelect
}: InteractiveImageAreaProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Load image to canvas and extract colors
  useEffect(() => {
    if (image) {
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
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

        onColorsExtracted(colors);
      };
      img.src = image;
    }
  }, [image, onColorsExtracted]);

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

    // Safety: ensure coordinates are within bounds
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    onColorSelect(hex);
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden bg-neutral-100 dark:bg-[#1a1a1a] aspect-video flex items-center justify-center border border-neutral-200 dark:border-white/5 group"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCursorPosition({ x, y });
      }}
    >
      <canvas ref={canvasRef} className="hidden" />
      {image ? (
        <>
          <Image
            ref={imageRef}
            src={image}
            alt="Uploaded"
            className="max-h-full max-w-full object-contain cursor-crosshair relative z-10"
            width={800}
            height={600}
            onClick={handleImageClick}
            unoptimized
          />
          <CanvasMagnifier
            show={showMagnifier}
            x={cursorPosition.x}
            y={cursorPosition.y}
            sourceCanvas={canvasRef.current}
            parentRef={imageRef}
          />
        </>
      ) : (
        <div className="text-neutral-500 flex flex-col items-center gap-2">
          <Upload className="w-8 h-8 opacity-50" />
          <span>No image uploaded</span>
        </div>
      )}
    </div>
  );
});

function CanvasMagnifier({ show, x, y, sourceCanvas, parentRef }: {
  show: boolean;
  x: number;
  y: number;
  sourceCanvas: HTMLCanvasElement | null;
  parentRef: React.RefObject<HTMLImageElement>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ZOOM_LEVEL = 2;
  const SIZE = 100;

  useEffect(() => {
    if (!show || !sourceCanvas || !canvasRef.current || !parentRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Clear previous frame
    ctx.clearRect(0, 0, SIZE, SIZE);

    const imgElement = parentRef.current;
    const rect = imgElement.getBoundingClientRect();

    // The logic below relies on correct containment hierarchy
    const containerRect = imgElement.parentElement?.getBoundingClientRect();
    if (!containerRect) return;

    // Calculate cursor pos relative to the IMAGE ELEMENT
    // x,y are relative to the Container (passed by props)
    const cursorScreenX = containerRect.left + x;
    const cursorScreenY = containerRect.top + y;

    const cursorRelX = cursorScreenX - rect.left;
    const cursorRelY = cursorScreenY - rect.top;

    if (cursorRelX < 0 || cursorRelY < 0 || cursorRelX > rect.width || cursorRelY > rect.height) {
      return;
    }

    const scaleX = sourceCanvas.width / rect.width;
    const scaleY = sourceCanvas.height / rect.height;

    const sourceX = cursorRelX * scaleX;
    const sourceY = cursorRelY * scaleY;

    const zoomWidth = SIZE / ZOOM_LEVEL;
    const zoomHeight = SIZE / ZOOM_LEVEL;

    // Safely draw
    try {
      ctx.drawImage(
        sourceCanvas,
        sourceX - zoomWidth / 2,
        sourceY - zoomHeight / 2,
        zoomWidth,
        zoomHeight,
        0,
        0,
        SIZE,
        SIZE
      );
    } catch (e) {
      // Ignore potential index size errors if out of bounds briefly
    }

    // Crosshair
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.moveTo(SIZE / 2, 0); ctx.lineTo(SIZE / 2, SIZE);
    ctx.moveTo(0, SIZE / 2); ctx.lineTo(SIZE, SIZE / 2);
    ctx.stroke();

  }, [show, x, y, sourceCanvas, parentRef]);

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      className="rounded-full border-2 border-white shadow-xl pointer-events-none z-50 absolute"
      style={{
        left: x - SIZE / 2,
        top: y - SIZE / 2,
        backgroundColor: 'black',
      }}
    />
  );
}
