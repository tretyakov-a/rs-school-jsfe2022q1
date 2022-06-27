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

  public getNews(e: MouseEvent, callback: (data: NewsResponseData) => void) {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId as string);
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
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
