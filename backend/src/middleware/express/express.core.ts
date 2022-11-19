import { Request, Response, NextFunction } from 'express';
import http from 'http';
import { Send, Query } from 'express-serve-static-core';

/**
 * @see https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c
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

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}
