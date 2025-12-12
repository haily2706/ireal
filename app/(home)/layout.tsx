import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";
import "../globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Home | iReal",
    description: "Manage your profile and explore birthdays.",
};

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`min-h-screen bg-background text-foreground ${outfit.className} antialiased selection:bg-[hsl(44_94%_49%)] selection:text-black`}>
                <Navbar mode="app" />
                <main className="flex w-full flex-1 flex-col pb-10">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
