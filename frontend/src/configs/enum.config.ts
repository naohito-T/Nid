export enum Environment {
  Development,
  Production,
  Job,
  Test,
}

export const runtimeEnv = (): Environment => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return Environment.Development;
    case 'production':
      return Environment.Production;
    case 'test':
      return Environment.Test;
    default:
      return Environment.Development;
  }
};
