import { ChildComponentData, Component, ComponentProps } from "@core/component";
import { FiltersListView } from "@views/filters-list";
import { Product, ProductsLoadEventData } from "../products-list";
import { FilterConfig, filtersData } from './filters-data';
import { isFilters } from "./filter";
import { EVENT } from "@common/constants";


export class FiltersList extends Component {

  constructor(props: ComponentProps = {}) {
    super({
      ...props,
      viewConstructor: FiltersListView,
    });
    
    this.on(EVENT.PRODUCTS_LOAD, this.handleDataLoad);
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

  public handleDataLoad = (e: CustomEvent<ProductsLoadEventData>): void => {
    const products = e.detail.products;
    console.log(products)
    this.components = Object.entries(filtersData).map(this.filterDataToComponent);
    this.onLoadingEnd(products);
  }
}