import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * @desc idを秘匿にしたい場合（スクレイピングなどで検索して欲しくない場合）
 */
export abstract class BaseUProperties extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 3 })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', precision: 3 })
  public updatedAt: Date;
}

/**
 * @desc 普通に連番でいいとき。
 * 連番のidのためselectで発行しやすいため、
 */
export abstract class BaseIProperties extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  // TODO tsのDateと相互が適用されないためprecisionにしてみた。
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 3 })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', precision: 3 })
  public updatedAt: Date;
}
