import { ChildComponentData, Component, ComponentProps } from "@core/component";
import { FiltersListView } from "@views/filters-list";
import { Product } from "../products-list";
import { FilterConfig, filtersData } from './filters-data';
import { isFilters } from "./filter";
import { useCustom } from "@common/utils";
import { EVENT } from "@common/constants";


export class FiltersList extends Component {

  constructor(props: ComponentProps = {}) {
    super({
      ...props,
      viewConstructor: FiltersListView,
    });
    
    this.on(EVENT.PRODUCTS_LOAD, this.handleDataLoad);
    this.on(EVENT.FILTER_CHANGE, this.handleFiltersChange);
    this.onLoadingStart();
  }

  private filterDataToComponent = (
    [ name, { component, propPicker, title } ]: [string, FilterConfig]
  ): ChildComponentData => ([
    'filters', component,
    {
      handlers: {
        onFilterChange: this.handleFiltersChange,
      },
      root: this.getMountPoint(),
      componentOptions: {
        propPicker, name, title
      }
    }
  ])

  private handleFiltersChange = (): void => {
    const { filters } = this.getComponents();
    if (Array.isArray(filters) && isFilters(filters)) {
      this.emit(EVENT.FILTERS_CHANGE, filters);
    }
  }

  public handleDataLoad = (e: CustomEvent<Product[]>): void => {
    const data = e.detail;
    this.components = Object.entries(filtersData).map(this.filterDataToComponent);
    this.onLoadingEnd(data);
  }
}