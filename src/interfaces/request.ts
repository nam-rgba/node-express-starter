import z from "zod";

export const BaseQuerySchema = z.object({
    page: z.coerce.number().min(1),
    limit: z.coerce.number().min(1).max(100),
    search: z.string().optional(),
})

