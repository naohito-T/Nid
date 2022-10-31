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

@Entity('roles')
export class UserRole extends BaseIProperties {
  @Column()
  readonly user_id: string;

  @Column({ type: 'enum', enum: RoleType, comment: RoleComments.role, default: RoleType.User })
  role: RoleType;

  constructor(userId: string, role: RoleType = RoleType.User) {
    super();
    this.user_id = userId;
    this.role = role;
  }
}
