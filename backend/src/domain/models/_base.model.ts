/**
 * @desc UUID用のBase properties
 */
export abstract class BaseUProperties {
  public readonly id: string;

  public createdAt: Date;

  public updatedAt: Date;
}

/**
 * @desc N*1の連番Base properties
 */
export abstract class BaseIProperties {
  public readonly id: number;

  public createdAt: Date;

  public updatedAt: Date;
}
