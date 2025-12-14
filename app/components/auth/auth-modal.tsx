"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAuthModal } from "@/app/components/auth/use-auth-modal";

const supabase = createClient();



export const AuthModal = () => {
    const { isOpen, onClose, onOpen, view } = useAuthModal();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);



    useEffect(() => {
        if (searchParams?.get("recovery") === "true") {
            onOpen("update_password");
        }
    }, [searchParams, onOpen]);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event) => {
            if (event === "SIGNED_IN") {
                router.refresh();
                onClose();
            }
            if (event === "PASSWORD_RECOVERY") {
                onOpen("update_password");
            }
            if (event === "USER_UPDATED" && view === "update_password") {
                router.push("/home");
                onClose();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, onClose, onOpen, view]);

    // Handle dialog open state change
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    const getTitle = () => {
        switch (view) {
            case 'sign_in': return 'Welcome Back';
            case 'forgotten_password': return 'Reset Password';
            case 'update_password': return 'Update Password';
            default: return 'Join the Revolution';
        }
    };

    const getDescription = () => {
        switch (view) {
            case 'sign_in': return 'Enter your credentials to access your account';
            case 'forgotten_password': return 'Enter your email to reset your password';
            case 'update_password': return 'Enter your new password below';
            default: return 'Create an account to start your journey';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)]">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-50" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="p-8 relative z-10">
                    <DialogHeader className="mb-6 space-y-2">
                        <DialogTitle className="text-center text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-700 via-purple-500 to-purple-700 dark:from-white dark:via-purple-200 dark:to-white pb-1">
                            {getTitle()}
                        </DialogTitle>
                        <p className="text-muted-foreground text-center text-sm">
                            {getDescription()}
                        </p>
                    </DialogHeader>

                    <div className="space-y-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const email = formData.get("email") as string;
                                const password = formData.get("password") as string;
                                const confirmPassword = formData.get("confirmPassword") as string; // For update only

                                const handleSubmit = async () => {
                                    setLoading(true);
                                    try {
                                        if (view === "sign_in") {
                                            const { error } = await supabase.auth.signInWithPassword({
                                                email,
                                                password,
                                            });
                                            if (error) throw error;
                                            toast.success("Signed in successfully");
                                        } else if (view === "sign_up") {
                                            const { error } = await supabase.auth.signUp({
                                                email,
                                                password,
                                                options: {
                                                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                                                },
                                            });
                                            if (error) throw error;
                                            toast.success("Check your email to confirm your account");
                                        } else if (view === "forgotten_password") {
                                            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                                                redirectTo: `${window.location.origin}/auth/callback?next=/?recovery=true`,
                                            });
                                            if (error) throw error;
                                            toast.success("Check your email for the reset link");
                                        } else if (view === "update_password") {
                                            if (password !== confirmPassword) {
                                                toast.error("Passwords do not match");
                                                setLoading(false);
                                                return;
                                            }
                                            const { error } = await supabase.auth.updateUser({
                                                password: password,
                                            });
                                            if (error) throw error;
                                            toast.success("Password updated successfully");
                                        }
                                    } catch (error: any) {
                                        toast.error(error.message);
                                    } finally {
                                        setLoading(false);
                                    }
                                };
                                handleSubmit();
                            }}
                            className="flex flex-col gap-4"
                        >
                            {view !== "update_password" && (
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 ml-1">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        disabled={loading}
                                        required
                                        className="bg-background border border-slate-200 dark:border-white/10 text-foreground placeholder:text-muted-foreground focus:border-purple-500/50 focus:bg-background focus:ring-1 focus:ring-purple-500/50 transition-all duration-200"
                                    />
                                </div>
                            )}

                            {view !== "forgotten_password" && (
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 ml-1">
                                        {view === "update_password" ? "New Password" : "Password"}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            disabled={loading}
                                            required
                                            className="bg-background border border-slate-200 dark:border-white/10 text-foreground placeholder:text-muted-foreground focus:border-purple-500/50 focus:bg-background focus:ring-1 focus:ring-purple-500/50 transition-all duration-200 pr-10"
                                            placeholder="******"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                            <span className="sr-only">Toggle password visibility</span>
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {view === "update_password" && (
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 ml-1">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showPassword ? "text" : "password"}
                                            disabled={loading}
                                            required
                                            className="bg-background border border-slate-200 dark:border-white/10 text-foreground placeholder:text-muted-foreground focus:border-purple-500/50 focus:bg-background focus:ring-1 focus:ring-purple-500/50 transition-all duration-200 pr-10"
                                            placeholder="******"
                                        />
                                        {/* Toggle button shared state or individual? Usually shared for form or individual. Let's rely on same toggle for simplicity or add another if needed. User asked to 'view/unview', one toggle usually suffices for the user's intent or I can duplicate. I'll use the same toggle state for both for cleaner UI unless I want separate. Actually let's just use the same state for simplicity as they are usually revealed together, or I can add another state. Let's add another state. */}
                                    </div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full px-4 py-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98] rounded-lg h-auto"
                            >
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {view === 'sign_in' && 'Sign In'}
                                {view === 'sign_up' && 'Sign Up'}
                                {view === 'forgotten_password' && 'Send Reset Instructions'}
                                {view === 'update_password' && 'Update Password'}
                            </Button>
                        </form>
                        <div className="flex flex-col gap-2">
                            {view === 'sign_in' && (
                                <>
                                    <button
                                        onClick={() => onOpen('forgotten_password')}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline"
                                    >
                                        Forgot Password?
                                    </button>
                                    <div className="text-center text-sm text-muted-foreground">
                                        Don&apos;t have an account?{" "}
                                        <button
                                            onClick={() => onOpen('sign_up')}
                                            className="text-primary hover:underline font-medium"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </>
                            )}
                            {view === 'sign_up' && (
                                <div className="text-center text-sm text-muted-foreground">
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => onOpen('sign_in')}
                                        className="text-primary hover:underline font-medium"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            )}
                            {view === 'forgotten_password' && (
                                <div className="text-center text-sm text-muted-foreground">
                                    Remember your password?{" "}
                                    <button
                                        onClick={() => onOpen('sign_in')}
                                        className="text-primary hover:underline font-medium"
                                    >
                                        Back to Sign In
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
