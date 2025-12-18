import { z } from "zod";

export const createEventSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
    description: z.string().optional(),
    startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start time",
    }),
    endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid end time",
    }),
    isLive: z.boolean().default(false).optional(),
    thumbnailUrl: z.string().url().optional().or(z.literal("")),
}).refine((data) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    return end > start;
}, {
    message: "End time must be after start time",
    path: ["endTime"],
});

export type CreateEventSchema = z.infer<typeof createEventSchema>;
