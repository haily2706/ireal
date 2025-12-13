"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@/lib/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuthModal } from "@/app/components/auth/use-auth-modal";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const supabase = createClient();



export const AuthModal = () => {
    const { isOpen, onClose, view } = useAuthModal();
    const router = useRouter();
    const { theme } = useTheme();
    // Ensure we have a valid theme string for Supabase UI
    const [authTheme, setAuthTheme] = useState<string>("dark");

    useEffect(() => {
        if (theme === "light") {
            setAuthTheme("light");
        } else {
            setAuthTheme("dark");
        }
    }, [theme]);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event) => {
            if (event === "SIGNED_IN") {
                router.refresh();
                onClose();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, onClose]);

    // Handle dialog open state change
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    const getTitle = () => {
        switch (view) {
            case 'sign_in': return 'Welcome Back';

            default: return 'Join the Revolution';
        }
    };

    const getDescription = () => {
        switch (view) {
            case 'sign_in': return 'Enter your credentials to access your account';

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
                        <Auth
                            supabaseClient={supabase}
                            view={view as any} // Cast to any because we extended types but Auth component might strictly type check
                            appearance={{
                                theme: ThemeSupa,
                                variables: {
                                    default: {
                                        colors: {
                                            brand: 'transparent', // We override this with tailored classes
                                            brandAccent: 'transparent',
                                        },
                                        space: {
                                            inputPadding: '12px',
                                            buttonPadding: '12px',
                                        },
                                        borderWidths: {
                                            buttonBorderWidth: '0px',
                                            inputBorderWidth: '1px',
                                        },
                                        radii: {
                                            borderRadiusButton: '8px',
                                            buttonBorderRadius: '8px',
                                            inputBorderRadius: '8px',
                                        },
                                    },
                                },
                                className: {
                                    container: 'flex flex-col gap-4',
                                    button: 'w-full px-4 py-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]',
                                    input: 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 focus:border-purple-500/50 focus:bg-white dark:focus:bg-white/10 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200',
                                    label: 'text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 ml-1',
                                    loader: 'text-purple-500',
                                    anchor: 'text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors text-sm font-medium underline-offset-4 hover:underline',
                                    divider: 'bg-slate-200 dark:bg-white/10 my-4',
                                    message: 'text-red-500 dark:text-red-400 text-sm mt-1 bg-red-50 dark:bg-red-500/10 p-2 rounded border border-red-200 dark:border-red-500/20',
                                }
                            }}
                            theme={authTheme}
                            providers={[]}
                            magicLink
                            showLinks={false}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
