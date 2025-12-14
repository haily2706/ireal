"use client";

import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSidebar } from "@/app/(home)/components/provider";

export default function PreferencesPage() {
    const { showPremiumBalance, togglePremiumBalance } = useSidebar();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Preferences</h3>
                <p className="text-sm text-muted-foreground">
                    Customize your experience.
                </p>
            </div>
            <Separator />

            <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Premium Balance</Label>
                        <p className="text-sm text-muted-foreground">
                            Show your premium coin balance card in the sidebar.
                        </p>
                    </div>
                    <Switch
                        checked={showPremiumBalance}
                        onCheckedChange={togglePremiumBalance}
                    />
                </div>
            </div>
        </div>
    );
}
