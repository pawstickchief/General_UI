import { z } from 'zod';

export const UserApiResponseSchema = z.object({
    message: z.string(),
    code: z.number().optional(),
    success: z.boolean().optional(),
    details: z.unknown().optional(),
    data: z.unknown().optional()
}).passthrough();

export type UserApiResponse = z.infer<typeof UserApiResponseSchema>;
