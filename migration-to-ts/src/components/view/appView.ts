import { News, NewsData } from './news/news';
import { SourceData, Sources } from './sources/sources';

export class AppView {
  private readonly news: News;
  private readonly sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: NewsData[]): void {
    this.news.draw(data);
  }

  public drawSources(data: SourceData[]): void {
    this.sources.draw(data);
  }
}

export default AppView;
