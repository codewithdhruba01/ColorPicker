"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Copy, Check } from "lucide-react";
import { extractColorsFromImage, rgbToHex } from "@/lib/color-utils";
import { toast } from "sonner";

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
          const colors = extractColorsFromImage(imageData, 10);
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
    // ... logic same as before ...
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

                <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-black/20 group">
                  <canvas
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    className="hidden"
                  />
                  {/* 
                           Note: The canvas click logic was duplicated in original code on both canvas and img. 
                           The canvas is hidden, so we rely on img onClick. 
                        */}
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

          {/* Extracted Colors Grid */}
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

              <div className="grid grid-cols-2 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-4">
                {extractedColors.length === 0 ? (
                  <div className="col-span-full py-8 text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/50">
                    No distinct colors found. Try an image with more variety.
                  </div>
                ) : (
                  extractedColors.map((color, index) => (
                    <div
                      key={index}
                      className="group relative flex flex-col items-center gap-2"
                      onMouseEnter={() => setHoveredColor(color)}
                      onMouseLeave={() => setHoveredColor(null)}
                    >
                      <button
                        onClick={() => {
                          onColorSelect(color);
                          toast.success(`Color ${color} selected`);
                        }}
                        className="w-full aspect-square rounded-full shadow-sm hover:shadow-lg hover:shadow-black/10 transition-all duration-300 hover:scale-110 active:scale-95 ring-2 ring-transparent hover:ring-offset-2 hover:ring-primary/20 dark:ring-offset-background"
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${color}`}
                      />

                      <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-10">
                        <div className="bg-popover text-popover-foreground text-[10px] sm:text-xs font-mono py-1 px-2 rounded-md shadow-md border border-border whitespace-nowrap flex items-center gap-1.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(color);
                          }}
                        >
                          {color}
                          {copiedColor === color ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 opacity-50" />}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </Card>
    </div>
  );
}
