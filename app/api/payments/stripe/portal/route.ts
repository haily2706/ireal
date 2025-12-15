import { NextRequest, NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const [userSubscription] = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.userId, user.id));

        if (!userSubscription) {
            return new NextResponse("Not Found", { status: 404 });
        }

        if (!userSubscription.stripeCustomerId) {
            return new NextResponse("No Customer ID", { status: 400 });
        }

        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: absoluteUrl("/settings/subscriptions"),
        });

        return NextResponse.json({ url: stripeSession.url });
    } catch (error) {
        console.log("[STRIPE_PORTAL]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
