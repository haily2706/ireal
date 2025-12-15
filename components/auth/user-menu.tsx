'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserRole } from "@/types/role";
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useAuthStore } from "./use-auth-store"

export function UserMenu({ email }: { email?: string }) {
    const router = useRouter()
    const supabase = createClient()
    const { user, setUser } = useAuthStore();

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback>{email ? email[0].toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">{email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(user?.app_metadata?.role === UserRole.ADMIN || user?.app_metadata?.role === UserRole.MANAGER) && (
                    <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                        Dashboard
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
