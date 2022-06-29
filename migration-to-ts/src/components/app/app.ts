import { FILTER_NAME } from '@common/constants';
import { NewsData } from '@view/news/news';
import { SourceData } from '@view/sources/sources';
import AppController from '../controller/controller';
// import DummyAppController from '../controller/dummy-controller';
import { AppView } from '@view/appView';
import { Filter, SearchFilter, SelectFilter } from './filter';
import { SpinnerView } from '../view/spinner';
import { selectFrom } from '@common/utils';

class App {
  private readonly controller: AppController;
  private readonly view: AppView;
  private news: NewsData[];
  private sources: SourceData[];
  private filters: Filter<string | void>[];

  constructor() {
    this.controller = new AppController();
    // this.controller = new DummyAppController();
    this.view = new AppView();
    this.news = [];
    this.sources = [];
    this.filters = [];
  }

  private handleSourcesClick = (e: MouseEvent): void => {
    const el = (e.target as HTMLElement).closest('.source__item');
    if (!el) return;

    const newsContainer = selectFrom(document)('.news');

    newsContainer.innerHTML = '';
    newsContainer.append((new SpinnerView()).draw());

    const sourceId = el.getAttribute('data-source-id') || '';

    // if (newsContainer.getAttribute('data-source') !== sourceId) {
    //   newsContainer.setAttribute('data-source', sourceId);
    // }
    this.controller.getNews(sourceId, (data) => {
      this.news = data.articles ? data.articles : [];
      this.view.drawNews(this.news);
    });
  }

  private handleFilterChange = (): void => {
    this.view.drawSources(this.sources.filter((item) => {
      return this.filters.reduce((acc, filter) => acc && filter.check(item), true);
    }))
  }

  public start(): void {
    const sourcesEl = selectFrom(document)('.sources');
    const sourcesWrapperEl = selectFrom(sourcesEl)('.sources__wrapper');
    sourcesEl.addEventListener('click', this.handleSourcesClick);
    sourcesWrapperEl.append((new SpinnerView()).draw());

    const filtersFormEl = selectFrom(document)('.source-filters');
    const filterFormWrapperEl = selectFrom(filtersFormEl)('.source-filters__wrapper');
    filtersFormEl.addEventListener('change', this.handleFilterChange);
    filterFormWrapperEl.append((new SpinnerView()).draw());
    
    this.controller.getSources((data) => {
      this.sources = data.sources ? data.sources : [];
      filterFormWrapperEl.innerHTML = '';

      const { CATEGORY, COUNTRY, LANGUAGE, SEARCH } = FILTER_NAME;
      this.filters.push(
        ...[CATEGORY, COUNTRY, LANGUAGE].map((name) => {
          const key = name as keyof SourceData;
          return new SelectFilter(Filter.getFilterData(this.sources, key), name, key);
        }),
        new SearchFilter(SEARCH, 'name'),
      )

      filtersFormEl.dispatchEvent(new Event('change'));
    });
  }
}

export default App;
