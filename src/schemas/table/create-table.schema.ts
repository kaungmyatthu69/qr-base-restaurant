import { z } from 'zod';
export const createTableSchema = z
  .object({
    capacity: z.number(),
    status: z.string(),
  })
  .required();

export type CreateTableDTO = z.infer<typeof createTableSchema>;
