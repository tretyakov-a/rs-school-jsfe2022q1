import AppLoader from '../appLoader';
import { NewsResponseData, SourceResponseData } from '../loader';
import sources from './sources-data';
import news from './news-data';

class DummyAppController extends AppLoader {
  static readonly delay: number = 1000;

  public getSources(callback: (data: SourceResponseData) => void): void {
    setTimeout(() => {
      callback(sources);
    }, DummyAppController.delay);
  }

  public getNews(sourceId: string, callback: (data: NewsResponseData) => void) {
    setTimeout(() => {
      callback(news);
    }, DummyAppController.delay);
  }
}

export default DummyAppController;
