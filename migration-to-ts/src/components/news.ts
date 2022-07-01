import { NewsResponseData, UrlOptions } from 'controller/loader';
import { Component, ComponentHandlers } from './component';
import { DEFAULT_ITEMS_PER_PAGE, MAX_TOTAL_RESULTS } from '@common/constants';
import { PaginationData, NewsPagination } from '@components/news-pagination';
import { NewsView } from '@views/news';
import { GetNewsFunction } from 'controller/controller';
import { NewsOverlay } from './news-overlay';
import { RenderData } from '@views/view';

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

type UrlOptionsWOApiKey = Required<Omit<UrlOptions, 'apiKey'>>;

export enum NewsLoadInitiator {
  Main,
  Pagination,
}

export class News extends Component<NewsData> {
  private news: NewsData[];
  private getData: GetNewsFunction
  private requestUrlOptions: UrlOptionsWOApiKey | null;
  
  constructor(getData: GetNewsFunction, handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new NewsView(),
    });
    
    this.news = [];
    this.requestUrlOptions = null;

    this.getData = getData;
    this.components = {
      pagination: new NewsPagination({
        onPageChange: this.handlePageChange
      }),
      overlay: new NewsOverlay(),
    }
  }

  private handlePageChange = ({ currentPage, itemsPerPage }: PaginationData): void => {
    const { sources } = this.requestUrlOptions as UrlOptionsWOApiKey;
    this.load({
      sources,
      page: currentPage + 1,
      pageSize: itemsPerPage,
    }, NewsLoadInitiator.Pagination);
  }

  private onLoad = (
    initiator: NewsLoadInitiator
  ) => (
    err: Error | null, data: NewsResponseData | null
  ): void => {

    if (err !== null) return this.onLoadingEnd(err.message);
    if (data === null) return this.onLoadingEnd('Error');

    this.news = data.articles ? data.articles : [];
    this.onLoadingEnd(this.news);
 
    if (initiator === NewsLoadInitiator.Main) {
      const { page, pageSize } = this.requestUrlOptions as UrlOptionsWOApiKey;
      const totalResults = data.totalResults < MAX_TOTAL_RESULTS
        ? data.totalResults
        : MAX_TOTAL_RESULTS;
      
      const paginationData: PaginationData = {
        currentPage: page - 1,
        itemsNumber: totalResults,
        itemsPerPage: pageSize,
      };
      this.components.pagination.update(paginationData);
    } else if (initiator === NewsLoadInitiator.Pagination) {
      (this.components.overlay as NewsOverlay).hide();
    }
  }

  public onLoadingStart(initiator?: NewsLoadInitiator): void {
    if (!initiator) {
      super.onLoadingStart();
    }
    if (initiator === NewsLoadInitiator.Main) {
      this.components.pagination.update('');
    } else if (initiator === NewsLoadInitiator.Pagination) {
      (this.components.overlay as NewsOverlay).show();
    }
  }

  public load(options: UrlOptionsWOApiKey, initiator: NewsLoadInitiator): void {
    this.requestUrlOptions = options;
    this.onLoadingStart(initiator);
    this.getData(options, this.onLoad(initiator));
  }
}