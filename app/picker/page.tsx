"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageColorPicker from "@/components/color-picker/image-color-picker"
import ManualColorPicker from "@/components/color-picker/manual-color-picker"
import ColorAnalysis from "@/components/color-picker/color-analysis"

export default function PickerPage() {
  const [selectedColor, setSelectedColor] = useState("#2596be")

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-900/20"></div>

      {/* Main Layout */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content Section */}
        <main className="flex-1 container mx-auto px-4 pt-24 pb-10 sm:pt-28">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            {/* Heading */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white">
                Color Picker & Analyzer
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground dark:text-white/60">
                Extract colors from images or pick manually, then analyze and explore
              </p>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="image" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="image" className="text-xs sm:text-sm">
                  Pick from Image
                </TabsTrigger>
                <TabsTrigger value="manual" className="text-xs sm:text-sm">
                  Color Picker
                </TabsTrigger>
              </TabsList>

              <TabsContent value="image" className="space-y-6 mt-6">
                <ImageColorPicker onColorSelect={setSelectedColor} />
              </TabsContent>

              <TabsContent value="manual" className="space-y-6 mt-6">
                <ManualColorPicker
                  color={selectedColor}
                  onChange={setSelectedColor}
                />
              </TabsContent>
            </Tabs>

            {/* Color Analysis */}
            <ColorAnalysis color={selectedColor} />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
