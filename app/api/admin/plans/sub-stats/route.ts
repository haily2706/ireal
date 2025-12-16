
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { count, gt } from "drizzle-orm";

/**
 * @swagger
 * /api/admin/plans/sub-stats:
 *   get:
 *     summary: Get Subscription Statistics
 *     description: Returns the total number of subscriptions and the number of active subscriptions.
 *     tags:
 *       - Admin
 *       - Stats
 *     responses:
 *       200:
 *         description: Subscription statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSubscriptions:
 *                   type: number
 *                 activeSubscriptions:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Error
 */
export async function GET(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const [totalSubscriptions] = await db
            .select({ count: count() })
            .from(subscriptions);

        const [activeSubscriptions] = await db
            .select({ count: count() })
            .from(subscriptions)
            .where(
                gt(subscriptions.stripeCurrentPeriodEnd, new Date())
            );

        return NextResponse.json({
            totalSubscriptions: totalSubscriptions.count,
            activeSubscriptions: activeSubscriptions.count,
        });
    } catch (error) {
        console.error("[ADMIN_STATS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
