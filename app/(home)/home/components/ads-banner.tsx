"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function AdsBanner() {
    return (
        <div className="relative w-full rounded-3xl overflow-hidden bg-linear-to-r from-violet-600 to-indigo-600 shadow-2xl my-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay blur-3xl translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
                <div className="space-y-4 max-w-xl text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-sm border border-white/20">
                        <Sparkles className="h-3 w-3" />
                        <span>Premium Offer</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                        Unlock Exclusive Content with Premium Pass
                    </h2>
                    <p className="text-indigo-100 text-lg">
                        Get ad-free streaming, exclusive badges, and special access to creator events.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center md:justify-start">
                        <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-full shadow-lg hover:shadow-xl transition-all">
                            Get Premium
                        </Button>
                        <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full">
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Decorative Visual */}
                <div className="hidden md:block relative w-64 h-64 shrink-0">
                    {/* Floating Cards Effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl rotate-[-10deg] animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-linear-to-br from-pink-500 to-rose-500 rounded-xl shadow-2xl rotate-[5deg]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4">
                        <Sparkles className="h-16 w-16 text-white drop-shadow-md" />
                    </div>
                </div>
            </div>
        </div>
    );
}
