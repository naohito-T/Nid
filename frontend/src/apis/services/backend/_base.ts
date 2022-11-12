import Axios, { AxiosInstance } from 'axios';
import { Result, Success, Failure, ErrorResponse } from '@/libs/error';
import { fetchLogger, errorLogger } from '@/middleware/log';
export class BackendBase {
  private readonly baseURL;
  private readonly axios;

  constructor() {
    // TODO backendへの通信は全てproxyさせるかは要検討
    this.baseURL = process.env.FRONT_URL;
    this.axios = this.createBaseAxios();
  }

  /**
   * @desc 通信が完了した後に入れたい処理
   */
  private onFulfilled = () => {};

  /**
   * @desc 通信が失敗した後に入れたい処理
   */
  private onRejected = () => {};

  /**
   * @desc 通信が失敗した場合にリトライさせ、countを1つあげる
   */
  private fetchRetry = async (count: number): Promise<number> => {
    await new Promise((r) => setTimeout(r, 50000));
    fetchLogger.info({ msg: 'retry', count });
    return ++count;
  };

  private createBaseAxios = (): AxiosInstance => {
    const axios = Axios.create({
      baseURL: this.baseURL,
      timeout: 3000, // 3秒/ms
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // requestの時にinterceptしたい時
    // axios.interceptors.request.use()
    // responseの時にinterceptしたい時
    // axios.interceptors.response.use()
    return axios;
  };

  /**
   * @desc Errorハンドリング＆リトライを備えたGET ユーティリティメソッド
   * @param path
   * @param headers
   * @param retry default retry count
   */
  public get = async <T>(
    path: string,
    headers?: object,
    retry: number = 3,
  ): Promise<Result<Awaited<Promise<T>>, ErrorResponse>> => {
    let count = 0;
    try {
      const data = await this.axios.get<T>(path, { headers }).then((r) => r.data);
      fetchLogger.info({ msg: 'Get Success', file: 'backend base' });
      return new Success(data);
    } catch (e: unknown) {
      fetchLogger.info({ msg: 'Get Error', file: 'backend base' });
      if (Axios.isAxiosError(e)) {
        if (count === retry) {
          return new Failure(new ErrorResponse('backend base', e.status, e.code, e));
        }
        // ネットワークエラー時はerrorのオブジェクトの中にそもそもオブジェクトで返ってこないためリトライさせる。
        if (!e.response) {
          count = await this.fetchRetry(count);
          await this.axios.get<T>(path, { headers }).then((r) => r.data);
        } else {
          return new Failure(new ErrorResponse('backend base', e.status, e.code, e));
        }
      }
      // 予期せぬエラー
      return new Failure(new ErrorResponse('backend base', undefined, undefined, e as Error));
    }
  };

  /**
   * @desc Errorハンドリング＆リトライを備えたPOST ユーティリティメソッド
   * @param path
   * @param payload
   * @param retry default retry count
   */
  public post = async <T, V>(
    path: string,
    payload: V,
    retry: number = 3,
  ): Promise<Result<Awaited<Promise<T>>, ErrorResponse>> => {
    let count = 0;
    try {
      const data = await this.axios.post<T>(path, { data: payload }).then((r) => r.data);
      fetchLogger.info({ msg: 'Post Success', file: 'backend base' });
      return new Success(data);
    } catch (e: unknown) {
      fetchLogger.info({ msg: 'Post Error', file: 'backend base' });
      if (Axios.isAxiosError(e)) {
        if (count === retry) {
          return new Failure(new ErrorResponse('backend base', e.status, e.code, e));
        }
        // ネットワークエラー時はerrorのオブジェクトの中にそもそもオブジェクトで返ってこないためリトライさせる。
        if (!e.response) {
          count = await this.fetchRetry(count);
          await this.axios.post<T>(path, { data: payload }).then((r) => r.data);
        } else {
          return new Failure(new ErrorResponse('backend base', e.status, e.code, e));
        }
      }
      // 予期せぬエラー
      return new Failure(new ErrorResponse('backend base', undefined, undefined, e as Error));
    }
  };

  /**
   * @desc GuestResource ユーティリティ Logs（ここにdatadog or sentry）
   */
  protected interceptLogs = (functionName: string, statusCode: number, code: string) => {
    errorLogger.error({
      functionName,
      statusCode,
      code,
    });
  };
}
