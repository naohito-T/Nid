import { z } from 'zod';
import { ICommonSchema } from './_common';

export const AddressSchema = ICommonSchema.extend({
  zipCode: z.string().min(1).max(32),
  prefecture: z.string().min(1).max(32),
  city: z.string().min(1).max(32),
  street: z.string().min(1).max(32),
  building: z.string().optional(),
})
  .strict()
  .transform(async ({ id, createdAt, updatedAt, zipCode, prefecture, city, street, building }) => ({
    id,
    createdAt,
    updatedAt,
    zipCode,
    prefecture,
    city,
    street,
    building,
  }));

export type Address = z.infer<typeof AddressSchema>;
