"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Copy, Check, RefreshCw } from "lucide-react";
import { extractColorsFromImage, rgbToHex, getColorName, getContrastRatio, hexToRgb } from "@/lib/color-utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ImageColorPickerProps {
  onColorSelect: (color: string) => void;
}

export default function ImageColorPicker({
  onColorSelect,
}: ImageColorPickerProps) {
  const [image, setImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!image) {
      setExtractedColors([]);
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = image;

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      try {
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;

        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (imageData) {
          const colors = extractColorsFromImage(imageData, 6); // Reduced to 6 for better strip visual
          setExtractedColors(colors);
          if (colors.length > 0) {
            onColorSelect(colors[0]);
          }
        }
      } catch (err) {
        console.error("Error extracting colors:", err);
        toast.error(
          "Failed to extract colors from this image. Try another image."
        );
        setExtractedColors([]);
      }
    };

    img.onerror = () => {
      toast.error("Failed to load image for analysis.");
      setExtractedColors([]);
    };
  }, [image, onColorSelect]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
      onColorSelect(hex);
      toast.success(`Color ${hex} selected`);
    } catch (err) {
      console.error("pixel read error:", err);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const imgEl = imageRef.current;
    if (!canvas || !ctx || !imgEl) return;

    const rect = imgEl.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
      onColorSelect(hex);
      toast.success(`Color ${hex} selected`);
    } catch (err) {
      console.error("pixel read error:", err);
    }
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    toast.success(`Copied ${color}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const getTextColor = (bgColor: string) => {
    const rgb = hexToRgb(bgColor);
    if (!rgb) return "white";
    // Simple contrast check or use getContrastRatio
    // Using a simple luminance check for performance in render loop if needed,
    // but we have getContrastRatio.
    const whiteContrast = getContrastRatio(rgb, { r: 255, g: 255, b: 255 });
    const blackContrast = getContrastRatio(rgb, { r: 0, g: 0, b: 0 });
    return whiteContrast > blackContrast ? "white" : "black";
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <Card className="p-1.5 border-none bg-background/50 backdrop-blur-3xl shadow-2xl rounded-[2rem] overflow-hidden">
        <div className="bg-card/40 border border-white/10 dark:border-white/5 rounded-[1.7rem] p-6 sm:p-8 space-y-8">

          {/* Upload / Image Area */}
          <div className="flex items-center justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {!image ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-2xl -z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                <div className="border-2 border-dashed border-muted-foreground/20 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300 rounded-2xl p-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-background shadow-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-7 h-7 text-primary/80" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">Upload an Image</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                      Drag and drop or click to browse. We support JPG, PNG, and WebP.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-6">
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <span className="w-2 h-8 bg-primary rounded-full inline-block" />
                    Source Image
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setExtractedColors([]); // Reset to trigger re-extraction if needed or just visual feedback
                        // Actually re-triggering might need a forceful approach, but for now just clear
                        const canvas = canvasRef.current;
                        const ctx = canvas?.getContext("2d");
                        if (canvas && ctx && imageRef.current) {
                          // Re-run extraction logic if strictly needed, but current effect dependency handles it on image change.
                          // To re-roll "random" colors from the same image (if implementation supports randomization), we'd need to change a dependency.
                          // For now, just "Change Image" is enough.
                        }
                      }}
                      size="sm"
                      className="gap-2 rounded-full hover:bg-muted/50 hidden" // Hidden for now as logic is deterministic
                    >
                      <RefreshCw className="w-4 h-4" /> Regenerate
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      size="sm"
                      className="gap-2 rounded-full hover:bg-muted/50"
                    >
                      <Upload className="w-4 h-4" />
                      Change Image
                    </Button>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-black/20 group">
                  <canvas
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    className="hidden"
                  />
                  <img
                    ref={imageRef}
                    src={image}
                    alt="Uploaded"
                    className="w-full h-auto max-h-[500px] object-contain bg-[url('/checkboard.svg')] bg-repeat cursor-crosshair transition-transform duration-500"
                    onClick={handleImageClick}
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Click anywhere to pick color
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Extracted Colors Strip */}
          {image && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-100">
              <div className="flex items-end justify-between px-1">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span className="w-2 h-8 bg-primary rounded-full inline-block" />
                  Extracted Palette
                </h3>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  {extractedColors.length} Colors Found
                </span>
              </div>

              {/* New Flex Strip Design */}
              <div
                className="flex h-32 w-full rounded-[2rem] overflow-hidden shadow-xl ring-4 ring-background/20"
                onMouseLeave={() => setHoveredColor(null)}
              >
                {extractedColors.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/20 border border-dashed border-border/50">
                    No distinct colors found. Try an image with more variety.
                  </div>
                ) : (
                  extractedColors.map((color, index) => {
                    const isHovered = hoveredColor === color;
                    const textColor = getTextColor(color);
                    const colorName = getColorName(color);

                    return (
                      <motion.div
                        key={`${color}-${index}`}
                        className="relative cursor-pointer flex flex-col justify-end p-4 transition-colors"
                        style={{ backgroundColor: color }}
                        initial={{ flex: 1 }}
                        animate={{ flex: isHovered ? 3.5 : 1 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        onMouseEnter={() => setHoveredColor(color)}
                        onClick={() => {
                          onColorSelect(color);
                          copyToClipboard(color);
                        }}
                      >
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.9 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0 flex flex-col justify-end p-6"
                            >
                              <div className="space-y-0.5" style={{ color: textColor }}>
                                <motion.p
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="font-bold text-2xl tracking-tight leading-none"
                                >
                                  {colorName}
                                </motion.p>
                                <motion.p
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 0.8, x: 0 }}
                                  transition={{ delay: 0.2 }}
                                  className="font-mono text-sm opacity-80 uppercase tracking-widest"
                                >
                                  {color}
                                </motion.p>
                              </div>
                              <div className="absolute top-4 right-4" style={{ color: textColor }}>
                                {copiedColor === color ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5 opacity-50" />}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Small indicator when not hovered if needed, but clean strip is better */}
                        {!isHovered && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0 }} // Keep hidden for clean look, or 0.2 for subtle hint
                            className="w-full h-full"
                          />
                        )}
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          )}

        </div>
      </Card>
    </div>
  );
}
