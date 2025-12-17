import { z } from 'zod';
import { createMenuItemSchema } from './create-menu-item.schema';

export const updateMenuItemSchema = createMenuItemSchema.partial();

export type UpdateMenuItemDto = z.infer<typeof updateMenuItemSchema>;
