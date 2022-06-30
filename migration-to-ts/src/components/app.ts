import { News } from '@components/news';
import { SourceData, Sources } from '@components/sources';
import AppController from '../controller/controller';
import DummyAppController from '../controller/dummy-controller';
import { AppView } from '@views/appView';
import { Filter, FiltersForm } from './filter';
import { Component } from './component';
import { NewsView } from '@views/news';
import { SourcesView } from '@views/sources';
import { FiltersFormView } from '@views/filters';

class App extends Component<void> {
  private readonly controller: AppController;

  constructor(selector: string) {
    super({
      view: new AppView({
        root: selector,
      }),
    });
    // this.controller = new DummyAppController();
    this.controller = new AppController();
  }

  private handleSourceClick = (sourceId: string): void => {
    this.components.news.update(sourceId);
  }

  private handleSourcesLoad = (sources: SourceData[]): void => {
    this.components.filtersForm.update(sources);
  }

  private handleFilterChange = (filters: Filter[]): void => {
    (this.components.sources as Sources).applyFilters(filters);
  }

  public start(): void {
    this.components.news = new News({
        view: new NewsView({ root: '.news' }),
      },
      this.controller.getNews.bind(this.controller)
    );

    this.components.sources = new Sources({
        view: new SourcesView({
          root: '.sources',
          contentEl: '.sources__container'
        }),
        handlers: {
          onSourceClick: this.handleSourceClick,
          onDataLoad: this.handleSourcesLoad,
        }
      }, 
      this.controller.getSources.bind(this.controller)
    );
  
    this.components.filtersForm = new FiltersForm({
      view: new FiltersFormView({
        root: '.source-filters', 
        contentEl: '.source-filters__container',
      }),
      handlers: {
        onFilterChange: this.handleFilterChange
      }
    });
  }
}

export default App;
