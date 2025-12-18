"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EventDateBadgeProps {
    startTime: Date | string;
    className?: string;
}

export function EventDateBadge({ startTime, className }: EventDateBadgeProps) {
    const startDate = new Date(startTime);

    return (
        <div className={cn(
            "flex flex-col items-center justify-center w-9 rounded-md overflow-hidden",
            "bg-black/60 backdrop-blur-md",
            "border border-white/10",
            "shadow-lg",
            className
        )}>
            {/* Month */}
            <div className="w-full text-center py-0.5 bg-gradient-to-b from-primary/20 to-transparent">
                <span className="text-[8px] font-bold uppercase text-primary/90 tracking-wider block leading-none">
                    {format(startDate, "MMM")}
                </span>
            </div>

            {/* Day */}
            <div className="flex-1 flex items-center justify-center py-0.5">
                <span className="text-base font-bold text-white tracking-tight">
                    {format(startDate, "d")}
                </span>
            </div>

            {/* Time */}
            <div className="w-full text-center py-0.5 pb-1 bg-gradient-to-t from-primary/10 to-transparent">
                <span className="text-[7px] font-medium text-muted-foreground/80 tracking-tight block leading-none">
                    {format(startDate, "h:mma").toLowerCase()}
                </span>
            </div>
        </div>
    );
}
