"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
    {
        content: "This tool completely transformed my design workflow. The color extraction is insanely accurate and the palettes are just beautiful.",
        author: "Elen Jenkins",
        role: "Product Designer @ Figma",
        avatar: "/Avater/kari-rasmussen.jpg"
    },
    {
        content: "I used to struggle with color theory, but ColorKit makes theming my apps effortless. The AI suggestions are better than what I could come up with.",
        author: "David Chen",
        role: "Frontend Developer",
        avatar: "/Avater/jonathan-kelly.jpg"
    },
    {
        content: "Simply the most aesthetic and functional color tool on the internet. It feels premium, works fast, and the export options are a lifesaver.",
        author: "Elena Rodriguez",
        role: "Digital Artist",
        avatar: "/Avater/sally-mason.jpg"
    }
];

export function Testimonials() {
    return (
        <section className="relative w-full py-24 md:py-32 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[96px] pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16 md:mb-24 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold font-clash-grotesk tracking-tight text-foreground"
                    >
                        Loved by Designers
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-muted-foreground text-lg max-w-xl mx-auto font-ranade"
                    >
                        Join thousands of creators who trust ColorKit for their daily creative needs.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {TESTIMONIALS.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="group relative p-8 rounded-3xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <Quote className="w-10 h-10 text-primary/20 mb-6 group-hover:text-primary/40 transition-colors" />

                            <p className="text-lg leading-relaxed text-foreground/80 font-ranade mb-8">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted relative">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground font-clash-grotesk">{testimonial.author}</h4>
                                    <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
