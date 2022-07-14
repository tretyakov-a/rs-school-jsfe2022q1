import { Component, ComponentProps } from "@core/component";
import { FiltersListView } from "@views/filters-list";
import { AppLoadEventData } from "@components/app";
import { isFilters } from "./filter";
import { EVENT } from "@common/constants";

export class FiltersList extends Component {

  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: FiltersListView,
    });
    
    this.on(EVENT.APP_LOAD, this.handleAppLoad);
    this.on(EVENT.FILTER_CHANGE, this.handleFiltersChange);
    this.onLoadingStart();
  }

  private handleFiltersChange = (): void => {
    const { filterItems } = this.getComponents();
    if (Array.isArray(filterItems)) {
      const filters = filterItems.map((item) => item.getComponent('filter'))
      if (isFilters(filters)) {
        this.emit(EVENT.FILTERS_CHANGE, filters);
      }
    }
  }

  public handleAppLoad = (e: CustomEvent<AppLoadEventData>): void => {
    this.onLoadingEnd(e.detail);
    
    queueMicrotask(this.handleFiltersChange);
  }
}