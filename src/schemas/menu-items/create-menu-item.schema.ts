import { z } from 'zod';

export const MenuSize = z.enum(['S', 'M', 'L']);
export const createMenuItemSchema = z.object({
  name: z.string(),
  price: z.preprocess((val) => (val ? Number(val) : undefined), z.number()),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  imagePublicId: z.string().optional(),
  size: z.preprocess(
    (val) => (typeof val === 'string' ? JSON.parse(val) : undefined),
    z.array(MenuSize).optional(),
  ),
  categories: z
    .preprocess(
      (val) => (typeof val === 'string' ? JSON.parse(val) : undefined),
      z.array(z.number()),
    )
    .optional(),
});

export type CreateMenuItemDTO = z.infer<typeof createMenuItemSchema>;
