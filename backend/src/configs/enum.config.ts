export enum Environment {
  Local,
  Development,
  Production,
  Job,
  Test,
}

export const runtimeEnv = (): Environment => {
  switch (process.env.NODE_ENV) {
    case 'local':
      return Environment.Local;
    case 'development':
      return Environment.Development;
    case 'production':
      return Environment.Production;
    case 'job':
      return Environment.Job;
    case 'test':
      return Environment.Test;
    default:
      return Environment.Local;
  }
};
