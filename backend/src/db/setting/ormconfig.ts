const A = {
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

export default A;
