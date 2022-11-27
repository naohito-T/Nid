import { Entity, Column, Index, OneToMany, OneToOne } from 'typeorm';
import { BaseUProperties } from './_base';
import { UserAddress } from './UserAddress';
import { UserAuthentication } from './UserAuthentication';
import { Term } from './Term';

const UserComments = {
  firstName: '苗字',
  lastName: '名前',
  birthDay: '生年月日',
  sex: '性別 0: 男性 1: 女性 2: 回答なし',
  nickName: 'ニックネーム',
  telephoneNumber: '電話番号',
  email: 'メールアドレス',
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

  @Column('varchar', { name: 'birth_date', nullable: true, comment: UserComments.birthDay })
  birthDate: string | null;

  @Column('enum', { name: 'sex', enum: SexType, comment: UserComments.sex })
  sex: SexType;

  @Column('varchar', { name: 'nick_name', comment: UserComments.nickName })
  @Index()
  nickName: string;

  @Column('varchar', { name: 'telephone_number', comment: UserComments.telephoneNumber })
  // @Matches(telephoneNumberRegExp)
  telephoneNumber: string;

  @Column('varchar', { name: 'email', comment: UserComments.email, unique: true })
  email: string;

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
  @OneToMany(() => UserAddress, (userAddress) => userAddress.user, {
    eager: true, // これで一緒に取るはず。Userを取れば一緒に住所テーブルも一回のクエリーで取れる（取得時にそのEntityも一緒に取得するかどうか。DB構造には影響しない。）
    cascade: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  userAddress: UserAddress[] | null;
  // @OneToMany((type) => Pet, (pet) => pet.user) pets: Pet[]
  /**
   * @see https://uyamazak.hatenablog.com/entry/2021/10/06/140909
   */
  @Column('varchar', {
    name: 'user_authorization',
    array: true,
    comment: UserComments.userAuthorization,
  })
  @OneToMany(() => UserAuthentication, (userAuthentication) => userAuthentication.userId, {
    cascade: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  userAuthorization: UserAuthentication[];

  // TODO これ違うかも
  // @Column('timestamp', {
  //   name: 'has_terms_version',
  //   nullable: true,
  //   default: null,
  //   array: true,
  //   comment: UserComments.has_terms_version,
  // })
  // @OneToOne(() => Term, (term) => term.termVersion)
  // hasTermsVersion: string | null;

  @Column('timestamp', {
    name: 'has_term_version',
    nullable: true,
    default: null,
    array: true,
    comment: UserComments.has_terms_version,
  })
  @OneToOne(() => Term, (term) => term.termVersion)
  hasTermVersion: string | null;
}
