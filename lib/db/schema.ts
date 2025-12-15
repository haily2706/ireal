import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const subscriptions = pgTable('subscriptions', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(), // Supabase Auth ID
    stripeCustomerId: text('stripe_customer_id').unique(),
    stripeSubscriptionId: text('stripe_subscription_id').unique(),
    stripePriceId: text('stripe_price_id'),
    planId: text('plan_id'),
    stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});