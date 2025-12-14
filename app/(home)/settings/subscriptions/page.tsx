"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertTriangle, CreditCard, Calendar, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { SUBSCRIPTION_TIERS } from "./constants";
import { cn } from "@/lib/utils";

export default function SubscriptionsPage() {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [currentPlanId, setCurrentPlanId] = useState("pro");
    const [isCancelling, setIsCancelling] = useState(false);
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

    const currentPlan = SUBSCRIPTION_TIERS.find(t => t.id === currentPlanId) || SUBSCRIPTION_TIERS[0];

    const handleSwitchPlan = async (planId: string) => {
        setIsLoading(planId);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCurrentPlanId(planId);
        setIsLoading(null);
    };

    const handleCancel = async () => {
        setIsCancelling(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCurrentPlanId("free");
        setIsCancelling(false);
        setIsCancelDialogOpen(false);
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-medium">Subscriptions</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your subscription plan and billing details.
                </p>
            </div>
            <Separator />

            {/* Current Plan Section */}
            <section className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Plan</h4>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-pink-500/10 blur-xl rounded-full" />
                    <Card className="relative border-purple-500/20 bg-background/50 backdrop-blur-xl overflow-hidden">
                        <div className={`absolute top-0 right-0 p-32 bg-linear-to-br ${currentPlan.gradient} opacity-5 blur-3xl rounded-full translate-x-12 -translate-y-12`} />

                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    {currentPlan.name}
                                    <Badge variant="secondary" className={cn(
                                        "ml-2 text-xs font-normal bg-linear-to-r text-white border-0",
                                        currentPlan.gradient
                                    )}>
                                        Active
                                    </Badge>
                                </CardTitle>
                                <CardDescription>
                                    {currentPlanId === "free"
                                        ? "You are currently on the free plan."
                                        : `Your next billing date is ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`
                                    }
                                </CardDescription>
                            </div>
                            <div className={`p-3 rounded-xl bg-linear-to-br ${currentPlan.gradient} shadow-lg`}>
                                <currentPlan.icon className="w-6 h-6 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-2 mb-6">
                                <span className="text-3xl font-bold">{currentPlan.price}</span>
                                <span className="text-muted-foreground mb-1">{currentPlan.period}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    {currentPlanId !== "free" && (
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="w-4 h-4" />
                                            <span>•••• 4242</span>
                                        </div>
                                    )}
                                </div>

                                {currentPlanId !== "free" ? (
                                    <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50">
                                                Cancel Subscription
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="flex items-center gap-2 text-red-500">
                                                    <AlertTriangle className="w-5 h-5" />
                                                    Cancel Subscription
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to cancel your {currentPlan.name} plan? You will lose access to premium features at the end of your billing period.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="gap-2 sm:gap-0">
                                                <Button variant="ghost" onClick={() => setIsCancelDialogOpen(false)}>
                                                    Keep Subscription
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={handleCancel}
                                                    disabled={isCancelling}
                                                >
                                                    {isCancelling && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                                    Yes, Cancel
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                ) : (
                                    <Button variant="outline" disabled>
                                        Current Plan
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </section>

            {/* Available Plans Section */}
            <section className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Available Plans</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SUBSCRIPTION_TIERS.map((tier) => (
                        <Card
                            key={tier.id}
                            className={cn(
                                "relative transition-all duration-300",
                                currentPlanId === tier.id
                                    ? "border-primary/50 ring-1 ring-primary/20 shadow-lg scale-[1.02]"
                                    : "hover:border-primary/30 hover:shadow-md"
                            )}
                        >
                            {tier.popular && currentPlanId !== tier.id && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <Badge className="bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 border-0">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <CardHeader>
                                <div className="flex items-start justify-between mb-2">
                                    <div className={`p-2 rounded-lg bg-linear-to-br ${tier.gradient} bg-opacity-10 w-fit`}>
                                        <tier.icon className="w-5 h-5 text-white" />
                                    </div>
                                    {currentPlanId === tier.id && (
                                        <Check className="w-5 h-5 text-green-500" />
                                    )}
                                </div>
                                <CardTitle>{tier.name}</CardTitle>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold">{tier.price}</span>
                                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                                </div>
                                <CardDescription>{tier.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-2.5">
                                    {tier.features.slice(0, 4).map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                    {tier.features.length > 4 && (
                                        <li className="text-xs text-center text-muted-foreground pt-1">
                                            + {tier.features.length - 4} more features
                                        </li>
                                    )}
                                </ul>

                                <Button
                                    className={cn(
                                        "w-full",
                                        currentPlanId === tier.id ? "bg-muted text-muted-foreground hover:bg-muted" : "bg-linear-to-r " + tier.gradient
                                    )}
                                    variant={currentPlanId === tier.id ? "ghost" : "default"}
                                    disabled={currentPlanId === tier.id || isLoading !== null}
                                    onClick={() => handleSwitchPlan(tier.id)}
                                >
                                    {isLoading === tier.id && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {currentPlanId === tier.id
                                        ? "Current Plan"
                                        : currentPlanId === "free" ? "Upgrade" : "Switch Plan"
                                    }
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
