"use client";

import React from "react";
import { motion } from "framer-motion";

interface InteractiveHoverTextProps {
    text: string;
    className?: string;
}

const colors = [
    "#FF5733", // Orange
    "#33FF57", // Green
    "#3357FF", // Blue
    "#FF33A8", // Pink
    "#A833FF", // Purple
    "#FFC300", // Yellow
];

const InteractiveHoverText = ({ text, className }: InteractiveHoverTextProps) => {
    const words = text.split(" ");

    return (
        <h1 className={className}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, charIndex) => {
                        // Deterministic random color based on character index for consistency
                        // const color = colors[(wordIndex + charIndex) % colors.length]; 
                        // OR truly random on hover? The requirement says "change color on hover".
                        // Let's do random color on hover.

                        return (
                            <motion.span
                                key={charIndex}
                                className="inline-block cursor-default"
                                whileHover={{
                                    scale: 1.3,
                                    y: -5,
                                    rotate: Math.random() * 10 - 5, // -5 to 5 degrees
                                    color: colors[Math.floor(Math.random() * colors.length)],
                                    transition: { type: "spring", stiffness: 300, damping: 10 }
                                }}
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                    {/* Add space after word unless it's the last one */}
                    {wordIndex < words.length - 1 && <span>&nbsp;</span>}
                </span>
            ))}
        </h1>
    );
};

export default InteractiveHoverText;
