import { Component, ComponentHandlers } from '@core/component';
import { MainView } from '@views/main';
import { DisplayFilters } from './display-filters';
import { FiltersList } from './filters/filters-list';
import ProductsList from './products-list';

class Main extends Component {
  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new MainView(),
    });

    this.components = {
      filtersList: new FiltersList(),
      displayFilters: new DisplayFilters(),
      productsList: new ProductsList()
    }
  }
}

export default Main;
