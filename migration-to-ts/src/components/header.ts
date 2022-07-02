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

    this.components = {
      filtersForm: new FiltersForm({
        onFilterChange: this.handleFilterChange
      }),
    }
  }

  public handleSourcesLoad = (sources: SourceData[]): void => {
    this.components.filtersForm.update(sources);
  }
  
  private handleFilterChange = (filters: Filter[]): void => {
    (this.props.handlers?.onFilterChange as ComponentHandler<Filter[]>)(filters);
  }
}