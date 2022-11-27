/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly FRONT_URL: string;
    readonly BACKEND_API_URL: string;
  }
}
