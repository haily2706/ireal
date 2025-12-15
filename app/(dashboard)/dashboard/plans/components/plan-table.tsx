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
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Plan } from "@/lib/types";

interface PlansTableProps {
    plans: Plan[];
}

export const PlansTable = ({ plans }: PlansTableProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const filteredPlans = plans.filter((plan) =>
        plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8">
            <Card className="backdrop-blur-sm bg-card/50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>All Plans</CardTitle>
                            <CardDescription>
                                A list of all subscription plans including their pricing and status.
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            {isExpanded && (
                                <div className="relative w-full max-w-sm">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search plans..."
                                        className="pl-8"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                {isExpanded && (
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPlans.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No plans found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredPlans.map((plan) => (
                                        <TableRow key={plan.id}>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{plan.name}</span>

                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">

                                                    <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                        {plan.description}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{formatCurrency(plan.price)}</span>
                                                    <span className="text-xs text-muted-foreground">/{plan.interval}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={plan.active ? "default" : "secondary"}
                                                    className="opacity-80"
                                                >
                                                    {plan.active ? "Active" : "Inactive"}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                )}
            </Card>
        </div>
    );
};
