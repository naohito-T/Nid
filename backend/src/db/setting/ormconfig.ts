/**
 * @desc typeorm-seeder用のconfigファイル
 * @see https://www.npmjs.com/package/typeorm-seeding#cli-options
 * @see https://stackoverflow.com/questions/72057915/seed-permanent-data-in-typeorm-v-0-3-6-with-datasource
 * @NOTE リファレンスを見てもらえばわかるが、DateSourceには現時点では対応していない（ver 0.3）
 * defaultでormconfig.jsを読み込むため
 */

const SeederConfig = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASS,
  database: process.env.TYPEORM_DB,
  entities: ['src/db/entity/**/*.ts'],
  seeds: ['src/__tests__/seeds/**/*{.ts,.js}'],
  factories: ['src/__tests__/factories/**/*{.ts,.js}'],
};

export default SeederConfig;
