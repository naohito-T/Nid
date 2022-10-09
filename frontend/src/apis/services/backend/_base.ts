export class BackendBase {
  private readonly baseUrl =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3100' : process.env.API_URL;

  public get = async <T>(path: string): Promise<T> => {
    console.log(`path${this.baseUrl}${path}`);
    const res = await fetch(`${this.baseUrl}${path}`);
    const json = await res.json();

    return json;
  };
}
