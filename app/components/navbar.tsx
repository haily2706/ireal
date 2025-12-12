"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Users, Baby, GraduationCap, FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
    // { name: "Home", href: "" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Gifts", href: "#gifts" },
    { name: "Stories", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
];

export function Navbar() {
    const pathname = usePathname();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    // Handle scroll spy
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -35% 0px",
                threshold: 0,
            }
        );

        navLinks.forEach((link) => {
            if (link.href.startsWith("#")) {
                const section = document.querySelector(link.href);
                if (section) observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link, index) => {
                    const isActive = link.href.startsWith("#")
                        ? activeSection === link.href
                        : pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`relative text-sm font-medium transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {link.name}
                            {(hoveredIndex === index || (isActive && hoveredIndex === null)) && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="hidden md:flex items-center gap-4">
                <Button variant="ghost" className="hover:text-pink-500 hover:bg-pink-500/10 active:scale-95 transition-all">
                    Sign In
                </Button>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/20 active:scale-95 transition-all">
                    Sign Up
                </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex md:hidden flex-1 justify-end">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-3xl p-6 md:hidden"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <Image
                                src="/logo.svg"
                                alt="iReal Logo"
                                width={120}
                                height={40}
                                className="h-8 w-auto"
                            />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="h-6 w-6" />
                                <span className="sr-only">Close menu</span>
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link) => {
                                const isActive = link.href.startsWith("#")
                                    ? activeSection === link.href
                                    : pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-lg font-medium transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>



                        <div className="mt-auto space-y-4 border-t pt-6">
                            <Button className="w-full h-12 text-lg hover:text-pink-500 hover:bg-pink-500/10" variant="outline">
                                Sign In
                            </Button>
                            <Button className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/20">
                                Sign Up
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
