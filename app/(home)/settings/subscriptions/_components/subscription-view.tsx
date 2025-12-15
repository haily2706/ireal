"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SUBSCRIPTION_PLANS } from "../constants";
import { PlanId } from "@/lib/types";

interface SubscriptionViewProps {
    subscription: any;
}

export const SubscriptionView = ({ subscription }: SubscriptionViewProps) => {
    const [loading, setLoading] = useState(false);


    const currentPlanId = subscription?.planId ?? PlanId.FREE;

    // Find current plan details
    const currentPlan = SUBSCRIPTION_PLANS.find(tier => tier.id === currentPlanId) || SUBSCRIPTION_PLANS[0];

    const onSubscribe = async (planId: string) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/stripe/checkout", {
                planId
            });

            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const onManage = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/stripe/portal");

            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Current Plan Section */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Current Plan
                </h4>
                <div className="relative rounded-xl border p-8 bg-linear-to-r from-pink-500/5 to-purple-500/5 overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-x-3">
                                <h2 className="text-3xl font-bold">{currentPlan.name}</h2>
                                <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-white text-xs font-medium">
                                    Active
                                </span>
                            </div>
                            <p className="text-muted-foreground">
                                You are currently on the {currentPlan.name.toLowerCase()} plan.
                            </p>
                            <div className="flex items-baseline gap-x-1">
                                <span className="text-3xl font-bold">{currentPlan.price}</span>
                                <span className="text-muted-foreground">{currentPlan.period}</span>
                            </div>
                        </div>

                        <div className="flex items-end">
                            <Button
                                variant="outline"
                                disabled
                                className="bg-white/50 backdrop-blur-sm dark:bg-black/50"
                            >
                                Current Plan
                            </Button>
                        </div>
                    </div>

                    {/* Decorative Icon */}
                    <div className="absolute top-6 right-6">
                        <div className="bg-blue-500 rounded-xl p-2.5">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Plans Section */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Available Plans
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SUBSCRIPTION_PLANS.map((tier) => {
                        const isCurrentPlan = tier.id === currentPlanId;
                        const isPopular = tier.popular;

                        return (
                            <div
                                key={tier.id}
                                className={cn(
                                    "border rounded-xl p-6 flex flex-col space-y-4 relative bg-card h-full",
                                    isPopular && "border-primary/50"
                                )}
                            >
                                {isPopular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-linear-to-r from-pink-500 to-purple-500 rounded-full text-white text-xs font-bold shadow-sm">
                                        Most Popular
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <tier.icon className={cn("h-6 w-6", `text-${tier.color}-500`)} />
                                    </div>
                                    <h4 className="text-xl font-bold">
                                        {tier.name}
                                    </h4>
                                    <div className="flex items-baseline gap-x-1">
                                        <span className="text-2xl font-bold">{tier.price}</span>
                                        <span className="text-sm text-muted-foreground">{tier.period}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {tier.description}
                                    </p>
                                </div>

                                <div className="space-y-3 pt-4 flex-1">
                                    {tier.features.slice(0, 4).map((feature) => ( // Show first 4 features as per design
                                        <div key={feature} className="flex items-start gap-x-3">
                                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-sm text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                    {tier.features.length > 4 && (
                                        <div className="text-xs text-muted-foreground pl-7">
                                            + {tier.features.length - 4} more features
                                        </div>
                                    )}
                                </div>
                                <div className="pt-4">
                                    {isCurrentPlan ? (
                                        <Button
                                            disabled
                                            className="w-full bg-muted/50 text-muted-foreground hover:bg-muted/50 border-0"
                                            variant="ghost"
                                        >
                                            Current Plan
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => tier.id === "free" ? {} : onSubscribe(tier.id)} // Free plan can't calculate checkout usually if distinct
                                            disabled={loading}
                                            className={cn(
                                                "w-full text-white border-0",
                                                tier.gradient ? `bg-linear-to-r ${tier.gradient}` : "bg-primary"
                                            )}
                                        >
                                            Upgrade
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
