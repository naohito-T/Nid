/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly CORS_ALLOW_ORIGIN: string;
    readonly TYPEORM_HOST: string;
    readonly TYPEORM_PORT: string;
    readonly TYPEORM_USER: string;
    readonly TYPEORM_PASS: string;
    readonly TYPEORM_DB: string;
    readonly TYPEORM_LOG: string;
  }
}
