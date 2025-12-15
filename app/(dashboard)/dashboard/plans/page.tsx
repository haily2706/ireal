import { PlansTable } from "./components/plan-table";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { ProductType, Plan } from "@/lib/types";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { count, gt, desc } from "drizzle-orm";
import { SubStats } from "./components/sub-stats";
import { SubscriptionTable, SubscriptionData } from "./components/subscription-table";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function PlansPage() {
    // 1. Fetch Plans
    const products = await stripe.products.list({
        active: true,
        limit: 100,
        expand: ['data.default_price']
    });

    const plans: Plan[] = products.data.map((p) => {
        const price = p.default_price as Stripe.Price;
        return {
            id: p.id,
            name: p.name,
            description: p.description || "",
            price: price?.unit_amount ? price.unit_amount / 100 : 0,
            currency: price?.currency || 'usd',
            interval: price?.recurring?.interval || 'month',
            type: (p.metadata.type as ProductType) || ProductType.PLAN,
            planId: (p.metadata.planId as string) || '',
            active: p.active,
            features: p.metadata.features ? JSON.parse(p.metadata.features) : [],
            stripePriceId: price?.id
        };
    }).sort((a, b) => {
        if (a.id === 'free' || a.name === 'Free') return -1;
        if (b.id === 'free' || b.name === 'Free') return 1;
        return a.price - b.price;
    });

    // 2. Fetch Subscription Stats
    const [totalSubs] = await db
        .select({ count: count() })
        .from(subscriptions);

    const [activeSubs] = await db
        .select({ count: count() })
        .from(subscriptions)
        .where(gt(subscriptions.stripeCurrentPeriodEnd, new Date()));

    // 3. Fetch Recent Subscriptions with Users
    const recentSubs = await db
        .select()
        .from(subscriptions)
        .orderBy(desc(subscriptions.createdAt))
        .limit(20);

    const supabase = createAdminClient();
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();

    if (usersError) {
        console.error("Error fetching users:", usersError);
    }

    const formattedSubscriptions: SubscriptionData[] = recentSubs.map((sub) => {
        const user = users?.find(u => u.id === sub.userId);
        const plan = plans.find(p => p.planId === sub.planId || p.stripePriceId === sub.stripePriceId) || {
            name: "Unknown Plan",
            price: 0,
            currency: "usd",
            interval: "month"
        };

        return {
            id: sub.id,
            user: {
                id: sub.userId,
                email: user?.email || "Unknown",
                name: user?.user_metadata?.full_name || user?.email || "Unknown"
            },
            plan: {
                name: plan.name,
                amount: plan.price * 100, // Convert back to cents for consistency if needed, but display uses formatCurrency
                currency: plan.currency,
                interval: plan.interval
            },
            status: sub.stripeCurrentPeriodEnd && new Date(sub.stripeCurrentPeriodEnd) > new Date() ? "active" : "expired",
            currentPeriodEnd: sub.stripeCurrentPeriodEnd
        };
    });

    return (
        <div className="flex-1 space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Subscription Plans</h2>
                    <p className="text-muted-foreground">
                        Manage subscription tiers and pricing
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <SubStats
                totalSubscriptions={Number(totalSubs.count)}
                activeSubscriptions={Number(activeSubs.count)}
            />

            {/* Content */}
            <PlansTable plans={plans} />

            <SubscriptionTable subscriptions={formattedSubscriptions} />
        </div>
    );
}
