import './filters-list-item.scss';
import { View, ViewOptions } from '@core/view';
import { filtersData } from '@components/filters/filters-data';
import { FilterItemViewOptions } from '@components/filters/filters-list-item';

export class FiltersListItemView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.filters-list__item'
    })
  }

  public render(data: FilterItemViewOptions): string {
    const { name, title, isExpandable, isExpanded } = data;
    const [ _, component ] = filtersData[name];
    return super.render(`
      <li class="filters-list__item filter ${isExpandable ? '' : 'filter_no-expander'}">
        <input class="filter__expander"
          type="checkbox"
          name="${name}"
          value="${name}"
          id="${name}"
          ${isExpanded ? '' : 'checked'}> 
        <div class="filter__expander-wrapper">
          <label class="filter__expander-label" for="${name}">
            <h2 class="filter__title">${title}</h2>
            <div class="filter__expander-icon">
              <i class="fa-solid fa-chevron-up"></i>
            </div>
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
