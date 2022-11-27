/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'job' | 'test';
    readonly CORS_ALLOW_ORIGIN: string;
    readonly SESSION_SECRET_KEY: string;
    readonly TYPEORM_HOST: string;
    readonly TYPEORM_PORT: string;
    readonly TYPEORM_USER: string;
    readonly TYPEORM_PASS: string;
    readonly TYPEORM_DB: string;
    readonly TYPEORM_LOG: string;
    readonly AWS_DEFAULT_REGION: string;
    readonly AWS_ACCESS_KEY_ID: string;
    readonly AWS_SECRET_ACCESS_KEY: string;
    readonly LOCAL_STACK_ENDPOINT: string;
  }
}
