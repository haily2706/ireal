import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme/theme-provider";
import { AuthModal } from "@/app/components/auth/auth-modal";
import { AuthListener } from "@/app/components/auth/auth-listener";

const inter = Inter({ subsets: ["latin"] });

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

import { Toaster } from "sonner";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`min-h-screen bg-background text-foreground ${inter.className} antialiased selection:bg-brand-gold selection:text-black`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthListener />
                    {children}
                    <AuthModal />
                    <Toaster theme="system" richColors closeButton />
                </ThemeProvider>
            </body>
        </html>
    );
}
