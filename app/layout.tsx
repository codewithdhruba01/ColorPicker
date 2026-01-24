import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ColorKit - Advanced Color Picker & Analyzer",
  description:
    "Pick colors from images, generate palettes, analyze accessibility, and explore color theory",
  icons: {
    icon: "/colorkit.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,401,500,501,700,701,900,1&f[]=ranade@400,500&f[]=general-sans@300,301,400,401,500,501,600&f[]=cabinet-grotesk@400,500,700,800,900,1&f[]=clash-grotesk@200,300,400,500,600,700,1&f[]=sentient@500,701&f[]=chillax@200,300,400,500,600,700,1&f[]=excon@500,700&f[]=telma@400,500,700&f[]=rosaline@400&f[]=dancing-script@400,700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
