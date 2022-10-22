import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '@/db/entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT as unknown as number,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASS,
  // database: process.env.TYPEORM_DB,
  database: 'test',
  // 都度migrationをかけてくれる？開発用。
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ['db/migrations/*.ts'],
  subscribers: [],
});

/**
 * TODO 分ける必要があるのかな..
 */
export const AppTestDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT as unknown as number,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASS,
  // database: process.env.TYPEORM_DB,
  database: 'test',
  // 都度migrationをかけてくれる？開発用。
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ['db/migrations/*.ts'],
  subscribers: [],
});
