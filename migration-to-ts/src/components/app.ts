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

  constructor(selector: string) {
    super({
      view: new AppView({
        root: selector,
      }),
    });
    this.controller = new DummyAppController();
    this.news = [];
    this.sources = [];
  }

  public start(): void {
    const news = new News('.news');
    const sources = new Sources('.sources');
    const filtersForm = new FiltersForm('.source-filters');
    sources.onLoadingStart();
    filtersForm.onLoadingStart();
    
    sources.addEventListener('click', (e: Event) => {
      news.onLoadingStart();
      const { sourceId } = (e as SourcesClickEvent).detail;
      this.controller.getNews(sourceId, (data) => {
        this.news = data.articles ? data.articles : [];
        news.onLoadingEnd(this.news);
      });
    });

    filtersForm.addEventListener('change', (e: Event) => {
      const filters = (e as CustomEvent).detail as Filter[];
      sources.update(this.sources.filter((item) => {
        return filters.reduce((acc, filter) => acc && filter.check(item), true);
      }))
    });

    this.controller.getSources((data) => {
      this.sources = data.sources ? data.sources : [];
      sources.onLoadingEnd(this.sources);
      filtersForm.onLoadingEnd(this.sources);
    });

    this.components.push(news, sources, filtersForm);
  }
}

export default App;
