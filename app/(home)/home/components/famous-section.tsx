"use client";

import Image from "next/image";
import Link from "next/link";
import { FamousPerson } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Star, UserPlus } from "lucide-react";
import { useState } from "react";

interface FamousSectionProps {
    people: FamousPerson[];
    title?: string;
}

export function FamousSection({ people, title = "Famous Creators" }: FamousSectionProps) {
    if (people.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-amber-600 w-fit">{title}</h2>
                    <p className="text-sm text-muted-foreground">Follow the stars of the community</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {people.map((person, index) => (
                    <FamousCard key={person.id} person={person} index={index} />
                ))}
            </div>
        </div>
    );
}

function FamousCard({ person, index }: { person: FamousPerson; index: number }) {
    const [isFollowing, setIsFollowing] = useState(person.isFollowing);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            {/* Cover Image */}
            <div className="h-24 relative bg-muted">
                <Image
                    src={person.coverImage}
                    alt="Cover"
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
            </div>

            {/* Avatar & Content */}
            <div className="px-5 pb-5 pt-0 relative flex flex-col items-center -mt-10 space-y-3">
                <Link href={`/channel/${person.username}`}>
                    <div className="p-1 rounded-full bg-background relative inline-block">
                        <Avatar className="h-20 w-20 border-4 border-background shadow-md">
                            <AvatarImage src={person.avatar} />
                            <AvatarFallback>{person.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-1 right-1 bg-yellow-400 text-white rounded-full p-1 border-2 border-background" title="Verified">
                            <Star className="h-3 w-3 fill-white" />
                        </div>
                    </div>
                </Link>

                <div className="text-center space-y-1 w-full">
                    <Link href={`/channel/${person.username}`} className="block">
                        <h3 className="font-bold text-lg hover:underline truncate px-2">{person.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground font-medium">{person.username}</p>
                    <Badge variant="secondary" className="mt-1 bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
                        {person.followerCount} Followers
                    </Badge>
                </div>

                <p className="text-xs text-center text-muted-foreground line-clamp-2 h-8 w-full px-2">
                    {person.description}
                </p>

                <Button
                    className={`w-full rounded-full transition-all duration-300 ${isFollowing ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                    variant={isFollowing ? "secondary" : "default"}
                    onClick={() => setIsFollowing(!isFollowing)}
                    size="sm"
                >
                    {isFollowing ? (
                        <>
                            <Check className="h-4 w-4 mr-2" /> Following
                        </>
                    ) : (
                        <>
                            <UserPlus className="h-4 w-4 mr-2" /> Follow
                        </>
                    )}
                </Button>
            </div>
        </motion.div>
    );
}
