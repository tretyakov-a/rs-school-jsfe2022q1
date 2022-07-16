import './filters-list.scss';
import { ViewOptions } from '@core/view';
import { FilterConfig, filtersData } from '@components/filters/filters-data';
import { FiltersListItemView } from '@views/filters-list-item';
import { AppLoadEventData } from '@components/app';
import { LoaderView } from '@core/loader-view';
import { FiltersListItem } from '@components/filters/filters-list-item';

export class FiltersListView extends LoaderView {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.filters'
    })
  }

  private renderItems({ products, state: { filterStates, appearance }}: AppLoadEventData) {
    return Object.entries(filtersData)
      .map(([ name, [ title, _, __, style ] ]: [string, FilterConfig]): string => {
        const [ isExpandable = true, filterStyle = '' ] = style || [];
        const { isExpanded = true } = appearance?.filters[name] || {};
        return this.renderChild('filterItems', FiltersListItem, {
          viewConstructor: FiltersListItemView,
          data: {
            name, title, products, isExpandable, isExpanded, filterStyle,
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