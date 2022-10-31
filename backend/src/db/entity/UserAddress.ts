import { Entity, JoinColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { BaseIProperties } from './_base';
/**
 * @desc 外部クライアント認証用テーブル
 */

const UserAddressComment = {
  zip_code: '郵便番号',
  prefecture: '都道府県',
  city: '市区町村',
  street: '番地など',
  building: 'アパート・マンション名等（任意）',
} as const;

// 1対多やな（複数の住所を持てる）
// これEN対応も今後視野に入れる。
// こちらに送付するみたいな
@Entity('user_addresses')
export class UserAddress extends BaseIProperties {
  @Column({ comment: UserAddressComment.zip_code })
  zip_code: string;

  @Column({ comment: UserAddressComment.prefecture })
  prefecture: string;

  @Column({ comment: UserAddressComment.city })
  city: string;

  @Column({ comment: UserAddressComment.street })
  street: string;

  @Column({ comment: UserAddressComment.building, nullable: true, default: null })
  building: string | null;

  @Column()
  readonly user_id: string;
  // @JoinColumnデコレーターはリレーションの一方の側でのみ使用する必要があることに注意してください。このデコレーターをどちら側に配置しても、関係の所有側になります。リレーションシップの所有側には、データベース内の外部キーを持つ列が含まれています。
  @ManyToOne(() => User, (user) => user.addresses) // relationを表現してい
  @JoinColumn({ name: 'user_id' }) // userIdがforeignキーとなることを表す。
  user: User;

  // 初期値のあるプロパティを除いてオブジェクトの不変条件を満たすためにconstructorを設定する。
  constructor(userId: string) {
    super();
    this.user_id = userId;
  }
}
