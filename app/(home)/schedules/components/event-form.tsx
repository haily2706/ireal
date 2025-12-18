"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema, CreateEventSchema } from "../schema";
import { createEvent, updateEvent } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EventFormProps {
    initialData?: CreateEventSchema & { id: string };
    isEditing?: boolean;
    onSuccess?: () => void;
}

export function EventForm({ initialData, isEditing = false, onSuccess }: EventFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<CreateEventSchema>({
        resolver: zodResolver(createEventSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            startTime: "",
            endTime: "",
            isLive: false,
            thumbnailUrl: "",
        },
    });

    function onSubmit(values: CreateEventSchema) {
        startTransition(() => {
            const action = isEditing && initialData
                ? updateEvent(initialData.id, values)
                : createEvent(values);

            action
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    } else {
                        toast.success(isEditing ? "Event updated" : "Event created");
                        if (onSuccess) {
                            onSuccess();
                        } else {
                            router.push("/schedules");
                        }
                    }
                })
                .catch(() => toast.error("Something went wrong"));
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Title</FormLabel>
                            <FormControl>
                                <Input placeholder="My Awesome Stream" {...field} disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="What's this event about?" {...field} disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                    <Input type="datetime-local" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Time</FormLabel>
                                <FormControl>
                                    <Input type="datetime-local" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="thumbnailUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thumbnail URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} disabled={isPending} />
                            </FormControl>
                            <FormDescription>Optional URL for event thumbnail.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isLive"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Go Live Immediately</FormLabel>
                                <FormDescription>
                                    Mark this event as currently live.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={isPending}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    {isEditing ? "Update Event" : "Create Event"}
                </Button>
            </form>
        </Form>
    );
}
