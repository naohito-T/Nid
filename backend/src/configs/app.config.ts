import { runtimeEnv, Environment } from './enum.config';
export class AppConfig {
  private static readonly RUN_ENV = runtimeEnv();

  public static get getRunEnv(): Environment {
    return this.RUN_ENV;
  }
}

export const AWSSettings = {
  accessKeyId: AppConfig.getRunEnv === Environment.Local ? process.env.AWS_ACCESS_KEY_ID : '',
  secretAccessKey:
    AppConfig.getRunEnv === Environment.Local ? process.env.AWS_SECRET_ACCESS_KEY : '',
  region: AppConfig.getRunEnv === Environment.Local ? process.env.AWS_DEFAULT_REGION : '',
  endpoint: AppConfig.getRunEnv === Environment.Local ? process.env.LOCAL_STACK_ENDPOINT : '',
};
