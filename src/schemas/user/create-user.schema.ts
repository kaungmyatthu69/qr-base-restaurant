import { z } from 'zod';
import { Role } from '@prisma/client';

export const createUserSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    role: z.enum(Role),
  })
  .required();

export type CreateUserDTO = z.infer<typeof createUserSchema>;
