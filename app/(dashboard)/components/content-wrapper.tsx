"use client";

import { useSidebar } from "./provider";
import { cn } from "@/lib/utils";

export function ContentWrapper({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebar();
    return (
        <div className={cn("mx-auto w-full transition-all duration-300", isCollapsed ? "max-w-full" : "max-w-7xl")}>
            {children}
        </div>
    );
}
