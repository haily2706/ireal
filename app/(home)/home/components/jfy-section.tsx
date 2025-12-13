"use client";

import Image from "next/image";
import Link from "next/link";
import { LiveStream, UpcomingEvent } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Signal } from "lucide-react";
import { motion } from "framer-motion";
import { StreamCard } from "./stream-card";

interface JFYSectionProps {
    liveStreams: LiveStream[];
    upcomingStreams: UpcomingEvent[];
    title?: string;
}

export function JFYSection({ liveStreams, upcomingStreams, title = "Just For You" }: JFYSectionProps) {
    if (liveStreams.length === 0 && upcomingStreams.length === 0) return null;

    const allItems = [
        ...liveStreams.map(s => ({ ...s, type: 'live' as const })),
        ...upcomingStreams.map(s => ({ ...s, type: 'upcoming' as const }))
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-orange-500 to-red-500 w-fit">{title}</h2>
                    <p className="text-sm text-muted-foreground">Live & Upcoming from your favorites</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 grid-flow-dense auto-rows-auto">
                {allItems.map((item, index) => (
                    <StreamCard
                        key={item.id}
                        stream={item}
                        type={item.type}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}
