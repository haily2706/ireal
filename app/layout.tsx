import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/app/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ireal.live"),
  title: {
    default: "iReal - Birthday Streaming Platform",
    template: "%s | iReal",
  },
  description: "Turn your birthday into a live experience. Stream your celebration, connect with your audience, and receive gifts in real-time.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ireal.live",
    siteName: "iReal",
    title: "iReal - Birthday Streaming Platform",
    description: "Stream your birthday celebration, connect with your audience, and receive gifts in real-time.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "iReal - Birthday Streaming Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iReal - Birthday Streaming Platform",
    description: "Stream your birthday, receive gifts, and connect with your audience live.",
    images: ["/og-image.png"],
  },
};

import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-background text-foreground ${outfit.className} antialiased selection:bg-[hsl(44_94%_49%)] selection:text-black`}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="iReal Logo"
                width={160}
                height={40}
                className="h-10 w-auto hover:opacity-80 transition-opacity"
                priority
              />
            </Link>

            <Navbar />


          </div>
        </header>
        <main className="flex w-full flex-1 flex-col">
          {children}
        </main>

      </body>
    </html>
  );
}

