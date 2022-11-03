import { User as U } from '@/db/entity';

// entityではコンストラクタはおこわない。
/**
 * やりたいこととしては以下
 * - dao的なもの&集約させたい
 * - 結合的な感じ？
 *
 */
export class User extends U {}
