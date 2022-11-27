import { z } from 'zod';
import { createHashedValue } from '@/libs/hash';

export const SignValueScheme = z
  .object({
    email: z.string().email().min(1).max(50),
    password: z.string().min(1).max(50),
  })
  .strict() // 余分なプロパティがある場合にerrorを出力する。
  .transform(async ({ email, password }) => ({
    email,
    password: await createHashedValue(password), // TODO 暗号化する。
  }));

// .parseAsync()
// .refine()や.transform()を使った非同期スキーマを検証する場合、.parseAsync()を使って検証する必要があります。
// Zod には、検証した値を別の値に変換するTransformerという機能がある。

export type SignValue = z.infer<typeof SignValueScheme>;

// .refine：カスタムバリデーション
// 独自のバリデーションロジックを実装したい場合は .refine メソッドを使う。

// const myString = z.string().refine((val) => val.length <= 255, {
//   message: "String can't be more than 255 characters",
// });
// （コードは公式ドキュメントより引用）

// .transform：パースした値の変換
