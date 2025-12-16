import { NextRequest, NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * @swagger
 * /api/payments/stripe/portal:
 *   post:
 *     summary: Create Customer Portal Session
 *     description: Creates a Stripe Customer Portal session for managing subscriptions.
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: Portal URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       400:
 *         description: No Customer ID found for subscription
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal Error
 */
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
