import { Entity, JoinColumn, CreateDateColumn, Column, OneToOne } from 'typeorm';
import { User } from './User';
import { BaseIProperties } from './_base';

const UserAddressComment = {
  version: '利用規約の最新versionを保持する（時間orTimeStamp）',
} as const;

/**
 * @desc 利用規約version管理テーブル
 *       新規のTermsが作成されるたびにversionが作成される。
 *       users tableでは同意されているversionが格納される。
 *       管理画面では下書き作成がいいかも
 *       削除はできないように
 */
@Entity('terms')
export class Terms extends BaseIProperties {
  @CreateDateColumn({ type: 'timestamp', precision: 3, comment: UserAddressComment.version })
  terms_version: Date;

  @Column()
  readonly user_id: string;
  // @JoinColumnデコレーターはリレーションの一方の側でのみ使用する必要があることに注意してください。このデコレーターをどちら側に配置しても、関係の所有側になります。リレーションシップの所有側には、データベース内の外部キーを持つ列が含まれています。
  @OneToOne(() => User, (user) => user.has_terms_version) // relationを表現してい
  @JoinColumn({ name: 'user_id' }) // userIdがforeignキーとなることを表す。
  user: User;

  constructor(userId: string) {
    super();
    this.user_id = userId;
  }
}
