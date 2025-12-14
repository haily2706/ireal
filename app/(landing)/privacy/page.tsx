
import { Footer } from "@/app/(landing)/components/footer";

export default function PrivacyPage() {
    return (
        <>
            <div className="flex-1 container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
                        <p className="text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">1. Introduction</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Welcome to LiveReal ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            When you visit our website LiveReal.com and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We collect personal information that you voluntarily provide to us when registering at the Services expressing an interest in obtaining information about us or our products and services, when participating in activities on the Services or otherwise contacting us.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Name and Contact Data (email address, phone number, etc.)</li>
                            <li>Credentials (passwords, hints, and security information)</li>
                            <li>Payment Data (credit card numbers, security codes associated with your payment instrument)</li>
                            <li>Social Media Login Data (like your Facebook or Google account details)</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">4. Sharing Your Information</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">5. Contact Us</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If you have any questions or comments about this policy, you may email us at support@livereal.com.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
