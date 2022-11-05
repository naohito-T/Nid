import { runtimeEnv, Environment } from '@/configs';
import Axios, { AxiosInstance } from 'axios';
export class BackendBase {
  private readonly baseURL;
  protected readonly axios;

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
   */
  private onFulfilled = () => {};

  // Rejectedなどに関してはerror handするだけだから特になし。

  public get = async <T>(path: string): Promise<T> => {
    console.log(`get path${this.baseURL}${path}`);
    return this.axios.get<T>(path).then((r) => r.data);
  };

  public post = async <T, V>(path: string, payload: V): Promise<T> => {
    console.log(`path${this.baseURL}${path}`);
    return this.axios.post<T>(path, { data: payload }).then((r) => r.data);
  };
}
