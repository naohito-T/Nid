import { DataSource } from 'typeorm';
import { User, UserAddress, UserAuthentication, Term } from '@/db/entity';

/**
 * @see https://zenn.dev/ebaryo/articles/ac6f38140218df
 * @see https://kenjimorita.jp/
 * @see https://typeorm.io/multiple-data-sources#using-multiple-data-source
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  // host: 'localhost',
  // port: 15432,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASS,
  database: process.env.TYPEORM_DB,
  // マイグレーションファイルの作成と実行を自動化する（本番NG）
  synchronize: false,
  logging: true,
  entities: [User, UserAddress, UserAuthentication, Term],
  migrations: ['src/db/migration/*.ts'],
});

// export const TestDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.TYPEORM_HOST,
//   port: Number(process.env.TYPEORM_PORT),
//   username: process.env.TYPEORM_USER,
//   password: process.env.TYPEORM_PASS,
//   database: 'nid-test',
//   synchronize: false,
//   logging: true,
//   entities: [User, UserAddress, UserAuthentication, Term],
//   migrations: ['src/db/migration/*.ts'],
// });
