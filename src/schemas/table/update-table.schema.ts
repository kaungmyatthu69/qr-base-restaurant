import { z } from 'zod';
import { createTableSchema } from './create-table.schema';

export const updateTableSchema = createTableSchema.partial();

export type UpdateTableDTO = z.infer<typeof updateTableSchema>;
