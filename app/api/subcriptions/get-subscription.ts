import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const DAY_IN_MS = 86_400_000;

export const getSubscription = async (userId: string) => {
    const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, userId));

    if (!subscription) {
        return null;
    }

    const subscriptionEndDate = new Date(subscription.createdAt!);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    if (subscriptionEndDate.getDate() !== subscription.createdAt!.getDate()) {
        subscriptionEndDate.setDate(0);
    }

    const isValid =
        subscription.stripePriceId &&
        subscriptionEndDate.getTime() + DAY_IN_MS > Date.now();

    return isValid ? subscription : null;
};