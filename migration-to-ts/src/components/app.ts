import { News, NewsData } from '@components/news';
import { SourceData, Sources, SourcesClickEvent } from '@components/sources';
import AppController from '../controller/controller';
import DummyAppController from '../controller/dummy-controller';
import { AppView } from '@views/appView';
import { Filter } from './filter';
import { FiltersForm } from './filter';
import { Component } from './component';

class App extends Component<SourceData | NewsData | string | void> {
  private readonly controller: AppController;
  private news: NewsData[];
  private sources: SourceData[];

  constructor() {
    super(new AppView({
      root: 'main',
    }));
    // this.controller = new AppController();
    this.controller = new DummyAppController();
    this.news = [];
    this.sources = [];
  }

  public start(): void {
    const news = new News();
    const sources = new Sources();
    sources.onLoadingStart();
    
    sources.addEventListener('click', (e: Event) => {
      news.onLoadingStart();
      const { sourceId } = (e as SourcesClickEvent).detail;
      this.controller.getNews(sourceId, (data) => {
        this.news = data.articles ? data.articles : [];
        news.onLoadingEnd(this.news);
      });
    });

    const filtersForm = new FiltersForm();
    filtersForm.onLoadingStart();

    filtersForm.addEventListener('change', (e: Event) => {
      const filters = (e as CustomEvent).detail as Filter[];
      sources.update(this.sources.filter((item) => {
        return filters.reduce((acc, filter) => acc && filter.check(item), true);
      }))
    });

    this.controller.getSources((data) => {
      this.sources = data.sources ? data.sources : [];
      sources.onLoadingEnd(this.sources);
      filtersForm.initFilters(this.sources);
    });

    this.components.push(news, sources, filtersForm);
  }
}

export default App;
