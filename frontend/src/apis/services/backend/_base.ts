import Axios, { AxiosInstance } from 'axios';
import {
  Result,
  Success,
  Failure,
  UnexpectedError,
  UNEXPECTED,
  AxiosError,
  NIDError,
} from '@/libs/error';
import { fetchLogger, eventLogger } from '@/middleware/log';

type GetBaseType<T> = Promise<Result<Awaited<Promise<T>>, NIDError>>;
type PostBaseType<T> = Promise<Result<Awaited<Promise<T>>, NIDError>>;

export class BackendBase {
  private readonly baseURL;
  private readonly axios;

  constructor() {
    // TODO backendへの通信は全てproxyさせるかは要検討
    // this.baseURL = process.env.FRONT_URL;
    // this.baseURL = process.env.BACKEND_API_URL;
    this.baseURL = 'http://localhost:3100';
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
    eventLogger.debug({ msg: 'retry', count });
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
  protected get = async <T>(path: string, headers?: object, retry: number = 3): GetBaseType<T> => {
    let count = 0;
    try {
      const data = await this.axios.get<T>(path, { headers }).then((r) => r.data);
      fetchLogger.info({ msg: 'Get Success', file: 'backend base' });
      return new Success(200, data);
    } catch (e: unknown) {
      fetchLogger.info({ msg: 'Get Error', file: 'backend base' });
      if (Axios.isAxiosError(e)) {
        return new Failure(new AxiosError(e.message, e.status, e.code));
      }
      // 予期せぬエラー
      return new Failure(
        new UnexpectedError(UNEXPECTED.message, UNEXPECTED.statusCode, UNEXPECTED.code),
      );
    }
  };

  /**
   * @desc Errorハンドリング＆リトライを備えたPOST ユーティリティメソッド
   * @param path
   * @param payload
   * @param retry default retry count
   */
  protected post = async <T, V>(path: string, payload: V, retry: number = 3): PostBaseType<T> => {
    let count = 0;
    try {
      fetchLogger.info({ msg: 'Post Start.', service: 'Backend' });
      const data = await this.axios.post<T>(path, { data: payload }).then((r) => r.data);

      return new Success(200, data);
    } catch (e: unknown) {
      fetchLogger.info({ msg: 'Post Error', service: 'Backend' });
      if (Axios.isAxiosError(e)) {
        return new Failure(new AxiosError(e.message, e.status, e.code));
      }
      // 予期せぬエラー
      return new Failure(
        new UnexpectedError(UNEXPECTED.message, UNEXPECTED.statusCode, UNEXPECTED.code),
      );
    }
  };

  /**
   * @desc GuestResource ユーティリティ Logs（ここにdatadog or sentry）
   */
  protected interceptLogs = (message: string, statusCode: number, code: string, name: string) => {
    eventLogger.error({
      message,
      statusCode,
      code,
      name,
    });
  };
}
