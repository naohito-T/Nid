import { z } from 'zod';
import { ICommonSchema } from './_common';
import { validationMessages as V } from '@/libs/validations';

export const AddressSchema = ICommonSchema.extend({
  zipCode: z.string().min(1, { message: V.min }).max(32, { message: V.max32 }),
  prefecture: z.string().min(1, { message: V.min }).max(32, { message: V.max32 }),
  city: z.string().min(1, { message: V.min }).max(32, { message: V.max32 }),
  street: z.number().optional().default(0),
  building: z.string().min(1, { message: V.min }).max(32, { message: V.max32 }),
})
  .strict()
  .transform(async ({ id, createdAt, updatedAt, prefecture, city, street, building }) => ({
    id,
    createdAt,
    updatedAt,
    prefecture,
    city,
    street,
    building,
  }));

export type Address = z.infer<typeof AddressSchema>;
