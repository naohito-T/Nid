export class Configs {
  private readonly RUN_ENV = process.env.NODE_ENV;

  public get getRunEnv(): string {
    return this.RUN_ENV;
  }
}
