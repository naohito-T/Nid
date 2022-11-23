import { Entity, JoinColumn, CreateDateColumn, Column, OneToOne } from 'typeorm';
import { User } from './User';
import { BaseIProperties } from './_base';

const UserAddressComment = {
  version: '利用規約の最新versionを保持する（時間orTimeStamp）',
} as const;

/**
 * @desc 外部クライアントの権限
 * - read
 * - search（readと一緒じゃね？）
 * - write
 *
 */
@Entity('service_permissions')
export class ServicePermission extends BaseIProperties {
  @Column('varchar', { name: 'public_key', length: 512 })
  publicKey: string;

  @Column('varchar', { name: 'private_key', length: 512 })
  privateKey: string;

  @Column('varchar', { name: 'access_token', length: 512 })
  accessToken: string;
}
