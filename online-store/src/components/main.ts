import { Component, ComponentHandlers } from '@core/component';
import { DisplayFiltersView } from '@views/display-filters';
import { MainView } from '@views/main';
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
      displayFilters: new Component({
        view: new DisplayFiltersView()
      }),
      productsList: new ProductsList()
    }
  }
}

export default Main;
