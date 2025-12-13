"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, role: string) {
    const supabase = await createClient();

    // Get current user to check permissions
    const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

    if (userError || !currentUser) {
        throw new Error("Unauthorized");
    }

    const currentRole = currentUser.app_metadata?.role as string | undefined;
    const hasAccess = currentRole && (currentRole.toLowerCase() === 'admin' || currentRole.toLowerCase() === 'manager');

    if (!hasAccess) {
        throw new Error("Unauthorized: Insufficient permissions");
    }

    // Use admin client for the actual update
    const adminSupabase = createAdminClient();

    const { error } = await adminSupabase.auth.admin.updateUserById(userId, {
        app_metadata: { role },
    });

    if (error) {
        console.error("Error updating user role:", error);
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/users");
}
