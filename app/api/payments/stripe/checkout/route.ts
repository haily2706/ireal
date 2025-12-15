import { NextRequest, NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SUBSCRIPTION_PLANS } from "@/app/(home)/settings/subscriptions/constants";

export async function POST(req: NextRequest) {
    try {
        const { planId } = await req.json();
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user || !user.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const [userSubscription] = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.userId, user.id));

        const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);

        let line_item: any;

        if (plan && plan.stripeProdId) {
            const prices = await stripe.prices.list({
                product: plan.stripeProdId,
                active: true,
                limit: 1,
            });

            if (!prices.data.length) {
                return new NextResponse("Product price not found", { status: 404 });
            }

            line_item = {
                price: prices.data[0].id,
                quantity: 1,
            };
        } else if (planId && planId.startsWith("price_")) {
            line_item = {
                price: planId,
                quantity: 1,
            };
        } else {
            // Fallback or default
            return new NextResponse("Invalid Plan", { status: 400 });
        }

        let stripeSession;

        if (userSubscription && userSubscription.stripeCustomerId) {
            stripeSession = await stripe.checkout.sessions.create({
                success_url: absoluteUrl(`/settings/subscriptions?planId=${planId}`),
                cancel_url: absoluteUrl("/settings/subscriptions"),
                payment_method_types: ["card"],
                mode: "subscription",
                billing_address_collection: "auto",
                customer: userSubscription.stripeCustomerId,
                line_items: [line_item],
                metadata: {
                    userId: user.id,
                    planId,
                },
                subscription_data: {
                    metadata: {
                        userId: user.id,
                        planId,
                    },
                },
            });
        } else {
            stripeSession = await stripe.checkout.sessions.create({
                success_url: absoluteUrl(`/settings/subscriptions?planId=${planId}`),
                cancel_url: absoluteUrl("/settings/subscriptions"),
                payment_method_types: ["card"],
                mode: "subscription",
                billing_address_collection: "auto",
                customer_email: user.email,
                line_items: [line_item],
                metadata: {
                    userId: user.id,
                    planId,
                },
                subscription_data: {
                    metadata: {
                        userId: user.id,
                        planId,
                    },
                },
            });
        }

        return NextResponse.json({ url: stripeSession.url });
    } catch (error) {
        console.log("[STRIPE_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
