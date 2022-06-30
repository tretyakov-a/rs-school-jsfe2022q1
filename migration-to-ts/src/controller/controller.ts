import AppLoader from './appLoader';
import { NewsResponseData, SourceResponseData } from './loader';

class AppController extends AppLoader {
  public getSources(callback: (data: SourceResponseData) => void): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  public getNews(sourceId: string, callback: (data: NewsResponseData) => void): void {
    super.getResp(
      {
        endpoint: 'everything',
        options: {
          sources: sourceId,
        },
      },
      callback
    );
  }
}

export default AppController;
