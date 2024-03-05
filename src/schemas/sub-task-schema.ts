import { z } from 'zod';

export const SubtaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title should be at least 1 characters long' })
    .max(32, { message: 'Title should be max 32 characters long' }),
  description: z.optional(
    z
      .string()
      .max(64, { message: 'Description should be max 64 characters long' })
  ),
});
