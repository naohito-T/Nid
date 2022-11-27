import { Request, Response } from 'express';
import { Send, Query } from 'express-serve-static-core';

/**
 * @see https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c
 * @see https://techblog.istyle.co.jp/archives/8568
 * Express req & resに型推論を効かせるために使用する（拡張させることでより効かせる）
 */

/**
 * @desc payload（body）に効かせる
 */

export interface TypedRequestBody<T> extends Request {
  body: T;
}

/**
 * @desc queryに効かせる
 */
export interface TypedRequestQuery<T extends Query> extends Request {
  query: T;
}

/**
 * @desc queryとbody両方
 */
export interface TypedRequest<T extends Query, U> extends Request {
  body: U;
  query: T;
}

interface ErrorResponse {
  errors: {
    // messageはen（フロントではenをjaにする）
    message: string;
    // 開発者コード（ドキュメントとかで整理する）
    code?: string;
    // ex.
    issue?: any;
  }[];
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody | ErrorResponse, this>;
}
