/**
 * @desc App Schema
 */

import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, { message: 'First name Required' }).max(32, { message: 'Max 32' }),
  lastName: z.string().min(1, { message: 'First name Required' }).max(32, { message: 'Max 32' }),
  age: z.string().min(1, { message: 'First name Required' }).max(32, { message: 'Max 32' }),
  sex: z.string().min(1, { message: 'First name Required' }).max(32, { message: 'Max 32' }),
  nickName: z.string().min(1, { message: 'First name Required' }).max(32, { message: 'Max 32' }),
  telephoneNumber: z
    .string()
    .min(1, { message: 'First name Required' })
    .max(32, { message: 'Max 32' }),
});

export type UserType = z.infer<typeof UserSchema>;
