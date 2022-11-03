import { Entity, Column, Index, OneToMany, OneToOne } from 'typeorm';
import { BaseUProperties } from './_base';
import { UserAddress } from './UserAddress';
import { UserAuthentication } from './UserAuthentication';
import { Terms } from './Terms';

const UserComments = {
  firstName: '苗字',
  lastName: '名前',
  age: '年齢',
  sex: '性別 0: 男性 1: 女性 2: 回答なし',
  nickName: 'ニックネーム',
  telephoneNumber: '電話番号',
  thumbnailURL: 'サムネイル',
  userAddress: 'ユーザが持っている住所（複数持てる）',
  userAuthorization: '認証したフロー（複数ある想定）',
  has_terms_version: '同意している利用規約のversion（空白の場合は同意していないと同義）',
};

export enum SexType {
  male = 0, // 男性
  female = 1, // 女性
  none = 2, // 回答なし
}

// users テーブル
// 参照されるテーブルのため親テーブルとなる
// @see typeormでentityを定義するガイドライン https://tech.bitbank.cc/typeorm-entity-guideline/
@Entity('users')
export class User extends BaseUProperties {
  @Column({ name: 'first_name', comment: UserComments.firstName })
  firstName: string;

  @Column({ name: 'last_name', comment: UserComments.lastName })
  lastName: string;

  @Column({ name: 'age', comment: UserComments.age })
  age: number;

  @Column({ name: 'sex', type: 'enum', enum: SexType, comment: UserComments.sex })
  sex: SexType;

  @Column({ name: 'nick_name', comment: UserComments.nickName })
  @Index()
  nickName: string;

  @Column({ name: 'telephone_number', comment: UserComments.telephoneNumber })
  // @Matches(telephoneNumberRegExp)
  telephoneNumber: string;

  @Column({
    name: 'thumbnail_url',
    nullable: true,
    default: null,
    comment: UserComments.thumbnailURL,
  })
  thumbnailUrl: string | null = null;

  @Column({
    name: 'user_addresses',
    nullable: true,
    default: null,
    array: true,
    comment: UserComments.userAddress,
  })
  @OneToMany(() => UserAddress, (userAddress) => userAddress.user, {
    eager: true, // これで一緒に取るはず。Userを取れば一緒に住所テーブルも一髪で取れる
  })
  userAddress: UserAddress[] | null;

  @Column({
    name: 'user_authorization',
    array: true,
    comment: UserComments.userAuthorization,
  })
  @OneToMany(() => UserAuthentication, (userAuthentication) => userAuthentication.user)
  userAuthorization: UserAuthentication[];

  @Column({
    name: 'has_terms_version',
    nullable: true,
    default: null,
    array: true,
    comment: UserComments.has_terms_version,
  })
  @OneToOne(() => Terms, (terms) => terms.user)
  hasTermsVersion: Date | null;
}

export type UserEntity = typeof User;
