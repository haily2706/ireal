"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Users,
    Baby,
    GraduationCap,
    FileText,
    Menu,
    X,
    Bell,
    Search,
    User as UserIcon,
    LogOut,
    Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@/lib/data";

const landingLinks = [
    { name: "How it Works", href: "/#how-it-works" }, // Absolute paths for cross-page nav
    { name: "Features", href: "/#features" },
    { name: "Wallet", href: "/#hbar-wallet" },
    { name: "Gifts", href: "/#gifts" },
    { name: "Stories", href: "/#testimonials" },
    { name: "Pricing", href: "/#pricing" },
];

const appLinks = [
    { name: "Home", href: "/home" },
    { name: "Explore", href: "/explore" },
];

interface NavbarProps {
    mode?: "landing" | "app";
}

export function Navbar({ mode = "landing" }: NavbarProps) {
    const pathname = usePathname();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const navLinks = mode === "landing" ? landingLinks : appLinks;

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    // Handle scroll spy for landing mode
    useEffect(() => {
        if (mode !== "landing") return;

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
            // Check if href is an anchor link (contains #)
            if (link.href.includes("#")) {
                // Extract the id part
                const id = link.href.split('#')[1];
                const section = document.getElementById(id);
                if (section) observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, [mode, navLinks]);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-2">
                    {/* Logo */}
                    <Link href={mode === "landing" ? "/" : "/home"} className="flex items-center gap-2">
                        <Image
                            src="/logo.svg"
                            alt="iReal Logo"
                            width={180}
                            height={40}
                            className="h-12 w-auto hover:opacity-80 transition-opacity"
                            priority
                        />
                    </Link>

                    {/* Desktop Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => {
                            const isActive = link.href.includes("#")
                                ? activeSection === `#${link.href.split('#')[1]}`
                                : pathname === link.href;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-sm font-medium transition-colors ${isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
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

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex items-center gap-4">
                        {mode === "landing" ? (
                            <>
                                <Button
                                    variant="ghost"
                                    className="hover:text-pink-500 hover:bg-pink-500/10 active:scale-95 transition-all"
                                >
                                    Sign In
                                </Button>
                                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/20 active:scale-95 transition-all">
                                    Sign Up
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className="relative hidden md:block">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="search"
                                        placeholder="Search..."
                                        className="h-9 w-64 rounded-md border border-input bg-background/50 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                                    />
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <Bell className="h-5 w-5" />
                                </Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="relative h-9 w-9 rounded-full border"
                                        >
                                            <Image
                                                src={currentUser.avatar}
                                                alt={currentUser.name}
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {currentUser.name}
                                                </p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {currentUser.username}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <UserIcon className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        )}
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
                </div>
            </header>

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
                                width={160}
                                height={40}
                                className="h-10 w-auto"
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
                                const isActive = link.href.includes("#")
                                    ? activeSection === `#${link.href.split('#')[1]}`
                                    : pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-lg font-medium transition-colors ${isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-auto space-y-4 border-t pt-6">
                            {mode === "landing" ? (
                                <>
                                    <Button
                                        className="w-full h-12 text-lg hover:text-pink-500 hover:bg-pink-500/10"
                                        variant="outline"
                                    >
                                        Sign In
                                    </Button>
                                    <Button className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/20">
                                        Sign Up
                                    </Button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {/* Mobile App specific controls could go here if needed */}
                                    <p className="text-muted-foreground">Signed in as {currentUser.name}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
