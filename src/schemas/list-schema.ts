import { isValidHexColor } from '@/helpers';
import { z } from 'zod';

export const ListSchema = z.object({
  name: z.string().min(1).max(64),
  color: z.string().refine((value) => isValidHexColor(value), {
    message: 'Invalid hex color format',
  }),
});
