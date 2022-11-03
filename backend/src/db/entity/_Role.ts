import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseIProperties } from './_base';

/**
 * @desc role masterテーブル
 */

export enum RoleType {
  User = 0, // login後のアクセスできる。(user作成された時に付与される。)
  Admin = 1, // 管理者権限
}

const RoleComments = {
  role: '0: loginしたUser 1: 管理者権限',
} as const;

/**
 * @desc 認可関連は今度
 *
 * - Roleはマスターテーブルが必要。
 * - 多対多の関係になるため中間テーブル用意する（UserRole）
 * - Roleテーブルに権限の大元を作成する。
 * - それの組み合わせテーブルを作成（RoleGroup）
 * - RoleGroupをUserRoleテーブル（中間テーブル）でアテンド
 */

@Entity('roles')
export class Role extends BaseIProperties {
  @Column({ name: 'user_id' })
  readonly userId: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: RoleType,
    comment: RoleComments.role,
    default: RoleType.User,
  })
  role: RoleType;

  // constructor(userId: string, role: RoleType = RoleType.User) {
  //   super();
  //   this.user_id = userId;
  //   this.role = role;
  // }
}
