"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-900/20"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 pt-36 sm:pt-40">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-white">
                Terms of Service
              </h1>
              <p className="text-sm text-muted-foreground dark:text-white/60">
                Last updated: October 28, 2025
              </p>
            </div>

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
                      related systems
                    </li>
                    <li>Interfere with or disrupt the Service or servers</li>
                    <li>
                      Use automated systems or bots to access the Service
                      excessively
                    </li>
                    <li>
                      Reverse engineer, decompile, or disassemble any aspect of
                      the Service
                    </li>
                    <li>
                      Remove or modify any copyright or proprietary notices
                    </li>
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
                  Colors generated, extracted, or analyzed through the Service
                  are not subject to copyright and may be used freely in your
                  projects. However, the tools, algorithms, and interface design
                  of ColorKit remain our intellectual property.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. User Content</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  When you upload images to ColorKit for color extraction:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground dark:text-white/70">
                  <li>
                    All processing happens in your browser - images are not
                    stored on our servers
                  </li>
                  <li>You retain all rights to your uploaded content</li>
                  <li>
                    You are responsible for ensuring you have the right to use
                    any images you upload
                  </li>
                  <li>We do not claim any ownership of your content</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  5. Disclaimer of Warranties
                </h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  The Service is provided on an AS IS and AS AVAILABLE basis
                  without any warranties of any kind, either express or implied,
                  including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground dark:text-white/70">
                  <li>
                    Warranties of merchantability or fitness for a particular
                    purpose
                  </li>
                  <li>
                    Warranties that the Service will be uninterrupted or
                    error-free
                  </li>
                  <li>
                    Warranties regarding the accuracy or reliability of color
                    analysis results
                  </li>
                </ul>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed mt-3">
                  While we strive for accuracy in our accessibility testing and
                  contrast checking, you should verify critical accessibility
                  requirements using multiple tools and methods.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  6. Limitation of Liability
                </h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  In no event shall ColorKit, its directors, employees,
                  partners, agents, suppliers, or affiliates be liable for any
                  indirect, incidental, special, consequential, or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground dark:text-white/70">
                  <li>Your use or inability to use the Service</li>
                  <li>Any unauthorized access to or use of our servers</li>
                  <li>Any errors or omissions in any content</li>
                  <li>
                    Any reliance on color analysis or accessibility testing
                    results
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. Changes to Service</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  We reserve the right to modify or discontinue, temporarily or
                  permanently, the Service (or any part thereof) with or without
                  notice. You agree that we shall not be liable to you or any
                  third party for any modification, suspension, or
                  discontinuance of the Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">8. Changes to Terms</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  We reserve the right to update or modify these Terms of
                  Service at any time without prior notice. Your continued use
                  of the Service after any such changes constitutes your
                  acceptance of the new Terms of Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">9. Governing Law</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  These Terms shall be governed and construed in accordance with
                  the laws, without regard to its conflict of law provisions.
                  Our failure to enforce any right or provision of these Terms
                  will not be considered a waiver of those rights.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">10. Contact Us</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  If you have any questions about these Terms of Service, please
                  contact us through our website.
                </p>
              </section>

              <div className="pt-6 border-t">
                <p className="text-sm text-muted-foreground dark:text-white/60 text-center">
                  By using ColorKit, you acknowledge that you have read and
                  understood these Terms of Service and agree to be bound by
                  them.
                </p>
              </div>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
