import { HttpCodes } from '@common/constants';
import { NewsData } from '@components/news';
import { SourceData } from '@components/sources';

type UrlOptions = {
  sources?: string | null,
  apiKey?: string,
};

type RespInfo = {
  endpoint: string,
  options?: Pick<UrlOptions, 'sources'>,
}

type ResponseData = {
  status: string,
}

type NewsResponseData = ResponseData & {
  totalResults: number,
  articles: NewsData[],
}

type SourceResponseData = ResponseData & {
  sources: SourceData[],
}

class Loader {
  private readonly baseLink: string;
  private readonly options: UrlOptions;

  constructor(baseLink: string, options: UrlOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp<T>(
    { endpoint, options = {} }: RespInfo,
    callback: (data: T) => void = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === HttpCodes.UNAUTHORIZED || res.status === HttpCodes.NOT_FOUND)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: UrlOptions, endpoint: string): string {
    const urlOptions: UrlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    const keys = Object.keys(urlOptions) as (keyof UrlOptions)[];
    keys.forEach((key): void => {
      const option = urlOptions[key];
      url += `${key}=${option}&`;
    });

    return url.slice(0, -1);
  }

  private load<T>(
    method: string,
    endpoint: string,
    callback: (data: T) => void,
    options: UrlOptions = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response): Promise<T> => res.json())
      .then((data: T): void => callback(data))
      .catch((err: Error): void => console.error(err));
  }
}

export {
  Loader,
  NewsResponseData,
  SourceResponseData,
};
