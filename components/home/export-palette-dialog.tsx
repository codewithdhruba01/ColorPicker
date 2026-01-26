"use client"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Copy, Download, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { getColorName } from "@/lib/color-utils"

interface ExportPaletteDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    colors: string[]
}

type ExportFormat = "css" | "code" | "svg" | "png"

export function ExportPaletteDialog({ open, onOpenChange, colors }: ExportPaletteDialogProps) {
    const [expandedSection, setExpandedSection] = useState<ExportFormat | null>(null)
    const [copied, setCopied] = useState(false)

    const toggleSection = (section: ExportFormat) => {
        setExpandedSection(expandedSection === section ? null : section)
    }

    // Generate CSS content
    const cssContent = `:root {
  /* CSS HEX */
${colors.map((c, i) => `  --color-${i + 1}: ${c};`).join("\n")}

  /* SCSS HEX */
${colors.map((c, i) => `  $color-${i + 1}: ${c};`).join("\n")}
}`

    // Generate JSON content
    const jsonContent = JSON.stringify(
        colors.reduce((acc, color, index) => {
            acc[`color-${index + 1}`] = color
            return acc
        }, {} as Record<string, string>),
        null,
        2
    )

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content)
        setCopied(true)
        toast.success("Copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = (content: string, filename: string, type: string) => {
        const blob = new Blob([content], { type })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success(`Downloaded ${filename}`)
    }

    const handleDownloadSVG = () => {
        const svgContent = `<svg width="${colors.length * 100}" height="100" viewBox="0 0 ${colors.length * 100} 100" xmlns="http://www.w3.org/2000/svg">
${colors.map((c, i) => `  <rect x="${i * 100}" y="0" width="100" height="100" fill="${c}" />`).join("\n")}
</svg>`
        handleDownload(svgContent, "palette.svg", "image/svg+xml")
    }

    const handleDownloadPNG = () => {
        const canvas = document.createElement("canvas")
        canvas.width = colors.length * 100
        canvas.height = 100
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        colors.forEach((color, i) => {
            ctx.fillStyle = color
            ctx.fillRect(i * 100, 0, 100, 100)
        })

        const url = canvas.toDataURL("image/png")
        const a = document.createElement("a")
        a.href = url
        a.download = "palette.png"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        toast.success("Downloaded palette.png")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[90%] max-w-[350px] md:w-full md:max-w-xl bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-2xl duration-300 ease-out data-[state=open]:duration-300 data-[state=open]:zoom-in-95">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Export Palette</DialogTitle>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                    {/* CSS Section */}
                    <div className="border-b border-neutral-100 dark:border-white/5 pb-2">
                        <button
                            onClick={() => toggleSection("css")}
                            className="w-full flex items-center justify-between py-3 text-left font-medium hover:bg-neutral-50 dark:hover:bg-white/5 rounded-lg px-2 transition-colors"
                        >
                            <span>CSS</span>
                            {expandedSection === "css" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <AnimatePresence>
                            {expandedSection === "css" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 bg-neutral-50 dark:bg-[#111] rounded-xl mt-2 space-y-4">
                                        <pre className="text-xs md:text-sm font-mono text-neutral-600 dark:text-neutral-400 overflow-x-auto p-2">
                                            {cssContent}
                                        </pre>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleDownload(cssContent, "palette.css", "text/css")}
                                                variant="outline"
                                                className="flex-1"
                                            >
                                                Download
                                            </Button>
                                            <Button
                                                onClick={() => handleCopy(cssContent)}
                                                className="flex-1 bg-[#0f172a] text-white hover:bg-[#1e293b]"
                                            >
                                                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                                Copy
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Code Section */}
                    <div className="border-b border-neutral-100 dark:border-white/5 pb-2">
                        <button
                            onClick={() => toggleSection("code")}
                            className="w-full flex items-center justify-between py-3 text-left font-medium hover:bg-neutral-50 dark:hover:bg-white/5 rounded-lg px-2 transition-colors"
                        >
                            <span>Code</span>
                            {expandedSection === "code" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <AnimatePresence>
                            {expandedSection === "code" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 bg-neutral-50 dark:bg-[#111] rounded-xl mt-2 space-y-4">
                                        <pre className="text-xs md:text-sm font-mono text-neutral-600 dark:text-neutral-400 overflow-x-auto p-2">
                                            {jsonContent}
                                        </pre>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleDownload(jsonContent, "palette.json", "application/json")}
                                                variant="outline"
                                                className="flex-1"
                                            >
                                                Download
                                            </Button>
                                            <Button
                                                onClick={() => handleCopy(jsonContent)}
                                                className="flex-1 bg-[#0f172a] text-white hover:bg-[#1e293b]"
                                            >
                                                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                                Copy
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* SVG Section */}
                    <div className="border-b border-neutral-100 dark:border-white/5 pb-2">
                        <button
                            onClick={() => toggleSection("svg")}
                            className="w-full flex items-center justify-between py-3 text-left font-medium hover:bg-neutral-50 dark:hover:bg-white/5 rounded-lg px-2 transition-colors"
                        >
                            <span>SVG</span>
                            {expandedSection === "svg" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <AnimatePresence>
                            {expandedSection === "svg" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 bg-neutral-50 dark:bg-[#111] rounded-xl mt-2 space-y-4">
                                        <div className="flex items-center justify-center h-16 rounded overflow-hidden">
                                            {colors.map((c, i) => (
                                                <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
                                            ))}
                                        </div>
                                        <Button
                                            onClick={handleDownloadSVG}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Download
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* PNG Section */}
                    <div className="border-b border-neutral-100 dark:border-white/5 pb-2">
                        <button
                            onClick={() => toggleSection("png")}
                            className="w-full flex items-center justify-between py-3 text-left font-medium hover:bg-neutral-50 dark:hover:bg-white/5 rounded-lg px-2 transition-colors"
                        >
                            <span>PNG</span>
                            {expandedSection === "png" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <AnimatePresence>
                            {expandedSection === "png" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 bg-neutral-50 dark:bg-[#111] rounded-xl mt-2 space-y-4">
                                        <div className="flex items-center justify-center h-16 rounded overflow-hidden">
                                            {colors.map((c, i) => (
                                                <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
                                            ))}
                                        </div>
                                        <Button
                                            onClick={handleDownloadPNG}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Download
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}
