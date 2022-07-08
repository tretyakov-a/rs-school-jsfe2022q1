import { Component, ComponentHandlers } from '@core/component';
import { MainView } from '@views/main';
import { DisplayFilters } from './display-filters';
import { Filter } from './filters/filter';
import { FiltersList } from './filters/filters-list';
import { Product, ProductsList } from './products-list';

class Main extends Component {
  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new MainView(),
    });

    this.components = {
      filtersList: new FiltersList({
        onFiltersChange: this.handleFiltersChange,
      }),
      displayFilters: new DisplayFilters(),
      productsList: new ProductsList({
        onDataLoad: this.handleDataLoad,
      })
    }
  }

  private handleFiltersChange = (filters?: Filter[]): void => {
    const { productsList } = this.components;
    if (productsList instanceof ProductsList)
      productsList.onFiltersChange(filters || []);
  };

  private handleDataLoad = (data?: Product[]): void => {
    const { filtersList } = this.components;
    if (filtersList instanceof FiltersList)
      filtersList.onDataLoad(data || []);
  }
}

export default Main;
