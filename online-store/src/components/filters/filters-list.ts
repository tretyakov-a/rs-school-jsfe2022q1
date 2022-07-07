import { Component, ComponentHandlers } from "@core/component";
import { FiltersListView } from "@views/filters-list";
import { Product } from "../products-list";
import json from '@assets/data-sample.json';
import { FiltersListItem } from "./fitlers-list-item";
import { selectFrom } from '@common/utils';

export class FiltersList extends Component<Product> {

  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new FiltersListView(),
    });

    selectFrom(this.getRoot())('.filters__form').addEventListener('change', this.onFiltersChange);

    this.onLoadingStart();
    setTimeout(() => {
      this.update(json as Product[])
    }, 500);
  }

  private onFiltersChange = (e: Event): void => {
    console.log(new FormData(e.target as HTMLFormElement));
  }

  public update(data: Product[]): void {
    super.update('');
    
    const brands = data.reduce((acc: Record<string, number>, { brand }) => {
      acc[brand] = acc[brand] ? acc[brand] + 1 : 1;
      return acc;
    }, {});

    const colors = data.reduce((acc: Record<string, number>, { props }) => {
      const color = props.classification?.specs.color?.value;
      if (color) {
        acc[color] = acc[color] ? acc[color] + 1 : 1;
      }
      return acc;
    }, {});

    const prices = data.map((item) => item.price);

    this.components.filters = [
      new FiltersListItem({
        name: 'brand',
        title: 'Бренд',
        values: brands
      }),
      new FiltersListItem({
        name: 'color',
        title: 'Цвет',
        values: colors
      }),
      new FiltersListItem({
        name: 'price',
        title: 'Цена',
        min: Math.min(...prices),
        max: Math.max(...prices),
      })
    ];
  }
}