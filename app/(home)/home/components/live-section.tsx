"use client";

import { LiveStream } from "@/lib/data";
import { StreamCard } from "./stream-card";

interface LiveSectionProps {
    lives: LiveStream[];
    title?: string;
}

export function LiveSection({ lives, title = "Birthday Live" }: LiveSectionProps) {
    if (lives.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-purple-500 w-fit">{title}</h2>
                    <p className="text-sm text-muted-foreground">Catch the latest streaming events</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 grid-flow-dense auto-rows-auto">
                {lives.map((live, index) => (
                    <StreamCard
                        key={live.id}
                        stream={live}
                        type="live"
                        index={index}
                        rank={index + 1}
                        isVertical={index >= 5}
                    />
                ))}
            </div>
        </div>
    );
}

