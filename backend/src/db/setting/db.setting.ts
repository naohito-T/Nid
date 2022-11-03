import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User, UserAddress, UserAuthentication, Terms } from '@/db/entity';

// @see https://zenn.dev/ebaryo/articles/ac6f38140218df
// @see https://kenjimorita.jp/no-changes-in-database-schema-were-found-cannot-generate-a-migration-to-create-a-new-empty-migration-use-typeorm-migrationcreate-command/
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASS,
  // database: process.env.TYPEORM_DB,
  database: 'nid',
  // マイグレーションファイルの作成と実行を自動化する（本番NG）
  synchronize: false,
  logging: true,
  // entities: [User],
  entities: [User, UserAddress, UserAuthentication, Terms],
  // entities: [User, UserAddress, UserAuth, UserRole],
  migrations: ['src/db/migration/*.ts'],
  // subscribers: [],
});

// @see https://typeorm.io/multiple-data-sources#using-multiple-data-source
// const db2DataSource = new DataSource({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'admin',
//   database: 'db2',
//   entities: [__dirname + '/entity/*{.js,.ts}'],
//   synchronize: true,
// });
