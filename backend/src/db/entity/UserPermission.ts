import { Entity, JoinColumn, CreateDateColumn, Column, OneToOne } from 'typeorm';
import { User } from './User';
import { BaseIProperties } from './_base';

const UserAddressComment = {
  version: '利用規約の最新versionを保持する（時間orTimeStamp）',
} as const;

/**
 * @desc userのpermission
 * 連携していない時は読み込みの権限
 * 連携して場合は書き込みも与えられる。
 *
 */
@Entity('user_permissions')
export class UserPermission extends BaseIProperties {
  @Column('varchar', { name: 'public_key', length: 512 })
  publicKey: string;

  @Column('varchar', { name: 'private_key', length: 512 })
  privateKey: string;

  @Column('varchar', { name: 'access_token', length: 512 })
  accessToken: string;
}
