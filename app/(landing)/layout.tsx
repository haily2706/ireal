import type { Metadata } from "next";
import { Navbar } from "@/app/components/navbar";
import "../globals.css";

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
        <Navbar mode="landing" />
        <main className="flex w-full flex-1 flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

