import AppLoader from '../appLoader';
import { NewsResponseData, SourceResponseData, UrlOptions } from '../loader';
import sources from './sources-data';
import news from './news-data';
import { IAppController, ResponseCallback } from '../controller';

class DummyAppController extends AppLoader implements IAppController {
  static readonly delay: number = 500;

  public getSources(callback: ResponseCallback<SourceResponseData>): void {
    setTimeout(() => {
      callback(null, sources);
    }, DummyAppController.delay);
  }

  public getNews(options: UrlOptions, callback: ResponseCallback<NewsResponseData>): void {
    setTimeout(() => {
      const { page, pageSize } = options;
      let data = news.articles;
      if (page && pageSize) {
        const start = (page - 1) * pageSize;
        data = data.slice(start, start + pageSize);
      }
      callback(null, { ...news, articles: data});
    }, DummyAppController.delay);
  }
}

export default DummyAppController;
