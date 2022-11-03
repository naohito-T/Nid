import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { BaseIProperties } from './_base';
import { User } from './User';

export enum IdentityType {
  Mail = 0,
  Google = 1,
  Twitter = 2,
}

const UserAuthComment = {
  identity_type: 'ログインタイプ(メール、 Githubなど)',
  identifier: '該当ログインタイプの識別子(メールアドレス、 githubユーザー名など)',
  credential: 'クレデンシャル(外部サービス発行されたtoken,認証コードなど)',
} as const;

/**
 * @desc 認証用テーブル
 *       userは複数の認証を持てる
 *       例）mail & Google
 */
@Entity('user_authorizations')
export class UserAuthentication extends BaseIProperties {
  @Column({
    name: 'identity_type',
    type: 'enum',
    enum: IdentityType,
    comment: UserAuthComment.identity_type,
  })
  identityType: IdentityType;

  // Uniqueいけるかも
  @Column({ name: 'identifier', comment: UserAuthComment.identifier })
  identifier: number;

  // Uniqueいけるかも
  @Column({ name: 'credential', comment: UserAuthComment.credential })
  credential: number;

  @Column({ name: 'user_id' })
  readonly userId: string; // relationする

  @ManyToOne(() => User, (user) => user.userAuthorization) // relationを表現してい
  @JoinColumn({ name: 'userId' }) // userIdがforeignキーとなることを表す。
  user: User;
}
