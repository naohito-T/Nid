import type { z } from 'zod';

/**
 * @see https://zenn.dev/ynakamura/articles/65d58863563fbc
 */
const checkSchema =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

export * from './user';
export * from './header';
export * from './sign-flow';
export * from './sign-value';
export * from './tmp-token';
export * from './error';
