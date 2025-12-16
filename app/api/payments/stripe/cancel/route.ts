import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
// import { auth } from "@/lib/auth"; // Removed incorrect import
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";

/**
 * @swagger
 * /api/payments/stripe/cancel:
 *   post:
 *     summary: Cancel Subscription
 *     description: Cancels the user's subscription at the end of the current billing period.
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: Subscription cancellation scheduled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 cancel_at_period_end:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal Error
 */
export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const [subscription] = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.userId, user.id))
            .limit(1);

        if (!subscription || !subscription.stripeSubscriptionId) {
            return new NextResponse("Subscription not found", { status: 404 });
        }

        const stripeSubscription = await stripe.subscriptions.update(
            subscription.stripeSubscriptionId,
            {
                cancel_at_period_end: true,
            }
        );

        return NextResponse.json({
            status: stripeSubscription.status,
            cancel_at_period_end: stripeSubscription.cancel_at_period_end
        });
    } catch (error) {
        console.error("[SUBSCRIPTION_CANCEL]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
