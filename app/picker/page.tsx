"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageColorPicker from "@/components/color-picker/image-color-picker";
import ManualColorPicker from "@/components/color-picker/manual-color-picker";
import ColorAnalysis from "@/components/color-picker/color-analysis";

export default function PickerPage() {
  const [selectedColor, setSelectedColor] = useState("#2596be");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "circOut" },
    },
  };

  return (
    <div className="min-h-screen bg-background dark:bg-stone-950 flex flex-col font-sans selection:bg-primary/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 pt-24 pb-20 sm:pt-32">
          <motion.div
            className="max-w-6xl mx-auto space-y-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Header Section */}
            <motion.div
              className="text-center space-y-4 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-clash-grotesk tracking-tight text-foreground dark:text-white">
                Color Picker <span className="text-muted-foreground">&</span> Analyzer
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground font-ranade dark:text-white/60 leading-relaxed">
                Extract colors from images or pick manually, then analyze and explore palettes with our professional-grade tools.
              </p>
            </motion.div>

            {/* Main Interactive Section */}
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-2xl -z-10 opacity-50" />

              <Tabs defaultValue="image" className="w-full">
                <div className="flex justify-center mb-10">
                  <TabsList className="bg-muted p-1 rounded-lg border border-border/50">
                    <TabsTrigger
                      value="image"
                      className="rounded-md px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                    >
                      Pick from Image
                    </TabsTrigger>
                    <TabsTrigger
                      value="manual"
                      className="rounded-md px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                    >
                      Manual Picker
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="image" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <ImageColorPicker onColorSelect={setSelectedColor} />
                </TabsContent>

                <TabsContent value="manual" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <ManualColorPicker
                    color={selectedColor}
                    onChange={setSelectedColor}
                  />
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Analysis Section */}
            <motion.div variants={itemVariants}>
              <ColorAnalysis color={selectedColor} />
            </motion.div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
