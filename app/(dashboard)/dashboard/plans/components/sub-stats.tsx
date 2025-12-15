
"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    CreditCard,
    CheckCircle,
    Activity,
    Users
} from "lucide-react";

interface SubStatsProps {
    totalSubscriptions: number;
    activeSubscriptions: number;
}

export function SubStats({ totalSubscriptions, activeSubscriptions }: SubStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Subscriptions
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalSubscriptions}</div>
                    <p className="text-xs text-muted-foreground flex items-center pt-1">
                        Total users subscribed
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Active Subscriptions
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{activeSubscriptions}</div>
                    <p className="text-xs text-muted-foreground pt-1">
                        Currently active
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Subscription Rate
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {totalSubscriptions > 0
                            ? `${((activeSubscriptions / totalSubscriptions) * 100).toFixed(1)}%`
                            : "0%"}
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">
                        Active vs Total
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
