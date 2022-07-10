import { Component, ComponentProps } from '@core/component';
import { MainView } from '@views/main';
import { DisplayFilters } from './display-filters';
import { FiltersList } from './filters/filters-list';
import { ProductsList } from './products-list';

export class Main extends Component {
  constructor(props: ComponentProps) {
    super({
      ...props,
      viewConstructor: MainView,
    });

    this.components = [
      ['filtersList', FiltersList, {
        viewOptions: { mountPoint: '.filters-list' },
      }],
      ['displayFilters', DisplayFilters, {
        viewOptions: { mountPoint: '.display-filters' },
      }],
      ['productsList', ProductsList, {
        viewOptions: { mountPoint: '.products-list' },
      }],
    ];

    this.update();
  }
}
