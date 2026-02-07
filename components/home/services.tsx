"use client";

import { motion, Variants } from "framer-motion";
import { Palette, Pipette, Eye, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        title: "Palette Generator",
        description: "Generate perfect color palettes instantly with our AI-powered tools.",
        icon: Palette,
        href: "/palettes",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        title: "Image Picker",
        description: "Extract precise colors from any image with our advanced magnification tool.",
        icon: Pipette,
        href: "/picker",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "Contrast Checker",
        description: "Ensure your designs are accessible and meet WCAG standards.",
        icon: Eye,
        href: "/contrast-checker",
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    {
        title: "Gradient Maker",
        description: "Create stunning gradients and CSS code for your next project.",
        icon: Layers,
        href: "/gradients",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export function Services() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="max-w-6xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-5xl font-bold font-chillax text-neutral-950 dark:text-white tracking-tight"
                        >
                            Everything you need for <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">
                                Perfect Colors
                            </span>
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-satoshi font-semibold"
                        >
                            A suite of powerful tools designed to help you create, explore, and manage colors like a pro.
                        </motion.p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="group relative p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className={`w-12 h-12 rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <service.icon className="w-6 h-6" />
                                    </div>

                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 font-excon">
                                        {service.title}
                                    </h3>

                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6 font-poppins font-semibold">
                                        {service.description}
                                    </p>
                                </div>

                                <Link
                                    href={service.href}
                                    className="flex items-center text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors mt-auto"
                                >
                                    Try now
                                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </Link>

                                {/* Gradient Border Overlay on Hover */}
                                <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-primary/10 transition-all duration-300 pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
