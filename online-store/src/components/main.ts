import { Component, ComponentProps } from '@core/component';
import { MainView } from '@views/main';
import { ProductsHeader } from './products-header';
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
      ['displayOptions', ProductsHeader, {
        viewOptions: { mountPoint: '.products__header' },
      }],
      ['productsList', ProductsList, {
        viewOptions: { mountPoint: '.products__list' },
      }],
    ];

    this.update();
  }
}
