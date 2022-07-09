import { Component, ComponentProps } from '@core/component';
import { MainView } from '@views/main';
import { DisplayFilters } from './display-filters';
import { FiltersList } from './filters/filters-list';
import { ProductsList } from './products-list';

class Main extends Component {
  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: MainView,
    });

    this.components = [
      ['filtersList', FiltersList],
      ['displayFilters', DisplayFilters],
      ['productsList', ProductsList],
    ];

    this.update();
  }
}

export default Main;
