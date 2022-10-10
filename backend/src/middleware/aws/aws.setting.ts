import { AppConfig } from '@/configs';

const appConfig = new AppConfig();

export const AWSSettings = {
  region: appConfig.getRunEnv === 'development' ? 'localhost' : '',
  endpoint: appConfig.getRunEnv === 'development' ? 'http://localhost:4566' : '',
};
