import { Component, ComponentHandler, ComponentHandlers } from '@core/component';
import { MainView } from '@views/main';
import { DisplayFilters } from './display-filters';
import { Filter } from './filters/filter';
import { FilterComponent } from './filters/filters-data';
import { FiltersList } from './filters/filters-list';
import { ProductsList } from './products-list';

class Main extends Component {
  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new MainView(),
    });

    this.components = {
      filtersList: new FiltersList({
        onFiltersChange: this.handleFiltersChange as ComponentHandler,
      }),
      displayFilters: new DisplayFilters(),
      productsList: new ProductsList()
    }
  }

  private handleFiltersChange = (filters: Filter[]): void => {
    (this.components.productsList as ProductsList).onFiltersChange(filters);
  }
}

export default Main;
