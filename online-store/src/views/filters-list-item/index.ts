import './filters-list-item.scss';
import { View, ViewOptions } from '@core/view';
import { Product } from '@common/product';
import { ComponentProps } from '@core/component';
import { FILTER_NAME } from '@common/constants';
import { filtersData } from '@components/filters/filters-data';

export type FilterItemViewOptions = {
  filterName: FILTER_NAME;
  title: string;
  products: Product[];
  isExpanded: boolean;
}

export type FilterItemProps = ComponentProps & {
  data: FilterItemViewOptions;
}

export class FiltersListItemView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.filters-list__item'
    })
  }

  public render(data: FilterItemViewOptions): string {
    const { filterName, products, isExpanded } = data;
    const [ title, component, propPicker ] = filtersData[filterName];
    return super.render(`
      <div class="filters-list__item filter ${isExpanded ? '' : 'filter_no-expander'}">
        <input class="filter__expander" type="checkbox" name="filter-expand" value="${filterName}" id="${filterName}">
        <div class="filter__expander-wrapper">
          <label class="filter__expander-label" for="${filterName}">
            <h2 class="filter__title">${title}</h2>
          </label>
        </div>
        <div class="filter__content">
          ${this.renderChild('filter', component, {
            data: {
              name: filterName,
              title,
              propPicker,
              products,
            }
          })}
        </div>
      </div>
    `);
  }  
}
