"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, ArrowUpRight, ArrowDownLeft, CreditCard, MoreHorizontal, Wallet as WalletIcon } from "lucide-react";
import { Coin } from "@/components/ui/coin";
import Image from "next/image";
import { CashInModal } from "./components/cash-in-modal";

export default function WalletPage() {
    const [balanceData, setBalanceData] = useState<{
        hbarBalance: string;
        tokenBalance: string;
        accountId: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await fetch('/api/wallet/balance');
                if (res.ok) {
                    const data = await res.json();
                    setBalanceData(data);
                }
            } catch (error) {
                console.error("Failed to fetch balance", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in-50 duration-500">
            <div>
                <h3 className="text-lg font-medium">Wallet</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your balance, cash in/out, and payment methods.
                </p>
                {balanceData && (
                    <p className="text-xs text-muted-foreground mt-1">
                        Hedera Account ID: <span className="font-mono">{balanceData.accountId}</span>
                    </p>
                )}
            </div>
            <Separator />

            {/* Balance Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="col-span-2 overflow-hidden relative border-none bg-linear-to-br from-primary/10 via-primary/5 to-background shadow-xl group">
                    {/* Background Coin */}
                    <div className="absolute -right-5 -bottom-5 opacity-[0.05] group-hover:opacity-15 transition-all duration-500 rotate-[15deg] group-hover:rotate-0 scale-100 group-hover:scale-110 pointer-events-none">
                        <Coin className="w-56 h-56 blur-[1px]" />
                    </div>

                    <CardHeader className="pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Balance</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        {loading ? (
                            <div className="flex items-baseline gap-1 mb-1 animate-pulse">
                                <div className="h-10 w-32 bg-muted rounded"></div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <div className="text-4xl font-bold tracking-tighter">
                                        {balanceData ? parseInt(balanceData.tokenBalance).toLocaleString() : "0"}
                                    </div>
                                    <div className="text-ms font-normal text-muted-foreground">LREAL</div>
                                </div>
                                <div className="text-sm font-medium text-muted-foreground">
                                    ≈ {balanceData ? (parseInt(balanceData.tokenBalance) / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : "$0.00"}
                                </div>
                            </>
                        )}

                        <div className="flex items-center gap-2 mt-2">
                            <div className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                                +20.1%
                            </div>
                            <span className="text-xs text-muted-foreground">from last month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <CashInModal>
                    <Card className="col-span-1 group flex flex-col justify-center items-center p-6 cursor-pointer bg-background hover:bg-muted/30 transition-all duration-300 border-dashed hover:border-solid hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10">
                        <div className="h-14 w-14 rounded-full bg-green-500/100 group-hover:scale-110 group-hover:bg-green-500 text-background group-hover:text-white flex items-center justify-center mb-4 transition-all duration-300 shadow-sm">
                            <ArrowDownLeft className="h-7 w-7" />
                        </div>
                        <div className="font-bold text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Cash In</div>
                        <p className="text-xs text-muted-foreground text-center mt-1 group-hover:text-muted-foreground/80">Add funds to your wallet</p>
                    </Card>
                </CashInModal>

                <Card className="col-span-1 group flex flex-col justify-center items-center p-6 cursor-pointer bg-background hover:bg-muted/30 transition-all duration-300 border-dashed hover:border-solid hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10">
                    <div className="h-14 w-14 rounded-full bg-red-500/10 group-hover:scale-110 group-hover:bg-red-500 text-red-500 group-hover:text-white flex items-center justify-center mb-4 transition-all duration-300 shadow-sm">
                        <ArrowUpRight className="h-7 w-7" />
                    </div>
                    <div className="font-bold text-lg group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Cash Out</div>
                    <p className="text-xs text-muted-foreground text-center mt-1 group-hover:text-muted-foreground/80">Withdraw funds to bank</p>
                </Card>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-base font-semibold">Payment Methods</h4>
                        <p className="text-sm text-muted-foreground">Manage cards and bank accounts</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-9 gap-1 rounded-full px-4 hover:border-primary/50 hover:text-primary transition-colors">
                        <Plus className="h-4 w-4" />
                        Add New
                    </Button>
                </div>

                <Card className="overflow-hidden border-muted/60">
                    <CardContent className="p-0">
                        {/* List of cards */}
                        <div className="flex items-center p-4 gap-4 border-b border-border/50 hover:bg-muted/10 transition-colors group">
                            <div className="h-12 w-16 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-border/50 shadow-xs">
                                {/* Visa/Mastercard Icon stub */}
                                <CreditCard className="h-6 w-6 text-zinc-500" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium flex items-center gap-2">
                                    Visa ending in 4242
                                    <div className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground uppercase tracking-wider">Default</div>
                                </div>
                                <div className="text-xs text-muted-foreground">Expires 12/24</div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex items-center p-4 gap-4 hover:bg-muted/10 transition-colors group">
                            <div className="h-12 w-16 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-border/50 shadow-xs">
                                <CreditCard className="h-6 w-6 text-zinc-500" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">Mastercard ending in 5555</div>
                                <div className="text-xs text-muted-foreground">Expires 05/25</div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Transaction History Placeholder */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold">Recent Activity</h4>
                    <Button variant="link" className="text-xs h-auto p-0">View All</Button>
                </div>
                <Card className="border-muted/60">
                    <CardContent className="p-8 text-center text-muted-foreground text-sm">
                        No recent transactions
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
