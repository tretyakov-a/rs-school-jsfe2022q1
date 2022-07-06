import { Component, ComponentHandlers } from '@core/component';
import { DisplayFiltersView } from '@views/display-filters';
import { FiltersListView } from '@views/filters-list';
import { MainView } from '@views/main';
import ProductsList from './product-list';

class Main extends Component<void> {
  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new MainView(),
    });

    this.components = {
      filtersList: new Component({
        view: new FiltersListView()
      }),
      displayFilters: new Component({
        view: new DisplayFiltersView()
      }),
      productsList: new ProductsList()
    }
  }
}

export default Main;
