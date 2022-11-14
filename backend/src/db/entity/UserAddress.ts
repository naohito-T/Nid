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
  @Column('varchar', { name: 'zip_code', comment: UserAddressComment.zip_code })
  zipCode: string;

  @Column('varchar', { name: 'prefecture', comment: UserAddressComment.prefecture })
  prefecture: string;

  @Column('varchar', { name: 'city', comment: UserAddressComment.city })
  city: string;

  @Column('varchar', { name: 'street', comment: UserAddressComment.street })
  street: string;

  @Column('varchar', {
    name: 'building',
    comment: UserAddressComment.building,
    nullable: true,
    default: null,
  })
  building: string | null;

  @Column('varchar', { name: 'user_id' })
  readonly userId: string;
  // @JoinColumnデコレーターはリレーションの一方の側でのみ使用する必要があることに注意してください。このデコレーターをどちら側に配置しても、関係の所有側になります。リレーションシップの所有側には、データベース内の外部キーを持つ列が含まれています。
  @ManyToOne(() => User, (user) => user.userAddress) // relationを表現してい
  @JoinColumn({ name: 'userId' }) // userIdがforeignキーとなることを表す。
  user: User;
}
