import { z } from 'zod';

export const SignValueScheme = z.object({
  email: z
    .string()
    .min(1, { message: 'Required email' })
    .email({ message: 'emailの形式ではありません。' })
    .max(50),
  password: z.string().min(1, { message: 'Required password' }).max(50),
});

// .parseAsync()
// .refine()や.transform()を使った非同期スキーマを検証する場合、.parseAsync()を使って検証する必要があります。
// Zod には、検証した値を別の値に変換するTransformerという機能がある。

export type SignValue = z.infer<typeof SignValueScheme>;
