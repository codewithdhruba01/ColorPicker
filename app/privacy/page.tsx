"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Shield, Lock, Eye, Server, Globe, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
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

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-stone-950 text-foreground relative overflow-hidden font-sans selection:bg-primary/20">
      <Navbar />

      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="relative z-10 flex-1 container mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-green-500/10 text-green-500 mb-4 backdrop-blur-xl border border-green-500/20 shadow-xl shadow-green-500/10">
            <Shield className="w-10 h-10" />
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-clash-grotesk tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground font-ranade">
              Last updated: <span className="text-foreground font-medium">October 28, 2025</span>
            </p>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Commitment Card */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 sm:p-10 bg-background/50 backdrop-blur-3xl border-green-500/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 transition-all duration-500 group-hover:from-green-500/10 group-hover:to-emerald-500/10" />
              <div className="relative">
                <h2 className="text-2xl font-bold font-clash-grotesk mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-green-500" />
                  Our Privacy Commitment
                </h2>
                <p className="text-lg text-muted-foreground font-ranade leading-relaxed">
                  At ColorKit, we take your privacy seriously. We believe in transparency and giving you control over your data.
                  Unlike many other tools, <span className="text-foreground font-medium">we don't collect or store your personal data.</span>
                  Your creativity stays yours.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="bg-background/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 sm:p-12 shadow-xl space-y-12">

            {/* Section 1 */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-clash-grotesk flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
                Information We Collect
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-400" /> Information You Provide
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    ColorKit works entirely in your browser. When you upload an image, it is processed locally on your device. It is <strong className="text-foreground">never</strong> uploaded to our servers.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Server className="w-5 h-5 text-purple-400" /> Auto-Collected Data
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We collect anonymous usage data (like browser type, device type) to help us improve performance and fix bugs. This data is never linked to your identity.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-white/10" />

            {/* Section 2 */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-clash-grotesk flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
                How We Use Data
              </h2>
              <div className="prose dark:prose-invert max-w-none text-muted-foreground font-ranade leading-relaxed">
                <p>
                  We strictly use the minimal data we collect to provide and maintain the service. We do not sell, rent, or trade your personal information with any third parties.
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mt-4 list-none pl-0">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Improve user experience
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Fix technical issues
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Monitor usage patterns
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Ensure security
                  </li>
                </ul>
              </div>
            </section>

            <Separator className="bg-white/10" />

            {/* Section 3 & 4 */}
            <div className="grid md:grid-cols-2 gap-12">
              <section className="space-y-4">
                <h2 className="text-xl font-bold font-clash-grotesk flex items-center gap-2">
                  <Globe className="w-5 h-5 text-muted-foreground" /> Third-Party Services
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We may use trusted third-party services for analytics (like Google Analytics) and hosting (like Vercel). These providers have their own privacy policies and adhering to high security standards.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold font-clash-grotesk flex items-center gap-2">
                  <Lock className="w-5 h-5 text-muted-foreground" /> Your Rights
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  You have the right to access, update, or delete your local preferences at any time. Since we don't store personal accounts, simply clearing your browser cache removes all local data.
                </p>
              </section>
            </div>

            {/* Contact */}
            <div className="pt-8">
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-clash-grotesk">Still have questions?</h3>
                    <p className="text-muted-foreground text-sm">We're happy to answer any questions about our privacy practices.</p>
                  </div>
                  <a href="mailto:support@colorkit.com" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap">
                    <Mail className="w-4 h-4" /> Contact Support
                  </a>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
