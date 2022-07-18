import './selected-filters.scss';
import { View, ViewOptions } from "@core/view";
import { Filter } from '@components/filters/filter';

export class SelectedFiltersView extends View {
  constructor(options: ViewOptions) {
    super({
      ...options,
      root: '.selected-filters',
    })
  }

  private renderFilterTags(filters: Filter[]): string {
    return filters
      .map((filter) => {
        const { name, title, isSmthToPrint, info } = filter.getTag();
        return isSmthToPrint
          ? `<div class="selected-filters__item" data-filter-name="${name}">
              <span class="selected-filters__item-title">${title}</span>
              ${info !== ''
                ? `: <span class="selected-filters__item-info">${info}</span>`
                : ''}
            </div>`
          : '';
      })
      .join('');
  }

  public render(filters?: Filter[]): string {
    let html = '';
    if (filters) {
      html = this.renderFilterTags(filters);
    }

    return super.render(`
      <div class="products__selected-filters selected-filters">
        ${html}
      </div>
    `);
  }
}