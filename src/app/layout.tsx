import type { Metadata } from "next";
import { Inter, Playfair_Display, Nunito, Share_Tech_Mono, Lora, Comic_Neue, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import AuthProvider from "@/components/providers/session-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const shareTech = Share_Tech_Mono({ weight: "400", subsets: ["latin"], variable: "--font-share-tech" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const comic = Comic_Neue({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-comic" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Solace - AI Wellness",
  description: "A premium, emotionally adaptive web application designed for students and young adults.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${nunito.variable} ${shareTech.variable} ${lora.variable} ${comic.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body 
        className="min-h-full flex flex-col transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <div className="absolute top-4 right-4 z-50">
              <ThemeSwitcher />
            </div>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
