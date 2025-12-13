"use client";

import Image from "next/image";
import Link from "next/link";
import { UpcomingEvent } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface UpcomingSectionProps {
    events: UpcomingEvent[];
    title?: string;
}

export function UpcomingSection({ events, title = "Upcoming Events" }: UpcomingSectionProps) {
    if (events.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-cyan-500 w-fit">{title}</h2>
                    <p className="text-sm text-muted-foreground">Don't miss out on these future streams</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative flex flex-col gap-3"
                    >
                        {/* Thumbnail Container */}
                        <div className="block relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-muted">
                            <Image
                                src={event.thumbnail}
                                alt={event.title}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                            {/* Scheduled Badge */}
                            <div className="absolute top-2 left-2 flex gap-2">
                                <div className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center shadow-lg gap-1.5">
                                    <Calendar className="h-3 w-3" />
                                    {event.scheduledFor}
                                </div>
                            </div>

                            {/* Remind Me Button */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button size="sm" variant="secondary" className="font-semibold shadow-xl">
                                    <Bell className="h-4 w-4 mr-2" />
                                    Remind Me
                                </Button>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex gap-3 px-1">
                            <Link href={`/channel/${event.channel.username}`} className="shrink-0">
                                <div className="p-0.5 rounded-full bg-linear-to-tr from-blue-400 to-cyan-600">
                                    <Avatar className="h-9 w-9 border-2 border-background">
                                        <AvatarImage src={event.channel.avatar} />
                                        <AvatarFallback>{event.channel.name[0]}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </Link>

                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h3 className="font-semibold text-base line-clamp-1 leading-tight group-hover:text-blue-500 transition-colors">
                                    {event.title}
                                </h3>
                                <Link href={`/channel/${event.channel.username}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-0.5 flex items-center gap-1">
                                    {event.channel.name}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
