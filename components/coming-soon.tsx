"use client";

import { motion } from "framer-motion";
import { Sparkles, Construction, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComingSoonProps {
    title?: string;
    description?: string;
    icon?: React.ElementType;
}

export function ComingSoon({
    title = "Coming Soon",
    description = "We are working hard to bring you this feature. Stay tuned!",
    icon: Icon = Rocket
}: ComingSoonProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto"
            >
                {/* Icon Circle */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative mb-6"
                >
                    <div className="absolute inset-0 bg-linear-to-tr from-[#FF3B5C] to-purple-600 rounded-full blur-xl opacity-40 animate-pulse" />
                    <div className="relative h-16 w-16 rounded-full bg-background/50 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-xl">
                        <Icon className="h-8 w-8 text-foreground" />
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="absolute -top-1 -right-1 text-yellow-400"
                    >
                        <Sparkles className="h-4 w-4" />
                    </motion.div>
                </motion.div>

                {/* Text Content */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-2xl md:text-3xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-sm text-muted-foreground leading-relaxed"
                >
                    {description}
                </motion.p>

                {/* Decorative Line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-6 w-16 h-0.5 bg-linear-to-r from-transparent via-[#FF3B5C] to-transparent rounded-full opacity-50"
                />
            </motion.div>
        </div>
    );
}
