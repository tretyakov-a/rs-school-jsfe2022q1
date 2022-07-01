import { NewsResponseData } from 'controller/loader';
import { Component, ComponentHandlers } from './component';
import { NewsPaginationView } from '../views/news-pagination/index';
import { DEFAULT_ITEMS_PER_PAGE } from '@common/constants';
import { PaginationData, NewsPagination } from '@components/news-pagination';
import { NewsView } from '@views/news';
import { GetNewsFunction } from 'controller/controller';

export interface NewsData {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export class News extends Component<NewsData> {
  private news: NewsData[];
  private getData: GetNewsFunction
  
  constructor(getData: GetNewsFunction, handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new NewsView(),
    });
    
    this.news = [];
    this.getData = getData;
  }

  private handlePageChange = ({ currentPage, itemsPerPage }: PaginationData): void => {
    const start = currentPage * itemsPerPage;
    this.update(this.news.slice(start, start + itemsPerPage));
  }

  private onLoad = (err: Error | null, data: NewsResponseData | null): void => {
    if (err !== null) return this.onLoadingEnd(err.message);
    if (data === null) return this.onLoadingEnd('Error');

    this.news = data.articles ? data.articles : [];
    const totalResults = data.totalResults;
    const news = this.news.length >= DEFAULT_ITEMS_PER_PAGE
      ? this.news.slice(0, DEFAULT_ITEMS_PER_PAGE)
      : this.news;
    this.onLoadingEnd(news);

    const paginationData: PaginationData = {
      currentPage: 0,
      itemsNumber: totalResults,
      itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    };

    this.components.pagination = new NewsPagination(
      {
        view: new NewsPaginationView({ data: paginationData }),
        handlers: {
          onPageChange: this.handlePageChange
        },
      },
      paginationData
    )
  }

  public load(sourceId: string): void { 
    this.onLoadingStart();
    if (this.components.pagination) {
      this.components.pagination.update('');
    }
    this.getData({ sources: sourceId }, this.onLoad);
  }
}