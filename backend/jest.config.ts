import type { Config } from '@jest/types';
/**
 * @NOTE jestはデフォルトでは複数のテストファイルを並行実行する仕様になっているため、
 *       もしプロジェクトに複数のテストファイルを用意していてかつその全てのファイルが同じDBに接続するような状況ではエラーを起こしてしまう。
 *       今後ファイルが増えて複数のテストファイルがテスト用のDBに接続するような状況になった時
 *       --runInBandオプションをわたして逐次実行（ファイルを一つずつ順に実行していく処理）に切り替えたほうが良い
 */

/**
 * @desc Test高速化としてesbuildを使用している。
 */
const config: Config.InitialOptions = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  moduleNameMapper: {
    // Mentioned for Alias import
    '@/(.*)$': '<rootDir>/src/$1',
    '~/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
};

export default config;
