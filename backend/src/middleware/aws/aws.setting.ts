import { Configs } from '@/configs';

const configs = new Configs();

export const AWSSettings = {
  region: configs.getRunEnv === 'development' ? 'localhost' : '',
  endpoint: configs.getRunEnv === 'development' ? 'http://localhost:4566' : '',
};
