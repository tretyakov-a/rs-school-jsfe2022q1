import AppLoader from './appLoader';
import { NewsResponseData, SourceResponseData, UrlOptions } from './loader';

export type ResponseCallback<T> = (err: Error | null, data: T | null) => void

export type GetNewsFunction = (options: UrlOptions, callback: ResponseCallback<NewsResponseData>) => void;
export type GetSourceFunction = (callback: ResponseCallback<SourceResponseData>) => void;

export interface IAppController {
  getSources: GetSourceFunction;
  getNews: GetNewsFunction; 
}

class AppController extends AppLoader implements IAppController {
  public getSources(callback: ResponseCallback<SourceResponseData>): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  public getNews(options: UrlOptions, callback: ResponseCallback<NewsResponseData>): void {
    super.getResp(
      {
        endpoint: 'everything',
        options,
      },
      callback
    );
  }
}

export default AppController;
