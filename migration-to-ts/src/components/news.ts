import { NewsResponseData, UrlOptions } from 'controller/loader';
import { Component, ComponentHandlers } from './component';
import { MAX_TOTAL_RESULTS } from '@common/constants';
import { PaginationData, NewsPagination } from '@components/news-pagination';
import { NewsView } from '@views/news';
import { GetNewsFunction } from 'controller/controller';
import { NewsOverlay } from './news-overlay';
import { SourceData } from '@components/sources';
import { NewsSourceInfoView } from '@views/news-source-info';

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

type LoadOptions = Required<Omit<UrlOptions, 'apiKey'>> & {
  sourceInfo?: SourceData;
};

export enum NewsLoadInitiator {
  Main,
  Pagination,
}

export class News extends Component<NewsData> {
  private news: NewsData[];
  private getData: GetNewsFunction
  private loadOptions: LoadOptions | null;
  
  constructor(getData: GetNewsFunction, handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new NewsView(),
    });
    
    this.news = [];
    this.loadOptions = null;

    this.getData = getData;
    this.components = {
      sourceInfo: new Component<SourceData>({
        view: new NewsSourceInfoView()
      }),
      pagination: new NewsPagination({
        onPageChange: this.handlePageChange
      }),
      overlay: new NewsOverlay(),
    }
  }

  private handlePageChange = ({ currentPage, itemsPerPage }: PaginationData): void => {
    const { sources } = this.loadOptions as LoadOptions;
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
      const { page, pageSize } = this.loadOptions as LoadOptions;
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
      this.components.sourceInfo.update(this.loadOptions?.sourceInfo);
      this.components.pagination.update('');
    } else if (initiator === NewsLoadInitiator.Pagination) {
      (this.components.overlay as NewsOverlay).show();
    }
  }

  public load(options: LoadOptions, initiator: NewsLoadInitiator): void {
    const { page, pageSize, sources } = options;
    this.loadOptions = options;
    this.onLoadingStart(initiator);
    this.getData({ page, pageSize, sources }, this.onLoad(initiator));
  }
}