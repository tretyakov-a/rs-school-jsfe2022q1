import './filters-list-item.scss';
import filterListItemTemplate from './filters-list-item.ejs';
import { View, ViewOptions } from '@core/view';
import { FilterData } from '@components/filters/filter';

export class FiltersListItemView extends View {
  constructor(options: ViewOptions = {}) {
    super({
      ...options,
      root: '.filters-list',
    })
  }

  public render(data: FilterData): void {
    const { title } = data;
    const container = document.createElement('li');
    container.className = 'filters-list__item filter';
    container.innerHTML = filterListItemTemplate(title);
    super.render(container);
  }  
}
