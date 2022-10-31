import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * @desc idを秘匿にしたい場合（スクレイピングなどで検索して欲しくない場合）
 */
export abstract class BaseUProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 3 })
  public updatedAt: Date;
}

/**
 * @desc 普通に連番でいいとき。
 * 連番のidのためselectで発行しやすいため、
 */
export abstract class BaseIProperties {
  @PrimaryGeneratedColumn()
  readonly id: number;

  // TODO tsのDateと相互が適用されないためprecisionにしてみた。
  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 3 })
  public updatedAt: Date;
}
