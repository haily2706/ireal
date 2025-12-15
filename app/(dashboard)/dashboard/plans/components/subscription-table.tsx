"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export interface SubscriptionData {
    id: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
    plan: {
        name: string;
        amount: number;
        currency: string;
        interval: string;
    };
    status: string;
    currentPeriodEnd: Date | null;
}

interface SubscriptionTableProps {
    subscriptions: SubscriptionData[];
}

export const SubscriptionTable = ({ subscriptions }: SubscriptionTableProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSubs = subscriptions.filter((sub) =>
        sub.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.plan.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Card className="backdrop-blur-sm bg-card/50">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Recent Subscriptions</CardTitle>
                        <CardDescription>
                            A list of recent subscriptions and their status.
                        </CardDescription>
                    </div>
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search subscriptions..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Renews</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSubs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No subscriptions found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredSubs.map((sub) => (
                                <TableRow key={sub.id}>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{sub.user.email}</span>
                                            <span className="text-xs text-muted-foreground">{sub.user.id}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{sub.plan.name}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{formatCurrency(sub.plan.amount / 100)}</span>
                                            <span className="text-xs text-muted-foreground">/{sub.plan.interval}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={sub.status === "active" ? "default" : "secondary"}
                                            className="opacity-80"
                                        >
                                            {sub.status || "Unknown"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {sub.currentPeriodEnd
                                            ? formatDistanceToNow(new Date(sub.currentPeriodEnd), { addSuffix: true })
                                            : "N/A"}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
