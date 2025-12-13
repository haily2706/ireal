"use client";

import { UpcomingEvent } from "@/lib/data";
import { StreamCard } from "./stream-card";

interface UpcomingSectionProps {
    events: UpcomingEvent[];
    title?: string;
}

export function UpcomingSection({ events, title = "Upcoming Streams" }: UpcomingSectionProps) {
    if (events.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-cyan-500 w-fit">{title}</h2>
                    <p className="text-sm text-muted-foreground">Don't miss out on these future streams</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 grid-flow-dense auto-rows-auto">
                {events.map((event, index) => (
                    <StreamCard
                        key={event.id}
                        stream={event}
                        type="upcoming"
                        index={index}
                        showRemindMe={true}
                        isVertical={index >= 5}
                    />
                ))}
            </div>
        </div>
    );
}
