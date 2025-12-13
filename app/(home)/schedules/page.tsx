"use client";

import { Calendar } from "lucide-react";
import { ComingSoon } from "@/app/components/coming-soon";

export default function SchedulesPage() {
    return (
        <div className="flex-1 w-full h-full p-6">
            <ComingSoon
                title="Schedules"
                description="Keep track of upcoming streams and events. The scheduling feature is currently under development."
                icon={Calendar}
            />
        </div>
    );
}
