"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1919] text-center px-6 relative overflow-hidden">
      {/* Background 404 text */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute text-[20rem] font-extrabold text-gray-00/30 select-none"
      >
        404
      </motion.h1>

      {/* TV Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative bg-[#c47a34] rounded-lg shadow-lg w-[280px] sm:w-[360px] h-[230px] sm:h-[280px] border-4 border-[#6d4b2c] flex flex-col items-center justify-center">
          {/* TV Antenna */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-[2px] h-10 bg-black rotate-[-25deg] origin-bottom" />
            <div className="w-[2px] h-10 bg-black rotate-[25deg] origin-bottom" />
          </div>

          {/* Screen */}
          <div className="w-[90%] h-[70%] bg-black rounded-md overflow-hidden border-2 border-gray-800 relative">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,white_0px,white_1px,black_1px,black_2px)] opacity-90 animate-static" />
            <p className="absolute inset-0 flex items-center justify-center text-white text-xs sm:text-sm font-mono bg-black/60 z-10">
              Coming Soon...
            </p>
          </div>

          {/* Buttons / Dials */}
          <div className="absolute right-4 top-[30%] flex flex-col gap-2">
            <div className="w-4 h-4 rounded-full bg-[#7a4a20] border border-black" />
            <div className="w-4 h-4 rounded-full bg-[#7a4a20] border border-black" />
          </div>
          <div className="absolute right-3 bottom-6 w-10 h-1 bg-[#7a4a20] rounded" />
        </div>
      </motion.div>

      {/* Text + Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="z-10 mt-10"
      >
        <p className="text-gray-800 text-lg sm:text-xl font-medium">Oops! This page is under construction </p>
        <Link
          href="/"
          className="mt-4 inline-block bg-[#c47a34] text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-[#a9672d] transition-all duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Static animation keyframes */}
      <style jsx global>{`
        @keyframes static {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }
        .animate-static {
          animation: static 0.2s steps(10) infinite;
        }
      `}</style>
    </div>
  )
}
