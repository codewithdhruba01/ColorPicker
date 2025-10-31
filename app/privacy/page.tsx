"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-900/20"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 pt-36 sm:pt-40">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-white">
                Privacy Policy
              </h1>
              <p className="text-sm text-muted-foreground dark:text-white/60">
                Last updated: October 28, 2025
              </p>
            </div>

            <Card className="p-6 sm:p-8 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-2">
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold">
                  Our Privacy Commitment
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground dark:text-white/70 leading-relaxed">
                  At ColorKit, we take your privacy seriously. We believe in
                  transparency and giving you control over your data. This
                  policy explains what information we collect (spoiler: very
                  little) and how we use it.
                </p>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  1. Information We Collect
                </h2>
                <div className="space-y-4 text-muted-foreground dark:text-white/70">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                      1.1 Information You Provide
                    </h3>
                    <p className="leading-relaxed">
                      ColorKit is designed to work entirely in your browser.
                      When you use our color picker or upload images:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Images are processed locally in your browser</li>
                      <li>
                        No images are uploaded to or stored on our servers
                      </li>
                      <li>Color data remains on your device</li>
                      <li>
                        We do not require or collect personal information like
                        names or email addresses
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                      1.2 Automatically Collected Information
                    </h3>
                    <p className="leading-relaxed">
                      Like most websites, we automatically collect certain
                      information when you visit:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>Page visit timestamps</li>
                      <li>Referring website addresses</li>
                      <li>IP address (anonymized)</li>
                    </ul>
                    <p className="leading-relaxed mt-2">
                      This information helps us understand how people use
                      ColorKit and improve the service.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                      1.3 Cookies and Local Storage
                    </h3>
                    <p className="leading-relaxed">
                      We use minimal cookies and browser local storage for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>
                        Remembering your theme preference (dark/light mode)
                      </li>
                      <li>Saving your recently used colors (stored locally)</li>
                      <li>Maintaining your session</li>
                    </ul>
                    <p className="leading-relaxed mt-2">
                      All saved preferences remain on your device and are never
                      transmitted to our servers.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  2. How We Use Your Information
                </h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  We use the minimal information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground dark:text-white/70">
                  <li>Provide and maintain the Service</li>
                  <li>Improve and optimize the user experience</li>
                  <li>Monitor usage patterns and identify technical issues</li>
                  <li>
                    Protect against misuse and ensure service availability
                  </li>
                  <li>Comply with legal obligations</li>
                </ul>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed mt-4">
                  We do not sell, rent, or share your information with third
                  parties for marketing purposes.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  3. Data Storage and Security
                </h2>
                <div className="space-y-3 text-muted-foreground dark:text-white/70">
                  <h3 className="text-lg font-semibold text-foreground dark:text-white">
                    3.1 Where Your Data Lives
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Color analysis happens entirely in your browser</li>
                    <li>Uploaded images never leave your device</li>
                    <li>
                      Saved colors and preferences are stored locally on your
                      device
                    </li>
                    <li>
                      Basic analytics data is stored securely on our servers
                      with industry-standard encryption
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold text-foreground dark:text-white mt-4">
                    3.2 Security Measures
                  </h3>
                  <p className="leading-relaxed">
                    We implement appropriate technical and organizational
                    security measures to protect your information, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>HTTPS encryption for all data transmission</li>
                    <li>Regular security audits and updates</li>
                    <li>Restricted access to any collected data</li>
                    <li>Secure hosting infrastructure</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. Third-Party Services</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  ColorKit may use third-party services for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground dark:text-white/70">
                  <li>
                    <strong className="text-foreground dark:text-white">
                      Analytics:
                    </strong>{" "}
                    To understand how users interact with the service
                    (anonymized data only)
                  </li>
                  <li>
                    <strong className="text-foreground dark:text-white">
                      Hosting:
                    </strong>{" "}
                    To deliver the service reliably and quickly
                  </li>
                </ul>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed mt-3">
                  These third-party services have their own privacy policies and
                  we encourage you to review them.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  5. Your Rights and Choices
                </h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground dark:text-white/70">
                  <li>
                    <strong className="text-foreground dark:text-white">
                      Access:
                    </strong>{" "}
                    Request information about data we may have collected
                  </li>
                  <li>
                    <strong className="text-foreground dark:text-white">
                      Delete:
                    </strong>{" "}
                    Clear your local storage and cookies at any time through
                    your browser settings
                  </li>
                  <li>
                    <strong className="text-foreground dark:text-white">
                      Opt-Out:
                    </strong>{" "}
                    Disable cookies through your browser settings (may affect
                    functionality)
                  </li>
                  <li>
                    <strong className="text-foreground dark:text-white">
                      Update:
                    </strong>{" "}
                    Modify any saved preferences directly in the application
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. Childrens Privacy</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  ColorKit is suitable for all ages and does not knowingly
                  collect personal information from anyone, including children
                  under 13. Since we dont require registration or collect
                  personal data, the service can be used safely by people of all
                  ages.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. International Users</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  ColorKit is accessible worldwide. If you access the service
                  from outside your region, please be aware that your
                  information may be transferred to, stored, and processed in
                  regions where our servers are located. We ensure appropriate
                  safeguards are in place to protect your information.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  8. Changes to This Policy
                </h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the Last updated date. We encourage you
                  to review this Privacy Policy periodically.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">9. Contact Us</h2>
                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us through our website.
                </p>
              </section>

              <div className="pt-6 border-t">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Privacy Summary
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground dark:text-white/70">
                    <li>✓ Your images never leave your device</li>
                    <li>✓ We dont collect personal information</li>
                    <li>✓ No account or registration required</li>
                    <li>✓ Minimal cookies and local storage only</li>
                    <li>✓ No selling or sharing of data</li>
                    <li>✓ Complete transparency about our practices</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
