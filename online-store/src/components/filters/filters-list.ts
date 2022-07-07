import { Component, ComponentHandlers } from "@core/component";
import { FiltersListView } from "@views/filters-list";
import { Product } from "../products-list";
import json from '@assets/data-sample.json';
import { FiltersListItem } from "./fitlers-list-item";
import { selectFrom } from '@common/utils';
import { RangeFilter } from "./range-filter";
import { CheckboxFilter } from "./checkbox-filter";
import { FILTER_NAME } from "@common/constants";

type FilterComponent = typeof RangeFilter | typeof CheckboxFilter;

const filters: Record<FILTER_NAME, FilterComponent> = {
  [FILTER_NAME.PRICE]: RangeFilter,
  [FILTER_NAME.WEIGHT]: RangeFilter,
  [FILTER_NAME.BRAND]: CheckboxFilter,
  [FILTER_NAME.COLOR]: CheckboxFilter,
}

export class FiltersList extends Component {

  constructor(handlers: ComponentHandlers = {}) {
    super({
      handlers,
      view: new FiltersListView(),
    });

    selectFrom(this.getRoot())('.filters__form').addEventListener('change', this.onFiltersChange);

    this.onLoadingStart();
    setTimeout(() => {
      this.onLoadingEnd();
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

    const weights = data.map((item) => Number.parseInt(item.props.dimensions?.specs.weight?.value || ''));

    this.components.filters = [
      new FiltersListItem({
        name: FILTER_NAME.BRAND,
        title: 'Бренд',
        values: brands
      }),
      new FiltersListItem({
        name: FILTER_NAME.COLOR,
        title: 'Цвет',
        values: colors
      }),
      new FiltersListItem({
        name: FILTER_NAME.PRICE,
        title: 'Цена (₽)',
        min: Math.min(...prices),
        max: Math.max(...prices),
      }),
      new FiltersListItem({
        name: FILTER_NAME.WEIGHT,
        title: 'Полетная масса (гр.)',
        min: Math.min(...weights),
        max: Math.max(...weights),
      })
    ];
  }

  static getFilterComponent(name: FILTER_NAME): FilterComponent | undefined {
    return filters[name];
  }
}