import { runtimeEnv, Environment } from './enum.config';
export class AppConfig {
  private static readonly RUN_ENV = runtimeEnv();

  public static get getRunEnv(): Environment {
    return this.RUN_ENV;
  }
}

export const AWSSettings = {
  region: AppConfig.getRunEnv === Environment.Local ? 'localhost' : '',
  endpoint: AppConfig.getRunEnv === Environment.Local ? 'http://localhost:4566' : '',
};
