import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const DAY_IN_MS = 86_400_000;

export const getSubscription = async (userId: string) => {
    const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, userId));

    return subscription;
};

export const checkSubscription = async (userId: string) => {
    const subscription = await getSubscription(userId);

    if (!subscription) {
        return false;
    }

    const isValid =
        subscription.stripePriceId &&
        subscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !!isValid;
};
