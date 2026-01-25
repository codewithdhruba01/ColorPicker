"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-stone-950 flex flex-col">
      <div className="absolute inset-0"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />

        <motion.main
          className="flex-1 container mx-auto px-4 pt-36 sm:pt-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-white">
                Terms of Service
              </h1>
              <p className="text-sm text-muted-foreground dark:text-white/60">
                Last updated: October 28, 2025
              </p>
            </motion.div>
            <Card className="p-6 sm:p-8 space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  By accessing and using ColorKit (the Service), you accept and
                  agree to be bound by the terms and provisions of this
                  agreement. If you do not agree to these terms, please do not
                  use the Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Use of Service</h2>
                <div className="space-y-3 text-muted-foreground dark:text-white/70">
                  <h3 className="text-lg font-semibold text-foreground dark:text-white">
                    2.1 Permitted Use
                  </h3>
                  <p className="leading-relaxed">
                    ColorKit is provided as a free tool for color exploration,
                    analysis, and accessibility testing. You may use the Service
                    for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Personal and commercial design projects</li>
                    <li>Educational purposes</li>
                    <li>Accessibility testing and compliance checking</li>
                    <li>Color palette creation and management</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-foreground dark:text-white mt-4">
                    2.2 Prohibited Use
                  </h3>
                  <p className="leading-relaxed">You agree not to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Use the Service for any illegal or unauthorized purpose
                    </li>
                    <li>
                      Attempt to gain unauthorized access to the Service or its
                      systems
                    </li>
                    <li>Interfere with or disrupt the Service or servers</li>
                    <li>Use automated systems or bots excessively</li>
                    <li>
                      Reverse engineer, decompile, or disassemble any part
                    </li>
                    <li>Remove or modify any copyright notices</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. Intellectual Property</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  The Service and its original content, features, and
                  functionality are owned by ColorKit and are protected by
                  international copyright, trademark, patent, trade secret, and
                  other intellectual property laws.
                </p>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  Colors generated or analyzed are free to use, but ColorKit’s
                  algorithms and interface design remain protected.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. User Content</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  When you upload images to ColorKit:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground dark:text-white/70">
                  <li>Processing happens locally in your browser</li>
                  <li>You retain all rights to your content</li>
                  <li>You must ensure you have rights to uploaded images</li>
                  <li>We do not claim ownership of your content</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  5. Disclaimer of Warranties
                </h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  The Service is provided “AS IS” without warranties of any
                  kind.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground dark:text-white/70">
                  <li>No guarantees of accuracy or uninterrupted service</li>
                  <li>No warranty of fitness for a particular purpose</li>
                  <li>Color analysis accuracy may vary</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  6. Limitation of Liability
                </h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  ColorKit is not liable for any indirect or consequential
                  damages.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground dark:text-white/70">
                  <li>Loss of data or profits</li>
                  <li>Unauthorized server access</li>
                  <li>Errors or omissions in content</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. Changes to Service</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  We may modify or discontinue the Service at any time without
                  notice.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">8. Changes to Terms</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  Continued use after updates means you accept the new terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">9. Governing Law</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  Terms are governed by applicable laws; failure to enforce a
                  right is not a waiver.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">10. Contact Us</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  If you have any questions, contact us through our website.
                </p>
              </section>

              <div className="pt-6 border-t">
                <p className="text-sm text-muted-foreground dark:text-white/60 text-center">
                  By using ColorKit, you acknowledge that you agree to these
                  Terms.
                </p>
              </div>
            </Card>
          </div>
        </motion.main>

        <Footer />
      </div>
    </div>
  );
}
