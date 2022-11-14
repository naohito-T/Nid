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
  @Column('varchar', { name: 'first_name', comment: UserComments.firstName })
  firstName: string;

  @Column('varchar', { name: 'last_name', comment: UserComments.lastName })
  lastName: string;

  // @Column('varchar',{ name: 'age', comment: UserComments.age })
  // age: number;
  @Column('timestamp', { name: 'birth_date', nullable: true })
  birthDate: Date | null;

  @Column('enum', { name: 'sex', enum: SexType, comment: UserComments.sex })
  sex: SexType;

  @Column('varchar', { name: 'nick_name', comment: UserComments.nickName })
  @Index()
  nickName: string;

  @Column('varchar', { name: 'telephone_number', comment: UserComments.telephoneNumber })
  // @Matches(telephoneNumberRegExp)
  telephoneNumber: string;

  @Column('varchar', {
    name: 'thumbnail_url',
    nullable: true,
    default: null,
    comment: UserComments.thumbnailURL,
  })
  thumbnailUrl: string | null = null;

  @Column('varchar', {
    name: 'user_addresses',
    nullable: true,
    default: null,
    array: true,
    comment: UserComments.userAddress,
  })
  @OneToMany(() => UserAddress, (userAddress) => userAddress.userId, {
    eager: true, // これで一緒に取るはず。Userを取れば一緒に住所テーブルも一髪で取れる
  })
  userAddress: string[] | null;

  @Column('varchar', {
    name: 'user_authorization',
    array: true,
    comment: UserComments.userAuthorization,
  })
  @OneToMany(() => UserAuthentication, (userAuthentication) => userAuthentication.userId)
  userAuthorization: UserAuthentication[];

  @Column('timestamp', {
    name: 'has_terms_version',
    nullable: true,
    default: null,
    array: true,
    comment: UserComments.has_terms_version,
  })
  @OneToOne(() => Terms, (terms) => terms.userId)
  hasTermsVersion: Date | null;
}

export type UserEntity = typeof User;
