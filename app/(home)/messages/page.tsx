"use client";

import { MessageCircle } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function MessagesPage() {
    return (
        <div className="flex-1 w-full h-full p-6">
            <ComingSoon
                title="Messages"
                description="Direct messaging and group chats are coming soon. Connect with your favorite creators and friends directly!"
                icon={MessageCircle}
            />
        </div>
    );
}
