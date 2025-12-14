
import { Footer } from "@/app/(landing)/components/footer";
import { Mail, MessageCircle, FileQuestion } from "lucide-react";

export default function SupportPage() {
    return (
        <>
            <div className="flex-1 container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight">Support Center</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            We're here to help. Find answers to common questions or get in touch with our team.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <section className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-full text-primary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-semibold">Contact Us</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                Need direct assistance? Send us an email and we'll get back to you as soon as possible.
                            </p>
                            <div className="pt-2">
                                <a
                                    href="mailto:support@livereal.com"
                                    className="text-primary hover:underline font-medium text-lg"
                                >
                                    support@livereal.com
                                </a>
                            </div>
                        </section>

                        <section className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-full text-primary">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-semibold">Community</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                Join our community discussion to share ideas, report bugs, or request features.
                            </p>
                            <div className="pt-2">
                                <a
                                    href="https://discord.gg/livereal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline font-medium text-lg"
                                >
                                    Join our Discord
                                </a>
                            </div>
                        </section>
                    </div>

                    <section className="space-y-6">
                        <div className="flex items-center gap-3 border-b pb-4">
                            <FileQuestion className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">How do I reset my password?</h3>
                                <p className="text-muted-foreground">
                                    You can reset your password by clicking the "Forgot Password" link on the login page. Follow the instructions sent to your email to create a new password.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Is LiveReal free to use?</h3>
                                <p className="text-muted-foreground">
                                    Yes, LiveReal is free to download and use. We also offer premium features and subscriptions for enhanced experiences.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">How can I delete my account?</h3>
                                <p className="text-muted-foreground">
                                    You can request account deletion through the app settings or by contacting our support team at support@livereal.com.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
