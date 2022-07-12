import './filters-list.scss';
import { View, ViewOptions } from '@core/view';
import { Product } from '@common/product';
import { Component } from '@core/component';
import { SpinnerView } from '@views/spinner';
import { FilterConfig, filtersData } from '@components/filters/filters-data';
import { FiltersListItemView } from '@views/filters-list-item';

export class FiltersListView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.filters'
    })
  }

  private renderItems(products: Product[]) {
    return Object.entries(filtersData)
      .map(([ name, [ title ] ]: [string, FilterConfig]): string => {
        return this.renderChild('filterItems', Component, {
          viewConstructor: FiltersListItemView,
          data: {
            filterName: name,
            title,
            products,
          }
        });
      })
      .join('');
  }

  public render(data?: Product[]): string {
    return super.render(`
      <div class="filters">
        ${!data || this.isLoading
          ? this.renderChild('spinner', Component, {
              viewConstructor: SpinnerView
            })
          : `<ul class="filters__list filters-list">
                ${this.renderItems(data)}
            </ul>`}
      </div>
    `);
  }
}