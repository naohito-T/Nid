import { Entity, Column, Index, OneToMany, JoinColumn } from 'typeorm';
import { BaseUProperties } from './_base';
import { UserAddress } from './UserAddress';
import { UserAuthentication } from './UserAuthentication';
import { UserRole } from './Role';

const UserComments = {
  firstName: '苗字',
  lastName: '名前',
  age: '年齢',
  sex: '性別 0: 男性 1: 女性 2: 回答なし',
  nickName: 'ニックネーム',
  telephone_number: '電話番号',
  thumbnailURL: 'サムネイル',
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
  @Column({ comment: UserComments.firstName })
  first_name: string;

  @Column({ comment: UserComments.lastName })
  last_name: string;

  @Column({ comment: UserComments.age })
  age: number;

  @Column({ type: 'enum', enum: SexType, comment: UserComments.sex })
  sex: SexType;

  @Column({ comment: UserComments.nickName })
  @Index()
  nick_name: string;

  @Column({ comment: UserComments.telephone_number })
  // @Matches(telephoneNumberRegExp)
  telephone_number: string;

  @Column({ nullable: true, comment: UserComments.thumbnailURL, default: null })
  thumbnail_url: string | null = null;

  @Column({ nullable: true, comment: UserComments.has_terms_version, default: null })
  has_terms_version: Date | null = null;

  // TODO そもそもリレーションは初期値NULLでいいのか気になる（idだけ入れておくか）
  @OneToMany(() => UserAddress, (userAddress) => userAddress.user_id, {
    eager: true, // これで一緒に取るはず。Userを取れば一緒に住所テーブルも一髪で取れる
  })
  addresses: UserAddress[];

  @OneToMany(() => UserAuthentication, (userAuthentication) => userAuthentication.user_id)
  authorizations: UserAuthentication[];

  constructor(
    firstName: string,
    lastName: string,
    age: number,
    sex: SexType,
    nickName: string,
    telephoneNumber: string,
  ) {
    super();
    this.first_name = firstName;
    this.last_name = lastName;
    this.age = age;
    this.sex = sex;
    this.nick_name = nickName;
    this.telephone_number = telephoneNumber;
  }
}
