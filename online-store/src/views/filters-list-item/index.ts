import './filters-list-item.scss';
import { View, ViewOptions } from '@core/view';
import { ComponentProps } from '@core/component';
import { filtersData } from '@components/filters/filters-data';
import { FilterViewOptions } from '@components/filters/filter';

export type FilterItemViewOptions = FilterViewOptions & {
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
    const { name, title, isExpanded } = data;
    const [ _, component ] = filtersData[name];
    return super.render(`
      <li class="filters-list__item filter ${isExpanded ? '' : 'filter_no-expander'}">
        <input class="filter__expander" type="checkbox" name="filter-expand" value="${name}" id="${name}">
        <div class="filter__expander-wrapper">
          <label class="filter__expander-label" for="${name}">
            <h2 class="filter__title">${title}</h2>
          </label>
        </div>
        <div class="filter__content">
          ${this.renderChild('filter', component, { 
            data, 
            viewOptions: { root: '.filter__content'} 
          })}
        </div>
      </li>
    `);
  }  
}
