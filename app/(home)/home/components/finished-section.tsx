"use client";

import Image from "next/image";
import Link from "next/link";
import { FinishedEvent } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Eye, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FinishedSectionProps {
    events: FinishedEvent[];
    title?: string;
}

export function FinishedSection({ events, title = "Just Finished" }: FinishedSectionProps) {
    if (events.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-orange-500 to-red-500 w-fit">{title}</h2>
                    <p className="text-sm text-muted-foreground">Catch up on what you missed</p>
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
                        <Link href={`/watch/${event.id}`} className="block relative aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 group-hover:-translate-y-1">
                            <Image
                                src={event.thumbnail}
                                alt={event.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale-30 group-hover:grayscale-0"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />

                            {/* Center Play Icon */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                                <PlayCircle className="h-12 w-12 text-white drop-shadow-lg" />
                            </div>

                            {/* Duration Badge */}
                            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-medium rounded-sm">
                                {event.duration}
                            </div>

                            {/* Ended Badge */}
                            <div className="absolute top-2 left-2 flex gap-2">
                                <div className="bg-orange-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center shadow-lg gap-1.5">
                                    <Clock className="h-3 w-3" />
                                    Ended {event.endedAt}
                                </div>
                            </div>
                        </Link>

                        {/* Info Section */}
                        <div className="flex gap-3 px-1">
                            <Link href={`/channel/${event.channel.username}`} className="shrink-0">
                                <div className="p-0.5 rounded-full bg-linear-to-tr from-orange-400 to-red-600">
                                    <Avatar className="h-9 w-9 border-2 border-background">
                                        <AvatarImage src={event.channel.avatar} />
                                        <AvatarFallback>{event.channel.name[0]}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </Link>

                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h3 className="font-semibold text-base line-clamp-1 leading-tight group-hover:text-orange-500 transition-colors">
                                    {event.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <Link href={`/channel/${event.channel.username}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                        {event.channel.name}
                                    </Link>
                                    <span className="text-[10px] text-muted-foreground">•</span>
                                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                        <Eye className="h-3 w-3" />
                                        {event.views} views
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
