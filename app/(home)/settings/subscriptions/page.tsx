import { checkSubscription, getSubscription } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";
import { SubscriptionView } from "./_components/subscription-view";
import { redirect } from "next/navigation";

export default async function SubscriptionPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/");
    }

    const isPro = await checkSubscription(user.id);
    const subscription = await getSubscription(user.id);

    return (
        <div className="h-full flex flex-col space-y-4">
            <h3 className="text-2xl font-bold">Subscriptions</h3>
            <p className="text-muted-foreground">
                Manage your subscription plan and billing details.
            </p>
            <SubscriptionView isPro={isPro} subscription={subscription} />
        </div>
    );
}
