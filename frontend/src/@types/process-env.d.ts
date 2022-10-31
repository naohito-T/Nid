/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'local' | 'development' | 'production' | 'test';
    readonly API_URL: string;
  }
}
