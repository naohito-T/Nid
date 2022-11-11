import type { extname } from 'path';
import { z, ZodError } from 'zod';
import type { User } from '~/schema';
import { UserSchema } from '~/schema';

// ノイズを削除したり（空白・HTML）
// validationしてシリアライズ化する。
const schema = z.object({
  str: z.string(),
});

// 値を検証する
try {
  const ok = schema.parse({ str: '' });
  const throw_error = schema.parse({ str: 0 });
} catch (err: unknown) {
  // 検証に失敗するとエラーが投げられます。
  console.error(err);
  /*
    // エラーオブジェクトの内容👇
    [
      {
        "code": "invalid_type", // エラータイプ
        "expected": "string",   // 期待した型
        "received": "number",   // 受け取った値の型
        "path": [ "str" ],      // エラーが発生したプロパティへのパス
        "message": "Expected string, received number" // エラー内容
      }
    ]
  */
}

// export const validationSingUp = (user: User) => {
//   UserSchema.parse();
// };

/**
 * @desc validationした後、整形する。
 */
// const schema = z
//   .object({
//     email: z.string().min(1, { message: 'Required' }),
//     password: z.string().min(1, { message: 'Required' }),
//   })
//   .transform((t) => {
//     console.log(`t.email${t.email}`);
//     console.log(`t.password${t.password}`);
//     return {
//       ...t,
//     };
//   });

/**
 * @desc validationと整形が組み合わさっているものをwrapし検証するmethod
 */
const checkValidation = <V>(value: V): V => {
  try {
    return value.parse();
  } catch (e: unknown) {
    throw new Error('validation error');
  }
};
