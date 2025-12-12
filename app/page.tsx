
import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { HeroSection } from "@/app/components/hero-section";
import { HowItWorks } from "@/app/components/how-it-works";
import { FeaturesSection } from "@/app/components/features-section";
import { GiftGallery } from "@/app/components/gift-gallery";
import { Testimonials } from "@/app/components/testimonials";
import { PricingSection } from "@/app/components/pricing-section";
import { CTASection } from "@/app/components/cta-section";
import { Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <BackgroundBlobs />

      <div className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* How It Works */}
        <HowItWorks />

        {/* Features */}
        <FeaturesSection />

        {/* Gift Gallery */}
        <GiftGallery />

        {/* Testimonials */}
        <Testimonials />

        {/* Pricing */}
        <PricingSection />

        {/* CTA */}
        <CTASection />
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Copyright */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">iReal</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} iReal. All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com/ireal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-all hover:text-pink-500 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/ireal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-all hover:text-blue-400 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com/@ireal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-all hover:text-red-500 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link
                href="/privacy"
                className="transition-colors hover:text-foreground hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-foreground hover:underline"
              >
                Terms
              </Link>
              <Link
                href="/support"
                className="transition-colors hover:text-foreground hover:underline"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

