import { HeaderView } from "@views/header";
import { Component, ComponentHandler, ComponentHandlers } from "./component";
import { Filter, FiltersForm } from "./filter";
import { SourceData } from "./sources";

export class Header extends Component<void> {

  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new HeaderView()
    });

    this.addEventListener('onSourcesLoad', this.handleSourcesLoad);
    this.components = {
      filtersForm: new FiltersForm({
        onFilterChange: this.handleFilterChange
      }),
    }
  }

  private handleSourcesLoad = (e: Event): void => {
    const sources = (e as CustomEvent<SourceData[]>).detail as SourceData[];
    this.components.filtersForm.update(sources);
  }
  
  private handleFilterChange = (filters: Filter[]): void => {
    (this.props.handlers?.onFilterChange as ComponentHandler<Filter[]>)(filters);
  }
}