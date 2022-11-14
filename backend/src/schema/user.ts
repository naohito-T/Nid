import { z } from 'zod';
import { User, SexType } from '@/db/entity';

export const UserSchema = z.object({
  id: z.string(),
  // @WORKAROUND フロントでparseしているが一応入れるか。エラーメッセージを入れる。
  firstName: z.string().min(1, { message: 'First name Required' }).max(32, { message: 'Max 32' }),
  // @WORKAROUND フロントでparseしているが一応入れるか。エラーメッセージを入れる。
  lastName: z.string().min(1, { message: 'Last name Required' }).max(32, { message: 'Max 32' }),
  age: z.string().min(1, { message: 'First name Required' }).max(32, { message: 'Max 32' }),
  // @TODO enumで default none
  // sex: z.enum([SexType.female, SexType.male]).optional()
  nickName: z.string().min(1, { message: 'First name Required' }).max(32, { message: 'Max 32' }),
  telephoneNumber: z
    .string()
    .min(1, { message: 'First name Required' })
    .max(32, { message: 'Max 32' }),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
