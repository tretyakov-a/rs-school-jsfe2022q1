import { NewsResponseData } from 'controller/loader';
import { Component, ComponentHandlers } from './component';
import { NewsPaginationView } from '../views/news-pagination/index';
import { DEFAULT_ITEMS_PER_PAGE } from '@common/constants';
import { PaginationData, NewsPagination } from '@components/news-pagination';
import { NewsView } from '@views/news';

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

type GetNewsDataFunction = (sourceId: string, callback: (data: NewsResponseData) => void) => void;

export class News extends Component<NewsData> {
  private news: NewsData[];
  private getData: GetNewsDataFunction
  
  constructor(getData: GetNewsDataFunction, handlers: ComponentHandlers = {}) {
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

  private onLoad = (data: NewsResponseData): void => {
    this.news = data.articles ? data.articles : [];
    const news = this.news.length >= DEFAULT_ITEMS_PER_PAGE
      ? this.news.slice(0, DEFAULT_ITEMS_PER_PAGE)
      : this.news;
    this.onLoadingEnd(news);

    const paginationData: PaginationData = {
      currentPage: 0,
      itemsNumber: this.news.length,
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
    this.getData(sourceId, this.onLoad);
  }
}