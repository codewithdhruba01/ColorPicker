"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { FileText, Scale, Check, AlertCircle, Lock, Server, Globe, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const pageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-stone-950 flex flex-col font-sans selection:bg-primary/20 relative overflow-hidden">
      <Navbar />

      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <motion.main
        className="relative z-10 flex-1 container mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-cyan-500/10 text-cyan-500 mb-4 backdrop-blur-xl border border-cyan-500/20 shadow-xl shadow-cyan-500/10">
              <FileText className="w-10 h-10" />
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-clash-grotesk tracking-tight">
                Terms of Service
              </h1>
              <p className="text-lg text-muted-foreground font-ranade">
                Last updated: <span className="text-foreground font-medium">October 28, 2025</span>
              </p>
            </div>
          </motion.div>

          <Card className="p-8 sm:p-12 bg-background/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] shadow-xl space-y-12">

            {/* Introduction */}
            <section className="space-y-4 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold font-clash-grotesk flex items-center justify-center gap-2">
                <Scale className="w-6 h-6 text-primary" /> Acceptance of Terms
              </h2>
              <p className="text-lg text-muted-foreground font-ranade leading-relaxed">
                By accessing and using ColorKit, you accept and agree to be bound by these terms. If you do not agree, please do not use our service.
              </p>
            </section>

            <Separator className="bg-white/10" />

            {/* Sections Grid */}
            <div className="space-y-12">
              <section className="space-y-6">
                <h3 className="text-2xl font-bold font-clash-grotesk flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
                  Use of Service
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                    <h4 className="font-semibold text-lg flex items-center gap-2 text-green-500">
                      <Check className="w-5 h-5" /> Permitted Use
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Personal & commercial projects</li>
                      <li>• Educational purposes</li>
                      <li>• Accessibility testing</li>
                      <li>• Color palette management</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                    <h4 className="font-semibold text-lg flex items-center gap-2 text-red-500">
                      <AlertCircle className="w-5 h-5" /> Prohibited Use
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Illegal or unauthorized activities</li>
                      <li>• Reverse engineering the platform</li>
                      <li>• Excessive automated requests</li>
                      <li>• Interfering with service integrity</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-2xl font-bold font-clash-grotesk flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
                  Key Provisions
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-2">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold">Intellectual Property</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Content generated is yours. The platform design and code are ours.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-2">
                      <Server className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold">User Content</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Images processed locally. We don't claim ownership of your uploads.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-2">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold">Disclaimer</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Service provided "AS IS". No warranties of any kind included.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <Separator className="bg-white/10" />

            {/* Contact */}
            <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-transparent rounded-2xl p-8 border border-cyan-500/10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-clash-grotesk">Questions about Terms?</h3>
                  <p className="text-muted-foreground text-sm">Our support team is here to help clarify any points.</p>
                </div>
                <a href="mailto:legal@colorkit.com" className="px-6 py-3 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap">
                  <Mail className="w-4 h-4" /> Contact Legal
                </a>
              </div>
            </div>

          </Card>

          <p className="text-center text-sm text-muted-foreground font-ranade">
            By using ColorKit, you acknowledge that you have read and agreed to these Terms.
          </p>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
