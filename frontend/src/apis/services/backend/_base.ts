import { runtimeEnv, Environment } from '@/configs';
import Axios, { AxiosInstance } from 'axios';
import { Result, Success, Failure, ErrorResponse } from '@/libs/error';
import { fetchLogger } from '@/middleware/log';
export class BackendBase {
  private readonly baseURL;
  private readonly axios;

  constructor() {
    console.log(`runtime ${runtimeEnv()}`);
    console.log(`Environment.Local${Environment.Development}`);
    // backendへの通信は全てproxyさせる。
    this.baseURL = process.env.FRONT_URL;
    this.axios = this.createBaseAxios();
  }

  private createBaseAxios = (): AxiosInstance => {
    return Axios.create({
      baseURL: this.baseURL,
      timeout: 3000, // 3秒/ms
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  /**
   * @desc 通信が完了した後に入れたい処理
   * @example cacheをheaderに入れるなど
   * @todo とりあえず一旦はlogを入れるか
   */
  private onFulfilled = () => {};

  // Rejectedなどに関してはerror handするだけだから特になし。

  public get = async <T>(path: string, headers?: object): Promise<T> => {
    console.log(`get path${this.baseURL}${path}`);
    return this.axios.get<T>(path, { headers }).then((r) => r.data);
  };

  /**
   * @desc Errorハンドリング＆リトライを備えたpostユーティリティメソッド
   * @param path
   * @param payload
   * @param retry default retry count
   */
  public post = async <T, V>(
    path: string,
    payload: V,
    retry: number = 3,
  ): Promise<Result<Awaited<Promise<T>>, ErrorResponse>> => {
    fetchLogger.info({ msg: 'Post Start', file: 'backend base' });
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
        // ネットワークエラーの場合はerrorのオブジェクトの中にそもそもオブジェクトで返ってこないためリトライさせる。
        if (!e.response) {
          ++count;
          await new Promise((r) => setTimeout(r, 50000));
          fetchLogger.info({ msg: 'retry', count });
          await this.axios.post<T>(path, { data: payload }).then((r) => r.data);
        } else {
          return new Failure(new ErrorResponse('backend base', e.status, e.code, e));
        }
      }
      // 予期せぬエラー
      return new Failure(new ErrorResponse('backend base', undefined, undefined, e as Error));
    }
  };
}
