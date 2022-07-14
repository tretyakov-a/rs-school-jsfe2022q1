import './filters-list.scss';
import { ViewOptions } from '@core/view';
import { Product } from '@common/product';
import { Component } from '@core/component';
import { FilterConfig, filtersData } from '@components/filters/filters-data';
import { FiltersListItemView } from '@views/filters-list-item';
import { AppLoadEventData } from '@components/app';
import { LoaderView } from '@core/loader-view';

export class FiltersListView extends LoaderView {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.filters'
    })
  }

  private renderItems({ products, state: { filterStates }}: AppLoadEventData) {
    console.log(filterStates)
    return Object.entries(filtersData)
      .map(([ name, [ title, _, __, isExpanded = true ] ]: [string, FilterConfig]): string => {
        return this.renderChild('filterItems', Component, {
          viewConstructor: FiltersListItemView,
          data: {
            name, title, products, isExpanded,
            state: filterStates[name],
          }
        });
      })
      .join('');
  }

  public render(data?: AppLoadEventData): string {
    let html = '';
    if (data !== undefined) {
      const { error } = data;
      html = !error
        ? `<ul class="filters__list filters-list">
              ${this.renderItems(data)}
          </ul>`
        : 'Ошибка загрузки товаров';
    }

    return super.render((loader: string) => `
      <div class="filters">
        ${loader !== '' ? loader : html}
      </div>
    `);
  }
}