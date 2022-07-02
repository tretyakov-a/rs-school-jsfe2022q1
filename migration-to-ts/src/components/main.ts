import { MainView } from "@views/main";
import AppController from "controller/controller";
import { Component, ComponentHandler, ComponentHandlers } from "./component";
import { Filter } from "./filter";
import { News, NewsLoadInitiator } from "./news";
import { SourceData, Sources } from "./sources";
import { DEFAULT_ITEMS_PER_PAGE, FIRST_PAGE } from '@common/constants';

export class Main extends Component<void> {
  constructor(controller: AppController, handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new MainView()
    });

    this.addEventListener('onFilterChange', this.handleFilterChange);

    this.components = {   
      sources: new Sources(
        controller.getSources.bind(controller),
        {
          onSourceClick: this.handleSourceClick,
          onDataLoad: this.handleSourcesLoad,
        }
      ),
      news: new News(
        controller.getNews.bind(controller)
      ),
    }
  }

  private handleFilterChange = (e: Event): void => {
    const filters = (e as CustomEvent<Filter[]>).detail;
    (this.components.sources as Sources).applyFilters(filters);
  }
  
  private handleSourceClick = (source: SourceData): void => {
    (this.components.news as News).load({
      sourceInfo: source,
      sources: source.id,
      page: FIRST_PAGE + 1,
      pageSize: DEFAULT_ITEMS_PER_PAGE,
    }, NewsLoadInitiator.Main);
  }

  private handleSourcesLoad = (sources: SourceData[]): void => {
    (this.props.handlers?.onSourcesLoad as ComponentHandler<SourceData[]>)(sources);
  }
  
}