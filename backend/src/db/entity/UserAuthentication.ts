import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { BaseIProperties } from './_base';
import { User } from './User';
/**
 * @desc 外部クライアント認証用テーブル
 */

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

@Entity('user_authorizations')
export class UserAuthentication extends BaseIProperties {
  @Column({ type: 'enum', enum: IdentityType, comment: UserAuthComment.identity_type })
  identity_type: IdentityType;

  // Uniqueいけるかも
  @Column({ comment: UserAuthComment.identifier })
  identifier: number;

  // Uniqueいけるかも
  @Column({ comment: UserAuthComment.credential })
  credential: number;

  @Column()
  readonly user_id: string; // relationする

  @ManyToOne(() => User, (user) => user.authorizations) // relationを表現してい
  @JoinColumn({ name: 'user_id' }) // userIdがforeignキーとなることを表す。
  user: User;

  constructor(userId: string) {
    super();
    this.user_id = userId;
  }
}
