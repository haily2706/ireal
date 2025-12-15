"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/components/auth/use-auth-store";

export function AuthListener() {
    const supabase = createClient();
    const router = useRouter();
    const { setUser, setIsLoading } = useAuthStore();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setIsLoading(false);
            if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [setUser, setIsLoading, router]);

    return null;
}
