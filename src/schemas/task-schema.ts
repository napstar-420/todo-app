import { z } from 'zod';

export const TaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Task title should be at least 1 character long' })
    .max(64, { message: 'Task title should be max 64 characters long' }),
  description: z
    .string()
    .min(1, { message: 'Task description should be at least 1 character long' })
    .max(256, {
      message: 'Task description should be max 256 characters long',
    }),
  dueDate: z
    .string({ required_error: 'Due date is required' })
    .datetime({ message: 'Invalid due date' }),
});
