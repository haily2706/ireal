import type { Metadata } from "next";
import { Navbar } from "@/app/(home)/components/navbar";
import { Sidebar } from "@/app/(home)/components/sidebar";
import { HomeProvider } from "@/app/(home)/components/provider";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Home | LiveReal",
    description: "LiveReal Dashboard",
};

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <HomeProvider>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Suspense fallback={<div className="h-16 border-b border-border/50 bg-background/80" />}>
                        <Navbar />
                    </Suspense>
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </HomeProvider>
    );
}
