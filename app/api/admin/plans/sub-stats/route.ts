
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { count, gt } from "drizzle-orm";

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
