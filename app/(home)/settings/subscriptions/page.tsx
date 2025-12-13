import { Separator } from "@/components/ui/separator";

export default function SubscriptionsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Subscriptions</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your subscriptions and billing.
                </p>
            </div>
            <Separator />
            <div className="text-sm text-muted-foreground">Subscription settings coming soon...</div>
        </div>
    );
}
