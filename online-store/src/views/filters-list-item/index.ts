import './filters-list-item.scss';
import filterListItemTemplate from './filters-list-item.ejs';
import { View, ViewOptions } from '@core/view';
import { FilterData } from '@components/filters/filter';

export class FiltersListItemView extends View<FilterData> {
  constructor(options: ViewOptions<FilterData> = {}) {
    super({
      ...options,
      root: '.filters-list',
    })
  }

  public render(options: ViewOptions<FilterData>): void {
    const { title } = options.data as FilterData;
    const container = document.createElement('li');
    container.className = 'filters-list__item filter';
    container.innerHTML = filterListItemTemplate(title);
    this.el = container;
    this.contentEl?.append(container);
  }  
}
