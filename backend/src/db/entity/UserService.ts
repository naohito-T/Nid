import { Entity, JoinColumn, CreateDateColumn, Column, OneToOne } from 'typeorm';
import { User } from './User';
import { BaseIProperties } from './_base';

const UserAddressComment = {
  version: '利用規約の最新versionを保持する（時間orTimeStamp）',
} as const;

/**
 * @desc userが利用しているサービス群
 */
@Entity('user_services')
export class UserService extends BaseIProperties {
  @Column('varchar', { name: 'user_id' })
  readonly userId: string;
  // @JoinColumnデコレーターはリレーションの一方の側でのみ使用する必要があることに注意してください。このデコレーターをどちら側に配置しても、関係の所有側になります。リレーションシップの所有側には、データベース内の外部キーを持つ列が含まれています。
  @OneToOne(() => User, (user) => user.hasTermsVersion) // relationを表現している。
  @JoinColumn({ name: 'userId' }) // userIdがforeignキーとなることを表す。
  user: User;
}
