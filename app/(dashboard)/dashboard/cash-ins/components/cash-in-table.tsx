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

export interface CashInData {
    id: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
    amount: number;
    currency: string;
    status: string;
    createdAt: Date | null;
}

interface CashInTableProps {
    cashIns: CashInData[];
}

export const CashInTable = ({ cashIns }: CashInTableProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCashIns = cashIns.filter((ci) =>
        ci.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ci.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Card className="backdrop-blur-sm bg-card/50">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Cash Ins</CardTitle>
                        <CardDescription>
                            A list of recent cash-in transactions.
                        </CardDescription>
                    </div>
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search email or ID..."
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
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>ID</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCashIns.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No cash-ins found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCashIns.map((ci) => (
                                <TableRow key={ci.id}>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{ci.user.email}</span>
                                            <span className="text-xs text-muted-foreground">{ci.user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{formatCurrency(ci.amount / 100)}</span>
                                            <span className="text-xs text-muted-foreground">{ci.currency.toUpperCase()}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={ci.status === "succeeded" ? "default" : ci.status === "pending" ? "outline" : "destructive"}
                                            className="opacity-80"
                                        >
                                            {ci.status || "Unknown"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {ci.createdAt
                                            ? formatDistanceToNow(new Date(ci.createdAt), { addSuffix: true })
                                            : "N/A"}
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground font-mono">
                                        {ci.id}
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
