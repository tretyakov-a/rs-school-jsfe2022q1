import './filters-list-item.scss';
import filterListItemTemplate from './filters-list-item.ejs';
import { View } from '@core/view';
import { FilterItemOptions } from '@components/filters/fitlers-list-item';

export class FiltersListItemView extends View {
  public render(data: FilterItemOptions): void {
    const { title } = data;
    const container = document.createElement('li');
    container.className = 'filters-list__item filter';
    container.innerHTML = filterListItemTemplate(title);
    super.render(container);
  }  
}
