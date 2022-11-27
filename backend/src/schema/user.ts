import { z } from 'zod';
import { UCommonSchema } from './_common';
import { Address } from './address';
import { Term } from './term';

export const UserSchema = UCommonSchema.extend({
  firstName: z.string().min(1).max(32),
  lastName: z.string().min(1).max(32),
  birthDate: z.string().min(1).max(32),
  sex: z.number().optional().default(0),
  nickName: z.string().min(1).max(32),
  telephoneNumber: z.string().min(1).max(32),
  email: z.string().min(1).max(50).email(),
  thumbnailUrl: z.string().nullable(),
  userAddress: z.array(z.object({})).nullable(),
  userAuthentication: z.array(z.object({}).nullable()),
  hasTermsVersion: z.string().min(1).max(32).nullable(),
})
  .strict()
  .transform(
    async ({
      id,
      createdAt,
      updatedAt,
      firstName,
      lastName,
      birthDate,
      sex,
      nickName,
      telephoneNumber,
      email,
      thumbnailUrl,
      userAddress,
      userAuthentication,
      hasTermsVersion,
    }) => ({
      id,
      createdAt,
      updatedAt,
      firstName,
      lastName,
      birthDate,
      sex,
      nickName,
      telephoneNumber,
      email,
      thumbnailUrl: thumbnailUrl ?? null,
      userAddress: userAddress.length === 0 ? null : userAddress,
      userAuthentication,
      hasTermsVersion: hasTermsVersion ?? null,
    }),
  );

export type User = z.infer<typeof UserSchema>;

// WORKAROUND とりあえずだが変数名思いついたら変える。
export type RelationUser = {
  user: User;
  address: Address | null;
  terms: Term | null;
};
