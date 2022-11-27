import { runSeeder, tearDownDatabase, useRefreshDatabase, useSeeding } from 'typeorm-seeding';

import { CreateUsersSeed } from '@/__tests__/seeds/user.seed';

beforeEach(async () => {
  //DBに接続＆内部のデータをクリア
  await useRefreshDatabase();
  //プロジェクト内のfactoryをロードする
  await useSeeding();
  //シーダーを実行する
  await runSeeder(CreateUsersSeed);
});

afterAll(async () => {
  //DBとの接続を終了する
  await tearDownDatabase();
});

describe('test', () => {
  //テストコードを記述
});
