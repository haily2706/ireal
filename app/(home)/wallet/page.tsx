"use client";

import { useEffect, useState } from "react";
import { Coins, Loader2, Wallet } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CASH_IN_PLANS } from "./constants";
import { cn } from "@/lib/utils";

export default function WalletPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [balance, setBalance] = useState<{ hbar: string; token: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("/api/wallet/balance");
                setBalance({
                    hbar: response.data.hbarBalance,
                    token: response.data.tokenBalance,
                });
            } catch (error) {
                console.error("Failed to fetch balance", error);
                toast.error("Failed to load wallet balance");
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();

        if (searchParams.get("success")) {
            toast.success("Payment successful! Your balance will be updated shortly.");
            // Poll for balance update? For now just re-fetch once after heavy delay or rely on user refresh
            setTimeout(fetchBalance, 3000);
        }
    }, [searchParams]);

    const onCheckout = async (planId: string) => {
        try {
            setProcessingPlanId(planId);
            const response = await axios.post("/api/payments/stripe/cash-in", {
                planId,
            });

            window.location.href = response.data.url;
        } catch (error) {
            console.error("Checkout failed", error);
            toast.error("Failed to start checkout");
        } finally {
            setProcessingPlanId(null);
        }
    };

    return (
        <div className="container max-w-6xl py-10">
            <div className="mb-10 flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
                <p className="text-muted-foreground">
                    Manage your LREAL balance and purchase more.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[1fr_300px]">
                <div className="space-y-8">
                    <Card className="bg-linear-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Wallet className="h-5 w-5 text-violet-500" />
                                Current Balance
                            </CardTitle>
                            <CardDescription>
                                Your available LiveReal balance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Loading balance...
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <div className="text-4xl font-bold text-primary flex items-center gap-2">
                                        {balance?.token} LREAL
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        ({balance?.hbar} HBAR available for gas)
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div>
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Coins className="h-5 w-5 text-yellow-500" />
                            Cash In
                        </h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {CASH_IN_PLANS.map((plan) => (
                                <Card
                                    key={plan.id}
                                    className={cn(
                                        "relative transition-all hover:border-primary/50 cursor-pointer overflow-hidden",
                                        plan.popular && "border-primary shadow-lg shadow-primary/10"
                                    )}
                                    onClick={() => onCheckout(plan.id)}
                                >
                                    {plan.popular && (
                                        <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-bl-lg">
                                            Popular
                                        </div>
                                    )}
                                    <div className={cn("absolute inset-0 opacity-[0.03] bg-linear-to-br", plan.gradient)} />
                                    <CardHeader>
                                        <CardTitle className="flex flex-col gap-2">
                                            <div className={cn("p-2 w-fit rounded-lg bg-linear-to-br text-white", plan.gradient)}>
                                                <plan.icon className="h-5 w-5" />
                                            </div>
                                            <span>{plan.name}</span>
                                        </CardTitle>
                                        <CardDescription>{plan.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {plan.lrealAmount} <span className="text-sm font-normal text-muted-foreground">LREAL</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            className="w-full"
                                            disabled={!!processingPlanId}
                                            variant={plan.popular ? "default" : "outline"}
                                        >
                                            {processingPlanId === plan.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                `Buy for $${plan.price}`
                                            )}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Transaction History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground text-center py-8">
                                No recent transactions
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
