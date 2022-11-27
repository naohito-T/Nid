import { Entity, Column } from 'typeorm';
import { BaseUProperties } from './_base';

const ServiceComments = {
  name: '外部apiクライアントサービス名',
  publicKey:
    '公開鍵（JWtの署名に使う→アクセストークンを使うサーバは JWT の署名に使われた公開鍵を使って、そのアクセストークンが正当なものかどうかを検証できます。',
  privateKey: '秘密鍵',
  accessToken: 'サービス群に必要なアクセストークン',
} as const;

/**
 * @desc このapiを利用するサービス群のマスターテーブル
 */
@Entity('services')
export class Service extends BaseUProperties {
  @Column('varchar', { name: 'name', unique: true, comment: ServiceComments.name })
  name: string;

  @Column('varchar', {
    name: 'public_key',
    length: 512,
    unique: true,
    comment: ServiceComments.privateKey,
  })
  publicKey: string;

  @Column('varchar', {
    name: 'private_key',
    length: 512,
    unique: true,
    comment: ServiceComments.privateKey,
  })
  privateKey: string;

  @Column('varchar', {
    name: 'access_token',
    length: 512,
    unique: true,
    comment: ServiceComments.accessToken,
  })
  accessToken: string;
}
